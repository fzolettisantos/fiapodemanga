import type { Participant, RankingSlug } from "@/papo-reto/types";

/**
 * MODO DEMONSTRAÇÃO — usado apenas quando o Supabase não está configurado.
 * Participantes provisórios e números SIMULADOS. Nada aqui representa votos reais.
 * Substitua pelos participantes reais cadastrando-os no Supabase (ver README).
 */
export const DEMO_PARTICIPANTS: Participant[] = [
  { id: "benja", slug: "benja", name: "Benja", nickname: "O apresentador", sortOrder: 1, avatarPaths: {} },
  { id: "participante-2", slug: "participante-2", name: "Participante 2", nickname: "Nome a definir", sortOrder: 2, avatarPaths: {} },
  { id: "participante-3", slug: "participante-3", name: "Participante 3", nickname: "Nome a definir", sortOrder: 3, avatarPaths: {} },
  { id: "participante-4", slug: "participante-4", name: "Participante 4", nickname: "Nome a definir", sortOrder: 4, avatarPaths: {} },
  { id: "participante-5", slug: "participante-5", name: "Participante 5", nickname: "Nome a definir", sortOrder: 5, avatarPaths: {} },
];

/** Votos SIMULADOS iniciais do modo demonstração (só rankings com votação). */
export const DEMO_SEED_VOTES: Record<RankingSlug, Record<string, number>> = {
  "falou-merda": { benja: 1284, "participante-2": 978, "participante-3": 623, "participante-4": 341, "participante-5": 118 },
  sabio: { benja: 402, "participante-2": 515, "participante-3": 233, "participante-4": 233, "participante-5": 87 },
  "bala-do-veio": {},
};

/** Ordem SIMULADA do ranking estático Bala do Véio (no ar, quem define é o programa pelo painel). */
export const DEMO_STATIC_POSITIONS: Partial<Record<RankingSlug, Record<string, number>>> = {
  "bala-do-veio": { "participante-3": 1, "participante-2": 2, benja: 3, "participante-5": 4, "participante-4": 5 },
};
