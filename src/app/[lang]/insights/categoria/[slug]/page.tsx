import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getI18n } from "@/i18n/server";
import { articleCategoryInfo, articleCategorySlugs, isArticleCategory } from "@/lib/articles/categories";
import { getPublishedArticles } from "@/lib/articles/public";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { ContactCta } from "@/components/sections/ContactCta";
import { buildMetadata } from "@/lib/seo/metadata";

type Params = { slug: string };

export const revalidate = 600;

export function generateStaticParams(): Params[] {
  return articleCategorySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const { locale, t } = await getI18n();
  if (locale !== "pt" || !isArticleCategory(slug)) return {};
  const info = articleCategoryInfo[slug];
  const count = (await getPublishedArticles(slug)).length;
  return buildMetadata({
    locale,
    title: info.title,
    description: info.description,
    path: `/insights/categoria/${slug}`,
    ogAlt: t.site.ogAlt,
    // Categoria sem artigos ainda não é indexada.
    noIndex: count === 0,
  });
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const { locale, t } = await getI18n();
  if (locale !== "pt" || !isArticleCategory(slug)) notFound();
  const info = articleCategoryInfo[slug];
  const articles = await getPublishedArticles(slug);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: t.ui.footer.insights, path: "/insights" },
          { name: info.name, path: `/insights/categoria/${slug}` },
        ]}
      />
      <PageHero eyebrow={t.ui.footer.insights} title={info.title} paragraphs={[info.description]} />
      <section aria-labelledby="artigos-title" className="border-t border-line">
        <div className="container-site py-16 md:py-24">
          <h2 id="artigos-title" className="sr-only">
            {t.ui.insights.articles}
          </h2>
          {articles.length > 0 ? (
            <div className="grid gap-x-12 md:grid-cols-2 xl:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <p className="type-lead text-muted">Ainda não há artigos nesta categoria.</p>
          )}
        </div>
      </section>
      <ContactCta />
    </>
  );
}
