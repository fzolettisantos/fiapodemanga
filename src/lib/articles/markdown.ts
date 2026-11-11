import type { ArticleBlock } from "@/types/content";

/**
 * Conversor de Markdown (o que o editor de artigos aceita) para blocos.
 * Seguro de propósito: não aceita HTML nem scripts, só estes recursos:
 *  - `## Título` e `### Subtítulo` (um `# ` vira título de seção)
 *  - parágrafos, listas (`- item` / `1. item`) e citações (`> texto`, `> — autor`)
 *  - imagem sozinha na linha: `![texto alternativo](endereço "legenda")`
 *  - no texto: **negrito**, *itálico*, `código` e [texto](link)
 * O tamanho da imagem vem no fim do endereço (`#1600x900`), colocado pelo editor ao enviar a foto.
 */

const IMG = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/;

/** Só aceita endereços seguros em links e imagens. */
export function safeUrl(url: string, allowMail = true): string | null {
  const u = url.trim();
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith("/") && !u.startsWith("//")) return u;
  if (allowMail && /^mailto:[^\s@]+@[^\s@]+$/i.test(u)) return u;
  if (u.startsWith("#")) return u;
  return null;
}

export function parseImageUrl(raw: string): { src: string; width: number; height: number } | null {
  const [base, dims = ""] = raw.split("#");
  const src = safeUrl(base ?? "", false);
  if (!src) return null;
  const m = /^(\d{2,5})x(\d{2,5})$/.exec(dims);
  return { src, width: m ? Number(m[1]) : 1200, height: m ? Number(m[2]) : 675 };
}

export function parseMarkdown(md: string): ArticleBlock[] {
  const lines = md.replace(/\r\n?/g, "\n").split("\n");
  const blocks: ArticleBlock[] = [];
  let para: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let quote: string[] = [];

  const flushPara = () => {
    if (para.length) blocks.push({ type: "paragraph", text: para.join(" ").trim() });
    para = [];
  };
  const flushList = () => {
    if (list) blocks.push({ type: "list", items: list.items, ordered: list.ordered });
    list = null;
  };
  const flushQuote = () => {
    if (quote.length) {
      const last = quote[quote.length - 1]!;
      const cite = /^—\s*(.+)$/.exec(last);
      const body = cite ? quote.slice(0, -1) : quote;
      blocks.push({ type: "quote", text: body.join(" ").trim(), ...(cite ? { cite: cite[1]!.trim() } : {}) });
    }
    quote = [];
  };
  const flushAll = () => {
    flushPara();
    flushList();
    flushQuote();
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushAll();
      continue;
    }
    const h = /^(#{1,3})\s+(.+)$/.exec(line);
    if (h) {
      flushAll();
      blocks.push({ type: "heading", text: h[2]!.trim(), level: h[1]!.length === 3 ? 3 : 2 });
      continue;
    }
    const img = IMG.exec(line.trim());
    if (img) {
      const parsed = parseImageUrl(img[2]!);
      if (parsed) {
        flushAll();
        blocks.push({ type: "image", image: { ...parsed, alt: img[1]!.trim(), ...(img[3] ? { caption: img[3] } : {}) } });
        continue;
      }
    }
    const q = /^>\s?(.*)$/.exec(line);
    if (q) {
      flushPara();
      flushList();
      quote.push(q[1]!.trim());
      continue;
    }
    const ul = /^[-*]\s+(.+)$/.exec(line);
    const ol = /^\d+[.)]\s+(.+)$/.exec(line);
    if (ul || ol) {
      flushPara();
      flushQuote();
      const ordered = Boolean(ol);
      if (list && list.ordered !== ordered) flushList();
      list ??= { ordered, items: [] };
      list.items.push((ul ?? ol)![1]!.trim());
      continue;
    }
    flushList();
    flushQuote();
    para.push(line.trim());
  }
  flushAll();
  return blocks;
}

/** Texto puro de um trecho com marcação inline (para contar palavras, resumos e checagens). */
export function stripInline(text: string): string {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/(\*\*|__|\*|`)/g, "");
}

export function blocksToPlainText(blocks: ArticleBlock[]): string {
  return blocks
    .map((b) => {
      if (b.type === "list") return b.items.map(stripInline).join(" ");
      if (b.type === "image") return "";
      return stripInline(b.text);
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function wordCount(blocks: ArticleBlock[]): number {
  const t = blocksToPlainText(blocks);
  return t ? t.split(" ").length : 0;
}

export function readingMinutes(blocks: ArticleBlock[]): number {
  return Math.max(1, Math.round(wordCount(blocks) / 200));
}

/** Endereço do artigo a partir do título: sem acentos, minúsculo, com hífens. */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " e ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}
