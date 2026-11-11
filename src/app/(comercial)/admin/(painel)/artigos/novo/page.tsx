import { PageTitle } from "@/components/admin/ui";
import { ArticleEditorLoader } from "../editor-loader";

export const metadata = { title: "Novo artigo" };

export default async function NewArticlePage() {
  return (
    <>
      <PageTitle eyebrow="Artigos" title="Novo artigo" />
      <ArticleEditorLoader />
    </>
  );
}
