import { lang } from "next/root-params";
import { content, type SiteContent } from "@/content/locales";
import { defaultLocale, isLocale, localizePath, type Locale } from "./config";

/** Idioma da rota atual (Server Components). */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : defaultLocale;
}

/** Conteúdo e utilitários do idioma atual. */
export async function getI18n(): Promise<{
  locale: Locale;
  t: SiteContent;
  href: (path: string) => string;
}> {
  const locale = await getLocale();
  return { locale, t: content[locale], href: (path: string) => localizePath(locale, path) };
}

export { format } from "./format";
