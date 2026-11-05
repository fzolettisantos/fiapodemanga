"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ShowcaseProject } from "@/content/projects/showcase";
import { cn } from "@/lib/utils/cn";

/**
 * Slider de projetos: rolagem horizontal nativa com scroll-snap (toque, trackpad,
 * teclado) + botões anterior/próximo e contador. Sem autoplay.
 */
export function ProjectSlider({ projects, className }: { projects: ShowcaseProject[]; className?: string }) {
  const scroller = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const total = projects.length;

  /** Posição de rolagem em que cada slide fica alinhado ao início (considera o scroll-padding). */
  const positions = useCallback(() => {
    const el = scroller.current;
    if (!el) return [];
    const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    const max = el.scrollWidth - el.clientWidth;
    return (Array.from(el.children) as HTMLElement[]).map((slide) =>
      Math.min(max, Math.max(0, slide.offsetLeft - el.offsetLeft - pad)),
    );
  }, []);

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const pos = positions();
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
    let current = 0;
    pos.forEach((p, i) => {
      if (Math.abs(p - el.scrollLeft) < Math.abs((pos[current] ?? 0) - el.scrollLeft)) current = i;
    });
    setIndex(atEnd ? pos.length - 1 : current);
  }, [positions]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const go = (to: number) => {
    const el = scroller.current;
    const target = positions()[Math.max(0, Math.min(total - 1, to))];
    if (!el || target === undefined) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: target, behavior: reduced ? "auto" : "smooth" });
  };

  const atStart = index === 0;
  const atEnd = index === total - 1;

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Projetos"
      data-reveal
      className={cn("project-slider", className)}
    >
      <ul
        ref={scroller}
        tabIndex={0}
        aria-label="Lista de projetos (use as setas para rolar)"
        className="project-slider__track -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-2 md:-mx-10 md:scroll-px-10 md:px-10 xl:-mx-16 xl:scroll-px-16 xl:px-16"
      >
        {projects.map((project, i) => (
          <li
            key={project.slug}
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${total}: ${project.title} — ${project.client}`}
            className="project-slide w-[86%] shrink-0 snap-start sm:w-[72%] lg:w-[58%] xl:w-[54%]"
          >
            <figure>
              <div className="project-slide__media overflow-hidden rounded-sm">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  height={project.image.height}
                  quality={85}
                  sizes="(min-width: 1280px) 54vw, (min-width: 1024px) 58vw, (min-width: 640px) 72vw, 86vw"
                  className="aspect-[800/784] h-auto w-full object-cover lg:aspect-[5/4]"
                />
              </div>
              <figcaption className="mt-6 flex items-start gap-4">
                <span className="index-number pt-1.5 text-sm">{String(i + 1).padStart(2, "0")}/</span>
                <span>
                  <span className="type-subheading block">{project.title}</span>
                  <span className="mt-2 block font-mono text-xs tracking-[0.06em] text-muted uppercase">
                    {project.client} · {project.category}
                  </span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex items-center gap-6">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={atStart}
            aria-label="Projeto anterior"
            className="inline-flex size-12 items-center justify-center rounded-full border border-line-strong text-heading transition-colors hover:border-accent hover:text-accent disabled:opacity-40 disabled:hover:border-line-strong disabled:hover:text-heading"
          >
            <ArrowLeft aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={atEnd}
            aria-label="Próximo projeto"
            className="inline-flex size-12 items-center justify-center rounded-full border border-line-strong text-heading transition-colors hover:border-accent hover:text-accent disabled:opacity-40 disabled:hover:border-line-strong disabled:hover:text-heading"
          >
            <ArrowRight aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </button>
        </div>
        <div aria-hidden="true" className="relative h-px flex-1 bg-line">
          <div
            className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-500"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
        <p className="index-number text-sm" aria-live="polite">
          <span className="sr-only">Projeto </span>
          {String(index + 1).padStart(2, "0")} <span aria-hidden="true">/</span>
          <span className="sr-only"> de </span> {String(total).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
