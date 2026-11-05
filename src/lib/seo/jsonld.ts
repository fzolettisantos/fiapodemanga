import { absoluteUrl, siteConfig } from "@/config/site";
import { brandAssets } from "@/config/brand";
import { localeInfo, localizePath, type Locale } from "@/i18n/config";
import type { SiteContent } from "@/content/locales/types";
import type { Article, Service } from "@/types/content";

/**
 * Dados estruturados Schema.org.
 * Apenas informações verdadeiras: sem avaliações, endereço ou dados inventados.
 */

const orgId = () => `${absoluteUrl("/")}#organization`;
const siteId = () => `${absoluteUrl("/")}#website`;

function areaServed() {
  if (!siteConfig.location) return undefined;
  const { city, region, country, remote } = siteConfig.location;
  const areas: Record<string, unknown>[] = [{ "@type": "City", name: `${city}, ${region}` }];
  if (remote) areas.push({ "@type": "Country", name: country === "BR" ? "Brasil" : country });
  return areas;
}

export function organizationJsonLd(t: SiteContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId(),
    name: siteConfig.name,
    ...(siteConfig.legalName ? { legalName: siteConfig.legalName } : {}),
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(brandAssets.logoPng.src),
      width: brandAssets.logoPng.width,
      height: brandAssets.logoPng.height,
    },
    image: absoluteUrl(brandAssets.ogImage.src),
    description: t.site.description,
    slogan: t.site.tagline,
    ...(siteConfig.contactEmail ? { email: siteConfig.contactEmail } : {}),
    ...(siteConfig.social.length ? { sameAs: siteConfig.social.map((s) => s.href) } : {}),
    ...(areaServed() ? { areaServed: areaServed() } : {}),
    knowsAbout: t.site.knowsAbout,
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": siteId(),
    url: absoluteUrl(localizePath(locale, "/")),
    name: siteConfig.name,
    inLanguage: localeInfo[locale].htmlLang,
    publisher: { "@id": orgId() },
  };
}

export function serviceJsonLd(service: Service, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.seo.title,
    description: service.seo.description,
    url: absoluteUrl(localizePath(locale, `/servicos/${service.slug}`)),
    inLanguage: localeInfo[locale].htmlLang,
    provider: { "@id": orgId() },
    ...(areaServed() ? { areaServed: areaServed() } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.name,
      itemListElement: service.skills.map((skill) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: skill },
      })),
    },
  };
}

/** `path` já deve estar localizado. */
export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(article: Article, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@type": "Person", name: article.author.name },
    publisher: { "@id": orgId() },
    mainEntityOfPage: absoluteUrl(localizePath(locale, `/insights/${article.slug}`)),
    articleSection: article.category,
    inLanguage: localeInfo[locale].htmlLang,
    ...(article.image ? { image: absoluteUrl(article.image.src) } : {}),
  };
}
