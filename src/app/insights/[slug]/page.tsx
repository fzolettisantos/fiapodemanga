import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getArticlesSorted } from "@/content/articles";
import { getService } from "@/content/services";
import { homeContent } from "@/content/home";
import type { ArticleBlock } from "@/types/content";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { ContactCta } from "@/components/sections/ContactCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleJsonLd } from "@/lib/seo/jsonld";
import { formatDate } from "@/lib/utils/date";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getArticlesSorted().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
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

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;
    case "heading":
      return block.level === 3 ? <h3>{block.text}</h3> : <h2>{block.text}</h2>;
    case "list":
      return block.ordered ? (
        <ol className="list-decimal pl-5">
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ol>
      ) : (
        <ul>
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="callout border-l-2 border-accent pl-6">
          <p>{block.text}</p>
          {block.cite ? <cite className="mt-4 block text-sm not-italic text-muted">{block.cite}</cite> : null}
        </blockquote>
      );
    case "image":
      return (
        <figure>
          <Image
            src={block.image.src}
            alt={block.image.alt}
            width={block.image.width}
            height={block.image.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full"
          />
          {block.image.caption ? (
            <figcaption className="mt-3 text-sm text-muted">{block.image.caption}</figcaption>
          ) : null}
        </figure>
      );
  }
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = (article.related ?? []).map(getArticle).filter((a) => a !== undefined);
  const relatedServices = (article.relatedServices ?? []).map(getService).filter((s) => s !== undefined);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Início", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: article.title, path: `/insights/${article.slug}` },
        ]}
      />
      <JsonLd data={articleJsonLd(article)} />

      <article className="container-site pt-10 pb-20 md:pt-16">
        <header className="max-w-5xl">
          <p className="eyebrow">{article.category}</p>
          <h1 className="type-title mt-8">{article.title}</h1>
          <p className="type-lead mt-8 max-w-3xl">{article.summary}</p>
          <p className="mt-8 font-mono text-xs tracking-[0.04em] text-muted uppercase">
            {article.author.name}
            {article.author.role ? `, ${article.author.role}` : ""} ·{" "}
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
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

        <div className="prose-fm type-body mx-auto mt-16 max-w-[44rem] text-lg">
          {article.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        {relatedServices.length ? (
          <aside aria-labelledby="servicos-relacionados" className="mx-auto mt-20 max-w-[44rem] border-t border-line pt-8">
            <h2 id="servicos-relacionados" className="eyebrow">
              Especialidades relacionadas
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
              Leia também
            </h2>
            <div className="mt-10 grid gap-x-12 md:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ContactCta
        eyebrow={homeContent.contact.eyebrow}
        title={homeContent.contact.title}
        description={homeContent.contact.description}
        cta={homeContent.contact.cta}
      />
    </>
  );
}
