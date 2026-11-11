import { notFound } from "next/navigation";
import { getRepo } from "@/lib/admin/repo";
import { PageTitle } from "@/components/admin/ui";
import { ArticleEditorLoader } from "../editor-loader";
import { removeArticle } from "../../../actions";

export const metadata = { title: "Editar artigo" };

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getRepo().getArticle(id);
  if (!article) notFound();
  const remove = removeArticle.bind(null, id);
  return (
    <>
      <PageTitle eyebrow="Artigos" title={article.title || "Artigo sem título"} />
      <ArticleEditorLoader article={article} />
      {article.status === "draft" ? (
        <form action={remove} className="mt-16 border-t border-line pt-6">
          <button type="submit" className="link-underline text-sm text-danger">
            Excluir este rascunho
          </button>
          <p className="mt-1 text-xs text-muted">Só rascunhos podem ser excluídos. Artigos no ar precisam ser despublicados antes.</p>
        </form>
      ) : null}
    </>
  );
}
