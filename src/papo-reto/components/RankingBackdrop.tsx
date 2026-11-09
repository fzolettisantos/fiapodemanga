"use client";

import { AnimatePresence, motion } from "motion/react";
import type { TabSlug } from "@/papo-reto/types";

/**
 * Arte de fundo das laterais de cada ranking (Falou Merda, Sábio e Bala do Véio), fixa nas bordas da tela.
 * Só aparece em telas largas (≥ 1280px), onde sobra espaço ao lado do conteúdo — no celular, nada é carregado.
 */
interface Side {
  src: string;
  /** Tamanho do arquivo, para calcular a largura máxima na altura da tela. */
  width: number;
  height: number;
}

interface Backdrop {
  left: Side;
  right: Side;
  /** Não ampliar além do tamanho original (artes concentradas na parte de cima, ex.: Bala do Véio). */
  noUpscale?: boolean;
}

const BACKDROPS: Partial<Record<TabSlug, Backdrop>> = {
  "falou-merda": {
    left: { src: "/papo-reto/rankings/falou-merda-bg-left.webp", width: 440, height: 849 },
    right: { src: "/papo-reto/rankings/falou-merda-bg-right.webp", width: 440, height: 849 },
  },
  "bala-do-veio": {
    left: { src: "/papo-reto/rankings/bala-do-veio-bg-left.webp", width: 520, height: 849 },
    right: { src: "/papo-reto/rankings/bala-do-veio-bg-right.webp", width: 611, height: 849 },
    noUpscale: true,
  },
  sabio: {
    left: { src: "/papo-reto/rankings/sabio-bg-left.webp", width: 440, height: 849 },
    right: { src: "/papo-reto/rankings/sabio-bg-right.webp", width: 540, height: 849 },
  },
};

// Espaço livre ao lado do conteúdo (64rem): a arte nunca passa por trás do texto.
const GAP = "calc((100vw - 64rem) / 2 + 0.5rem)";

/**
 * Altura da arte: a que faz a lateral caber inteira no espaço livre, entre 70% e 100% da tela.
 * Em telas largas a arte aparece inteira; nas menores, fica maior que o espaço e mostra só a parte de fora (os rostos).
 * Com noUpscale, também não passa do tamanho original do arquivo.
 */
const artHeight = (side: Side, noUpscale?: boolean) =>
  `clamp(70vh, calc(${GAP} * ${side.height} / ${side.width}), ${noUpscale ? `min(100vh, ${side.height}px)` : "100vh"})`;

function SideArt({ side, align, noUpscale }: { side: Side; align: "left" | "right"; noUpscale?: boolean }) {
  const height = artHeight(side, noUpscale);
  return (
    <div
      className={`absolute inset-y-0 ${align === "left" ? "left-0" : "right-0"}`}
      style={{
        width: `min(${GAP}, calc(${height} * ${side.width} / ${side.height}))`,
        // Some em direção ao conteúdo.
        maskImage: `linear-gradient(to ${align === "left" ? "right" : "left"}, #000 80%, transparent)`,
      }}
    >
      <div
        className="size-full bg-no-repeat"
        style={{
          backgroundImage: `url(${side.src})`,
          backgroundSize: `auto ${height}`,
          backgroundPosition: `${align} top`,
          // Presa no topo: quando não ocupa a altura toda, some em degradê embaixo.
          maskImage: `linear-gradient(to bottom, #000 calc(${height} * 0.85), transparent ${height})`,
        }}
      />
    </div>
  );
}

export function RankingBackdrop({ tab }: { tab: TabSlug }) {
  const art = BACKDROPS[tab];
  return (
    <AnimatePresence>
      {art ? (
        <motion.div
          key={tab}
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 hidden xl:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <SideArt side={art.left} align="left" noUpscale={art.noUpscale} />
          <SideArt side={art.right} align="right" noUpscale={art.noUpscale} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
