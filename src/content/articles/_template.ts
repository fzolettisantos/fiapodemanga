/**
 * TEMPLATE DE ARTIGO — não é importado em lugar nenhum.
 * Copie, renomeie e escreva um conteúdo original.
 */
import type { Article } from "@/types/content";

export const articleTemplate: Article = {
  title: "Título do artigo",
  slug: "titulo-do-artigo", // URL: /insights/titulo-do-artigo
  summary: "Resumo de uma ou duas frases.",
  author: { name: "Nome da autora ou autor", role: "Cargo" },
  publishedAt: "2026-01-01",
  category: "UX Research", // ver articleCategories em src/types/content.ts
  content: [
    { type: "paragraph", text: "Primeiro parágrafo." },
    { type: "heading", text: "Intertítulo", level: 2 },
    { type: "list", items: ["Item 1", "Item 2"] },
    { type: "quote", text: "Citação.", cite: "Fonte" },
  ],
  image: {
    src: "/images/insights/titulo-do-artigo.jpg",
    alt: "Descrição objetiva da imagem",
    width: 1600,
    height: 900,
  },
  seo: {
    title: "Título para buscadores",
    description: "Descrição de até ~155 caracteres.",
  },
  related: [],
  relatedServices: ["pesquisa-ux-discovery"],
};
