import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { services } from "@/content/services";
import { getProjectsSorted } from "@/content/projects";
import { getArticlesSorted } from "@/content/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const articles = getArticlesSorted();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/servicos"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/sobre"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/projetos"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/contato"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: absoluteUrl("/politica-de-privacidade"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  // /insights só entra no sitemap quando houver artigos publicados.
  if (articles.length > 0) {
    staticRoutes.push({ url: absoluteUrl("/insights"), lastModified: now, changeFrequency: "weekly", priority: 0.6 });
  }

  return [
    ...staticRoutes,
    ...services.map((s) => ({
      url: absoluteUrl(`/servicos/${s.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getProjectsSorted().map((p) => ({
      url: absoluteUrl(`/projetos/${p.slug}`),
      lastModified: new Date(p.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...articles.map((a) => ({
      url: absoluteUrl(`/insights/${a.slug}`),
      lastModified: new Date(a.updatedAt ?? a.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
