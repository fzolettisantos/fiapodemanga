import { describe, expect, it } from "vitest";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { articles } from "@/content/articles";

describe("conteúdo", () => {
  it("possui as 7 especialidades com slugs do briefing", () => {
    expect(services.map((s) => s.slug)).toEqual([
      "pesquisa-ux-discovery",
      "estrategia-de-produto",
      "product-design-ux-ui",
      "criacao-de-sites",
      "aplicativos-sistemas-plataformas",
      "ecommerce",
      "design-tecnologia-ia",
    ]);
  });

  it("especialidades relacionadas apontam para slugs existentes", () => {
    const slugs = new Set(services.map((s) => s.slug));
    for (const s of services) {
      for (const r of s.page.related) expect(slugs.has(r)).toBe(true);
      expect(s.page.related).not.toContain(s.slug);
    }
  });

  it("títulos e descrições de SEO são únicos", () => {
    const titles = services.map((s) => s.seo.title);
    const descriptions = services.map((s) => s.seo.description);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
    for (const d of descriptions) expect(d.length).toBeLessThanOrEqual(170);
  });

  it("slugs de cases e artigos são únicos", () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
    expect(new Set(articles.map((a) => a.slug)).size).toBe(articles.length);
  });
});
