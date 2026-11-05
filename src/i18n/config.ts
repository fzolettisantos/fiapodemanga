/**
 * Idiomas do site.
 * - pt (português do Brasil): idioma padrão, sem prefixo na URL (/servicos)
 * - en (inglês): /en/servicos
 * - es (espanhol): /es/servicos
 * Os slugs das páginas são os mesmos nos três idiomas.
 */
export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export const localeInfo: Record<
  Locale,
  { htmlLang: string; ogLocale: string; hreflang: string; label: string; short: string; intl: string }
> = {
  pt: { htmlLang: "pt-BR", ogLocale: "pt_BR", hreflang: "pt-BR", label: "Português", short: "PT", intl: "pt-BR" },
  en: { htmlLang: "en", ogLocale: "en_US", hreflang: "en", label: "English", short: "EN", intl: "en-US" },
  es: { htmlLang: "es", ogLocale: "es_ES", hreflang: "es", label: "Español", short: "ES", intl: "es-ES" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** Prefixa um caminho interno com o idioma (o português não tem prefixo). */
export function localizePath(locale: Locale, path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/**
 * Separa o idioma do caminho: "/en/servicos" → { locale: "en", path: "/servicos" }.
 * Também aceita o caminho interno reescrito pelo proxy ("/pt/servicos"), que é o que
 * `usePathname()` pode devolver no português.
 */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const [, first, ...rest] = pathname.split("/");
  if (first && isLocale(first)) {
    return { locale: first, path: `/${rest.join("/")}`.replace(/\/$/, "") || "/" };
  }
  return { locale: defaultLocale, path: pathname || "/" };
}
