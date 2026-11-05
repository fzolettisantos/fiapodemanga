import type { Project } from "@/types/content";

/**
 * Cases publicados.
 *
 * IMPORTANTE: cadastre somente projetos reais, com autorização do cliente
 * para divulgação de nome, imagens e resultados. Não invente cases.
 *
 * Para publicar um case:
 *  1. Copie `src/content/projects/_template.ts` para `src/content/projects/<slug>.ts`.
 *  2. Preencha os campos com informações reais.
 *  3. Importe o objeto aqui e adicione-o ao array `projects`.
 *  4. Coloque imagens autorizadas em `public/images/projetos/<slug>/`.
 *
 * As rotas /projetos/[slug], o sitemap e a Home são atualizados automaticamente.
 */
export const projects: Project[] = [];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsSorted(): Project[] {
  return [...projects].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
