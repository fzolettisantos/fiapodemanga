import { blocksToPlainText, parseMarkdown, stripInline, wordCount } from "./markdown";

export type Check = { id: string; label: string; status: "ok" | "warn" | "todo"; hint: string };

export type CheckInput = {
  title: string;
  slug: string;
  summary: string;
  body: string;
  focusKeyword: string;
  seoTitle: string;
  seoDescription: string;
  coverUrl: string;
  coverAlt: string;
};

const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

/** Lista de verificação de SEO do artigo: boas práticas verificáveis, sem promessa de posição no Google. */
export function seoChecks(a: CheckInput): { checks: Check[]; score: number } {
  const blocks = parseMarkdown(a.body);
  const kw = norm(a.focusKeyword.trim());
  const has = (text: string) => kw.length > 0 && norm(text).includes(kw);
  const firstPara = blocks.find((b) => b.type === "paragraph");
  const h2s = blocks.filter((b) => b.type === "heading" && b.level !== 3);
  const words = wordCount(blocks);
  const imgs = blocks.filter((b) => b.type === "image");
  const searchTitle = (a.seoTitle || a.title).trim();
  const searchDesc = (a.seoDescription || a.summary).trim();
  const internalLinks = (a.body.match(/\]\(\/[^)]*\)/g) ?? []).length;
  const text = blocksToPlainText(blocks);

  const c = (id: string, label: string, ok: boolean, hint: string, warnInstead = false): Check => ({
    id,
    label,
    status: ok ? "ok" : warnInstead ? "warn" : "todo",
    hint,
  });

  const checks: Check[] = [
    c("kw", "Palavra-chave principal definida", kw.length > 0, "Escreva a busca que você quer atender, como \"site para salão de beleza\"."),
    c("kw-title", "Palavra-chave no título", has(a.title), "Use a busca no título, de forma natural, de preferência no começo."),
    c("kw-intro", "Palavra-chave no primeiro parágrafo", has(firstPara && firstPara.type === "paragraph" ? firstPara.text : ""), "Cite a busca logo no início do texto."),
    c("kw-h2", "Palavra-chave em algum subtítulo", h2s.some((h) => h.type === "heading" && has(h.text)), "Use a busca (ou uma variação) em pelo menos um subtítulo.", true),
    c("title-len", `Título de busca com 30 a 60 caracteres (agora ${searchTitle.length})`, searchTitle.length >= 30 && searchTitle.length <= 60, "O Google corta títulos longos. Use o campo \"Título para o Google\" se o título do artigo for maior."),
    c("desc-len", `Descrição com 120 a 160 caracteres (agora ${searchDesc.length})`, searchDesc.length >= 120 && searchDesc.length <= 160, "É o texto que aparece abaixo do título nos resultados. Explique o que a pessoa vai aprender."),
    c("words", `Texto com 600 palavras ou mais (agora ${words})`, words >= 600, "Textos completos respondem melhor à dúvida. Guias costumam passar de 800 palavras.", true),
    c("h2", `Pelo menos 3 subtítulos (agora ${h2s.length})`, h2s.length >= 3, "Divida o texto com subtítulos (##) que respondam a perguntas.", true),
    c("cover", "Imagem de capa com texto alternativo", Boolean(a.coverUrl) && a.coverAlt.trim().length > 0, "A capa aparece nas redes sociais. O texto alternativo descreve a imagem."),
    c("img-alt", "Imagens do texto com descrição", imgs.every((i) => i.type === "image" && i.image.alt.trim().length > 0), "Toda imagem do texto precisa de uma descrição entre os colchetes."),
    c("links", `Pelo menos 2 links para páginas do próprio site (agora ${internalLinks})`, internalLinks >= 2, "Ligue o artigo aos seus serviços, por exemplo [criação de sites](/servicos/criacao-de-sites).", true),
    c("slug", "Endereço curto e sem palavras soltas", a.slug.length > 0 && a.slug.length <= 60, "Use poucas palavras, sem artigos e preposições desnecessários."),
    c("unique", "Texto escrito por você, sem copiar de outros sites", text.length > 0, "Conteúdo copiado ou genérico demais não ajuda no Google. Conte a sua experiência e dê exemplos reais.", true),
  ];
  const ok = checks.filter((x) => x.status === "ok").length;
  return { checks, score: Math.round((ok / checks.length) * 100) };
}

export { stripInline };
