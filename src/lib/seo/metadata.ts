import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { brandAssets } from "@/config/brand";

export const DEFAULT_OG_IMAGE = {
  url: brandAssets.ogImage.src,
  width: brandAssets.ogImage.width,
  height: brandAssets.ogImage.height,
  alt: `${siteConfig.name} — ${siteConfig.tagline}`,
};

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** Usa o título sem o sufixo " | Fiapo de Manga" */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  image?: { url: string; width: number; height: number; alt: string };
  noIndex?: boolean;
};

export function buildMetadata({
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
  noIndex,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  // Sem imagem específica, usa a imagem Open Graph padrão da marca.
  const og = image ?? DEFAULT_OG_IMAGE;
  const images = [{ ...og, url: absoluteUrl(og.url) }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
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
