import "server-only";
import { DEMO_PARTICIPANTS, DEMO_SEED_VOTES } from "@/config/demo";
import type { RankingSlug, VoteStatus } from "@/types";

/**
 * Armazenamento em memória do MODO DEMONSTRAÇÃO. Os números partem de valores simulados,
 * vivem apenas enquanto a instância do servidor estiver ativa e não são votos reais.
 */
interface DemoState {
  totals: Map<string, number>;
  voters: Map<string, string>;
  perIp: Map<string, number>;
}

const globalStore = globalThis as unknown as { __prrDemo?: DemoState };

function state(): DemoState {
  globalStore.__prrDemo ??= { totals: new Map(), voters: new Map(), perIp: new Map() };
  return globalStore.__prrDemo;
}

const totalKey = (slug: string, period: string, participant: string) => `${slug}|${period}|${participant}`;

export function demoTotals(slug: RankingSlug, periodKey: string): Record<string, number> {
  const s = state();
  return Object.fromEntries(
    DEMO_PARTICIPANTS.map((p) => [
      p.id,
      s.totals.get(totalKey(slug, periodKey, p.id)) ?? DEMO_SEED_VOTES[slug][p.id] ?? 0,
    ]),
  );
}

export function demoMyVote(slug: RankingSlug, periodKey: string, voterKey: string): string | null {
  return state().voters.get(`${slug}|${periodKey}|${voterKey}`) ?? null;
}

export function demoCastVote(input: {
  slug: RankingSlug;
  periodKey: string;
  participantId: string;
  voterKey: string;
  ipHash: string;
  ipLimit: number;
}): VoteStatus {
  const s = state();
  if (!DEMO_PARTICIPANTS.some((p) => p.id === input.participantId)) return "invalid";
  const voterKey = `${input.slug}|${input.periodKey}|${input.voterKey}`;
  if (s.voters.has(voterKey)) return "duplicate";
  const ipKey = `${input.slug}|${input.periodKey}|${input.ipHash}`;
  if ((s.perIp.get(ipKey) ?? 0) >= input.ipLimit) return "ip_limit";

  const current = demoTotals(input.slug, input.periodKey)[input.participantId] ?? 0;
  s.totals.set(totalKey(input.slug, input.periodKey, input.participantId), current + 1);
  s.voters.set(voterKey, input.participantId);
  s.perIp.set(ipKey, (s.perIp.get(ipKey) ?? 0) + 1);
  return "ok";
}

export function __resetDemoStore() {
  delete globalStore.__prrDemo;
}
