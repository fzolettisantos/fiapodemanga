import { isLiveConfigured } from "@/lib/admin/env";
import type { ArticleRecord } from "@/lib/admin/types";
import { ArticleEditor, type EditorArticle } from "@/components/admin/ArticleEditor";
import { services } from "@/content/services";
import { siteConfig } from "@/config/site";
import { ptListedServices } from "@/content/services";
import { saveArticle, uploadArticleImage } from "../../actions";

const blank: EditorArticle = {
  title: "",
  slug: "",
  summary: "",
  body: "",
  category: "negocios",
  coverUrl: "",
  coverAlt: "",
  authorName: "Fiapo de Manga",
  status: "draft",
  publishedAt: "",
  seoTitle: "",
  seoDescription: "",
  focusKeyword: "",
  relatedServices: [],
};

export function toEditor(a: ArticleRecord): EditorArticle {
  return {
    id: a.id,
    title: a.title,
    slug: a.slug,
    summary: a.summary,
    body: a.body,
    category: a.category,
    coverUrl: a.coverUrl ?? "",
    coverAlt: a.coverAlt ?? "",
    authorName: a.authorName,
    status: a.status,
    publishedAt: a.publishedAt ?? "",
    seoTitle: a.seoTitle ?? "",
    seoDescription: a.seoDescription ?? "",
    focusKeyword: a.focusKeyword ?? "",
    relatedServices: a.relatedServices,
  };
}

/** Editor de artigo com os serviços do site (em português) e o envio de imagens. */
export function ArticleEditorLoader({ article }: { article?: ArticleRecord }) {
  const options = services
    .filter((s) => (ptListedServices as readonly string[]).includes(s.slug))
    .map((s) => ({ slug: s.slug, name: s.name }));
  return (
    <ArticleEditor
      key={article?.id ?? "novo"}
      initial={article ? toEditor(article) : blank}
      services={options}
      canUpload={isLiveConfigured()}
      onSave={saveArticle}
      onUpload={uploadArticleImage}
      siteUrl={siteConfig.url}
    />
  );
}
