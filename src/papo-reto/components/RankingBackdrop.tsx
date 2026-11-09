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
  /**
   * Não ampliar além do tamanho original: a arte fica presa no topo e some em degradê embaixo.
   * Para artes concentradas na parte de cima (ex.: Bala do Véio), que cortariam os balões se esticadas.
   */
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
    left: { src: "/papo-reto/rankings/sabio-bg-left.webp", width: 450, height: 941 },
    right: { src: "/papo-reto/rankings/sabio-bg-right.webp", width: 482, height: 941 },
  },
};

// Largura de cada lateral: só o espaço livre ao lado do conteúdo (64rem), para nunca ficar atrás do texto,
// e no máximo a largura da arte na altura da tela. Em telas menores aparece só a parte de fora (os rostos).
const artHeight = (side: Side, noUpscale?: boolean) => (noUpscale ? `min(100vh, ${side.height}px)` : "100vh");
const sideWidth = (side: Side, noUpscale?: boolean) =>
  `min(calc((100vw - 64rem) / 2 + 0.5rem), calc(${artHeight(side, noUpscale)} * ${side.width} / ${side.height}))`;

function SideArt({ side, align, noUpscale }: { side: Side; align: "left" | "right"; noUpscale?: boolean }) {
  return (
    <div
      className={`absolute inset-y-0 ${align === "left" ? "left-0" : "right-0"}`}
      style={{
        width: sideWidth(side, noUpscale),
        // Some em direção ao conteúdo.
        maskImage: `linear-gradient(to ${align === "left" ? "right" : "left"}, #000 80%, transparent)`,
      }}
    >
      <div
        className="size-full bg-no-repeat"
        style={{
          backgroundImage: `url(${side.src})`,
          backgroundSize: `auto ${noUpscale ? `min(100%, ${side.height}px)` : "100%"}`,
          backgroundPosition: `${align} ${noUpscale ? "top" : "center"}`,
          // Sem ampliar, a arte termina antes do fim da tela: some em degradê embaixo.
          maskImage: noUpscale ? `linear-gradient(to bottom, #000 calc(min(100%, ${side.height}px) * 0.8), transparent min(100%, ${side.height}px))` : undefined,
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
