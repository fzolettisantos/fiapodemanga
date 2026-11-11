import { describe, expect, it } from "vitest";
import { articleCategorySlugs, isArticleCategory } from "@/lib/articles/categories";
import { blocksToPlainText, parseImageUrl, parseMarkdown, readingMinutes, safeUrl, slugify, wordCount } from "@/lib/articles/markdown";
import { seoChecks } from "@/lib/articles/seo-check";
import { demoRepo } from "@/lib/admin/demo-repo";

describe("markdown dos artigos", () => {
  it("converte títulos, parágrafos, listas, citação e imagem", () => {
    const blocks = parseMarkdown(
      "# Seção\n\nPrimeira linha\nsegunda linha.\n\n### Menor\n\n- um\n- dois\n\n1. a\n2. b\n\n> frase\n> — Fulano\n\n![Descrição](https://x.supabase.co/a.webp#1600x900 \"Legenda\")",
    );
    expect(blocks[0]).toEqual({ type: "heading", text: "Seção", level: 2 });
    expect(blocks[1]).toEqual({ type: "paragraph", text: "Primeira linha segunda linha." });
    expect(blocks[2]).toMatchObject({ type: "heading", level: 3 });
    expect(blocks[3]).toEqual({ type: "list", items: ["um", "dois"], ordered: false });
    expect(blocks[4]).toEqual({ type: "list", items: ["a", "b"], ordered: true });
    expect(blocks[5]).toEqual({ type: "quote", text: "frase", cite: "Fulano" });
    expect(blocks[6]).toMatchObject({ type: "image", image: { src: "https://x.supabase.co/a.webp", width: 1600, height: 900, alt: "Descrição", caption: "Legenda" } });
  });

  it("não aceita endereços perigosos", () => {
    expect(safeUrl("javascript:alert(1)")).toBeNull();
    expect(safeUrl("data:text/html,x")).toBeNull();
    expect(safeUrl("//evil.com")).toBeNull();
    expect(safeUrl("/servicos")).toBe("/servicos");
    expect(safeUrl("https://a.com")).toBe("https://a.com");
    expect(parseImageUrl("javascript:alert(1)")).toBeNull();
    // HTML cru vira texto, nunca elemento
    expect(parseMarkdown("<script>alert(1)</script>")[0]).toEqual({ type: "paragraph", text: "<script>alert(1)</script>" });
  });

  it("gera endereço sem acentos e conta palavras", () => {
    expect(slugify("Site para Salão de Beleza: o que precisa ter?")).toBe("site-para-salao-de-beleza-o-que-precisa-ter");
    expect(slugify("  Olá & Bem-vindo!  ")).toBe("ola-e-bem-vindo");
    const b = parseMarkdown("Uma **frase** com [link](/x) e cinco palavras.");
    expect(blocksToPlainText(b)).toBe("Uma frase com link e cinco palavras.");
    expect(wordCount(b)).toBe(7);
    expect(readingMinutes(b)).toBe(1);
  });
});

describe("categorias e checagem de SEO", () => {
  it("categorias válidas", () => {
    expect(articleCategorySlugs).toHaveLength(7);
    expect(isArticleCategory("google-e-seo")).toBe(true);
    expect(isArticleCategory("ux-research")).toBe(false);
  });

  it("pontua boas práticas", () => {
    const body = "Site para salão de beleza é o primeiro passo.\n\n## O que um site para salão de beleza precisa\n\ntexto\n\n## Dois\n\ntexto [a](/x) [b](/y)\n\n## Três\n\nfim";
    const weak = seoChecks({ title: "Dicas", slug: "dicas", summary: "", body: "oi", focusKeyword: "", seoTitle: "", seoDescription: "", coverUrl: "", coverAlt: "" });
    const better = seoChecks({ title: "Site para salão de beleza: o que ter", slug: "site-para-salao", summary: "x".repeat(140), body, focusKeyword: "site para salão de beleza", seoTitle: "", seoDescription: "", coverUrl: "u", coverAlt: "alt" });
    expect(better.score).toBeGreaterThan(weak.score);
    expect(better.checks.find((c) => c.id === "kw-title")?.status).toBe("ok");
    expect(better.checks.find((c) => c.id === "kw-h2")?.status).toBe("ok");
    expect(better.checks.find((c) => c.id === "links")?.status).toBe("ok");
    expect(weak.checks.find((c) => c.id === "kw")?.status).toBe("todo");
  });
});

describe("artigos no modo demonstração", () => {
  it("cria, atualiza, impede endereço repetido e exclui", async () => {
    const base = { slug: "teste-um", title: "Teste", summary: "r", body: "t", category: "sites" as const, authorName: "Eu", status: "draft" as const, publishedAt: null, relatedServices: [] };
    const a = await demoRepo.saveArticle(base, "admin@teste");
    expect(a.id).toBeTruthy();
    await expect(demoRepo.saveArticle({ ...base, title: "Outro" }, "admin@teste")).rejects.toThrow(/endereço/);
    const upd = await demoRepo.saveArticle({ ...base, id: a.id, title: "Teste 2", status: "published", publishedAt: new Date().toISOString() }, "admin@teste");
    expect(upd.id).toBe(a.id);
    expect(upd.title).toBe("Teste 2");
    await demoRepo.deleteArticle(a.id, "admin@teste");
    expect(await demoRepo.getArticle(a.id)).toBeNull();
  });
});
