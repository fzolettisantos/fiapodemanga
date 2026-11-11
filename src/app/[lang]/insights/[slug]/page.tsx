import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { getI18n } from "@/i18n/server";
import { notFound } from "next/navigation";
import { getPublishedArticle, getPublishedArticles } from "@/lib/articles/public";
import { ArticleView } from "@/components/articles/ArticleView";
import { articleCategoryInfo, isArticleCategory } from "@/lib/articles/categories";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { ContactCta } from "@/components/sections/ContactCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleJsonLd } from "@/lib/seo/jsonld";
import { formatDate } from "@/lib/utils/date";

type Params = { slug: string };

// Artigos novos entram sem precisar de novo deploy: renderizam na primeira visita e são atualizados a cada 10 minutos
// (ou na hora, quando publicados pelo admin).
export const revalidate = 600;

export async function generateStaticParams(): Promise<Params[]> {
  return (await getPublishedArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getI18n();
  const article = locale === "pt" ? await getPublishedArticle(slug) : null;
  if (!article) return {};
  return buildMetadata({
    locale,
    title: article.seo.title,
    description: article.seo.description,
    path: `/insights/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    authors: [article.author.name],
    image: article.image
      ? { url: article.image.src, width: article.image.width, height: article.image.height, alt: article.image.alt }
      : undefined,
  });
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const { locale, t } = await getI18n();
  // Os artigos são em português.
  const article = locale === "pt" ? await getPublishedArticle(slug) : null;
  if (!article) notFound();

  const all = await getPublishedArticles();
  const explicit = (article.related ?? []).map((s) => all.find((a) => a.slug === s)).filter((a) => a !== undefined);
  const related = (explicit.length ? explicit : all.filter((a) => a.slug !== article.slug && a.category === article.category)).slice(0, 3);
  const category = isArticleCategory(article.category) ? articleCategoryInfo[article.category] : null;
  const relatedServices = (article.relatedServices ?? []).map((r) => t.services.find((s) => s.slug === r)).filter((s) => s !== undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: t.ui.footer.insights, path: "/insights" },
          ...(category ? [{ name: category.name, path: `/insights/categoria/${category.slug}` }] : []),
          { name: article.title, path: `/insights/${article.slug}` },
        ]}
      />
      <JsonLd data={articleJsonLd(article, locale)} />

      <article className="container-site pt-10 pb-20 md:pt-16">
        <ArticleView
          article={article}
          categoryLabel={category ? category.name : t.articleCategories[article.category]}
          dateLabel={formatDate(article.publishedAt, locale)}
        />

        {relatedServices.length ? (
          <aside aria-labelledby="servicos-relacionados" className="mx-auto mt-20 max-w-[44rem] border-t border-line pt-8">
            <h2 id="servicos-relacionados" className="eyebrow">
              {t.ui.insights.relatedServices}
            </h2>
            <ul className="mt-4 space-y-2">
              {relatedServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/servicos/${s.slug}`} className="link-underline text-lg">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </article>

      {related.length ? (
        <section aria-labelledby="leia-tambem" className="border-t border-line">
          <div className="container-site py-16">
            <h2 id="leia-tambem" className="type-heading">
              {t.ui.insights.readAlso}
            </h2>
            <div className="mt-10 grid gap-x-12 md:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ContactCta />
    </>
  );
}
