import "server-only";
import { unstable_cache } from "next/cache";
import { articles as codeArticles } from "@/content/articles";
import { isLiveConfigured } from "@/lib/admin/env";
import { publicDb, toArticle } from "@/lib/admin/supabase-repo";
import type { ArticleRecord } from "@/lib/admin/types";
import type { Article } from "@/types/content";
import { parseMarkdown, parseImageUrl } from "./markdown";

/** Convertemos o artigo guardado (Markdown) no formato que as páginas e o JSON-LD usam. */
export function recordToArticle(r: ArticleRecord): Article {
  const cover = r.coverUrl ? parseImageUrl(r.coverUrl) : null;
  const iso = (r.publishedAt ?? r.updatedAt).slice(0, 10);
  return {
    title: r.title,
    slug: r.slug,
    summary: r.summary,
    author: { name: r.authorName },
    publishedAt: iso,
    updatedAt: r.updatedAt.slice(0, 10) !== iso ? r.updatedAt.slice(0, 10) : undefined,
    category: r.category,
    content: parseMarkdown(r.body),
    image: cover ? { src: cover.src, alt: r.coverAlt ?? r.title, width: cover.width, height: cover.height } : undefined,
    seo: { title: r.seoTitle || r.title, description: r.seoDescription || r.summary },
    relatedServices: r.relatedServices,
  };
}

/** Artigos no ar: publicados e com a data de publicação já alcançada. Atualizado a cada 5 minutos ou ao publicar. */
const readPublished = unstable_cache(
  async (): Promise<ArticleRecord[]> => {
    if (!isLiveConfigured()) return [];
    try {
      const { data, error } = await publicDb()
        .from("articles")
        .select("*")
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .order("published_at", { ascending: false });
      if (error) return [];
      return (data as Record<string, unknown>[]).map(toArticle);
    } catch {
      return [];
    }
  },
  ["published-articles"],
  { revalidate: 300, tags: ["articles"] },
);

export async function getPublishedArticles(category?: string): Promise<Article[]> {
  const fromDb = (await readPublished()).map(recordToArticle);
  const all = [...fromDb, ...codeArticles];
  return all.filter((a) => (category ? a.category === category : true)).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPublishedArticle(slug: string): Promise<Article | null> {
  return (await getPublishedArticles()).find((a) => a.slug === slug) ?? null;
}
