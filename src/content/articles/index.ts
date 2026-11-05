import type { Article, ArticleCategory } from "@/types/content";

/**
 * Artigos publicados em /insights.
 *
 * IMPORTANTE: não publique artigos fictícios ou de preenchimento.
 *
 * Para publicar:
 *  1. Copie `src/content/articles/_template.ts` para `src/content/articles/<slug>.ts`.
 *  2. Escreva o conteúdo em blocos (parágrafo, título, lista, citação, imagem).
 *  3. Importe aqui e adicione ao array `articles`.
 */
export const articles: Article[] = [];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesSorted(category?: ArticleCategory): Article[] {
  return [...articles]
    .filter((a) => (category ? a.category === category : true))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
