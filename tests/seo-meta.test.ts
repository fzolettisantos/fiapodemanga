import { describe, expect, it } from "vitest";
import { content } from "@/content/locales";
import { getProjects } from "@/content/projects";
import { locales } from "@/i18n/config";
import { niches } from "@/content/niches";

const SUFFIX = " | Fiapo de Manga";
const MAX_TITLE = 65; // o Google mostra cerca de 60 caracteres; acima de ~65 costuma cortar
const MAX_DESC = 160;
const MIN_DESC = 70;

type Entry = { where: string; title: string; description: string; suffix: boolean };

function entries(): Entry[] {
  const list: Entry[] = [];
  for (const locale of locales) {
    const t = content[locale];
    list.push({ where: `${locale}:home`, title: t.meta.home.title, description: t.meta.home.description, suffix: false });
    for (const key of ["services", "about", "projects", "insights", "contact", "privacy"] as const) {
      list.push({ where: `${locale}:${key}`, title: t.meta[key].title, description: t.meta[key].description, suffix: true });
    }
    for (const s of t.services) list.push({ where: `${locale}:servico:${s.slug}`, title: s.seo.title, description: s.seo.description, suffix: true });
    for (const p of getProjects(locale)) list.push({ where: `${locale}:projeto:${p.slug}`, title: p.seo.title, description: p.seo.description, suffix: true });
  }
  // Páginas só em português: sites por tipo de negócio
  for (const n of niches) list.push({ where: `pt:nicho:${n.slug}`, title: n.title, description: n.description, suffix: true });
  return list;
}

describe("títulos e descrições das páginas (todos os idiomas)", () => {
  it("títulos cabem nos resultados do Google", () => {
    const bad = entries()
      .map((e) => ({ ...e, len: e.title.length + (e.suffix ? SUFFIX.length : 0) }))
      .filter((e) => e.len > MAX_TITLE || e.len < 25);
    expect(bad.map((e) => `${e.where} (${e.len}): ${e.title}`)).toEqual([]);
  });

  it("descrições têm tamanho adequado", () => {
    const bad = entries().filter((e) => e.description.length > MAX_DESC || e.description.length < MIN_DESC);
    expect(bad.map((e) => `${e.where} (${e.description.length})`)).toEqual([]);
  });

  it("não há títulos nem descrições repetidos dentro do mesmo idioma", () => {
    for (const locale of locales) {
      const mine = entries().filter((e) => e.where.startsWith(`${locale}:`));
      const dup = (k: "title" | "description") => mine.map((e) => e[k]).filter((v, i, a) => a.indexOf(v) !== i);
      expect(dup("title")).toEqual([]);
      expect(dup("description")).toEqual([]);
    }
  });
});
