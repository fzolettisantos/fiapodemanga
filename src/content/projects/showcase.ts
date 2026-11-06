import type { ImageAsset } from "@/types/content";

/**
 * Vitrine de projetos (slider em /projetos e na Home).
 * Projetos reais informados pela Fiapo de Manga, exibidos apenas com título e imagem.
 * A narrativa completa de cada case (contexto, problema, resultados…) usa o template
 * de `src/content/projects/_template.ts` quando houver conteúdo aprovado para publicação.
 *
 * Imagens: 1600×1568 px, preparadas com scripts/prepare-project-images.py.
 */
export type ShowcaseProject = {
  slug: string;
  title: string;
  /** Cliente — omitir quando não for divulgado */
  client?: string;
  category: string;
  /** slugs de especialidades relacionadas */
  services: string[];
  image: ImageAsset;
};

const size = { width: 1600, height: 1568 };

export const showcase: ShowcaseProject[] = [
  {
    slug: "ged-ai",
    title: "ged.ai",
    category: "Plataforma web",
    services: ["aplicativos-sistemas-plataformas", "product-design-ux-ui", "design-tecnologia-ia"],
    image: {
      src: "/images/projetos/ged-ai/capa.webp",
      alt: "Notebook flutuando sobre fundo azul, exibindo a tela de controle de documentos da plataforma ged.ai.",
      ...size,
    },
  },
  {
    slug: "supergasbras-app-revenda",
    title: "App de Revenda",
    client: "Supergasbras",
    category: "Aplicativo",
    services: ["aplicativos-sistemas-plataformas", "product-design-ux-ui"],
    image: {
      src: "/images/projetos/supergasbras-app-revenda/capa.webp",
      alt: "Duas telas do aplicativo de revenda da Supergasbras: a tela inicial com campanhas de marketing e portal de compras, e a tela de condições comerciais com preços e descontos.",
      ...size,
    },
  },
  {
    slug: "prudential-conciliacao-financeira",
    title: "Plataforma de Conciliação Financeira",
    client: "Prudential",
    category: "Plataforma web",
    services: ["aplicativos-sistemas-plataformas", "product-design-ux-ui"],
    image: {
      src: "/images/projetos/prudential-conciliacao-financeira/capa.webp",
      alt: "Tela da plataforma de conciliação financeira da Prudential, com os totais do dia e a tabela de lançamentos com status de conciliação.",
      ...size,
    },
  },
  {
    slug: "grupo-ormac-plataforma",
    title: "Plataforma Grupo Ormac",
    client: "Grupo Ormac",
    category: "Site e plataforma",
    services: ["criacao-de-sites", "product-design-ux-ui"],
    image: {
      src: "/images/projetos/grupo-ormac-plataforma/capa.webp",
      alt: "Site do Grupo Ormac em um notebook, com a chamada 54 anos de excelência, e em um celular, com a linha do tempo da empresa.",
      ...size,
    },
  },
];

/** Aplica título, categoria e texto alternativo traduzidos (dicionário do idioma). */
export function localizeShowcase(
  items: ShowcaseProject[],
  texts: Record<string, { title: string; category: string; alt: string }>,
): ShowcaseProject[] {
  return items.map((p) => {
    const tx = texts[p.slug];
    return tx ? { ...p, title: tx.title, category: tx.category, image: { ...p.image, alt: tx.alt } } : p;
  });
}
