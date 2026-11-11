import type { Metadata } from "next";
import { getI18n } from "@/i18n/server";
import { getPublishedArticles } from "@/lib/articles/public";
import { articleCategoryInfo, articleCategorySlugs } from "@/lib/articles/categories";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { ContactCta } from "@/components/sections/ContactCta";
import { buildMetadata } from "@/lib/seo/metadata";

export const revalidate = 600;

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  const hasArticles = locale === "pt" && (await getPublishedArticles()).length > 0;
  return buildMetadata({
    locale,
    ...t.meta.insights,
    path: "/insights",
    ogAlt: t.site.ogAlt,
    // Enquanto não houver artigos publicados, a listagem não é indexada.
    noIndex: !hasArticles,
  });
}

export default async function InsightsPage() {
  const { locale, t } = await getI18n();
  // Os artigos são em português; em inglês e espanhol a lista fica vazia.
  const articles = locale === "pt" ? await getPublishedArticles() : [];

  return (
    <>
      <Breadcrumbs items={[{ name: t.ui.footer.insights, path: "/insights" }]} />
      <PageHero eyebrow={t.insightsPage.eyebrow} title={t.insightsPage.title} />

      <section aria-labelledby="categorias-title" className="border-t border-line">
        <div className="container-site grid gap-10 py-16 md:py-20 lg:grid-cols-12">
          <h2 id="categorias-title" className="eyebrow lg:col-span-3">
            {t.ui.insights.categories}
          </h2>
          <ul className="flex flex-wrap gap-2 lg:col-span-9">
            {(locale === "pt" ? articleCategorySlugs : []).map((slug) => {
              const info = articleCategoryInfo[slug];
              const count = articles.filter((a) => a.category === slug).length;
              return (
                <li key={slug}>
                  <Link
                    href={`/insights/categoria/${slug}`}
                    className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-[0.95rem] transition-colors hover:border-accent hover:text-accent"
                  >
                    {info.name}
                    {count > 0 ? <span className="index-number text-xs">{count}</span> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

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
            <div className="grid gap-8 lg:grid-cols-12">
              <p className="type-heading lg:col-span-6">{t.ui.insights.empty}</p>
              <p className="type-lead text-muted lg:col-span-5 lg:col-start-8">{t.ui.insights.emptyDescription}</p>
            </div>
          )}
        </div>
      </section>

      <ContactCta />
    </>
  );
}
