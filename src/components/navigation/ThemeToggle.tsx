"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils/cn";

export const THEME_STORAGE_KEY = "fm-theme";
type Theme = "light" | "dark";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  // Acompanha a preferência do sistema enquanto não houver escolha manual.
  const media = window.matchMedia("(prefers-color-scheme: light)");
  const onSystemChange = (event: MediaQueryListEvent) => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_STORAGE_KEY);
    } catch {}
    if (stored !== "light" && stored !== "dark") {
      document.documentElement.dataset.theme = event.matches ? "light" : "dark";
    }
  };
  media.addEventListener("change", onSystemChange);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", onSystemChange);
  };
}

export type ThemeLabels = { toggle: string; toLight: string; toDark: string };

export function ThemeToggle({ className, labels }: { className?: string; labels: ThemeLabels }) {
  const theme = useSyncExternalStore<Theme | null>(subscribe, readTheme, () => null);

  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    const root = document.documentElement;
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {}
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof document.startViewTransition !== "function") {
      apply();
      return;
    }

    // Revelação circular a partir do botão (View Transitions API).
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    root.classList.add("vt-theme");
    const transition = document.startViewTransition(apply);
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
    transition.finished.finally(() => root.classList.remove("vt-theme"));
  }

  const label = theme === null ? labels.toggle : theme === "dark" ? labels.toLight : labels.toDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-heading transition-colors duration-200 hover:border-accent hover:text-accent",
        className,
      )}
    >
      <Sun aria-hidden="true" className="hidden size-[18px] dark:block" strokeWidth={1.75} />
      <Moon aria-hidden="true" className="block size-[18px] dark:hidden" strokeWidth={1.75} />
    </button>
  );
}
