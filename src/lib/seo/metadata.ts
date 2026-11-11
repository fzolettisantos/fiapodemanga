import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { brandAssets } from "@/config/brand";
import { defaultLocale, localeInfo, locales, localizePath, type Locale } from "@/i18n/config";

export const DEFAULT_OG_IMAGE = {
  url: brandAssets.ogImage.src,
  width: brandAssets.ogImage.width,
  height: brandAssets.ogImage.height,
  alt: `${siteConfig.name} — ${siteConfig.tagline}`,
};

/**
 * Páginas que existem só em português (a oferta de sites e lojas virtuais e o blog).
 * Não têm versão em inglês/espanhol, então não declaram alternativas de idioma.
 */
const PT_ONLY = [/^\/site-para(\/|$)/, /^\/perguntas-frequentes$/, /^\/insights(\/|$)/];

/**
 * Páginas cujo texto em português mudou de foco (sites e lojas virtuais), enquanto inglês e espanhol seguem
 * como consultoria de design. Não são traduções uma da outra, então o português não se declara equivalente
 * às versões em inglês e espanhol (que continuam alternativas entre si).
 */
const DIVERGED = new Set([
  "/",
  "/servicos",
  "/sobre",
  "/projetos",
  "/contato",
  "/servicos/criacao-de-sites",
  "/servicos/ecommerce",
  "/servicos/aplicativos-sistemas-plataformas",
  "/servicos/design-tecnologia-ia",
]);

export const isPtOnlyPath = (path: string) => PT_ONLY.some((re) => re.test(path));

/** URLs alternativas por idioma (hreflang) + x-default. */
export function languageAlternates(path: string, locale: Locale = defaultLocale): Record<string, string> {
  const url = (l: Locale) => absoluteUrl(localizePath(l, path));
  if (isPtOnlyPath(path)) return { [localeInfo.pt.hreflang]: url("pt"), "x-default": url("pt") };
  if (DIVERGED.has(path)) {
    if (locale === "pt") return { [localeInfo.pt.hreflang]: url("pt"), "x-default": url("pt") };
    return { [localeInfo.en.hreflang]: url("en"), [localeInfo.es.hreflang]: url("es"), "x-default": url("en") };
  }
  const entries: Record<string, string> = {};
  for (const l of locales) entries[localeInfo[l].hreflang] = url(l);
  entries["x-default"] = url(defaultLocale);
  return entries;
}

type BuildMetadataInput = {
  locale: Locale;
  title: string;
  description: string;
  /** Caminho sem prefixo de idioma, ex.: "/servicos" */
  path: string;
  keywords?: string[];
  /** Usa o título sem o sufixo " | Fiapo de Manga" */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  image?: { url: string; width: number; height: number; alt: string };
  ogAlt?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  locale,
  title,
  description,
  path,
  keywords,
  absoluteTitle,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  image,
  ogAlt,
  noIndex,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(localizePath(locale, path));
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const og = image ?? { ...DEFAULT_OG_IMAGE, alt: ogAlt ?? DEFAULT_OG_IMAGE.alt };
  const images = [{ ...og, url: absoluteUrl(og.url) }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: url, languages: languageAlternates(path, locale) },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: localeInfo[locale].ogLocale,
      alternateLocale: Object.keys(languageAlternates(path, locale))
        .filter((k) => k !== "x-default" && k !== localeInfo[locale].hreflang)
        .map((k) => locales.map((l) => localeInfo[l]).find((i) => i.hreflang === k)?.ogLocale)
        .filter((v): v is string => Boolean(v)),
      images,
      ...(type === "article" ? { publishedTime, modifiedTime, authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
