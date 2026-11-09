import type { Participant, RankingSlug } from "@/papo-reto/types";

/** Participantes do Papo Reto, na ordem administrativa. Também estão na carga inicial do banco. */
export const PAPO_RETO_CAST: Participant[] = [
  { id: "kleber", slug: "kleber", name: "Kleber o Gladiador", nickname: null, sortOrder: 1, avatarPaths: {} },
  { id: "benja", slug: "benja", name: "Benja", nickname: null, sortOrder: 2, avatarPaths: {} },
  { id: "mano", slug: "mano", name: "Mano", nickname: null, sortOrder: 3, avatarPaths: {} },
  { id: "joneta", slug: "joneta", name: "Joneta", nickname: null, sortOrder: 4, avatarPaths: {} },
  { id: "carabina", slug: "carabina", name: "Carabina", nickname: null, sortOrder: 5, avatarPaths: {} },
  { id: "gadu", slug: "gadu", name: "Gadu Boyceta", nickname: "Caique Silva", sortOrder: 6, avatarPaths: {} },
];

/**
 * MODO DEMONSTRAÇÃO — usado apenas quando o Supabase não está configurado.
 * Participantes reais, mas números e ordens SIMULADOS. Nada aqui representa votos reais.
 */
export const DEMO_PARTICIPANTS: Participant[] = PAPO_RETO_CAST;

/** Votos SIMULADOS iniciais do modo demonstração (só rankings com votação). */
export const DEMO_SEED_VOTES: Record<RankingSlug, Record<string, number>> = {
  "falou-merda": { benja: 1284, mano: 978, joneta: 623, kleber: 412, carabina: 341, gadu: 118 },
  sabio: { mano: 515, benja: 402, kleber: 233, joneta: 233, gadu: 150, carabina: 87 },
  "bala-do-veio": {},
};

/** Ordem SIMULADA do ranking estático Bala do Véio (no ar, quem define é o programa pelo painel). */
export const DEMO_STATIC_POSITIONS: Partial<Record<RankingSlug, Record<string, number>>> = {
  "bala-do-veio": { carabina: 1, mano: 2, benja: 3, gadu: 4, joneta: 5, kleber: 6 },
};
