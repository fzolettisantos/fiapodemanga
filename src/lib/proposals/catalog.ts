/**
 * Planos e tipos de site com valores de REFERÊNCIA.
 * Em cada proposta os valores podem ser alterados livremente no painel;
 * o que vale para o cliente é o que consta da proposta (e do Termo de Contratação).
 */

export type PlanId = "vitrine" | "catalogo" | "loja";

export type Plan = {
  id: PlanId;
  name: string;
  summary: string;
  /** Faixa de referência da mensalidade (R$) */
  monthlyRange: [number, number];
};

export const plans: Record<PlanId, Plan> = {
  vitrine: {
    id: "vitrine",
    name: "Vitrine",
    summary: "Site institucional, botão de WhatsApp e Google Maps.",
    monthlyRange: [89, 129],
  },
  catalogo: {
    id: "catalogo",
    name: "Catálogo",
    summary: "Produtos com fotos e preços, com pedido pelo WhatsApp.",
    monthlyRange: [149, 199],
  },
  loja: {
    id: "loja",
    name: "Loja Online",
    summary: "E-commerce completo com Mercado Pago, frete e painel.",
    monthlyRange: [249, 399],
  },
};

/** Incluso em todos os planos enquanto estiverem ativos. */
export const includedInAllPlans = [
  "Domínio (registro e renovação)",
  "Hospedagem e certificado de segurança (HTTPS)",
  "Backup semanal e atualizações de segurança",
  "Até 3 ajustes por mês",
];

export type SiteType = {
  id: string;
  name: string;
  audience: string;
  plan: PlanId;
  /** O que o site entrega, além do incluso em todos os planos */
  features: string[];
  monthly: number;
  annual: number;
  setup: number;
};

export const siteTypes: SiteType[] = [
  {
    id: "landing-page",
    name: "Página única (landing page)",
    audience: "Autônomo, lançamento, campanha",
    plan: "vitrine",
    features: ["Página única com seções", "Botão de WhatsApp", "Google Maps", "Formulário de contato"],
    monthly: 89,
    annual: 890,
    setup: 300,
  },
  {
    id: "portfolio",
    name: "Portfólio",
    audience: "Fotógrafo, arquiteto, designer, artista",
    plan: "vitrine",
    features: ["Galeria de trabalhos", "Página sobre", "Botão de WhatsApp", "Formulário de contato"],
    monthly: 99,
    annual: 990,
    setup: 400,
  },
  {
    id: "institucional",
    name: "Site institucional (até 5 páginas)",
    audience: "Escritório, clínica, prestador de serviço, ONG",
    plan: "vitrine",
    features: ["Até 5 páginas", "Botão de WhatsApp", "Google Maps", "Formulário de contato"],
    monthly: 109,
    annual: 1090,
    setup: 500,
  },
  {
    id: "agendamento",
    name: "Site com agendamento",
    audience: "Salão, barbearia, estética, consultório",
    plan: "vitrine",
    features: ["Até 5 páginas", "Agenda on-line integrada", "Botão de WhatsApp", "Google Maps"],
    monthly: 129,
    annual: 1290,
    setup: 600,
  },
  {
    id: "cardapio",
    name: "Cardápio digital",
    audience: "Restaurante, lanchonete, delivery, café",
    plan: "catalogo",
    features: ["Cardápio com fotos e preços", "QR Code para as mesas", "Pedido pelo WhatsApp"],
    monthly: 149,
    annual: 1490,
    setup: 500,
  },
  {
    id: "catalogo-50",
    name: "Catálogo de produtos (até 50 itens)",
    audience: "Loja física, revenda, artesanato",
    plan: "catalogo",
    features: ["Até 50 produtos com fotos e preços", "Categorias", "Pedido pelo WhatsApp"],
    monthly: 169,
    annual: 1690,
    setup: 600,
  },
  {
    id: "vitrine-filtros",
    name: "Vitrine com filtros (até 200 itens)",
    audience: "Imobiliária, loja de veículos, distribuidora",
    plan: "catalogo",
    features: ["Até 200 itens", "Busca e filtros", "Pedido ou contato pelo WhatsApp"],
    monthly: 199,
    annual: 1990,
    setup: 800,
  },
  {
    id: "loja-50",
    name: "Loja online (até 50 produtos)",
    audience: "Moda, cosméticos, presentes, alimentos",
    plan: "loja",
    features: ["Até 50 produtos", "Pagamento pelo Mercado Pago", "Cálculo de frete", "Painel de pedidos"],
    monthly: 249,
    annual: 2490,
    setup: 800,
  },
  {
    id: "loja-200",
    name: "Loja online (até 200 produtos, variações e cupons)",
    audience: "Loja com estoque maior",
    plan: "loja",
    features: ["Até 200 produtos com variações", "Cupons de desconto", "Pagamento pelo Mercado Pago", "Frete e painel de pedidos"],
    monthly: 329,
    annual: 3290,
    setup: 1000,
  },
  {
    id: "loja-digital",
    name: "Loja de produtos digitais",
    audience: "Cursos, e-books, materiais para download",
    plan: "loja",
    features: ["Venda de arquivos e acessos", "Entrega automática após o pagamento", "Pagamento pelo Mercado Pago"],
    monthly: 299,
    annual: 2990,
    setup: 800,
  },
];

export function getSiteType(id: string): SiteType | undefined {
  return siteTypes.find((type) => type.id === id);
}
