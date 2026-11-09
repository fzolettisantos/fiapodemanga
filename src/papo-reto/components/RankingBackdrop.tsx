"use client";

import { AnimatePresence, motion } from "motion/react";
import type { TabSlug } from "@/papo-reto/types";

/**
 * Arte de fundo das laterais de cada ranking (Troféu Falou Merda e O Sábio da Resenha), fixa nas bordas da tela.
 * Só aparece em telas largas (≥ 1280px), onde sobra espaço ao lado do conteúdo — no celular, nada é carregado.
 */
interface Side {
  src: string;
  /** Tamanho do arquivo, para calcular a largura máxima na altura da tela. */
  width: number;
  height: number;
}

const BACKDROPS: Partial<Record<TabSlug, { left: Side; right: Side }>> = {
  "falou-merda": {
    left: { src: "/papo-reto/rankings/falou-merda-bg-left.webp", width: 440, height: 849 },
    right: { src: "/papo-reto/rankings/falou-merda-bg-right.webp", width: 440, height: 849 },
  },
  sabio: {
    left: { src: "/papo-reto/rankings/sabio-bg-left.webp", width: 450, height: 941 },
    right: { src: "/papo-reto/rankings/sabio-bg-right.webp", width: 482, height: 941 },
  },
};

// Largura de cada lateral: só o espaço livre ao lado do conteúdo (64rem), para nunca ficar atrás do texto,
// e no máximo a largura da arte na altura da tela. Em telas menores aparece só a parte de fora (os rostos).
const sideWidth = (side: Side) => `min(calc((100vw - 64rem) / 2 + 0.5rem), calc(100vh * ${side.width} / ${side.height}))`;

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
          <div
            className="absolute inset-y-0 left-0 bg-no-repeat"
            style={{
              width: sideWidth(art.left),
              backgroundImage: `url(${art.left.src})`,
              backgroundSize: "auto 100%",
              backgroundPosition: "left center",
              maskImage: "linear-gradient(to right, #000 80%, transparent)",
            }}
          />
          <div
            className="absolute inset-y-0 right-0 bg-no-repeat"
            style={{
              width: sideWidth(art.right),
              backgroundImage: `url(${art.right.src})`,
              backgroundSize: "auto 100%",
              backgroundPosition: "right center",
              maskImage: "linear-gradient(to left, #000 80%, transparent)",
            }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
