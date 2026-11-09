import { describe, expect, it } from "vitest";
import { pickPhrase, RANKINGS } from "@/papo-reto/config/rankings";
import { placeholderMood, resolveCharacterImage } from "@/papo-reto/lib/characters";
import { participantHeadline, rankingShareText, whatsappUrl } from "@/papo-reto/lib/share";
import type { RankingResults } from "@/papo-reto/types";
import { rank } from "./helpers";

const results = (votes: Record<string, number>, isDemo = false): RankingResults => {
  const entries = rank(votes);
  return {
    slug: "falou-merda",
    mode: "vote",
    active: true,
    period: { kind: "weekly", key: "W", label: "" },
    totalVotes: entries.reduce((s, e) => s + e.votes, 0),
    entries,
    isDemo,
    updatedAt: "",
  };
};

describe("compartilhamento", () => {
  it("só afirma o líder com votos reais", () => {
    expect(rankingShareText("falou-merda", results({ benja: 9, b: 1 }))).toContain("BENJA LIDERA O TROFÉU FALOU MERDA");
    expect(rankingShareText("falou-merda", results({ benja: 9, b: 1 }, true))).not.toContain("LIDERA");
    expect(rankingShareText("falou-merda", results({ benja: 0, b: 0 }))).not.toContain("LIDERA");
    expect(rankingShareText("falou-merda", results({ benja: 3, b: 3 }))).toContain("Empate");
  });

  it("manchete do card coerente com a posição", () => {
    const r = results({ benja: 9, b: 4, c: 1 });
    expect(participantHeadline("falou-merda", r.entries[0]!, r)).toBe("BENJA LIDERA O TROFÉU FALOU MERDA. O POVO NÃO PERDOOU!");
    expect(participantHeadline("falou-merda", r.entries[1]!, r)).toBe("B ESTÁ EM 2º NO TROFÉU FALOU MERDA.");
  });

  it("monta o link do WhatsApp", () => {
    expect(whatsappUrl("Oi já", "https://x.com/a")).toBe("https://wa.me/?text=Oi%20j%C3%A1%20https%3A%2F%2Fx.com%2Fa");
  });
});

describe("caricaturas", () => {
  it("usa a expressão exata cadastrada e nunca outra", () => {
    const sources = { "falou-merda": { top: "https://x/top.webp" } };
    expect(resolveCharacterImage("benja", "falou-merda", "top", sources)).toBe("https://x/top.webp");
    expect(resolveCharacterImage("benja", "falou-merda", "bottom", sources)).toBeNull();
    expect(resolveCharacterImage("benja", "sabio", "top", sources)).toBeNull();
  });

  it("placeholder segue a lógica de cada ranking", () => {
    expect(placeholderMood("falou-merda", "top")).toBe("scared");
    expect(placeholderMood("falou-merda", "bottom")).toBe("smiling");
    expect(placeholderMood("sabio", "top")).toBe("proud");
    expect(placeholderMood("sabio", "bottom")).toBe("confused");
    expect(placeholderMood("bala-do-veio", "top")).toBe("terrified");
    expect(placeholderMood("bala-do-veio", "bottom")).toBe("relieved");
  });

  it("frases são estáveis e pertencem ao estado", () => {
    const phrase = pickPhrase("sabio", "top", "benja");
    expect(pickPhrase("sabio", "top", "benja")).toBe(phrase);
    expect(RANKINGS.sabio.phrases.top).toContain(phrase);
  });
});
