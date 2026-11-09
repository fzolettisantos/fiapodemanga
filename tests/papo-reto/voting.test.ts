import { beforeEach, describe, expect, it } from "vitest";
import { __resetRateLimit, rateLimit } from "@/papo-reto/lib/rate-limit";
import { parseVoteRequest } from "@/papo-reto/lib/validation";
import { __resetDemoStore, demoCastVote, demoMyVote, demoTotals } from "@/papo-reto/lib/server/demo-store";

const base = { slug: "falou-merda" as const, periodKey: "W2026-11-09", ipHash: "ip1", ipLimit: 3 };

describe("votação (modo demonstração, mesma regra do banco)", () => {
  beforeEach(() => __resetDemoStore());

  it("registra o voto e soma no placar", () => {
    const before = demoTotals("falou-merda", base.periodKey)["joneta"]!;
    expect(demoCastVote({ ...base, participantId: "joneta", voterKey: "v1" })).toBe("ok");
    expect(demoTotals("falou-merda", base.periodKey)["joneta"]).toBe(before + 1);
    expect(demoMyVote("falou-merda", base.periodKey, "v1")).toBe("joneta");
  });

  it("bloqueia voto duplicado no mesmo ranking e período", () => {
    expect(demoCastVote({ ...base, participantId: "benja", voterKey: "v1" })).toBe("ok");
    expect(demoCastVote({ ...base, participantId: "mano", voterKey: "v1" })).toBe("duplicate");
  });

  it("permite votar em outro ranking e no período seguinte", () => {
    expect(demoCastVote({ ...base, participantId: "benja", voterKey: "v1" })).toBe("ok");
    expect(demoCastVote({ ...base, slug: "sabio", participantId: "benja", voterKey: "v1" })).toBe("ok");
    expect(demoCastVote({ ...base, periodKey: "W2026-11-16", participantId: "benja", voterKey: "v1" })).toBe("ok");
  });

  it("limita votos por IP no período (troca de cookie não burla)", () => {
    for (const v of ["a", "b", "c"]) expect(demoCastVote({ ...base, participantId: "benja", voterKey: v })).toBe("ok");
    expect(demoCastVote({ ...base, participantId: "benja", voterKey: "d" })).toBe("ip_limit");
  });

  it("rejeita participante inexistente", () => {
    expect(demoCastVote({ ...base, participantId: "nao-existe", voterKey: "v1" })).toBe("invalid");
  });
});

describe("validação da requisição", () => {
  it("aceita só rankings e IDs válidos", () => {
    expect(parseVoteRequest({ ranking: "sabio", participantId: "benja" })).toEqual({ ranking: "sabio", participantId: "benja" });
    expect(parseVoteRequest({ ranking: "charges", participantId: "benja" })).toBeNull();
    expect(parseVoteRequest({ ranking: "sabio", participantId: "x'; drop table votes;--" })).toBeNull();
    expect(parseVoteRequest(null)).toBeNull();
  });
});

describe("rate limit", () => {
  beforeEach(() => __resetRateLimit());
  it("bloqueia rajadas e libera após a janela", () => {
    const opts = { limit: 2, windowMs: 1000 };
    expect(rateLimit("ip", opts, 0).allowed).toBe(true);
    expect(rateLimit("ip", opts, 10).allowed).toBe(true);
    expect(rateLimit("ip", opts, 20)).toEqual({ allowed: false, retryAfterSeconds: 1 });
    expect(rateLimit("ip", opts, 1001).allowed).toBe(true);
  });
});
