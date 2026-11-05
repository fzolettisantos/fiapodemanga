"use client";

import { useEffect } from "react";

/**
 * Microinterações globais (um único listener por tipo):
 *  - Botões magnéticos ([data-magnetic]) — só com ponteiro fino e sem reduced-motion.
 *  - Header que se recolhe ao rolar para baixo e volta ao rolar para cima.
 */
export function Interactions() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    // Header: direção da rolagem
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (y < 120) root.dataset.scroll = "top";
        else if (delta > 6) root.dataset.scroll = "down";
        else if (delta < -6) root.dataset.scroll = "up";
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Magnético
    let active: HTMLElement | null = null;
    const onMove = (event: PointerEvent) => {
      if (reduced.matches || !finePointer.matches) return;
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (active && active !== target) {
        active.style.translate = "";
        active = null;
      }
      if (!target) return;
      active = target;
      const rect = target.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      target.style.translate = `${(x * 0.22).toFixed(1)}px ${(y * 0.32).toFixed(1)}px`;
    };
    const onLeave = () => {
      if (active) active.style.translate = "";
      active = null;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
