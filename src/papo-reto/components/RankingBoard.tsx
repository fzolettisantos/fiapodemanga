"use client";

import { AlertTriangle, RefreshCw, Users } from "lucide-react";
import { LayoutGroup } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { RANKINGS } from "@/papo-reto/config/rankings";
import { computeMoves, formatNumber, mergeLiveNumbers, sameStanding } from "@/papo-reto/lib/ranking";
import type { RankedEntry, RankingResults, RankingSlug } from "@/papo-reto/types";
import type { Move } from "./RankingPosition";
import { RankingCard } from "./RankingCard";
import type { VoteButtonState } from "./VoteButton";

const CYCLE_MS = 8_000;
const IDLE_MS = 5_000;

export function RankingBoard({
  slug,
  results,
  error,
  pendingVote,
  onVote,
  onShareParticipant,
  onRetry,
}: {
  slug: RankingSlug;
  results: RankingResults | null;
  error: boolean;
  pendingVote: string | null;
  onVote: (participantId: string) => Promise<boolean>;
  onShareParticipant: (entry: RankedEntry) => void;
  onRetry: () => void;
}) {
  const copy = RANKINGS[slug];
  const live = results?.entries ?? null;

  // Classificação exibida: só muda de ordem após o voto ou em ciclos, com a pessoa ociosa.
  const [shown, setShown] = useState<RankedEntry[] | null>(live);
  const [moves, setMoves] = useState<Record<string, Move>>({});
  const lastInteraction = useRef(0);
  const applyOnNextData = useRef(false);
  const liveRef = useRef(live);
  const shownRef = useRef(shown);
  useEffect(() => {
    liveRef.current = live;
    shownRef.current = shown;
  });

  const applyStanding = useCallback((showMoves = true) => {
    const next = liveRef.current;
    const current = shownRef.current;
    if (!next) return;
    if (current && sameStanding(current, next)) return;
    setMoves(current && showMoves ? computeMoves(current, next) : {});
    setShown(next);
  }, []);

  // Dados novos: aplica a nova ordem na hora se veio do próprio voto ou se a lista mudou de composição.
  const displayed = shown && live ? mergeLiveNumbers(shown, live) : null;
  const needsImmediate = Boolean(live && (!shown || !displayed));
  useEffect(() => {
    // Sem interação ainda (ex.: primeira resposta da API após o HTML em cache), aplica direto.
    if (applyOnNextData.current) {
      applyOnNextData.current = false;
      applyStanding(true);
    } else if (needsImmediate || lastInteraction.current === 0) {
      // Ajuste silencioso: o visitante não viu a ordem antiga, então não há "subiu/caiu" a mostrar.
      applyStanding(false);
    }
  }, [live, needsImmediate, applyStanding]);

  // Ciclo de reorganização controlada.
  useEffect(() => {
    const id = window.setInterval(() => {
      if (Date.now() - lastInteraction.current > IDLE_MS) applyStanding();
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [applyStanding]);

  // Os indicadores de subida/descida somem depois de alguns segundos.
  useEffect(() => {
    if (Object.keys(moves).length === 0) return;
    const id = window.setTimeout(() => setMoves({}), 3_500);
    return () => window.clearTimeout(id);
  }, [moves]);

  const markInteraction = useCallback(() => {
    lastInteraction.current = Date.now();
  }, []);

  const handleVote = async (participantId: string) => {
    markInteraction();
    applyOnNextData.current = true;
    const ok = await onVote(participantId);
    if (!ok) applyOnNextData.current = false;
  };

  const entries = displayed ?? live ?? [];
  const pendingReorder = Boolean(live && shown && !sameStanding(shown, live));
  const accent = copy.kind === "positive" ? "text-green" : "text-red";

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
      <header className="mb-4 lg:sticky lg:top-24 lg:self-start">
        <p className={`text-xs font-extrabold uppercase tracking-[0.18em] ${accent}`}>
          {copy.kind === "positive" ? "Ranking positivo · topo é moral" : "Ranking negativo · topo é vergonha"}
        </p>
        <h2 id={`title-${slug}`} className="mt-1 font-display text-[34px] uppercase leading-none sm:text-5xl lg:text-6xl">
          {copy.title}
        </h2>
        <p className="mt-1.5 text-lg font-bold leading-snug text-yellow">{copy.subtitle}</p>
        <p className="mt-1.5 max-w-2xl text-[15px] leading-snug text-muted">{copy.description}</p>
        {results ? (
          <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-semibold text-muted">
            <span className="inline-flex items-center gap-1">
              <Users aria-hidden className="size-4" />
              <span className="tabular text-white">{formatNumber(results.totalVotes)}</span> votos
            </span>
            <span aria-hidden>·</span>
            <span>{results.period.label}</span>
            {results.isDemo ? (
              <span className="rounded bg-yellow px-1.5 py-0.5 text-[11px] font-extrabold uppercase text-ink">Dados simulados</span>
            ) : null}
          </p>
        ) : null}
        {results && !results.active ? (
          <p className="mt-3 rounded-xl border border-line bg-surface px-3 py-2 text-sm font-semibold" role="note">
            A votação deste ranking está pausada. Os resultados continuam visíveis.
          </p>
        ) : null}
      </header>

      <div>
      {error && !results ? (
        <div className="rounded-2xl border border-red/50 bg-surface p-5 text-center" role="alert">
          <AlertTriangle aria-hidden className="mx-auto size-8 text-red" />
          <p className="mt-2 font-bold">Deu ruim ao carregar o ranking.</p>
          <p className="text-sm text-muted">O VAR está analisando. Tente de novo.</p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-yellow px-5 font-extrabold uppercase text-ink"
          >
            <RefreshCw aria-hidden className="size-4" /> Tentar de novo
          </button>
        </div>
      ) : !results ? (
        <ul className="space-y-3" aria-busy="true" aria-label="Carregando ranking">
          {[0, 1, 2].map((i) => (
            <li key={i} className="h-[168px] animate-pulse rounded-2xl border border-line bg-surface" />
          ))}
        </ul>
      ) : entries.length === 0 ? (
        <div className="rounded-2xl border border-line bg-surface p-6 text-center">
          <p className="font-bold">Ainda não tem ninguém escalado neste ranking.</p>
          <p className="text-sm text-muted">Os participantes aparecem aqui assim que forem cadastrados.</p>
        </div>
      ) : (
        <>
          {pendingReorder ? (
            <button
              type="button"
              onClick={() => applyStanding(true)}
              className="mb-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-yellow/60 bg-yellow/10 px-4 text-sm font-bold text-yellow"
            >
              <RefreshCw aria-hidden className="size-4" /> O ranking mudou — atualizar posições
            </button>
          ) : null}
          <LayoutGroup id={slug}>
            <ol
              className="space-y-3"
              aria-labelledby={`title-${slug}`}
              onPointerDown={markInteraction}
              onFocusCapture={markInteraction}
              onTouchStart={markInteraction}
            >
              {entries.map((entry, index) => {
                const id = entry.participant.id;
                let voteState: VoteButtonState = "idle";
                if (!results.active) voteState = "closed";
                else if (pendingVote === id) voteState = "loading";
                else if (results.myVote === id) voteState = "voted";
                else if (results.myVote || pendingVote) voteState = "locked";
                return (
                  <RankingCard
                    key={id}
                    slug={slug}
                    entry={entry}
                    totalParticipants={entries.length}
                    voteState={voteState}
                    move={moves[id]}
                    eager={index < 2}
                    onVote={() => handleVote(id)}
                    onShare={() => onShareParticipant(entry)}
                  />
                );
              })}
            </ol>
          </LayoutGroup>
          <p className="mt-3 text-xs text-muted">
            Um voto por ranking a cada período. As posições se reorganizam após o seu voto ou a cada poucos segundos,
            sem pular cards enquanto você escolhe.
          </p>
        </>
      )}
      </div>
    </div>
  );
}
