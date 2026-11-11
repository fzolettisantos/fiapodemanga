import { describe, expect, it } from "vitest";
import { demoRepo } from "@/lib/admin/demo-repo";
import { reportRows, reportTotals } from "@/lib/admin/report";
import type { Client, Payment } from "@/lib/admin/types";
import { addMonths, clientSituation, daysLate, proposalCode, toCsv } from "@/lib/admin/util";
import { demoProposal } from "@/lib/proposals/proposal";

const client = (over: Partial<Client> = {}): Client => ({
  id: "c1", name: "Cliente", siteType: "Site", plan: "Vitrine", period: "monthly", method: "pix", amount: 100,
  status: "active", createdAt: "2026-01-01T00:00:00Z", ...over,
});
const pay = (over: Partial<Payment> = {}): Payment => ({
  id: crypto.randomUUID(), clientId: "c1", amount: 100, dueDate: "2026-11-01", status: "open", createdAt: "2026-11-01T00:00:00Z", ...over,
});

describe("utilidades do admin", () => {
  it("soma meses respeitando o fim do mês", () => {
    expect(addMonths("2026-01-31", 1)).toBe("2026-02-28");
    expect(addMonths("2026-11-11", 12)).toBe("2027-11-11");
  });

  it("gera códigos de proposta aleatórios e legíveis", () => {
    const a = proposalCode();
    expect(a).toMatch(/^[a-z2-9]{10}$/);
    expect(proposalCode()).not.toBe(a);
  });

  it("calcula atraso e a situação pela régua de cobrança", () => {
    const ref = "2026-11-20";
    expect(daysLate(pay({ dueDate: "2026-11-10" }), ref)).toBe(10);
    expect(daysLate(pay({ dueDate: "2026-11-10", status: "paid" }), ref)).toBe(0);
    expect(clientSituation(client(), [pay({ dueDate: "2026-11-25" })], ref).label).toBe("Em dia");
    expect(clientSituation(client(), [pay({ dueDate: "2026-11-15" })], ref).tone).toBe("warn");
    expect(clientSituation(client(), [pay({ dueDate: "2026-11-10" })], ref).label).toMatch(/aviso formal/);
    expect(clientSituation(client(), [pay({ dueDate: "2026-11-05" })], ref).label).toMatch(/suspender/);
    expect(clientSituation(client(), [pay({ dueDate: "2026-09-01" })], ref).label).toMatch(/rescisão/);
  });

  it("CSV abre no Excel (BOM, ponto e vírgula, aspas escapadas)", () => {
    const csv = toCsv([["Nome", "Obs"], ["Zé; Cia", 'disse "oi"']]);
    expect(csv.startsWith("﻿")).toBe(true);
    expect(csv).toContain('"Zé; Cia";"disse ""oi"""');
  });

  it("relatório filtra por mês e situação e soma os totais", () => {
    const ps = [pay({ dueDate: "2026-11-01", status: "paid", paidAt: "2026-11-01T10:00:00Z" }), pay({ dueDate: "2026-11-05" }), pay({ dueDate: "2026-10-01" })];
    const rows = reportRows(ps, [client()], { month: "2026-11" }, "2026-11-20");
    expect(rows).toHaveLength(2);
    expect(reportTotals(rows)).toMatchObject({ paid: 100, late: 100 });
    expect(reportRows(ps, [client()], { situation: "late" }, "2026-11-20")).toHaveLength(2);
  });
});

describe("fluxo da proposta (modo demonstração)", () => {
  it("cria, abre e aceita: gera cliente, cobrança e histórico com a prova do aceite", async () => {
    const rec = await demoRepo.createProposal({ ...demoProposal(), monthly: 79, annual: 790 }, "admin@teste");
    expect(await demoRepo.getProposalByCode(rec.code)).not.toBeNull();
    await demoRepo.markOpened(rec);
    expect(rec.status).toBe("opened");
    const { client: c, acceptance } = await demoRepo.acceptProposal(rec, {
      period: "annual", method: "card", ip: "1.2.3.4", userAgent: "teste", contractVersion: "v-teste", terms: [{ label: "Valor", value: "R$ 790" }], contract: [],
    });
    expect(rec.status).toBe("accepted");
    expect(c.amount).toBe(790);
    expect(c.status).toBe("pending");
    expect(acceptance.ip).toBe("1.2.3.4");
    const payments = await demoRepo.listPayments({ clientId: c.id });
    expect(payments).toHaveLength(1);
    const events = await demoRepo.listEvents({ proposalId: rec.id });
    expect(events.map((e) => e.type)).toEqual(expect.arrayContaining(["proposal.created", "proposal.opened", "proposal.accepted"]));
    await demoRepo.addPayment(c.id, { amount: 790, dueDate: payments[0]!.dueDate, status: "paid", method: "card", paidAt: new Date().toISOString() }, "admin@teste");
    expect((await demoRepo.listEvents({ clientId: c.id })).some((e) => e.type === "payment.registered" && e.actor === "admin@teste")).toBe(true);
  });
});
