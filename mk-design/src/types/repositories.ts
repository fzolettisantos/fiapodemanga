import type { Booking, BookingStatus, BlockedSlot, Service } from "./booking";

/**
 * Portas de persistência. A UI e as rotas dependem APENAS destas interfaces; trocar o backend
 * (Supabase/Postgres/outro) significa escrever novas implementações em src/lib/repositories/.
 * Regra crítica: `create` deve impedir dupla reserva de forma transacional (constraint/lock).
 */
export interface BookingRepository {
  create(input: Omit<Booking, "id" | "protocol" | "status" | "createdAt" | "updatedAt">): Promise<Booking>;
  getByProtocol(protocol: string): Promise<Booking | null>;
  list(filter?: { status?: BookingStatus; from?: string; to?: string }): Promise<Booking[]>;
  updateStatus(id: string, to: BookingStatus, changedBy: string): Promise<Booking>;
}

export interface AvailabilityRepository {
  /** Somente intervalos livres e compatíveis; nunca expõe dados de outros clientes. */
  listFreeSlots(params: { serviceId: string; date: string }): Promise<string[]>;
  listBlocked(range: { from: string; to: string }): Promise<BlockedSlot[]>;
  block(slot: Omit<BlockedSlot, "id">): Promise<BlockedSlot>;
}

export interface ServiceRepository {
  list(opts?: { onlyActive?: boolean }): Promise<Service[]>;
  getBySlug(slug: string): Promise<Service | null>;
}
