"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import { requireAdmin, supabaseAuthClient } from "@/lib/admin/auth";
import { isAdminEmail, isLiveConfigured } from "@/lib/admin/env";
import { getRepo } from "@/lib/admin/repo";
import type { ArticleInput, ClientStatus, PaymentStatus } from "@/lib/admin/types";
import { articleCategorySlugs, isArticleCategory } from "@/lib/articles/categories";
import { slugify } from "@/lib/articles/markdown";
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

/* ------------------------------- Artigos ------------------------------ */

export type SaveArticleResult = { ok: true; id: string; slug: string; status: "draft" | "published" } | { ok: false; message: string };

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function refreshArticlePages(slug?: string) {
  revalidateTag("articles", "max");
  revalidatePath("/insights");
  revalidatePath("/insights/categoria/[slug]", "page");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/insights/${slug}`);
}

export async function saveArticle(json: string): Promise<SaveArticleResult> {
  const admin = await requireAdmin();
  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(json);
  } catch {
    return { ok: false, message: "Dados inválidos." };
  }
  const title = clean(raw.title, 140);
  const slug = slugify(clean(raw.slug, 100) || title);
  const category = clean(raw.category, 40);
  const status = raw.status === "published" ? "published" : "draft";
  if (!title) return { ok: false, message: "Escreva o título." };
  if (!slug) return { ok: false, message: "O endereço do artigo ficou vazio." };
  if (!isArticleCategory(category)) return { ok: false, message: `Escolha uma categoria (${articleCategorySlugs.length} opções).` };
  const body = typeof raw.body === "string" ? raw.body.slice(0, 120_000) : "";
  const summary = clean(raw.summary, 300);
  if (status === "published") {
    if (!summary) return { ok: false, message: "Para publicar, escreva o resumo." };
    if (body.trim().length < 200) return { ok: false, message: "Para publicar, o texto precisa ter pelo menos algumas frases." };
  }
  const publishedAtRaw = clean(raw.publishedAt, 40);
  const publishedAt = status === "published" ? (publishedAtRaw && !Number.isNaN(Date.parse(publishedAtRaw)) ? new Date(publishedAtRaw).toISOString() : new Date().toISOString()) : null;
  const input: ArticleInput = {
    id: clean(raw.id, 60) || undefined,
    slug,
    title,
    summary,
    body,
    category,
    coverUrl: clean(raw.coverUrl, 600) || null,
    coverAlt: clean(raw.coverAlt, 200) || null,
    authorName: clean(raw.authorName, 80) || "Fiapo de Manga",
    status,
    publishedAt,
    seoTitle: clean(raw.seoTitle, 120) || null,
    seoDescription: clean(raw.seoDescription, 200) || null,
    focusKeyword: clean(raw.focusKeyword, 80) || null,
    relatedServices: Array.isArray(raw.relatedServices) ? raw.relatedServices.map((x) => clean(x, 60)).filter(Boolean).slice(0, 6) : [],
  };
  try {
    const rec = await getRepo().saveArticle(input, admin.email);
    refreshArticlePages(rec.slug);
    revalidatePath("/admin/artigos");
    return { ok: true, id: rec.id, slug: rec.slug, status: rec.status };
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : "Não foi possível salvar." };
  }
}

export async function removeArticle(id: string) {
  const admin = await requireAdmin();
  const repo = getRepo();
  const a = await repo.getArticle(id);
  if (!a || a.status === "published") return; // artigo no ar: despublique antes de excluir
  await repo.deleteArticle(id, admin.email);
  refreshArticlePages(a.slug);
  revalidatePath("/admin/artigos");
  redirect("/admin/artigos");
}

export type UploadResult = { ok: true; url: string } | { ok: false; message: string };

export async function uploadArticleImage(form: FormData): Promise<UploadResult> {
  await requireAdmin();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) return { ok: false, message: "Escolha uma imagem." };
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return { ok: false, message: "Use uma imagem JPG, PNG ou WebP." };
  if (file.size > 5 * 1024 * 1024) return { ok: false, message: "A imagem passa de 5 MB. Reduza e tente de novo." };
  try {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const res = await getRepo().uploadArticleImage({ name: file.name, type: file.type, bytes });
    return { ok: true, url: `${res.url}#${res.width}x${res.height}` };
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : "Não foi possível enviar a imagem." };
  }
}
