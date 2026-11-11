import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { parseProposal } from "@/lib/proposals/proposal";
import { clientFromProposal, firstCharge } from "./core";
import { adminEnv } from "./env";
import type { Acceptance, AdminEvent, AdminRepo, Client, Payment, ProposalRecord } from "./types";
import { proposalCode } from "./util";

/** Repositório ligado ao Supabase. Usa a chave service_role: só roda no servidor. */
type Row = Record<string, unknown>;

let cached: SupabaseClient | null = null;
function db(): SupabaseClient {
  cached ??= createClient(adminEnv.supabaseUrl, adminEnv.serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  return cached;
}

function check<T>(res: { data: T; error: { message: string } | null }): T {
  if (res.error) throw new Error(`Supabase: ${res.error.message}`);
  return res.data;
}

const num = (v: unknown) => (typeof v === "number" ? v : Number(v));

const toProposal = (r: Row): ProposalRecord => ({
  id: r.id as string,
  code: r.code as string,
  data: parseProposal(r.data) ?? (r.data as ProposalRecord["data"]),
  status: r.status as ProposalRecord["status"],
  createdBy: (r.created_by as string) ?? null,
  createdAt: r.created_at as string,
  openedAt: (r.opened_at as string) ?? null,
  acceptedAt: (r.accepted_at as string) ?? null,
});
const toClient = (r: Row): Client => ({
  id: r.id as string,
  proposalId: (r.proposal_id as string) ?? null,
  name: r.name as string,
  document: (r.document as string) ?? null,
  email: (r.email as string) ?? null,
  phone: (r.phone as string) ?? null,
  siteType: r.site_type as string,
  plan: r.plan as string,
  period: r.period as Client["period"],
  method: r.method as Client["method"],
  amount: num(r.amount),
  status: r.status as Client["status"],
  startedAt: (r.started_at as string) ?? null,
  fidelityUntil: (r.fidelity_until as string) ?? null,
  nextDue: (r.next_due as string) ?? null,
  domain: (r.domain as string) ?? null,
  createdAt: r.created_at as string,
});
const toPayment = (r: Row): Payment => ({
  id: r.id as string,
  clientId: r.client_id as string,
  amount: num(r.amount),
  dueDate: r.due_date as string,
  paidAt: (r.paid_at as string) ?? null,
  method: (r.method as Payment["method"]) ?? null,
  status: r.status as Payment["status"],
  providerId: (r.provider_id as string) ?? null,
  note: (r.note as string) ?? null,
  createdAt: r.created_at as string,
});
const toEvent = (r: Row): AdminEvent => ({
  id: r.id as string,
  proposalId: (r.proposal_id as string) ?? null,
  clientId: (r.client_id as string) ?? null,
  type: r.type as string,
  data: (r.data as Record<string, unknown>) ?? {},
  actor: (r.actor as string) ?? null,
  createdAt: r.created_at as string,
});
const toAcceptance = (r: Row): Acceptance => ({
  id: r.id as string,
  proposalId: r.proposal_id as string,
  acceptedAt: r.accepted_at as string,
  ip: (r.ip as string) ?? null,
  userAgent: (r.user_agent as string) ?? null,
  email: (r.email as string) ?? null,
  contractVersion: r.contract_version as string,
  period: r.period as Acceptance["period"],
  method: r.method as Acceptance["method"],
  amount: num(r.amount),
  terms: (r.terms as Acceptance["terms"]) ?? [],
  contract: r.contract,
});

async function log(e: Omit<AdminEvent, "id" | "createdAt">) {
  check(await db().from("events").insert({ proposal_id: e.proposalId ?? null, client_id: e.clientId ?? null, type: e.type, data: e.data, actor: e.actor ?? null }));
}

export const supabaseRepo: AdminRepo = {
  mode: "live",
  async listProposals() {
    return (check(await db().from("proposals").select("*").order("created_at", { ascending: false })) as Row[]).map(toProposal);
  },
  async getProposal(id) {
    const r = check(await db().from("proposals").select("*").eq("id", id).maybeSingle()) as Row | null;
    return r ? toProposal(r) : null;
  },
  async getProposalByCode(code) {
    const r = check(await db().from("proposals").select("*").eq("code", code).maybeSingle()) as Row | null;
    return r ? toProposal(r) : null;
  },
  async createProposal(data, actor) {
    const r = check(await db().from("proposals").insert({ code: proposalCode(), data, created_by: actor }).select("*").single()) as Row;
    const rec = toProposal(r);
    await log({ proposalId: rec.id, type: "proposal.created", data: { monthly: data.monthly, annual: data.annual }, actor });
    return rec;
  },
  async markOpened(p) {
    if (p.openedAt) return;
    check(await db().from("proposals").update({ opened_at: new Date().toISOString(), status: p.status === "sent" ? "opened" : p.status }).eq("id", p.id).is("opened_at", null));
    await log({ proposalId: p.id, type: "proposal.opened", data: {}, actor: "cliente" });
  },
  async acceptProposal(p, input) {
    const base = clientFromProposal(p, input);
    // Marca como aceita só se ainda não foi (evita aceite duplo)
    const updated = check(
      await db().from("proposals").update({ status: "accepted", accepted_at: new Date().toISOString() }).eq("id", p.id).neq("status", "accepted").select("id"),
    ) as Row[];
    if (!updated.length) throw new Error("Proposta já aceita.");
    const acc = check(
      await db()
        .from("acceptances")
        .insert({ proposal_id: p.id, ip: input.ip, user_agent: input.userAgent, email: p.data.client.email, contract_version: input.contractVersion, period: input.period, method: input.method, amount: base.amount, terms: input.terms, contract: input.contract })
        .select("*")
        .single(),
    ) as Row;
    const cli = check(
      await db()
        .from("clients")
        .insert({ proposal_id: p.id, name: base.name, document: base.document, email: base.email, phone: base.phone, site_type: base.siteType, plan: base.plan, period: base.period, method: base.method, amount: base.amount, status: base.status, started_at: base.startedAt, fidelity_until: base.fidelityUntil, next_due: base.nextDue, domain: base.domain })
        .select("*")
        .single(),
    ) as Row;
    const client = toClient(cli);
    const charge = firstCharge(base);
    check(await db().from("payments").insert({ client_id: client.id, amount: charge.amount, due_date: charge.dueDate, status: charge.status, method: charge.method }));
    await log({ proposalId: p.id, clientId: client.id, type: "proposal.accepted", data: { period: input.period, method: input.method, ip: input.ip, version: input.contractVersion }, actor: "cliente" });
    return { acceptance: toAcceptance(acc), client };
  },
  async getAcceptance(proposalId) {
    const r = check(await db().from("acceptances").select("*").eq("proposal_id", proposalId).order("accepted_at", { ascending: false }).limit(1).maybeSingle()) as Row | null;
    return r ? toAcceptance(r) : null;
  },
  async listClients() {
    return (check(await db().from("clients").select("*").order("created_at", { ascending: false })) as Row[]).map(toClient);
  },
  async getClient(id) {
    const r = check(await db().from("clients").select("*").eq("id", id).maybeSingle()) as Row | null;
    return r ? toClient(r) : null;
  },
  async updateClient(id, patch, actor) {
    const row: Row = {};
    if (patch.status) row.status = patch.status;
    if (patch.nextDue !== undefined) row.next_due = patch.nextDue;
    if (patch.startedAt !== undefined) row.started_at = patch.startedAt;
    check(await db().from("clients").update(row).eq("id", id));
    await log({ clientId: id, type: "client.status", data: patch, actor });
  },
  async listPayments(filter = {}) {
    let q = db().from("payments").select("*").order("due_date", { ascending: false });
    if (filter.clientId) q = q.eq("client_id", filter.clientId);
    if (filter.from) q = q.gte("due_date", filter.from);
    if (filter.to) q = q.lte("due_date", filter.to);
    return (check(await q) as Row[]).map(toPayment);
  },
  async addPayment(clientId, input, actor) {
    const r = check(
      await db()
        .from("payments")
        .insert({ client_id: clientId, amount: input.amount, due_date: input.dueDate, paid_at: input.paidAt ?? null, method: input.method ?? null, status: input.status, provider_id: input.providerId ?? null, note: input.note ?? null })
        .select("*")
        .single(),
    ) as Row;
    await log({ clientId, type: input.status === "paid" ? "payment.registered" : "payment.created", data: { amount: input.amount, method: input.method, note: input.note }, actor });
    return toPayment(r);
  },
  async listEvents(filter) {
    let q = db().from("events").select("*").order("created_at", { ascending: false }).limit(filter.limit ?? 200);
    if (filter.clientId) q = q.eq("client_id", filter.clientId);
    if (filter.proposalId) q = q.eq("proposal_id", filter.proposalId);
    return (check(await q) as Row[]).map(toEvent);
  },
};
