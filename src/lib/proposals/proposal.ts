import { getSiteType, plans, type SiteType } from "./catalog";

/**
 * Proposta comercial enviada a um cliente.
 *
 * PRÉVIA: por enquanto a proposta viaja inteira no link (`?p=`), sem banco de dados.
 * Na versão final ela será salva no banco e o link levará só um código aleatório,
 * para que o cliente não consiga alterar valores editando a URL.
 */

export type Period = "monthly" | "annual";
export type Method = "card" | "pix" | "boleto";

export const periods: Period[] = ["monthly", "annual"];
export const methods: Method[] = ["card", "pix", "boleto"];

export type Proposal = {
  v: 1;
  client: { name: string; document: string; email: string; phone: string };
  siteTypeId: string;
  /** Valores em reais */
  monthly: number;
  annual: number;
  setup: number;
  setupWaived: boolean;
  /** Periodicidades que o cliente pode escolher */
  periods: Period[];
  /** Formas de pagamento liberadas */
  methods: Method[];
  fidelityMonths: number;
  /** Multa de saída antecipada, em mensalidades */
  exitFeeMonths: number;
  /** Prazo de entrega em dias úteis, após o recebimento do material */
  deliveryDays: number;
  domain: string;
  /** Data limite para aceitar (AAAA-MM-DD) */
  validUntil: string;
  /** Condições especiais combinadas, uma por item */
  special: string[];
};

export const DEFAULT_TYPE_ID = "institucional";

function addDays(days: number, from = new Date()): string {
  const d = new Date(from);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function proposalForType(type: SiteType, base?: Proposal): Proposal {
  return {
    v: 1,
    client: base?.client ?? { name: "", document: "", email: "", phone: "" },
    siteTypeId: type.id,
    monthly: type.monthly,
    annual: type.annual,
    setup: type.setup,
    setupWaived: base?.setupWaived ?? true,
    periods: base?.periods ?? ["monthly", "annual"],
    methods: base?.methods ?? ["card", "pix", "boleto"],
    fidelityMonths: base?.fidelityMonths ?? 12,
    exitFeeMonths: base?.exitFeeMonths ?? 3,
    deliveryDays: base?.deliveryDays ?? 15,
    domain: base?.domain ?? "",
    validUntil: base?.validUntil ?? addDays(7),
    special: base?.special ?? [],
  };
}

/** Proposta de exemplo usada em /proposta/demo. */
export function demoProposal(): Proposal {
  const type = getSiteType(DEFAULT_TYPE_ID)!;
  return {
    ...proposalForType(type),
    client: { name: "Clínica Exemplo", document: "00.000.000/0001-00", email: "contato@exemplo.com.br", phone: "(13) 90000-0000" },
    domain: "clinicaexemplo.com.br",
    special: ["Primeiro mês grátis."],
  };
}

/* ------------------------------------------------------------------ */
/* Validação: tudo que vem do link é tratado como entrada não confiável */
/* ------------------------------------------------------------------ */

const str = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");
const money = (value: unknown) => {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) && n >= 0 && n <= 1_000_000 ? Math.round(n * 100) / 100 : null;
};
const int = (value: unknown, min: number, max: number) => {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isInteger(n) && n >= min && n <= max ? n : null;
};

export function parseProposal(input: unknown): Proposal | null {
  if (!input || typeof input !== "object") return null;
  const raw = input as Record<string, unknown>;
  const client = (raw.client ?? {}) as Record<string, unknown>;
  const type = getSiteType(str(raw.siteTypeId, 60));
  const monthly = money(raw.monthly);
  const annual = money(raw.annual);
  const setup = money(raw.setup);
  const chosenPeriods = Array.isArray(raw.periods) ? periods.filter((p) => (raw.periods as unknown[]).includes(p)) : [];
  const chosenMethods = Array.isArray(raw.methods) ? methods.filter((m) => (raw.methods as unknown[]).includes(m)) : [];
  const fidelityMonths = int(raw.fidelityMonths, 0, 60);
  const exitFeeMonths = int(raw.exitFeeMonths, 0, 12);
  const deliveryDays = int(raw.deliveryDays, 1, 365);
  const validUntil = str(raw.validUntil, 10);

  if (!type || monthly === null || annual === null || setup === null) return null;
  if (fidelityMonths === null || exitFeeMonths === null || deliveryDays === null) return null;
  if (!chosenPeriods.length || !chosenMethods.length) return null;
  if (chosenPeriods.includes("monthly") && monthly <= 0) return null;
  if (chosenPeriods.includes("annual") && annual <= 0) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(validUntil)) return null;

  return {
    v: 1,
    client: {
      name: str(client.name, 120),
      document: str(client.document, 20),
      email: str(client.email, 160),
      phone: str(client.phone, 30),
    },
    siteTypeId: type.id,
    monthly,
    annual,
    setup,
    setupWaived: raw.setupWaived !== false,
    periods: chosenPeriods,
    methods: chosenMethods,
    fidelityMonths,
    exitFeeMonths,
    deliveryDays,
    domain: str(raw.domain, 120),
    validUntil,
    special: Array.isArray(raw.special)
      ? raw.special.map((s) => str(s, 300)).filter(Boolean).slice(0, 10)
      : [],
  };
}

/* ------------------------------------------------------------------ */
/* Link da prévia: JSON → base64url (UTF-8)                            */
/* ------------------------------------------------------------------ */

export function encodeProposal(proposal: Proposal): string {
  const bytes = new TextEncoder().encode(JSON.stringify(proposal));
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeProposal(token: string | undefined | null): Proposal | null {
  if (!token || token.length > 8000) return null;
  try {
    const b64 = token.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return parseProposal(JSON.parse(new TextDecoder().decode(bytes)));
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Avisos para o painel (não bloqueiam: o valor final é decisão sua)   */
/* ------------------------------------------------------------------ */

export function proposalWarnings(p: Proposal): string[] {
  const type = getSiteType(p.siteTypeId);
  const warnings: string[] = [];
  if (!type) return warnings;
  const [min, max] = plans[type.plan].monthlyRange;
  if (p.periods.includes("monthly") && p.monthly < min) warnings.push(`Mensal abaixo da faixa de referência do plano (R$ ${min} a ${max}).`);
  if (p.periods.includes("monthly") && p.monthly > max) warnings.push(`Mensal acima da faixa de referência do plano (R$ ${min} a ${max}).`);
  if (p.periods.includes("annual") && p.periods.includes("monthly") && p.annual > p.monthly * 12)
    warnings.push("O anual está mais caro que 12 mensalidades.");
  if (p.validUntil < new Date().toISOString().slice(0, 10)) warnings.push("A validade da proposta já passou.");
  return warnings;
}
