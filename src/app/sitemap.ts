import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { services } from "@/content/services";
import { getProjectsSorted } from "@/content/projects";
import { getArticlesSorted } from "@/content/articles";
import { locales, localizePath } from "@/i18n/config";
import { languageAlternates } from "@/lib/seo/metadata";
import { TAB_SLUGS } from "@/papo-reto/types";

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified?: Date;
};

/** Uma URL por idioma, cada uma com as alternativas (hreflang) dos outros idiomas. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const articles = getArticlesSorted();

  const entries: Entry[] = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/servicos", changeFrequency: "monthly", priority: 0.9 },
    { path: "/sobre", changeFrequency: "yearly", priority: 0.7 },
    { path: "/projetos", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contato", changeFrequency: "yearly", priority: 0.8 },
    { path: "/politica-de-privacidade", changeFrequency: "yearly", priority: 0.2 },
    ...services.map((s) => ({ path: `/servicos/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...getProjectsSorted().map((p) => ({
      path: `/projetos/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      lastModified: new Date(p.publishedAt),
    })),
    ...articles.map((a) => ({
      path: `/insights/${a.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
      lastModified: new Date(a.updatedAt ?? a.publishedAt),
    })),
  ];
  // /insights só entra no sitemap quando houver artigos publicados.
  if (articles.length > 0) entries.push({ path: "/insights", changeFrequency: "weekly", priority: 0.6 });

  const localized = entries.flatMap((entry) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizePath(locale, entry.path)),
      lastModified: entry.lastModified ?? now,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: { languages: languageAlternates(entry.path) },
    })),
  );

  // Papo Reto Ranking: só em português, fora do roteamento de idiomas.
  const papoReto = ["/papo-reto", ...TAB_SLUGS.map((tab) => `/papo-reto/${tab}`)].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "hourly" as const,
    priority: 0.5,
  }));

  return [...localized, ...papoReto];
}
