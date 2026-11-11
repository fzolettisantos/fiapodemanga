import type { ReactNode } from "react";
import Image from "next/image";
import type { ArticleBlock } from "@/types/content";
import { safeUrl, slugify, stripInline } from "@/lib/articles/markdown";

/** Texto com marcação inline (**negrito**, *itálico*, `código`, [link](endereço)) → elementos React. */
export function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let key = 0;
  for (let m = re.exec(text); m; m = re.exec(text)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(<strong key={key++}>{m[1]}</strong>);
    else if (m[2] !== undefined) out.push(<em key={key++}>{m[2]}</em>);
    else if (m[3] !== undefined) out.push(<code key={key++}>{m[3]}</code>);
    else {
      const href = safeUrl(m[5]!);
      if (!href) out.push(m[4]);
      else {
        const external = /^https?:\/\//i.test(href);
        out.push(
          <a key={key++} href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
            {m[4]}
          </a>,
        );
      }
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Títulos de seção (H2) com o endereço de âncora de cada um — usado no índice do artigo. */
export function articleHeadings(blocks: ArticleBlock[]): { id: string; text: string }[] {
  const seen = new Map<string, number>();
  const result: { id: string; text: string }[] = [];
  for (const b of blocks) {
    if (b.type !== "heading" || b.level === 3) continue;
    const text = stripInline(b.text);
    const base = slugify(text) || "secao";
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    result.push({ id: n ? `${base}-${n + 1}` : base, text });
  }
  return result;
}

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  const heads = articleHeadings(blocks);
  let h2 = 0;
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return <p key={i}>{renderInline(block.text)}</p>;
          case "heading":
            if (block.level === 3) return <h3 key={i}>{renderInline(block.text)}</h3>;
            return (
              <h2 key={i} id={heads[h2++]?.id}>
                {renderInline(block.text)}
              </h2>
            );
          case "list": {
            const items = block.items.map((item, j) => <li key={j}>{renderInline(item)}</li>);
            return block.ordered ? (
              <ol key={i} className="list-decimal pl-5">
                {items}
              </ol>
            ) : (
              <ul key={i}>{items}</ul>
            );
          }
          case "quote":
            return (
              <blockquote key={i} className="callout border-l-2 border-accent pl-6">
                <p>{renderInline(block.text)}</p>
                {block.cite ? <cite className="mt-4 block text-sm not-italic text-muted">{block.cite}</cite> : null}
              </blockquote>
            );
          case "image":
            return (
              <figure key={i}>
                <Image
                  src={block.image.src}
                  alt={block.image.alt}
                  width={block.image.width}
                  height={block.image.height}
                  sizes="(min-width: 768px) 720px, 100vw"
                  className="h-auto w-full"
                />
                {block.image.caption ? <figcaption className="mt-3 text-sm text-muted">{block.image.caption}</figcaption> : null}
              </figure>
            );
        }
      })}
    </>
  );
}
