import { splitLocale } from "@/i18n/config";

/** Verifica se um item de navegação corresponde à rota atual (ignora o prefixo de idioma). */
export function isActivePath(pathname: string, href: string): boolean {
  const current = splitLocale(pathname).path;
  const target = splitLocale(href.split("?")[0] ?? href).path;
  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}
