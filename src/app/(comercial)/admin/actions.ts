"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin, supabaseAuthClient } from "@/lib/admin/auth";
import { isAdminEmail, isLiveConfigured } from "@/lib/admin/env";
import { getRepo } from "@/lib/admin/repo";
import type { ClientStatus, PaymentStatus } from "@/lib/admin/types";
import { rateLimit } from "@/lib/contact/rate-limit";
import { parseProposal, type Method } from "@/lib/proposals/proposal";

async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "desconhecido";
}

/* ------------------------------ Login ------------------------------ */

export type LoginState = { status: "idle" | "sent" | "error"; message?: string };

export async function signIn(_prev: LoginState, form: FormData): Promise<LoginState> {
  if (!isLiveConfigured()) redirect("/admin");
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { status: "error", message: "Informe um e-mail válido." };
  const limit = rateLimit(`admin-login:${await clientIp()}`);
  if (!limit.allowed) return { status: "error", message: "Muitas tentativas. Aguarde alguns minutos." };
  // Só envia o link para e-mails autorizados, mas a resposta é sempre a mesma (não revela quem tem acesso).
  if (isAdminEmail(email)) {
    const h = await headers();
    const origin = `${h.get("x-forwarded-proto") ?? "https"}://${h.get("host")}`;
    const supabase = await supabaseAuthClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${origin}/admin/auth/callback`, shouldCreateUser: true },
    });
    if (error) return { status: "error", message: "Não foi possível enviar o link agora. Tente de novo em instantes." };
  }
  return { status: "sent", message: "Se este e-mail tiver acesso, enviamos um link para entrar. Confira sua caixa de entrada." };
}

export async function signOut() {
  if (isLiveConfigured()) {
    const supabase = await supabaseAuthClient();
    await supabase.auth.signOut();
  }
  redirect("/admin/entrar");
}

/* ----------------------------- Propostas ---------------------------- */

export type CreateProposalResult = { ok: true; id: string; code: string } | { ok: false; message: string };

export async function createProposal(json: string): Promise<CreateProposalResult> {
  const admin = await requireAdmin();
  let raw: unknown;
  try {
    raw = JSON.parse(json);
  } catch {
    return { ok: false, message: "Dados inválidos." };
  }
  const proposal = parseProposal(raw);
  if (!proposal) return { ok: false, message: "Confira os valores, as periodicidades e as formas de pagamento." };
  if (!proposal.client.name) return { ok: false, message: "Preencha o nome do cliente." };
  const rec = await getRepo().createProposal(proposal, admin.email);
  revalidatePath("/admin");
  return { ok: true, id: rec.id, code: rec.code };
}

/* --------------------- Aceite (página do cliente) -------------------- */

export type AcceptResult = { ok: true; acceptedAt: string } | { ok: false; message: string };

export async function acceptProposal(code: string, period: string, method: string, accepted: boolean): Promise<AcceptResult> {
  if (!accepted) return { ok: false, message: "Para continuar, marque que leu e aceita o contrato." };
  const limit = rateLimit(`accept:${await clientIp()}`);
  if (!limit.allowed) return { ok: false, message: "Muitas tentativas. Aguarde alguns minutos." };
  const repo = getRepo();
  const p = await repo.getProposalByCode(code);
  if (!p) return { ok: false, message: "Proposta não encontrada." };
  if (p.status === "accepted") return { ok: false, message: "Esta proposta já foi aceita." };
  if (p.status === "canceled" || p.data.validUntil < new Date().toISOString().slice(0, 10))
    return { ok: false, message: "Esta proposta não está mais válida. Peça uma nova à Fiapo de Manga." };
  if (!p.data.periods.includes(period as never) || !p.data.methods.includes(method as Method))
    return { ok: false, message: "Escolha uma forma de pagamento válida." };

  const { CONTRACT_VERSION, contractSections, termRows } = await import("@/lib/proposals/contract");
  const h = await headers();
  try {
    const { acceptance } = await repo.acceptProposal(p, {
      period: period as "monthly" | "annual",
      method: method as Method,
      ip: await clientIp(),
      userAgent: h.get("user-agent")?.slice(0, 400) ?? null,
      contractVersion: CONTRACT_VERSION,
      terms: termRows(p.data),
      contract: contractSections(p.data),
    });
    return { ok: true, acceptedAt: acceptance.acceptedAt };
  } catch {
    return { ok: false, message: "Não foi possível registrar o aceite agora. Tente de novo em instantes." };
  }
}

/* ------------------------ Clientes e pagamentos ---------------------- */

export async function registerPayment(clientId: string, form: FormData) {
  const admin = await requireAdmin();
  const amount = Number(String(form.get("amount") ?? "").replace(",", "."));
  const dueDate = String(form.get("dueDate") ?? "");
  const paidAt = String(form.get("paidAt") ?? "");
  const status = String(form.get("status") ?? "paid") as PaymentStatus;
  const method = String(form.get("method") ?? "pix") as Method | "other";
  if (!Number.isFinite(amount) || amount <= 0 || !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) return;
  if (!["open", "paid", "canceled", "refunded"].includes(status)) return;
  await getRepo().addPayment(
    clientId,
    {
      amount,
      dueDate,
      paidAt: status === "paid" ? new Date(`${paidAt || dueDate}T12:00:00`).toISOString() : null,
      method,
      status,
      providerId: String(form.get("providerId") ?? "").slice(0, 80) || null,
      note: String(form.get("note") ?? "").slice(0, 300) || null,
    },
    admin.email,
  );
  revalidatePath(`/admin/clientes/${clientId}`);
}

export async function setClientStatus(clientId: string, form: FormData) {
  const admin = await requireAdmin();
  const status = String(form.get("status") ?? "") as ClientStatus;
  if (!["pending", "active", "late", "suspended", "canceled"].includes(status)) return;
  await getRepo().updateClient(clientId, { status }, admin.email);
  revalidatePath(`/admin/clientes/${clientId}`);
}
