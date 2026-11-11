import { notFound } from "next/navigation";
import { getRepo } from "@/lib/admin/repo";
import { ArticleView } from "@/components/articles/ArticleView";
import { articleCategoryInfo } from "@/lib/articles/categories";
import { recordToArticle } from "@/lib/articles/public";

export const metadata = { title: "Pré-visualização do artigo", robots: { index: false, follow: false } };

/** Como o artigo vai ficar no site (mesmo componente da página pública). Só para quem está logado. */
export default async function ArticlePreview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = await getRepo().getArticle(id);
  if (!record) notFound();
  const article = recordToArticle({ ...record, publishedAt: record.publishedAt ?? new Date().toISOString() });
  return (
    <>
      <p role="note" className="mb-8 rounded-sm border border-line-strong px-4 py-3 text-sm text-muted">
        <strong className="text-heading">Pré-visualização.</strong> {record.status === "published" ? "Este artigo está publicado." : "Rascunho: ainda não está no site."}
      </p>
      <article className="pb-10">
        <ArticleView
          article={article}
          categoryLabel={articleCategoryInfo[record.category]?.name ?? record.category}
          dateLabel={new Date(article.publishedAt + "T00:00:00Z").toLocaleDateString("pt-BR", { dateStyle: "long", timeZone: "UTC" })}
        />
      </article>
    </>
  );
}
