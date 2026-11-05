/**
 * Configuração central do site.
 * Informações comerciais ainda não confirmadas ficam vazias de propósito:
 * nada aqui deve ser preenchido com dados inventados.
 */

function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Fiapo de Manga",
  legalName: "", // Razão social — preencher quando confirmada.
  url: resolveSiteUrl(),
  locale: "pt_BR",
  language: "pt-BR",
  tagline: "Boas experiências começam com boas perguntas.",
  centralMessage:
    "Entendemos problemas, desenhamos experiências e ajudamos negócios a evoluir.",
  description:
    "Consultoria de design, pesquisa e experiência digital. Unimos pesquisa, estratégia e design para criar produtos digitais que fazem sentido para as pessoas e geram valor para os negócios.",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "",
  /**
   * SEO local: preencher somente com informações comerciais confirmadas.
   * Ex.: { city: "Santos", region: "SP", country: "BR", remote: true }
   * Não informar endereço físico que não exista.
   */
  location: null as null | { city: string; region: string; country: string; remote: boolean },
  /** Perfis oficiais (LinkedIn, Instagram, Behance…). Apenas URLs reais. */
  social: [] as { label: string; href: string }[],
} as const;

export type NavItem = { label: string; href: string };

export const mainNavigation: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "O que fazemos", href: "/servicos" },
  { label: "Cases", href: "/projetos" },
  { label: "Sobre nós", href: "/sobre" },
];

export const contactNavItem: NavItem = { label: "Vamos conversar", href: "/contato" };

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
