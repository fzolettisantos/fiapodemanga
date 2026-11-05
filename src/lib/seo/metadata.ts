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

/** URLs alternativas por idioma (hreflang) + x-default (português). */
export function languageAlternates(path: string): Record<string, string> {
  const entries: Record<string, string> = {};
  for (const locale of locales) entries[localeInfo[locale].hreflang] = absoluteUrl(localizePath(locale, path));
  entries["x-default"] = absoluteUrl(localizePath(defaultLocale, path));
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
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: localeInfo[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeInfo[l].ogLocale),
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
