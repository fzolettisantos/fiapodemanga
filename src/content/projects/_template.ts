/**
 * TEMPLATE DE CASE — não é importado em lugar nenhum.
 * Copie este arquivo, renomeie e preencha apenas com informações reais.
 * Remova campos opcionais que não se aplicam; deixe arrays vazios quando
 * não houver conteúdo (a seção correspondente não é exibida).
 */
import type { Project } from "@/types/content";

export const projectTemplate: Project = {
  slug: "nome-do-projeto", // URL: /projetos/nome-do-projeto
  name: "Nome do projeto",
  client: "Nome do cliente (somente com autorização)",
  segment: "Segmento de mercado",
  year: "2026",
  summary: "Resumo de uma ou duas frases para a listagem de projetos.",
  services: ["pesquisa-ux-discovery"], // slugs de src/content/services
  context: ["Contexto do negócio e do produto."],
  problem: ["Qual problema precisava ser resolvido."],
  objective: ["O que o projeto buscava alcançar."],
  research: ["Métodos de pesquisa utilizados e principais achados."],
  hypotheses: ["Hipóteses formuladas a partir da pesquisa."],
  process: [{ title: "Etapa", description: "O que foi feito nessa etapa." }],
  solution: ["Descrição da solução desenhada e implementada."],
  results: [
    // Somente resultados comprovados. Indique a fonte/medição na descrição.
    { label: "Indicador", value: "+00%", description: "Como e quando foi medido." },
  ],
  learnings: ["O que o projeto ensinou."],
  cover: {
    src: "/images/projetos/nome-do-projeto/capa.jpg",
    alt: "Descrição objetiva da imagem",
    width: 1600,
    height: 1000,
  },
  images: [],
  publishedAt: "2026-01-01",
  seo: {
    title: "Nome do projeto — Case",
    description: "Descrição de até ~155 caracteres para buscadores.",
  },
};
