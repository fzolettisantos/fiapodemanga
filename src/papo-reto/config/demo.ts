import type { BalaShot, Participant, RankingSlug, RankingView } from "@/papo-reto/types";

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

/**
 * Votos SIMULADOS iniciais do modo demonstração, por recorte (só rankings com votação).
 * Ordens diferentes em cada recorte para mostrar que semana, mês e temporada são rankings próprios.
 */
export const DEMO_SEED_VOTES: Record<RankingSlug, Record<RankingView, Record<string, number>>> = {
  "falou-merda": {
    week: { benja: 1284, mano: 978, joneta: 623, kleber: 412, carabina: 341, gadu: 118 },
    month: { mano: 4120, benja: 3876, joneta: 2210, carabina: 1534, kleber: 1302, gadu: 640 },
    season: { benja: 38210, mano: 35990, carabina: 21455, joneta: 19870, gadu: 12004, kleber: 9876 },
  },
  sabio: {
    week: { mano: 515, benja: 402, kleber: 233, joneta: 233, gadu: 150, carabina: 87 },
    month: { kleber: 1980, mano: 1745, benja: 1502, joneta: 990, gadu: 610, carabina: 402 },
    season: { kleber: 21340, benja: 19870, mano: 18011, gadu: 9120, joneta: 8705, carabina: 5230 },
  },
  "bala-do-veio": { week: {}, month: {}, season: {} },
};

/** Ordem SIMULADA do ranking estático Bala do Véio (no ar, quem define é o programa pelo painel). */
export const DEMO_STATIC_POSITIONS: Partial<Record<RankingSlug, Record<string, number>>> = {
  "bala-do-veio": { carabina: 1, mano: 2, benja: 3, gadu: 4, joneta: 5, kleber: 6 },
};

/** Tiros SIMULADOS do Bala do Véio (no ar, quem cadastra é o programa pelo painel). */
const shot = (id: string, quantity: number, location: string, place: string, weapon: string): BalaShot => ({ id, quantity, location, place, weapon });
export const DEMO_SHOTS: Record<string, BalaShot[]> = {
  carabina: [
    shot("c1", 12, "No ego", "Estúdio do Papo Reto", "Berinjela"),
    shot("c2", 7, "Na moral", "Grupo do WhatsApp", "Chinelo de dedo"),
    shot("c3", 4, "No orgulho", "Live no YouTube", "Corneta"),
  ],
  mano: [shot("m1", 9, "Na careca", "Estúdio do Papo Reto", "Berinjela"), shot("m2", 5, "Na paciência", "Arquibancada", "Bola murcha")],
  benja: [shot("b1", 6, "No microfone", "Abertura do programa", "Corneta"), shot("b2", 3, "Na gravata", "Intervalo", "Chinelo de dedo")],
  gadu: [shot("g1", 5, "Na tiara", "Bastidores", "Estilingue de pipoca")],
  joneta: [shot("j1", 2, "No fone de ouvido", "Mesa de som", "Bolinha de papel"), shot("j2", 1, "Na resenha", "Estúdio do Papo Reto", "Berinjela")],
  kleber: [shot("k1", 1, "Na canela", "Live no YouTube", "Chinelo de dedo")],
};
