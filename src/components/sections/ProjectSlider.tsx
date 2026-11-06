"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ShowcaseProject } from "@/content/projects/showcase";
import { cn } from "@/lib/utils/cn";

/**
 * Slider de projetos: rolagem horizontal nativa com scroll-snap (toque, trackpad,
 * teclado), arraste com o mouse, botões anterior/próximo e contador. Sem autoplay.
 */
export type SliderLabels = {
  region: string;
  roleCarousel: string;
  roleSlide: string;
  list: string;
  previous: string;
  next: string;
  of: string;
  item: string;
};

export function ProjectSlider({
  projects,
  labels,
  className,
}: {
  projects: ShowcaseProject[];
  labels: SliderLabels;
  className?: string;
}) {
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

  /** Índice do slide mais próximo de uma posição de rolagem. */
  const nearest = useCallback(
    (left: number) => {
      const pos = positions();
      let best = 0;
      pos.forEach((p, i) => {
        if (Math.abs(p - left) < Math.abs((pos[best] ?? 0) - left)) best = i;
      });
      return best;
    },
    [positions],
  );

  // Arraste com o mouse (no toque, a rolagem nativa já cuida disso).
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let dragging = false;
    let moved = false;
    let suppressClick = false;
    let pointerId = -1;
    let startX = 0;
    let startLeft = 0;
    let startIndex = 0;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0;

    const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      moved = false;
      pointerId = e.pointerId;
      startX = lastX = e.clientX;
      lastT = e.timeStamp;
      startLeft = el.scrollLeft;
      startIndex = nearest(startLeft);
      velocity = 0;
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      if (!moved) {
        if (Math.abs(dx) < 5) return;
        moved = true;
        el.classList.add("is-dragging");
        el.setPointerCapture(pointerId);
      }
      e.preventDefault();
      el.scrollLeft = startLeft - dx;
      const dt = e.timeStamp - lastT;
      if (dt > 0) velocity = (e.clientX - lastX) / dt;
      lastX = e.clientX;
      lastT = e.timeStamp;
    };

    const onUp = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      dragging = false;
      if (!moved) return;
      suppressClick = true;
      window.setTimeout(() => (suppressClick = false), 0);

      const dx = e.clientX - startX;
      const fling = Math.abs(velocity) > 0.45; // px/ms
      let target = nearest(el.scrollLeft);
      // Um gesto curto ou rápido ainda avança um slide na direção do arraste.
      if (target === startIndex) {
        if (dx < -50 || (fling && velocity < 0)) target = startIndex + 1;
        else if (dx > 50 || (fling && velocity > 0)) target = startIndex - 1;
      }
      const pos = positions();
      target = Math.max(0, Math.min(pos.length - 1, target));
      el.scrollTo({ left: pos[target] ?? 0, behavior: reduced() ? "auto" : "smooth" });

      const restore = () => el.classList.remove("is-dragging");
      el.addEventListener("scrollend", restore, { once: true });
      window.setTimeout(restore, 700);
    };

    const onClick = (e: MouseEvent) => {
      if (suppressClick) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, [nearest, positions]);

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
      aria-roledescription={labels.roleCarousel}
      aria-label={labels.region}
      data-reveal
      className={cn("project-slider", className)}
    >
      <ul
        ref={scroller}
        tabIndex={0}
        aria-label={labels.list}
        className="project-slider__track -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-2 md:-mx-10 md:scroll-px-10 md:px-10 xl:-mx-16 xl:scroll-px-16 xl:px-16"
      >
        {projects.map((project, i) => (
          <li
            key={project.slug}
            aria-roledescription={labels.roleSlide}
            aria-label={`${i + 1} ${labels.of} ${total}: ${project.title}${project.client ? ` — ${project.client}` : ""}`}
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
                  draggable={false}
                  sizes="(min-width: 1280px) 54vw, (min-width: 1024px) 58vw, (min-width: 640px) 72vw, 86vw"
                  className="aspect-[800/784] h-auto w-full object-cover lg:aspect-[5/4]"
                />
              </div>
              <figcaption className="mt-6 flex items-start gap-4">
                <span className="index-number pt-1.5 text-sm">{String(i + 1).padStart(2, "0")}/</span>
                <span>
                  <span className="type-subheading block">{project.title}</span>
                  <span className="mt-2 block font-mono text-xs tracking-[0.06em] text-muted uppercase">
                    {project.client ? `${project.client} · ` : ""}
                    {project.category}
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
            aria-label={labels.previous}
            className="inline-flex size-12 items-center justify-center rounded-full border border-line-strong text-heading transition-colors hover:border-accent hover:text-accent disabled:opacity-40 disabled:hover:border-line-strong disabled:hover:text-heading"
          >
            <ArrowLeft aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={atEnd}
            aria-label={labels.next}
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
          <span className="sr-only">{labels.item} </span>
          {String(index + 1).padStart(2, "0")} <span aria-hidden="true">/</span>
          <span className="sr-only"> {labels.of} </span> {String(total).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
