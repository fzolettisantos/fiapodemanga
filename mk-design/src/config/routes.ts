/** Rotas do site — fonte única para links, sitemap e navegação. */
export const routes = {
  home: "/",
  services: "/servicos",
  service: (slug: string) => `/servicos/${slug}`,
  booking: "/agendamento",
  about: "/sobre",
  contact: "/contato",
  privacy: "/privacidade",
  admin: "/admin",
  adminAgenda: "/admin/agenda",
  adminServices: "/admin/servicos",
  adminSettings: "/admin/configuracoes",
} as const;

export const mainNav = [
  { label: "Serviços", href: routes.services },
  { label: "Sobre", href: routes.about },
  { label: "Contato", href: routes.contact },
] as const;
