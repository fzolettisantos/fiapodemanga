"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { LuliHat } from "./LuliHat";

const SRC = "/brand/luli-mascote.svg";
const LULI_VIEWBOX = "451 209 613 613";

type Line = { line1: string; line2: string };

type HeroMascotProps = {
  label: string;
  next: string;
  phrases: Line[];
  /** Falas da cena ao rolar: [começo, montagem, site no ar] */
  scene: Line[];
  live: string;
  className?: string;
};

/* ------------------------------------------------------------------ */
/* Cena "A Luli monta o site" (controlada pela rolagem)                */
/* ------------------------------------------------------------------ */

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const easeOut = (k: number) => 1 - Math.pow(1 - k, 3);
const easeInOut = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
const easeOutBack = (k: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2);
};
const easeOutBounce = (k: number) => {
  const n = 7.5625;
  const d = 2.75;
  if (k < 1 / d) return n * k * k;
  if (k < 2 / d) return n * (k -= 1.5 / d) * k + 0.75;
  if (k < 2.5 / d) return n * (k -= 2.25 / d) * k + 0.9375;
  return n * (k -= 2.625 / d) * k + 0.984375;
};

/** Peças do site: de onde voam (fração da largura/altura da cena) e quando chegam. */
const PIECES: Record<string, { from: [number, number, number, number]; at: [number, number] }> = {
  frame: { from: [0.45, -0.7, 14, 0.55], at: [0.2, 0.38] },
  nav: { from: [-0.5, -0.45, -12, 0.8], at: [0.3, 0.42] },
  h1: { from: [0.65, 0.1, 10, 0.7], at: [0.34, 0.46] },
  h2: { from: [-0.55, 0.3, -8, 0.7], at: [0.38, 0.5] },
  btn: { from: [0.15, 0.75, 22, 0.5], at: [0.44, 0.54] },
  c1: { from: [-0.75, 0.5, -16, 0.6], at: [0.46, 0.58] },
  c2: { from: [0.2, 0.9, 12, 0.6], at: [0.5, 0.61] },
  c3: { from: [0.85, 0.35, 18, 0.6], at: [0.53, 0.64] },
  phone: { from: [-0.9, 0.6, -20, 0.7], at: [0.42, 0.6] },
};

export function HeroMascot({ label, next, phrases, scene, live, className }: HeroMascotProps) {
  const figureRef = useRef<HTMLElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stage, setStage] = useState(0);

  // Carrega a Luli (SVG inline, para animar cauda e vapor por CSS)
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

  // Frases que se alternam (só enquanto a cena não começou)
  useEffect(() => {
    if (paused || stage > 0 || phrases.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % phrases.length), 6000);
    return () => window.clearInterval(id);
  }, [paused, stage, phrases.length]);

  // Cena controlada pela rolagem
  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = figure.closest<HTMLElement>(".hero");
    const stageEl = hero?.querySelector<HTMLElement>(".hero-stage");
    const q = <T extends HTMLElement | SVGElement>(sel: string) => figure.querySelector<T>(sel);
    const luli = q<HTMLElement>(".scene-luli");
    const bubble = q<HTMLElement>(".hero-bubble-wrap");
    const hat = q<SVGGElement>(".luli-hat");
    const stamp = q<HTMLElement>(".scene-stamp");
    const sparks = Array.from(figure.querySelectorAll<HTMLElement>(".scene-spark"));
    const pieces = Object.keys(PIECES).map((key) => ({ key, el: q<HTMLElement>(`[data-piece="${key}"]`) }));
    figure.dataset.scene = "on";

    let frame = 0;
    let lastStage = -1;

    const progress = () => {
      const vh = window.innerHeight;
      if (hero && stageEl && getComputedStyle(stageEl).position === "sticky") {
        const r = hero.getBoundingClientRect();
        return clamp(-r.top / Math.max(1, r.height - vh));
      }
      // Sem fixar o hero (celular, telas baixas): a cena acompanha a Luli passando pela tela
      const r = figure.getBoundingClientRect();
      return clamp((vh * 0.7 - r.top) / (vh * 0.6));
    };

    const apply = () => {
      frame = 0;
      const p = progress();
      const W = figure.clientWidth;
      const H = figure.clientHeight;
      const narrow = W < 500; // celular: menos deslocamento para nada sair da tela
      const lx = narrow ? 0.24 : 0.3;
      const bx = narrow ? 0.08 : 0.26;
      hero?.style.setProperty("--scene-p", p.toFixed(3));

      // Luli: dá espaço para o site (vai para a esquerda) e pula quando ele fica pronto
      const shift = easeInOut(span(p, 0.18, 0.5));
      const jumpK = span(p, 0.74, 0.88);
      const jump = Math.sin(Math.PI * jumpK) * 0.09 * H;
      const squash = jumpK > 0 && jumpK < 1 ? 1 + Math.sin(Math.PI * jumpK) * 0.04 : 1;
      if (luli) luli.style.transform = `translate(${-lx * W * shift}px, ${0.06 * H * shift - jump}px) scale(${(1 - 0.24 * shift) * squash}, ${(1 - 0.24 * shift) / squash})`;
      if (bubble) bubble.style.transform = `translate(${-bx * W * shift}px, ${0.04 * H * shift}px) scale(${1 - 0.1 * shift})`;

      // Capacete cai na cabeça
      const hk = span(p, 0.07, 0.2);
      if (hat) {
        hat.style.opacity = hk > 0 ? "1" : "0";
        hat.style.transform = `translateY(${(1 - easeOutBounce(hk)) * -620}px) rotate(${(1 - hk) * -28}deg)`;
      }

      // Peças do site voando até o lugar
      for (const { key, el } of pieces) {
        if (!el) continue;
        const { from, at } = PIECES[key]!;
        const k = span(p, at[0], at[1]);
        const e = easeOutBack(k);
        const [dx, dy, rot, sc] = from;
        el.style.opacity = String(clamp(k * 3));
        el.style.transform = `translate(${dx * W * (1 - e)}px, ${dy * H * (1 - e)}px) rotate(${rot * (1 - e)}deg) scale(${sc + (1 - sc) * e})`;
        el.style.filter = k < 1 ? `grayscale(${1 - easeOut(k)})` : "";
      }

      // Selo "no ar" e brilhos
      const sk = span(p, 0.68, 0.76);
      if (stamp) {
        stamp.style.opacity = String(clamp(sk * 4));
        stamp.style.transform = `rotate(-10deg) scale(${sk > 0 ? 2.4 - 1.4 * easeOutBack(sk) : 2.4})`;
      }
      const bk = span(p, 0.72, 0.95);
      sparks.forEach((s, i) => {
        const local = clamp(bk * 1.6 - i * 0.18);
        s.style.opacity = String(Math.sin(Math.PI * local));
        s.style.transform = `scale(${0.2 + Math.sin(Math.PI * local) * 1.1}) rotate(${local * 90}deg)`;
      });

      const next = p < 0.06 ? 0 : p < 0.24 ? 1 : p < 0.68 ? 2 : 3;
      if (next !== lastStage) {
        lastStage = next;
        setStage(next);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      delete figure.dataset.scene;
    };
  }, []);

  const phrase = stage > 0 ? (scene[stage - 1] ?? scene[0]) : (phrases[index] ?? phrases[0]);

  return (
    <figure
      ref={figureRef}
      className={cn("hero-mascot relative flex flex-col items-center", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Site sendo montado (decorativo) */}
      <div aria-hidden="true" className="scene-site pointer-events-none absolute inset-0">
        <div data-piece="frame" className="mk-browser">
          <div className="mk-bar">
            <i />
            <i />
            <i />
            <b />
          </div>
          <div className="mk-body">
            <div data-piece="nav" className="mk-nav">
              <span className="mk-logo" />
              <span />
              <span />
              <span />
            </div>
            <div data-piece="h1" className="mk-line mk-line--xl" />
            <div data-piece="h2" className="mk-line mk-line--md" />
            <div data-piece="btn" className="mk-btn" />
            <div className="mk-cards">
              {["c1", "c2", "c3"].map((c) => (
                <div key={c} data-piece={c} className="mk-card">
                  <span className="mk-card__img" />
                  <span className="mk-card__line" />
                </div>
              ))}
            </div>
          </div>
          <div className="scene-stamp">
            <span className="scene-stamp__dot" />
            {live}
          </div>
        </div>
        <div data-piece="phone" className="mk-phone">
          <span className="mk-phone__notch" />
          <span className="mk-phone__hero" />
          <span className="mk-phone__row" />
          <span className="mk-phone__row" />
          <span className="mk-phone__row" />
          <span className="mk-phone__btn" />
        </div>
        {[0, 1, 2].map((i) => (
          <svg key={i} viewBox="0 0 24 24" className={`scene-spark scene-spark--${i}`}>
            <path d="M12 0 Q13.4 10.6 24 12 Q13.4 13.4 12 24 Q10.6 13.4 0 12 Q10.6 10.6 12 0 Z" />
          </svg>
        ))}
      </div>

      <div className="hero-bubble-wrap relative z-20 w-full max-w-[19rem] md:max-w-[22rem]">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="hero-sparkle absolute -top-3 -left-3 z-10 size-7">
          <path d="M12 0 Q13.4 10.6 24 12 Q13.4 13.4 12 24 Q10.6 13.4 0 12 Q10.6 10.6 12 0 Z" />
        </svg>
        <div key={stage > 0 ? `s${stage}` : index} className="hero-bubble relative rounded-2xl px-6 py-5 text-center">
          <p className="text-[1.35rem] leading-tight font-semibold tracking-[-0.03em] md:text-2xl">{phrase?.line1}</p>
          <p className="mt-1 text-[1.2rem] leading-tight tracking-[-0.02em] italic md:text-[1.35rem]">{phrase?.line2}</p>
        </div>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % phrases.length)}
          aria-label={next}
          title={next}
          disabled={stage > 0}
          className={cn(
            "hero-bubble-next absolute -top-4 -right-4 z-10 inline-flex size-11 items-center justify-center rounded-full transition-opacity",
            stage > 0 && "pointer-events-none opacity-0",
          )}
        >
          <RefreshCw aria-hidden="true" className="size-[18px]" strokeWidth={2} />
        </button>
      </div>
      <div className="scene-luli relative z-10 mt-6 w-full max-w-[14rem] sm:max-w-[18rem] md:max-w-[22rem]">
        <div ref={artRef} role="img" aria-label={label} className="hero-mascot__art aspect-square w-full" />
        <LuliHat viewBox={LULI_VIEWBOX} className="scene-hat" />
      </div>
    </figure>
  );
}
