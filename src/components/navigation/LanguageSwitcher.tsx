"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeInfo, locales, localizePath, splitLocale, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils/cn";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  currentLabel: string;
  className?: string;
  size?: "sm" | "lg";
};

/** Seletor de idioma: mantém a página atual e troca só o idioma. */
export function LanguageSwitcher({ locale, label, currentLabel, className, size = "sm" }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const { path } = splitLocale(pathname);

  return (
    <nav aria-label={label} className={className}>
      <ul className={cn("flex items-center", size === "lg" ? "gap-2" : "gap-0.5")}>
        {locales.map((l) => {
          const active = l === locale;
          return (
            <li key={l}>
              <Link
                href={localizePath(l, path)}
                hrefLang={localeInfo[l].hreflang}
                lang={localeInfo[l].htmlLang}
                aria-current={active ? "true" : undefined}
                title={localeInfo[l].label}
                className={cn(
                  "inline-flex items-center justify-center rounded-full font-mono tracking-[0.06em] transition-colors",
                  size === "lg" ? "min-h-11 min-w-11 px-3 text-sm" : "min-h-11 min-w-9 px-2 text-xs",
                  active ? "text-accent" : "text-muted hover:text-accent",
                )}
              >
                <span aria-hidden="true">{localeInfo[l].short}</span>
                <span className="sr-only">
                  {localeInfo[l].label}
                  {active ? ` (${currentLabel})` : ""}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
