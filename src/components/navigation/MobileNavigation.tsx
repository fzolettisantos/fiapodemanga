"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { contactNavItem, mainNavigation, siteConfig } from "@/config/site";
import { isActivePath } from "@/lib/utils/nav";
import { cn } from "@/lib/utils/cn";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ThemeToggle } from "./ThemeToggle";

const items = [...mainNavigation, contactNavItem];

export function MobileNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Fecha o menu ao trocar de rota.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      );
    focusables()[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const list = focusables();
      const first = list[0];
      const last = list[list.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 items-center gap-3 rounded-full border border-line-strong px-4 text-[0.95rem] text-heading transition-colors hover:border-accent hover:text-accent"
      >
        Menu
        <span aria-hidden="true" className="flex w-4 flex-col gap-[5px]">
          <span className="h-px w-full bg-current" />
          <span className="h-px w-full bg-current" />
        </span>
      </button>

      <div
        id="menu-mobile"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-0 z-50 overflow-y-auto bg-bg motion-safe:animate-[menu-in_320ms_cubic-bezier(0.2,0.7,0.2,1)]"
      >
        <div className="container-site flex min-h-full flex-col pb-10">
          <div className="flex h-20 items-center justify-between gap-4">
            <Link href="/" aria-label={`${siteConfig.name} — página inicial`} onClick={() => setOpen(false)}>
              <BrandLogo height={36} />
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={close}
                className="inline-flex min-h-11 items-center gap-3 rounded-full border border-line-strong px-4 text-[0.95rem] text-heading transition-colors hover:border-accent hover:text-accent"
              >
                Fechar
                <span aria-hidden="true" className="relative block size-4">
                  <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-current" />
                  <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-current" />
                </span>
              </button>
            </div>
          </div>

          <nav aria-label="Navegação principal (menu)" className="mt-8 flex-1">
            <ol className="border-t border-line">
              {items.map((item, index) => {
                const active = isActivePath(pathname, item.href);
                const number = String(index + 1).padStart(2, "0");
                return (
                  <li
                    key={item.href}
                    className="border-b border-line motion-safe:animate-[menu-item-in_480ms_cubic-bezier(0.2,0.7,0.2,1)_both]"
                    style={{ animationDelay: `${60 + index * 50}ms` }}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-baseline gap-4 py-5 text-[clamp(2rem,9vw,3.5rem)] leading-none font-medium tracking-[-0.04em] transition-colors",
                        active ? "text-accent" : "text-heading hover:text-accent",
                      )}
                    >
                      <span className="index-number text-sm font-normal tracking-normal">{number}/</span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>

          <p className="mt-10 max-w-sm text-sm text-muted">{siteConfig.tagline}</p>
        </div>
      </div>
    </div>
  );
}
