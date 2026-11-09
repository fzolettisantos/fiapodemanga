import type { PeriodKind, VotingPeriod } from "@/types";

export const PERIOD_KINDS: PeriodKind[] = ["daily", "weekly", "monthly", "all_time"];
export const DEFAULT_TIME_ZONE = "America/Sao_Paulo";

const MONTHS = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

function localDate(now: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { year: get("year"), month: get("month"), day: get("day") };
}

const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
const short = (d: Date) => `${pad(d.getUTCDate())}/${pad(d.getUTCMonth() + 1)}`;

export function isPeriodKind(value: unknown): value is PeriodKind {
  return typeof value === "string" && (PERIOD_KINDS as string[]).includes(value);
}

/**
 * Período de votação atual, calculado no fuso do programa.
 * A chave identifica o período no banco (um voto por ranking, por período, por visitante).
 */
export function getVotingPeriod(
  kind: PeriodKind,
  now: Date = new Date(),
  options: { weekStartsOn?: number; timeZone?: string } = {},
): VotingPeriod {
  const { weekStartsOn = 1, timeZone = DEFAULT_TIME_ZONE } = options;
  const { year, month, day } = localDate(now, timeZone);
  const today = new Date(Date.UTC(year, month - 1, day));

  switch (kind) {
    case "daily":
      return { kind, key: `D${iso(today)}`, label: `Votação de hoje (${short(today)})` };
    case "monthly":
      return { kind, key: `M${year}-${pad(month)}`, label: `Votação de ${MONTHS[month - 1]} de ${year}` };
    case "all_time":
      return { kind, key: "ALL", label: "Votação permanente" };
    case "weekly":
    default: {
      const start = new Date(today);
      const offset = (today.getUTCDay() - (((weekStartsOn % 7) + 7) % 7) + 7) % 7;
      start.setUTCDate(start.getUTCDate() - offset);
      const end = new Date(start);
      end.setUTCDate(end.getUTCDate() + 6);
      return { kind: "weekly", key: `W${iso(start)}`, label: `Votação da semana · ${short(start)} a ${short(end)}` };
    }
  }
}
