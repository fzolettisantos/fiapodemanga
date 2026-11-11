/**
 * Categorias dos artigos (pensadas para o que as pessoas procuram no Google).
 * Cada categoria tem uma página própria em /insights/categoria/<slug>, com texto de abertura.
 */
export const articleCategorySlugs = [
  "negocios",
  "sites",
  "lojas-virtuais",
  "google-e-seo",
  "whatsapp-e-vendas",
  "inteligencia-artificial",
  "design",
] as const;

export type ArticleCategorySlug = (typeof articleCategorySlugs)[number];

export type CategoryInfo = {
  slug: ArticleCategorySlug;
  /** Nome curto (rótulo e filtros) */
  name: string;
  /** Título da página da categoria (H1) */
  title: string;
  /** Texto de abertura da página da categoria (e meta description) */
  description: string;
};

export const articleCategoryInfo: Record<ArticleCategorySlug, CategoryInfo> = {
  negocios: {
    slug: "negocios",
    name: "Para o seu negócio",
    title: "Dicas para o seu negócio aparecer e vender na internet",
    description:
      "Guias práticos para pequenos negócios: como ser encontrado, passar confiança e transformar visitas em clientes, sem termo técnico.",
  },
  sites: {
    slug: "sites",
    name: "Sites e landing pages",
    title: "Sites e landing pages: como criar, o que ter e como manter",
    description:
      "Tudo sobre criar e manter o site da sua empresa: o que um bom site precisa ter, como escolher o formato certo e como evitar os erros mais comuns.",
  },
  "lojas-virtuais": {
    slug: "lojas-virtuais",
    name: "Lojas virtuais",
    title: "Lojas virtuais e e-commerce: como vender pela internet",
    description:
      "Como montar e cuidar de uma loja virtual: catálogo, pagamento, frete, fotos de produto e o caminho do cliente até a compra.",
  },
  "google-e-seo": {
    slug: "google-e-seo",
    name: "Google e SEO",
    title: "Google e SEO: como ser encontrado nas buscas",
    description:
      "Explicações diretas sobre como o Google encontra e mostra os sites, e o que fazer na prática para o seu negócio aparecer nas buscas.",
  },
  "whatsapp-e-vendas": {
    slug: "whatsapp-e-vendas",
    name: "WhatsApp e vendas",
    title: "WhatsApp e vendas: atender melhor e fechar mais pedidos",
    description:
      "Como usar o WhatsApp junto com o seu site ou loja: atendimento, catálogo, pedidos e organização do dia a dia.",
  },
  "inteligencia-artificial": {
    slug: "inteligencia-artificial",
    name: "Inteligência Artificial",
    title: "Inteligência Artificial para pequenos negócios",
    description:
      "O que a inteligência artificial já faz por um negócio pequeno: atendimento, textos, automações e como começar com segurança.",
  },
  design: {
    slug: "design",
    name: "Design e experiência",
    title: "Design e experiência de uso: por que o visual importa para vender",
    description:
      "Como design e experiência de uso influenciam a confiança e as vendas, e o que observar no seu site.",
  },
};

export function isArticleCategory(value: string): value is ArticleCategorySlug {
  return (articleCategorySlugs as readonly string[]).includes(value);
}
