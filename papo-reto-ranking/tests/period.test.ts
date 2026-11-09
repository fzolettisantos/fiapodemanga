import { describe, expect, it } from "vitest";
import { getVotingPeriod } from "@/lib/period";

// 2026-11-09 é uma segunda-feira.
describe("getVotingPeriod", () => {
  it("semanal começa na segunda por padrão", () => {
    expect(getVotingPeriod("weekly", new Date("2026-11-12T15:00:00Z")).key).toBe("W2026-11-09");
    expect(getVotingPeriod("weekly", new Date("2026-11-15T23:00:00Z")).key).toBe("W2026-11-09");
  });

  it("usa o fuso de São Paulo na virada do dia", () => {
    // 02:00 UTC de segunda = 23:00 de domingo em São Paulo → ainda é a semana anterior.
    expect(getVotingPeriod("weekly", new Date("2026-11-16T02:00:00Z")).key).toBe("W2026-11-09");
    expect(getVotingPeriod("weekly", new Date("2026-11-16T03:00:00Z")).key).toBe("W2026-11-16");
  });

  it("permite configurar o dia de início da semana", () => {
    expect(getVotingPeriod("weekly", new Date("2026-11-12T15:00:00Z"), { weekStartsOn: 0 }).key).toBe("W2026-11-08");
    expect(getVotingPeriod("weekly", new Date("2026-11-12T15:00:00Z"), { weekStartsOn: 4 }).key).toBe("W2026-11-12");
  });

  it("diário, mensal e permanente", () => {
    const now = new Date("2026-11-12T15:00:00Z");
    expect(getVotingPeriod("daily", now).key).toBe("D2026-11-12");
    expect(getVotingPeriod("monthly", now)).toMatchObject({ key: "M2026-11", label: "Votação de novembro de 2026" });
    expect(getVotingPeriod("all_time", now).key).toBe("ALL");
  });
});
