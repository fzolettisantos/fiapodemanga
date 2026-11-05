import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { getI18n } from "@/i18n/server";
import type { Article } from "@/types/content";
import { formatDate } from "@/lib/utils/date";

/** Item editorial de artigo (sem card com sombra — apenas tipografia e linhas). */
export async function ArticleCard({ article }: { article: Article }) {
  const { locale, t } = await getI18n();
  return (
    <article className="group relative border-t border-line py-8" data-reveal>
      <p className="eyebrow">{t.articleCategories[article.category]}</p>
      <h3 className="type-subheading mt-4 transition-colors group-hover:text-accent">
        <Link href={`/insights/${article.slug}`} className="after:absolute after:inset-0">
          {article.title}
        </Link>
      </h3>
      <p className="type-body mt-4 text-muted">{article.summary}</p>
      <p className="mt-6 font-mono text-xs tracking-[0.04em] text-muted uppercase">
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, locale)}</time> · {article.author.name}
      </p>
    </article>
  );
}
