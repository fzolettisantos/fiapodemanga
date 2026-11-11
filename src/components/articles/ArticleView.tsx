import Image from "next/image";
import type { Article } from "@/types/content";
import { readingMinutes } from "@/lib/articles/markdown";
import { ArticleBody, articleHeadings } from "./ArticleBody";

/**
 * Cabeçalho, capa, índice e texto do artigo.
 * Usado no site (/insights/<slug>) e na pré-visualização do admin, para ficarem idênticos.
 */
export function ArticleView({
  article,
  categoryLabel,
  dateLabel,
  labels = { contents: "Neste artigo", minutes: "min de leitura" },
}: {
  article: Article;
  categoryLabel: string;
  dateLabel: string;
  labels?: { contents: string; minutes: string };
}) {
  const heads = articleHeadings(article.content);
  const minutes = readingMinutes(article.content);
  return (
    <>
      <header className="max-w-5xl">
        <p className="eyebrow">{categoryLabel}</p>
        <h1 className="type-title mt-8">{article.title}</h1>
        {article.summary ? <p className="type-lead mt-8 max-w-3xl">{article.summary}</p> : null}
        <p className="mt-8 font-mono text-xs tracking-[0.04em] text-muted uppercase">
          {article.author.name}
          {article.author.role ? `, ${article.author.role}` : ""} · <time dateTime={article.publishedAt}>{dateLabel}</time> ·{" "}
          {minutes} {labels.minutes}
        </p>
      </header>

      {article.image ? (
        <Image
          src={article.image.src}
          alt={article.image.alt}
          width={article.image.width}
          height={article.image.height}
          sizes="(min-width: 1536px) 1408px, 100vw"
          priority
          className="mt-14 h-auto w-full"
        />
      ) : null}

      {heads.length >= 3 ? (
        <nav aria-label={labels.contents} className="mx-auto mt-14 max-w-[44rem] rounded-sm border border-line p-6">
          <p className="eyebrow">{labels.contents}</p>
          <ol className="mt-4 space-y-2">
            {heads.map((h) => (
              <li key={h.id}>
                <a href={`#${h.id}`} className="link-underline">
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <div className="prose-fm type-body mx-auto mt-16 max-w-[44rem] text-lg">
        <ArticleBody blocks={article.content} />
      </div>
    </>
  );
}
