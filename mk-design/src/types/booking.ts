/** Modelo de domínio (guia §9). Independente de banco: repositórios implementam estes tipos. */

export type BookingStatus =
  | "novo"
  | "aguardando_confirmacao"
  | "confirmado"
  | "em_atendimento"
  | "concluido"
  | "cancelado";

export type ServiceCategoryId = "instalacao-tv" | "instalacao-suporte" | "assistencia-tecnica";

export interface ServiceCategory {
  id: ServiceCategoryId;
  name: string;
  order: number;
}

export interface Service {
  id: string;
  slug: string;
  categoryId: ServiceCategoryId;
  name: string;
  summary: string;
  durationMinutes: number | null; // definido no painel; null = ainda não configurado
  priceMode: "sob_orcamento"; // não inventar preços
  active: boolean;
  order: number;
}

export interface BusinessHours {
  weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  opensAt: string; // "HH:mm"
  closesAt: string;
  capacity: number;
}

export interface BlockedSlot {
  id: string;
  startAt: string; // ISO 8601 com fuso
  endAt: string;
  reason?: string;
}

export interface Booking {
  id: string;
  protocol: string;
  serviceId: string;
  variant?: string;
  technicalDetails: Record<string, unknown>; // validado por Zod no cliente e no servidor
  customerName: string;
  customerPhone: string;
  location: { cep?: string; neighborhood: string; city: string; address?: string; complement?: string };
  requestedStartAt: string; // ISO 8601 com fuso (America/Sao_Paulo)
  durationMinutes: number;
  status: BookingStatus;
  privacyConsentAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingStatusHistory {
  id: string;
  bookingId: string;
  from: BookingStatus | null;
  to: BookingStatus;
  changedBy: string | null;
  changedAt: string;
}
