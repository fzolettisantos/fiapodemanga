import { getSiteType, plans } from "@/lib/proposals/catalog";
import { priceFor } from "@/lib/proposals/pricing";
import type { AcceptInput, Client, PaymentInput, ProposalRecord } from "./types";
import { addMonths, today } from "./util";

/** Dados do cliente criados a partir da proposta aceita. */
export function clientFromProposal(p: ProposalRecord, input: AcceptInput): Omit<Client, "id" | "createdAt"> {
  const type = getSiteType(p.data.siteTypeId);
  const start = today();
  return {
    proposalId: p.id,
    name: p.data.client.name || "Cliente sem nome",
    document: p.data.client.document || null,
    email: p.data.client.email || null,
    phone: p.data.client.phone || null,
    siteType: type?.name ?? p.data.siteTypeId,
    plan: type ? plans[type.plan].name : "",
    period: input.period,
    method: input.method,
    amount: priceFor(p.data, input.period),
    status: "pending",
    startedAt: start,
    fidelityUntil: p.data.fidelityMonths > 0 ? addMonths(start, p.data.fidelityMonths) : null,
    nextDue: start,
    domain: p.data.domain || null,
  };
}

/** Primeira cobrança, gerada no aceite (vence no dia; o pagamento entra pelo Mercado Pago ou manualmente). */
export function firstCharge(client: Omit<Client, "id" | "createdAt">): PaymentInput {
  return { amount: client.amount, dueDate: client.nextDue ?? today(), status: "open", method: client.method };
}
