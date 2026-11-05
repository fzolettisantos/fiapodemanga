import { beforeEach, describe, expect, it } from "vitest";
import { __resetRateLimit, rateLimit } from "@/lib/contact/rate-limit";

describe("rateLimit", () => {
  beforeEach(() => __resetRateLimit());
  it("bloqueia após 5 envios na janela", () => {
    const now = 1_000_000;
    for (let i = 0; i < 5; i++) expect(rateLimit("ip", now + i).allowed).toBe(true);
    expect(rateLimit("ip", now + 10).allowed).toBe(false);
    expect(rateLimit("outro-ip", now + 10).allowed).toBe(true);
    expect(rateLimit("ip", now + 11 * 60 * 1000).allowed).toBe(true);
  });
});
