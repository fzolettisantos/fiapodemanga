import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { services } from "@/content/services";
import { niches } from "@/content/niches";
import { getProjectsSorted } from "@/content/projects";
import { articleCategorySlugs } from "@/lib/articles/categories";
import { getPublishedArticles } from "@/lib/articles/public";
import { locales, localizePath, type Locale } from "@/i18n/config";
import { isPtOnlyPath, languageAlternates } from "@/lib/seo/metadata";

export const revalidate = 3600;

type Entry = { path: string; lastModified?: Date };

/**
 * Sitemap com uma URL por idioma e as alternativas (hreflang) corretas.
 * `lastmod` só aparece quando é a data real do conteúdo (artigos e cases); nas demais páginas fica de fora,
 * porque informar "agora" em tudo faz o Google ignorar o campo.
 * Páginas só em português (nichos, perguntas, blog) não entram em inglês/espanhol.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublishedArticles();

  const entries: Entry[] = [
    { path: "/" },
    { path: "/servicos" },
    { path: "/sobre" },
    { path: "/projetos" },
    { path: "/contato" },
    { path: "/politica-de-privacidade" },
    { path: "/perguntas-frequentes" },
    { path: "/site-para" },
    ...niches.map((n) => ({ path: `/site-para/${n.slug}` })),
    ...services.map((s) => ({ path: `/servicos/${s.slug}` })),
    ...getProjectsSorted().map((p) => ({ path: `/projetos/${p.slug}`, lastModified: new Date(p.publishedAt) })),
  ];
  // Blog: só entra quando houver artigos publicados.
  if (articles.length > 0) {
    entries.push({ path: "/insights", lastModified: new Date(articles[0]!.updatedAt ?? articles[0]!.publishedAt) });
    for (const slug of articleCategorySlugs) {
      const inCategory = articles.filter((a) => a.category === slug);
      if (inCategory.length) entries.push({ path: `/insights/categoria/${slug}`, lastModified: new Date(inCategory[0]!.updatedAt ?? inCategory[0]!.publishedAt) });
    }
    for (const a of articles) entries.push({ path: `/insights/${a.slug}`, lastModified: new Date(a.updatedAt ?? a.publishedAt) });
  }

  return entries.flatMap((entry) => {
    const available: Locale[] = isPtOnlyPath(entry.path) ? ["pt"] : [...locales];
    return available.map((locale) => ({
      url: absoluteUrl(localizePath(locale, entry.path)),
      ...(entry.lastModified ? { lastModified: entry.lastModified } : {}),
      alternates: { languages: languageAlternates(entry.path, locale) },
    }));
  });
}
