import { RANKINGS } from "@/config/rankings";
import type { RankedEntry, RankingResults, RankingSlug } from "@/types";

const upper = (s: string) => s.toLocaleUpperCase("pt-BR");

/**
 * Texto de compartilhamento do ranking. Só afirma um resultado quando ele existe de verdade:
 * dados simulados ou sem votos geram um convite genérico.
 */
export function rankingShareText(slug: RankingSlug, results?: RankingResults | null): string {
  const copy = RANKINGS[slug];
  const invite = `Vota aí no ${copy.title}! A resenha é deles. A corneta é sua.`;
  if (!results || results.isDemo || results.totalVotes === 0) return invite;
  const leaders = results.entries.filter((e) => e.position === 1);
  if (leaders.length !== 1) return `Empate no topo do ${copy.title}! ${invite}`;
  return `${upper(copy.leaderMessage(leaders[0]!.participant.name))} Vota aí também:`;
}

/** Manchete do card compartilhável de um participante, coerente com a posição real. */
export function participantHeadline(slug: RankingSlug, entry: RankedEntry, results: RankingResults): string {
  const copy = RANKINGS[slug];
  const name = entry.participant.name;
  if (results.totalVotes === 0 || entry.state === "neutral") return upper(`${copy.title}: ainda está tudo empatado!`);
  if (entry.position === 1 && !entry.tied) return upper(copy.leaderMessage(name));
  if (entry.position === 1) return upper(`${name} divide a liderança do ${copy.title}!`);
  return upper(`${name} está em ${entry.position}º no ${copy.title}.`);
}

export function whatsappUrl(text: string, url: string) {
  return `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
}
