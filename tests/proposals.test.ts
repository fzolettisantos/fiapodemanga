import { describe, expect, it } from "vitest";
import { siteTypes, plans } from "@/lib/proposals/catalog";
import { contractSections, termRows } from "@/lib/proposals/contract";
import { annualSavings, brl, installment, paymentDescription } from "@/lib/proposals/pricing";
import { decodeProposal, demoProposal, encodeProposal, parseProposal, proposalWarnings } from "@/lib/proposals/proposal";

describe("catálogo", () => {
  it("anual de referência segue 12 por 10 e mensal fica na faixa do plano", () => {
    for (const t of siteTypes) {
      expect(t.annual).toBe(t.monthly * 10);
      const [min, max] = plans[t.plan].monthlyRange;
      expect(t.monthly).toBeGreaterThanOrEqual(min);
      expect(t.monthly).toBeLessThanOrEqual(max);
    }
  });
});

describe("valores", () => {
  it("formata reais e calcula parcelas e economia", () => {
    expect(brl(1090)).toBe("R$ 1.090");
    expect(brl(90.83)).toBe("R$ 90,83");
    expect(installment(1090)).toBe(90.83);
    expect(annualSavings({ monthly: 109, annual: 1090 })).toEqual({ amount: 218, freeMonths: 2 });
    expect(annualSavings({ monthly: 100, annual: 1300 }).amount).toBe(0);
  });

  it("descreve a cobrança conforme periodicidade e forma", () => {
    const p = demoProposal();
    expect(paymentDescription(p, "monthly", "card")).toContain("automática");
    expect(paymentDescription(p, "annual", "card")).toContain("12x de R$ 90,83");
    expect(paymentDescription(p, "annual", "pix")).toContain("à vista");
  });
});

describe("proposta no link", () => {
  it("ida e volta preserva valores alterados e condições especiais (com acentos)", () => {
    const p = { ...demoProposal(), monthly: 79, annual: 750, special: ["Primeiro mês grátis — até dezembro."] };
    expect(decodeProposal(encodeProposal(p))).toEqual(p);
  });

  it("rejeita links adulterados ou inválidos", () => {
    expect(decodeProposal("lixo")).toBeNull();
    expect(decodeProposal(undefined)).toBeNull();
    expect(parseProposal({ ...demoProposal(), siteTypeId: "inexistente" })).toBeNull();
    expect(parseProposal({ ...demoProposal(), monthly: -5 })).toBeNull();
    expect(parseProposal({ ...demoProposal(), periods: [] })).toBeNull();
    expect(parseProposal({ ...demoProposal(), methods: ["bitcoin"] })).toBeNull();
  });

  it("avisa quando o valor sai da referência, sem bloquear", () => {
    const p = { ...demoProposal(), monthly: 50, annual: 700 };
    expect(proposalWarnings(p).join(" ")).toMatch(/abaixo da faixa/);
    expect(proposalWarnings({ ...p, annual: 1000 }).join(" ")).toMatch(/mais caro que 12/);
  });
});

describe("contrato e Termo", () => {
  it("o Termo traz os valores e as condições especiais da proposta", () => {
    const p = { ...demoProposal(), monthly: 79, annual: 790, special: ["Primeiro mês grátis."] };
    const text = termRows(p).map((r) => `${r.label}: ${r.value}`).join("\n");
    expect(text).toContain("R$ 79 por mês");
    expect(text).toContain("R$ 790 por ano");
    expect(text).toContain("Primeiro mês grátis.");
  });

  it("a cláusula de fidelidade segue os números da proposta", () => {
    const clauses = (p: ReturnType<typeof demoProposal>) => contractSections(p).flatMap((s) => s.clauses).join("\n");
    expect(clauses(demoProposal())).toContain("12 meses");
    expect(clauses(demoProposal())).toContain("3 mensalidades");
    expect(clauses({ ...demoProposal(), fidelityMonths: 0 })).toContain("Não há período mínimo");
  });
});
