import Link from "next/link";
import type { Article } from "@/types/content";
import { formatDate } from "@/lib/utils/date";

/** Item editorial de artigo (sem card com sombra — apenas tipografia e linhas). */
export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group relative border-t border-line py-8" data-reveal>
      <p className="eyebrow">{article.category}</p>
      <h3 className="type-subheading mt-4 transition-colors group-hover:text-accent">
        <Link href={`/insights/${article.slug}`} className="after:absolute after:inset-0">
          {article.title}
        </Link>
      </h3>
      <p className="type-body mt-4 text-muted">{article.summary}</p>
      <p className="mt-6 font-mono text-xs tracking-[0.04em] text-muted uppercase">
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time> · {article.author.name}
      </p>
    </article>
  );
}
