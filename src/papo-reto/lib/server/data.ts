import "server-only";
import { DEMO_PARTICIPANTS, DEMO_SHOTS, DEMO_STATIC_POSITIONS } from "@/papo-reto/config/demo";
import { RANKINGS } from "@/papo-reto/config/rankings";
import { getViewPeriod, getVotingPeriod, isPeriodKind } from "@/papo-reto/lib/period";
import { rankEntries, rankStatic } from "@/papo-reto/lib/ranking";
import type { BalaShot, AvatarPaths, Charge, Participant, PeriodKind, RankingResults, RankingSlug, RankingView, VotingPeriod } from "@/papo-reto/types";
import { RANKING_SLUGS } from "@/papo-reto/types";
import { demoMyVote, demoTotals } from "./demo-store";
import { isSupabaseConfigured } from "./env";
import { getServiceClient } from "./supabase";

const sumShots = (shots: Record<string, BalaShot[]>) =>
  Object.values(shots).reduce((total, list) => total + list.reduce((s, x) => s + x.quantity, 0), 0);

/** Rankings estáticos não têm período de votação. */
const STATIC_PERIOD: VotingPeriod = { kind: "all_time", key: "STATIC", label: "Ranking definido pelo programa" };

export interface RankingConfig {
  id: string | null;
  slug: RankingSlug;
  active: boolean;
  periodKind: PeriodKind;
  weekStartsOn: number;
}

interface RankingRow {
  id: string;
  slug: string;
  status: string;
  period_kind: string;
  week_starts_on: number | null;
}
interface ParticipantRow {
  id: string;
  slug: string;
  name: string;
  nickname: string | null;
  sort_order: number;
  avatar_paths: AvatarPaths | null;
}

export function mapParticipant(row: ParticipantRow): Participant {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    nickname: row.nickname,
    sortOrder: row.sort_order,
    avatarPaths: row.avatar_paths ?? {},
  };
}

function demoConfig(slug: RankingSlug): RankingConfig {
  return { id: null, slug, active: true, periodKind: RANKINGS[slug].defaultPeriod, weekStartsOn: 1 };
}

function mapRanking(row: RankingRow): RankingConfig {
  const slug = row.slug as RankingSlug;
  return {
    id: row.id,
    slug,
    active: row.status === "active",
    periodKind: isPeriodKind(row.period_kind) ? row.period_kind : RANKINGS[slug].defaultPeriod,
    weekStartsOn: row.week_starts_on ?? 1,
  };
}

export async function getRankingConfigs(slugs: readonly RankingSlug[] = RANKING_SLUGS): Promise<RankingConfig[]> {
  if (!isSupabaseConfigured()) return slugs.map(demoConfig);
  const { data, error } = await getServiceClient()
    .from("rankings")
    .select("id, slug, status, period_kind, week_starts_on")
    .in("slug", slugs as string[]);
  if (error) throw new Error(`Erro ao carregar rankings: ${error.message}`);
  const rows = (data ?? []) as RankingRow[];
  return slugs.map((slug) => {
    const row = rows.find((r) => r.slug === slug);
    // Ranking sem linha no banco fica desativado (não aceita votos).
    return row ? mapRanking(row) : { ...demoConfig(slug), active: false };
  });
}

/**
 * Resultados de um ou mais rankings. Rankings com votação: recorte `view` (semana, mês ou temporada),
 * com o voto do visitante na semana atual. Rankings estáticos ignoram o recorte.
 */
export async function getRankingResults(
  slugs: readonly RankingSlug[] = RANKING_SLUGS,
  options: { voterKey?: string | null; now?: Date; view?: RankingView } = {},
): Promise<RankingResults[]> {
  const now = options.now ?? new Date();
  const view = options.view ?? "week";
  const updatedAt = now.toISOString();
  const configs = await getRankingConfigs(slugs);

  if (!isSupabaseConfigured()) {
    return configs.map((config) => {
      if (RANKINGS[config.slug].mode === "static") {
        const positions = DEMO_STATIC_POSITIONS[config.slug] ?? {};
        return {
          slug: config.slug,
          mode: "static",
          view: "season",
          active: config.active,
          period: STATIC_PERIOD,
          totalVotes: 0,
          entries: rankStatic(DEMO_PARTICIPANTS.map((p) => ({ participant: p, position: positions[p.id] ?? 0 }))),
          isDemo: true,
          updatedAt,
          standingsUpdatedAt: null,
          shots: DEMO_SHOTS,
          totalShots: sumShots(DEMO_SHOTS),
        } satisfies RankingResults;
      }
      const votingPeriod = getVotingPeriod("weekly", now, { weekStartsOn: config.weekStartsOn });
      const period = getViewPeriod(view, now, { weekStartsOn: config.weekStartsOn });
      const totals = demoTotals(config.slug, period.key, view);
      const entries = rankEntries(DEMO_PARTICIPANTS.map((p) => ({ participant: p, votes: totals[p.id] ?? 0 })));
      return {
        slug: config.slug,
        mode: "vote" as const,
        view,
        active: config.active,
        period,
        votingPeriod,
        totalVotes: entries.reduce((s, e) => s + e.votes, 0),
        entries,
        isDemo: true,
        updatedAt,
        myVote: options.voterKey ? demoMyVote(config.slug, votingPeriod.key, options.voterKey) : undefined,
      };
    });
  }

  const sb = getServiceClient();
  const { data: participantRows, error: participantError } = await sb
    .from("participants")
    .select("id, slug, name, nickname, sort_order, avatar_paths")
    .eq("active", true);
  if (participantError) throw new Error(`Erro ao carregar participantes: ${participantError.message}`);
  const participants = ((participantRows ?? []) as ParticipantRow[]).map(mapParticipant);

  return Promise.all(
    configs.map(async (config) => {
      if (RANKINGS[config.slug].mode === "static") {
        let rows: { participant_id: string; position: number; updated_at: string }[] = [];
        if (config.id) {
          const { data, error } = await sb
            .from("static_standings")
            .select("participant_id, position, updated_at")
            .eq("ranking_id", config.id);
          if (error) throw new Error(`Erro ao carregar o ranking do programa: ${error.message}`);
          rows = data ?? [];
        }
        const positions = new Map(rows.map((r) => [r.participant_id, r.position]));
        const shots: Record<string, BalaShot[]> = {};
        const stamps = rows.map((r) => r.updated_at);
        if (config.id) {
          const { data, error } = await sb
            .from("static_shots")
            .select("id, participant_id, quantity, location, place, weapon, updated_at")
            .eq("ranking_id", config.id)
            .order("created_at");
          if (error) throw new Error(`Erro ao carregar os tiros: ${error.message}`);
          for (const row of (data ?? []) as { id: string; participant_id: string; quantity: number; location: string; place: string | null; weapon: string; updated_at: string }[]) {
            (shots[row.participant_id] ??= []).push({ id: row.id, quantity: row.quantity, location: row.location, place: row.place, weapon: row.weapon });
            stamps.push(row.updated_at);
          }
        }
        const latest = stamps.sort().at(-1) ?? null;
        return {
          slug: config.slug,
          mode: "static",
          view: "season",
          active: config.active,
          period: STATIC_PERIOD,
          totalVotes: 0,
          entries: rankStatic(participants.map((p) => ({ participant: p, position: positions.get(p.id) ?? 0 }))),
          isDemo: false,
          updatedAt,
          standingsUpdatedAt: latest,
          shots,
          totalShots: sumShots(shots),
        } satisfies RankingResults;
      }
      const votingPeriod = getVotingPeriod("weekly", now, { weekStartsOn: config.weekStartsOn });
      const period = getViewPeriod(view, now, { weekStartsOn: config.weekStartsOn });
      const totals = new Map<string, number>();
      let myVote: string | null | undefined;
      if (config.id) {
        const [totalsRes, mineRes] = await Promise.all([
          sb.from("vote_totals").select("participant_id, votes").eq("ranking_id", config.id).eq("period_key", period.key),
          options.voterKey
            ? sb
                .from("votes")
                .select("participant_id")
                .eq("ranking_id", config.id)
                .eq("period_key", votingPeriod.key)
                .eq("voter_key", options.voterKey)
                .maybeSingle()
            : Promise.resolve(null),
        ]);
        if (totalsRes.error) throw new Error(`Erro ao carregar votos: ${totalsRes.error.message}`);
        for (const row of (totalsRes.data ?? []) as { participant_id: string; votes: number }[]) {
          totals.set(row.participant_id, row.votes);
        }
        if (mineRes) myVote = (mineRes.data as { participant_id: string } | null)?.participant_id ?? null;
      }
      const entries = rankEntries(participants.map((p) => ({ participant: p, votes: totals.get(p.id) ?? 0 })));
      return {
        slug: config.slug,
        mode: "vote",
        view,
        active: config.active,
        period,
        votingPeriod,
        totalVotes: entries.reduce((s, e) => s + e.votes, 0),
        entries,
        isDemo: false,
        updatedAt,
        myVote,
      } satisfies RankingResults;
    }),
  );
}

interface ChargeRow {
  id: string;
  title: string;
  image_url: string;
  description: string | null;
  credits: string;
  published_on: string;
  width: number | null;
  height: number | null;
}

/** Charges publicadas. No modo demonstração não há charges (nada de imagens aleatórias). */
export async function getPublishedCharges(): Promise<Charge[]> {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await getServiceClient()
    .from("charges")
    .select("id, title, image_url, description, credits, published_on, width, height")
    .eq("published", true)
    .order("published_on", { ascending: false })
    .limit(60);
  if (error) throw new Error(`Erro ao carregar charges: ${error.message}`);
  return ((data ?? []) as ChargeRow[]).map((row) => ({
    id: row.id,
    title: row.title,
    imageUrl: row.image_url,
    description: row.description,
    credits: row.credits,
    publishedOn: row.published_on,
    width: row.width,
    height: row.height,
  }));
}
