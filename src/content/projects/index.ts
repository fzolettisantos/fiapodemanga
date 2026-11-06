import type { Project } from "@/types/content";
import { defaultLocale, type Locale } from "@/i18n/config";
import { gedAi } from "./ged-ai";

/**
 * Cases publicados (página completa em /projetos/<slug>), por idioma.
 *
 * IMPORTANTE: cadastre somente projetos reais, com autorização do cliente
 * para divulgação de nome, imagens e resultados. Não invente cases.
 *
 * Para publicar um case:
 *  1. Copie `src/content/projects/_template.ts` (ou `ged-ai.ts`) para `src/content/projects/<slug>.ts`.
 *  2. Preencha os textos em pt, en e es com informações reais.
 *  3. Adicione o case às listas abaixo.
 *  4. Coloque as imagens autorizadas em `public/images/projetos/<slug>/`
 *     (telas: `python3 scripts/prepare-case-screens.py`).
 *  5. Em `showcase.ts`, informe `caseSlug` no item da vitrine para ligar o slide ao case.
 */
const byLocale: Record<Locale, Project[]> = {
  pt: [gedAi.pt],
  en: [gedAi.en],
  es: [gedAi.es],
};

export const projects: Project[] = byLocale[defaultLocale];

export function getProjects(locale: Locale = defaultLocale): Project[] {
  return byLocale[locale];
}

export function getProject(slug: string, locale: Locale = defaultLocale): Project | undefined {
  return byLocale[locale].find((project) => project.slug === slug);
}

export function getProjectsSorted(locale: Locale = defaultLocale): Project[] {
  return [...byLocale[locale]].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
