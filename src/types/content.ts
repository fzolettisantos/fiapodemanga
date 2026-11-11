export type Seo = {
  title: string;
  description: string;
  keywords?: string[];
};

export type Service = {
  /** Ordem editorial (01/…07/) */
  number: string;
  slug: string;
  /** Nome da especialidade */
  name: string;
  /** Headline aprovada */
  headline: string;
  /** Parágrafos aprovados */
  description: string[];
  /** Competências aprovadas */
  skills: string[];
  /** CTA específico (opcional) */
  cta?: { label: string; href: string };
  /** Conteúdo complementar da página individual */
  page: {
    /** H1 da página individual — foco de busca da rota */
    h1: string;
    /** Situações em que a especialidade costuma ser útil */
    whenItHelps: string[];
    /** Possíveis entregas (sem promessa de resultado) */
    deliverables: string[];
    /** Slugs de especialidades relacionadas para links internos */
    related: string[];
  };
  seo: Seo;
};

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

/** Template de case. Preencha apenas com informações reais e autorizadas. */
export type Project = {
  slug: string;
  name: string;
  client?: string;
  segment: string;
  /** O que foi feito (ex.: "Redesign de produto") */
  scope?: string;
  year?: string;
  /** Resumo curto para listagem */
  summary: string;
  services: string[]; // slugs de serviços
  context: string[];
  problem: string[];
  objective: string[];
  research: string[];
  hypotheses: string[];
  process: { title: string; description: string }[];
  /** Título alternativo da seção "Processo" (ex.: "O que foi redesenhado") */
  processTitle?: string;
  solution: string[];
  /** Somente resultados comprovados, com fonte/medição quando possível */
  results: { label: string; value?: string; description: string }[];
  learnings: string[];
  /** Somente imagens com autorização de uso */
  cover?: ImageAsset;
  /** Vídeo de demonstração exibido no lugar da capa (sem áudio, em loop) */
  video?: { mp4: string; webm?: string; poster: string; width: number; height: number; label?: string };
  images: ImageAsset[];
  /** Fundo do painel das telas: "cool" (azulado, padrão) ou "warm" (quente) */
  shotTone?: "cool" | "warm";
  publishedAt: string; // ISO yyyy-mm-dd
  seo: Seo;
};

/** Categorias dos artigos (slugs). Nomes e textos: src/lib/articles/categories.ts */
export const articleCategories = [
  "negocios",
  "sites",
  "lojas-virtuais",
  "google-e-seo",
  "whatsapp-e-vendas",
  "inteligencia-artificial",
  "design",
] as const;

export type ArticleCategory = (typeof articleCategories)[number];

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; image: ImageAsset };

/** Template de artigo (Insights). Não publique conteúdo fictício. */
export type Article = {
  title: string;
  slug: string;
  summary: string;
  author: { name: string; role?: string };
  publishedAt: string; // ISO yyyy-mm-dd
  updatedAt?: string;
  category: ArticleCategory;
  content: ArticleBlock[];
  image?: ImageAsset;
  seo: Seo;
  /** Slugs de artigos relacionados */
  related?: string[];
  /** Slugs de serviços relacionados */
  relatedServices?: string[];
};
