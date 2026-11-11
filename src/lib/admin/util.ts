import type { AdminEvent, Client, Payment, ProposalRecord } from "./types";

/** Código aleatório para o link da proposta (sem letras que confundem). */
export function proposalCode(length = 10): string {
  const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

export const today = () => new Date().toISOString().slice(0, 10);

export function addMonths(iso: string, months: number): string {
  const [y, m, d] = iso.split("-").map(Number) as [number, number, number];
  const date = new Date(Date.UTC(y, m - 1 + months, 1));
  const last = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(d, last));
  return date.toISOString().slice(0, 10);
}

export function daysBetween(fromIso: string, toIso: string): number {
  return Math.round((Date.parse(toIso) - Date.parse(fromIso)) / 86_400_000);
}

/** Dias de atraso de uma cobrança (0 se paga, cancelada ou ainda não vencida). */
export function daysLate(payment: Payment, ref = today()): number {
  if (payment.status === "paid" || payment.status === "canceled" || payment.status === "refunded") return 0;
  return Math.max(0, daysBetween(payment.dueDate, ref));
}

/** Situação real do cliente, olhando as cobranças (régua: aviso com 10 dias, suspensão com 15, rescisão com 60). */
export function clientSituation(
  client: Client,
  payments: Payment[],
  ref = today(),
): { label: string; tone: "ok" | "warn" | "danger" | "muted"; maxLate: number; openAmount: number } {
  const mine = payments.filter((p) => p.clientId === client.id);
  const late = mine.map((p) => daysLate(p, ref));
  const maxLate = Math.max(0, ...late);
  const openAmount = mine.filter((p) => daysLate(p, ref) > 0).reduce((s, p) => s + p.amount, 0);
  if (client.status === "canceled") return { label: "Cancelado", tone: "muted", maxLate, openAmount };
  if (client.status === "suspended") return { label: "Suspenso", tone: "danger", maxLate, openAmount };
  if (maxLate >= 60) return { label: `Atrasado há ${maxLate} dias — passível de rescisão`, tone: "danger", maxLate, openAmount };
  if (maxLate >= 15) return { label: `Atrasado há ${maxLate} dias — suspender`, tone: "danger", maxLate, openAmount };
  if (maxLate >= 10) return { label: `Atrasado há ${maxLate} dias — enviar aviso formal`, tone: "warn", maxLate, openAmount };
  if (maxLate > 0) return { label: `Atrasado há ${maxLate} ${maxLate === 1 ? "dia" : "dias"}`, tone: "warn", maxLate, openAmount };
  if (client.status === "pending") return { label: "Aguardando 1º pagamento", tone: "muted", maxLate, openAmount };
  return { label: "Em dia", tone: "ok", maxLate, openAmount };
}

/** Status efetivo da proposta (expira pela data de validade). */
export function proposalStatus(p: ProposalRecord, ref = today()): ProposalRecord["status"] {
  if ((p.status === "sent" || p.status === "opened") && p.data.validUntil < ref) return "expired";
  return p.status;
}

export const proposalStatusLabel: Record<ProposalRecord["status"], string> = {
  sent: "Enviada",
  opened: "Aberta pelo cliente",
  accepted: "Aceita",
  expired: "Expirada",
  canceled: "Cancelada",
};

export const paymentStatusLabel: Record<Payment["status"], string> = {
  open: "Em aberto",
  paid: "Paga",
  late: "Atrasada",
  canceled: "Cancelada",
  refunded: "Estornada",
};

export const eventLabel: Record<string, string> = {
  "proposal.created": "Proposta criada",
  "proposal.opened": "Cliente abriu a proposta",
  "proposal.accepted": "Contrato aceito",
  "client.created": "Cliente cadastrado",
  "client.status": "Situação alterada",
  "payment.registered": "Pagamento registrado",
  "payment.created": "Cobrança criada",
  "article.created": "Artigo criado",
  "article.updated": "Artigo atualizado",
  "article.deleted": "Artigo excluído",
};

export function eventText(e: AdminEvent): string {
  return eventLabel[e.type] ?? e.type;
}

/** CSV com separador ";" (abre direto no Excel em português) e BOM UTF-8. */
export function toCsv(rows: (string | number | null | undefined)[][]): string {
  const cell = (v: string | number | null | undefined) => {
    const s = v === null || v === undefined ? "" : String(v);
    return /[";\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return "﻿" + rows.map((r) => r.map(cell).join(";")).join("\r\n");
}
