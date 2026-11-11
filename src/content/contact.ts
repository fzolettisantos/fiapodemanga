/** Tipos de projeto do formulário de contato (briefing, seção 13). */
export const projectTypes = [
  { value: "site", label: "Site ou Landing Page" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "ia", label: "Inteligência Artificial" },
  { value: "aplicativo", label: "Aplicativo" },
  { value: "sistema", label: "Sistema ou Plataforma" },
  { value: "product-design", label: "Product Design e UX/UI" },
  { value: "pesquisa", label: "Pesquisa e Discovery" },
  { value: "estrategia", label: "Estratégia de Produto" },
  { value: "outro", label: "Outro" },
] as const;

export type ProjectTypeValue = (typeof projectTypes)[number]["value"];

export const projectTypeValues = projectTypes.map((t) => t.value) as [
  ProjectTypeValue,
  ...ProjectTypeValue[],
];

export function projectTypeLabel(value: string): string {
  return projectTypes.find((t) => t.value === value)?.label ?? value;
}
