"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const SRC = "/brand/luli-mascote.svg";

type HeroMascotProps = {
  label: string;
  next: string;
  phrases: { line1: string; line2: string }[];
  className?: string;
};

/**
 * Luli como mascote do hero: SVG vetorizado (cauda abanando, vapor, respiração)
 * + balão de fala com frases que se alternam e botão para trocar.
 * As frases mudam sozinhas a cada ~6 s (pausa no hover/foco e com reduced-motion).
 */
export function HeroMascot({ label, next, phrases, className }: HeroMascotProps) {
  const artRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = artRef.current;
    if (!el) return;
    let cancelled = false;
    fetch(SRC)
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error(String(res.status)))))
      .then((svg) => {
        if (cancelled) return;
        el.innerHTML = svg
          .replace(/<title[^>]*>.*?<\/title>/, "")
          .replace(/\s(role|aria-labelledby)="[^"]*"/g, "")
          .replace("<svg ", '<svg aria-hidden="true" focusable="false" ');
        el.dataset.loaded = "";
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (paused || phrases.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % phrases.length), 6000);
    return () => window.clearInterval(id);
  }, [paused, phrases.length]);

  const phrase = phrases[index] ?? phrases[0];

  return (
    <figure
      className={cn("hero-mascot relative flex flex-col items-center", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hero-bubble-wrap relative w-full max-w-[19rem] md:max-w-[22rem]">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="hero-sparkle absolute -top-3 -left-3 z-10 size-7">
          <path d="M12 0 Q13.4 10.6 24 12 Q13.4 13.4 12 24 Q10.6 13.4 0 12 Q10.6 10.6 12 0 Z" />
        </svg>
        <div key={index} className="hero-bubble relative rounded-2xl px-6 py-5 text-center">
          <p className="text-[1.35rem] leading-tight font-semibold tracking-[-0.03em] md:text-2xl">{phrase?.line1}</p>
          <p className="mt-1 text-[1.2rem] leading-tight tracking-[-0.02em] italic md:text-[1.35rem]">{phrase?.line2}</p>
        </div>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % phrases.length)}
          aria-label={next}
          title={next}
          className="hero-bubble-next absolute -top-4 -right-4 z-10 inline-flex size-11 items-center justify-center rounded-full"
        >
          <RefreshCw aria-hidden="true" className="size-[18px]" strokeWidth={2} />
        </button>
      </div>
      <div
        ref={artRef}
        role="img"
        aria-label={label}
        className="hero-mascot__art mt-6 aspect-square w-full max-w-[14rem] sm:max-w-[18rem] md:max-w-[22rem]"
      />
    </figure>
  );
}
