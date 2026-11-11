import type { Method, Period, Proposal } from "./proposal";

const brlFormat = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** R$ 1.290,00 → "R$ 1.290" quando não há centavos. */
export function brl(value: number): string {
  const text = brlFormat.format(value).replace(/ /g, " ");
  return Number.isInteger(value) ? text.replace(/,00$/, "") : text;
}

export const MAX_INSTALLMENTS = 12;

export function installment(annual: number, parts = MAX_INSTALLMENTS): number {
  return Math.round((annual / parts) * 100) / 100;
}

/** Quanto o anual economiza em relação a 12 mensalidades. */
export function annualSavings(p: Pick<Proposal, "monthly" | "annual">): { amount: number; freeMonths: number } {
  const amount = Math.max(0, Math.round((p.monthly * 12 - p.annual) * 100) / 100);
  const freeMonths = p.monthly > 0 ? Math.floor(amount / p.monthly + 1e-9) : 0;
  return { amount, freeMonths };
}

export const periodLabel: Record<Period, string> = { monthly: "Mensal", annual: "Anual" };
export const methodLabel: Record<Method, string> = { card: "Cartão de crédito", pix: "Pix", boleto: "Boleto" };

/** Como a cobrança acontece para cada combinação escolhida. */
export function paymentDescription(p: Proposal, period: Period, method: Method): string {
  if (period === "monthly") {
    if (method === "card") return `Cobrança automática de ${brl(p.monthly)} todo mês no cartão.`;
    return `Você recebe por e-mail uma cobrança de ${brl(p.monthly)} por ${method === "pix" ? "Pix" : "boleto"} todo mês, sempre no mesmo dia.`;
  }
  if (method === "card") return `${brl(p.annual)} em até ${MAX_INSTALLMENTS}x de ${brl(installment(p.annual))} sem juros.`;
  return `${brl(p.annual)} à vista por ${method === "pix" ? "Pix" : "boleto"}, uma vez por ano.`;
}

export function priceFor(p: Proposal, period: Period): number {
  return period === "monthly" ? p.monthly : p.annual;
}
