import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

/**
 * Roteamento de idiomas.
 * - /en/... e /es/... seguem direto.
 * - /pt/... é redirecionado para a URL sem prefixo (português é o padrão).
 * - Qualquer outra URL é reescrita internamente para /pt/... (a URL pública não muda).
 * Não há redirecionamento automático por Accept-Language, para não atrapalhar buscadores;
 * a pessoa escolhe o idioma no seletor.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  // Área comercial (propostas e painel): só em português, fora do roteamento de idiomas.
  if (first === "proposta" || first === "painel") return NextResponse.next();

  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (isLocale(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Ignora API, arquivos internos e qualquer caminho com extensão (imagens, ícones, sitemap…).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
