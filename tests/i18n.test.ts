import { describe, expect, it } from "vitest";
import { localizePath, splitLocale } from "@/i18n/config";
import { content } from "@/content/locales";
import { validateContact } from "@/lib/contact/validation";

describe("i18n — caminhos", () => {
  it("prefixa apenas EN e ES", () => {
    expect(localizePath("pt", "/servicos")).toBe("/servicos");
    expect(localizePath("en", "/servicos")).toBe("/en/servicos");
    expect(localizePath("es", "/")).toBe("/es");
    expect(localizePath("en", "/contato?tipo=site")).toBe("/en/contato?tipo=site");
    expect(localizePath("en", "https://exemplo.com")).toBe("https://exemplo.com");
  });

  it("remove o idioma do caminho, inclusive o interno /pt", () => {
    expect(splitLocale("/en/servicos/ecommerce")).toEqual({ locale: "en", path: "/servicos/ecommerce" });
    expect(splitLocale("/es")).toEqual({ locale: "es", path: "/" });
    expect(splitLocale("/pt/sobre")).toEqual({ locale: "pt", path: "/sobre" });
    expect(splitLocale("/sobre")).toEqual({ locale: "pt", path: "/sobre" });
  });
});

describe("i18n — conteúdo", () => {
  it("as especialidades têm os mesmos slugs e a mesma ordem nos três idiomas", () => {
    const slugs = content.pt.services.map((s) => s.slug);
    expect(content.en.services.map((s) => s.slug)).toEqual(slugs);
    expect(content.es.services.map((s) => s.slug)).toEqual(slugs);
  });

  it("EN e ES não repetem o texto em português nos títulos principais", () => {
    for (const locale of ["en", "es"] as const) {
      expect(content[locale].home.hero.title).not.toBe(content.pt.home.hero.title);
      content[locale].services.forEach((s, i) => expect(s.seo.description).not.toBe(content.pt.services[i]!.seo.description));
    }
  });

  it("a vitrine de projetos tem textos nos três idiomas", () => {
    const keys = Object.keys(content.pt.showcase).sort();
    expect(Object.keys(content.en.showcase).sort()).toEqual(keys);
    expect(Object.keys(content.es.showcase).sort()).toEqual(keys);
  });

  it("validação usa as mensagens do idioma", () => {
    const r = validateContact({}, content.en.validation);
    expect(r.success).toBe(false);
    if (!r.success) expect(r.errors.name).toBe("Please enter your name.");
  });
});
