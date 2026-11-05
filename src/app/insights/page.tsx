import type { Metadata } from "next";
import { getArticlesSorted } from "@/content/articles";
import { insightsPageContent as c } from "@/content/pages";
import { articleCategories } from "@/types/content";
import { homeContent } from "@/content/home";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { ContactCta } from "@/components/sections/ContactCta";
import { buildMetadata } from "@/lib/seo/metadata";

const hasArticles = getArticlesSorted().length > 0;

export const metadata: Metadata = buildMetadata({
  title: "Insights — UX Research, Product Design e experiências digitais",
  description:
    "Ideias, pesquisas e aprendizados sobre UX Research, Product Design, UX/UI, estratégia de produto, desenvolvimento digital, e-commerce e inteligência artificial.",
  path: "/insights",
  // Enquanto não houver artigos publicados, a listagem não é indexada.
  noIndex: !hasArticles,
});

export default function InsightsPage() {
  const articles = getArticlesSorted();

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Início", path: "/" },
          { name: "Insights", path: "/insights" },
        ]}
      />
      <PageHero eyebrow={c.eyebrow} title={c.title} />

      <section aria-labelledby="categorias-title" className="border-t border-line">
        <div className="container-site grid gap-10 py-16 md:py-20 lg:grid-cols-12">
          <h2 id="categorias-title" className="eyebrow lg:col-span-3">
            Categorias
          </h2>
          <ul className="flex flex-wrap gap-2 lg:col-span-9">
            {articleCategories.map((category) => {
              const count = articles.filter((a) => a.category === category).length;
              return (
                <li
                  key={category}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-[0.95rem]"
                >
                  {category}
                  {count > 0 ? <span className="index-number text-xs">{count}</span> : null}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="artigos-title" className="border-t border-line">
        <div className="container-site py-16 md:py-24">
          <h2 id="artigos-title" className="sr-only">
            Artigos
          </h2>
          {articles.length > 0 ? (
            <div className="grid gap-x-12 md:grid-cols-2 xl:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-12">
              <p className="type-heading lg:col-span-6">Ainda não há artigos publicados.</p>
              <p className="type-lead text-muted lg:col-span-5 lg:col-start-8">
                Esta área reunirá conteúdos originais sobre pesquisa, design, tecnologia e produtos digitais.
              </p>
            </div>
          )}
        </div>
      </section>

      <ContactCta
        eyebrow={homeContent.contact.eyebrow}
        title={homeContent.contact.title}
        description={homeContent.contact.description}
        cta={homeContent.contact.cta}
      />
    </>
  );
}
