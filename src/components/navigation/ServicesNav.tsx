"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

type Item = { slug: string; name: string; number: string };

/** Lista lateral fixa das especialidades, com a seção visível destacada. */
export function ServicesNav({ items, label }: { items: Item[]; label: string }) {
  const [active, setActive] = useState(items[0]?.slug ?? "");

  useEffect(() => {
    const targets = items
      .map((i) => document.getElementById(i.slug))
      .filter((el): el is HTMLElement => el !== null);
    if (!("IntersectionObserver" in window) || targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className="sticky top-28">
      <ol className="space-y-1">
        {items.map((item) => {
          const current = item.slug === active;
          return (
            <li key={item.slug}>
              <a
                href={`#${item.slug}`}
                aria-current={current ? "location" : undefined}
                className={cn(
                  "group flex min-h-10 items-center gap-3 font-mono text-xs tracking-[0.08em] uppercase transition-colors",
                  current ? "text-heading" : "text-muted hover:text-heading",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-1.5 shrink-0 rounded-full transition-all duration-300",
                    current ? "scale-100 bg-accent-fill" : "scale-0 bg-accent-fill",
                  )}
                />
                <span className={cn("transition-transform duration-300", current ? "translate-x-0" : "-translate-x-3")}>
                  {item.name}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
