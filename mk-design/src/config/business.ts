/**
 * Dados comerciais PENDENTES de confirmação. Não preencher com valores fictícios.
 * Futuramente serão lidos do banco (BusinessSettings) e editados em /admin/configuracoes.
 */
export const businessConfig = {
  /** Formato internacional sem símbolos, ex.: "5511999999999". Enquanto null, o botão de WhatsApp fica desabilitado. */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? null,
  phone: null as string | null,
  publicAddress: null as string | null,
  /** Cidades/bairros atendidos — a cobertura não deve ser presumida. */
  serviceAreas: [] as string[],
  paymentMethods: ["Pix", "Cartão de débito", "Cartão de crédito (Visa, Mastercard e Elo)"] as const,
} as const;

/** Modo demonstrativo: sem backend configurado, nunca simular disponibilidade real. */
export const isDemoMode = !process.env.DATABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL;
