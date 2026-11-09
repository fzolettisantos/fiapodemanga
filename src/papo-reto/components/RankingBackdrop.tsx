"use client";

import { AnimatePresence, motion } from "motion/react";
import type { TabSlug } from "@/papo-reto/types";

/**
 * Arte de fundo das laterais de cada ranking (ex.: Troféu Falou Merda), fixa nas bordas da tela.
 * Só aparece em telas largas (≥ 1280px), onde sobra espaço ao lado do conteúdo — no celular, nada é carregado.
 */
const BACKDROPS: Partial<Record<TabSlug, { left: string; right: string }>> = {
  "falou-merda": {
    left: "/papo-reto/rankings/falou-merda-bg-left.webp",
    right: "/papo-reto/rankings/falou-merda-bg-right.webp",
  },
};

// Largura de cada lateral: só o espaço livre ao lado do conteúdo (64rem), para nunca ficar atrás do texto.
// Em telas menores aparece só a parte de fora da arte (os rostos); em telas largas, a arte inteira.
const SIDE = "min(calc((100vw - 64rem) / 2 + 0.5rem), calc(100vh * 440 / 849))";

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
              width: SIDE,
              backgroundImage: `url(${art.left})`,
              backgroundSize: "auto 100%",
              backgroundPosition: "left center",
              maskImage: "linear-gradient(to right, #000 80%, transparent)",
            }}
          />
          <div
            className="absolute inset-y-0 right-0 bg-no-repeat"
            style={{
              width: SIDE,
              backgroundImage: `url(${art.right})`,
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
