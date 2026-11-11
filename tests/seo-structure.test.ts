import { describe, expect, it } from "vitest";
import { niches } from "@/content/niches";
import { generalFaqs, homeFaqs, serviceFaqs } from "@/content/faq";
import { getSiteType } from "@/lib/proposals/catalog";
import { isPtOnlyPath, languageAlternates } from "@/lib/seo/metadata";
import { services } from "@/content/services";

describe("páginas por tipo de negócio", () => {
  it("têm conteúdo próprio e formato válido", () => {
    expect(new Set(niches.map((n) => n.slug)).size).toBe(niches.length);
    for (const n of niches) {
      expect(getSiteType(n.siteTypeId), n.slug).toBeTruthy();
      expect(n.features).toHaveLength(6);
      expect(n.faqs).toHaveLength(3);
      expect(n.intro).toHaveLength(2);
      expect(n.h1.toLowerCase(), n.slug).toContain(n.name.split(" ")[0]!.toLowerCase());
    }
    // sem texto repetido entre páginas
    const intros = niches.flatMap((n) => n.intro);
    expect(new Set(intros).size).toBe(intros.length);
  });

  it("não prometem posição no Google nem trazem preços", () => {
    const raw = JSON.stringify([niches, generalFaqs, serviceFaqs]).toLowerCase();
    // frases que NEGAM a promessa ("ninguém pode garantir o primeiro lugar") são desejadas
    const promises = raw.split(/[.!?]/).filter((sentence) => !/(ninguém|não|nem|sem)\b/.test(sentence));
    const all = promises.join(". ");
    expect(all).not.toMatch(/primeir[oa] (lugar|posi)/);
    expect(all).not.toMatch(/garant\w+ (o )?(primeiro|1º|topo)/);
    expect(raw).not.toMatch(/r\$\s?\d/);
  });

  it("a Home usa perguntas da lista geral e os serviços têm perguntas próprias", () => {
    for (const f of homeFaqs) expect(generalFaqs).toContain(f);
    for (const slug of ["criacao-de-sites", "ecommerce", "aplicativos-sistemas-plataformas", "design-tecnologia-ia"]) {
      expect(serviceFaqs[slug]?.length, slug).toBeGreaterThanOrEqual(4);
      expect(services.some((s) => s.slug === slug)).toBe(true);
    }
  });
});

describe("idiomas (hreflang)", () => {
  it("páginas só em português não declaram outros idiomas", () => {
    expect(isPtOnlyPath("/site-para/barbearia")).toBe(true);
    expect(isPtOnlyPath("/insights/qualquer")).toBe(true);
    expect(isPtOnlyPath("/servicos")).toBe(false);
    expect(Object.keys(languageAlternates("/site-para/barbearia", "pt"))).toEqual(["pt-BR", "x-default"]);
  });

  it("páginas com foco diferente por idioma não se declaram equivalentes", () => {
    expect(Object.keys(languageAlternates("/", "pt"))).toEqual(["pt-BR", "x-default"]);
    expect(Object.keys(languageAlternates("/", "en"))).toEqual(["en", "es", "x-default"]);
    expect(languageAlternates("/", "es")["x-default"]).toContain("/en");
  });

  it("páginas traduzidas mantêm os três idiomas", () => {
    expect(Object.keys(languageAlternates("/politica-de-privacidade", "pt"))).toEqual(["pt-BR", "en", "es", "x-default"]);
  });
});
