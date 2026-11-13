/**
 * Identidade e SEO do site. Nada aqui deve ser inventado: valores desconhecidos ficam `null`
 * até o proprietário confirmar (ver docs/product/requirements.md §Pendências).
 */
export const siteConfig = {
  name: "MK Design",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? null,
  locale: "pt-BR",
  timezone: "America/Sao_Paulo",
  seo: {
    title: "MK Design | Instalação de TVs, suportes e assistência técnica",
    description:
      "Instalação de TVs em paredes, painéis e móveis, instalação de suportes e solicitação de reparos. Escolha o serviço e agende seu atendimento com a MK Design.",
  },
  logo: {
    src: "/images/logo/mk-design-logo.png",
    alt: "MK Design",
    width: 1254,
    height: 1254,
  },
} as const;
