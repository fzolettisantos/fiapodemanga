"use client";

import { Share2 } from "lucide-react";
import { motion } from "motion/react";
import { pickPhrase, RANKINGS } from "@/config/rankings";
import type { RankedEntry, RankingSlug } from "@/types";
import { CharacterAvatar } from "./CharacterAvatar";
import { RankingPosition, type Move } from "./RankingPosition";
import { VoteButton, type VoteButtonState } from "./VoteButton";
import { VoteProgress } from "./VoteProgress";

export function RankingCard({
  slug,
  entry,
  totalParticipants,
  voteState,
  move,
  eager,
  onVote,
  onShare,
}: {
  slug: RankingSlug;
  entry: RankedEntry;
  totalParticipants: number;
  voteState: VoteButtonState;
  move?: Move;
  eager?: boolean;
  onVote: () => void;
  onShare: () => void;
}) {
  const copy = RANKINGS[slug];
  const leader = entry.state === "top";
  const badge = entry.state === "top" ? copy.badges.top : entry.state === "bottom" ? copy.badges.bottom : null;
  const barColor = leader ? "#FFD23F" : copy.kind === "positive" ? "#32D583" : "#F04438";
  const { participant } = entry;

  return (
    <motion.li
      layout="position"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="list-none"
    >
      <article
        aria-label={`${entry.position}º lugar${entry.tied ? " (empatado)" : ""}: ${participant.name}`}
        className={`relative rounded-2xl border p-3 sm:p-4 ${
          leader ? "border-yellow bg-gradient-to-br from-yellow/12 to-surface" : "border-line bg-surface"
        } ${move ? "animate-flash" : ""}`}
      >
        <div className="flex items-center gap-2.5 sm:gap-4">
          <RankingPosition position={entry.position} tied={entry.tied} leader={leader} move={move} />
          <CharacterAvatar
            characterId={participant.slug}
            rankingType={slug}
            position={entry.position}
            totalParticipants={totalParticipants}
            expression={entry.state}
            size={leader ? "lg" : "md"}
            name={participant.name}
            sources={participant.avatarPaths}
            eager={eager}
          />
          <div className="min-w-0 flex-1">
            {badge ? (
              <p
                className={`mb-0.5 inline-block rounded px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${
                  leader ? "bg-yellow text-ink" : "bg-surface-2 text-muted"
                }`}
              >
                {badge}
              </p>
            ) : null}
            <h3 className="truncate font-display text-[22px] uppercase leading-tight sm:text-2xl">{participant.name}</h3>
            <p className="text-[14px] leading-snug text-muted">“{pickPhrase(slug, entry.state, participant.slug, entry.position)}”</p>
          </div>
        </div>

        <VoteProgress votes={entry.votes} percent={entry.percent} color={barColor} />

        <div className="mt-3 flex gap-2">
          <div className="flex-1">
            <VoteButton state={voteState} label={copy.cta} participantName={participant.name} onVote={onVote} />
          </div>
          <button
            type="button"
            onClick={onShare}
            className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-2 text-white transition-colors hover:border-yellow"
            aria-label={`Compartilhar card de ${participant.name}`}
          >
            <Share2 aria-hidden className="size-5" />
          </button>
        </div>
      </article>
    </motion.li>
  );
}
