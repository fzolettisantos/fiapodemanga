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
    // Só quando o WhatsApp estiver configurado (número real)
    ...(siteConfig.whatsapp.length >= 12
      ? { contactPoint: { "@type": "ContactPoint", contactType: "customer service", telephone: `+${siteConfig.whatsapp}`, availableLanguage: ["pt-BR"] } }
      : {}),
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
  const url = absoluteUrl(localizePath(locale, `/insights/${article.slug}`));
  const words = article.content
    .map((b) => (b.type === "list" ? b.items.join(" ") : b.type === "image" ? "" : b.text))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  const authorIsOrg = article.author.name.trim().toLowerCase() === siteConfig.name.toLowerCase();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title.slice(0, 110),
    description: article.summary,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: authorIsOrg ? { "@id": orgId() } : { "@type": "Person", name: article.author.name },
    publisher: { "@id": orgId() },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    articleSection: article.category,
    wordCount: words,
    inLanguage: localeInfo[locale].htmlLang,
    image: [absoluteUrl(article.image ? article.image.src : brandAssets.ogImage.src)],
  };
}

/** Case/projeto como obra criativa (sem avaliações nem resultados inventados). */
export function caseJsonLd(input: { name: string; description: string; path: string; image?: string; publishedAt: string; locale: Locale }) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: input.publishedAt,
    inLanguage: localeInfo[input.locale].htmlLang,
    creator: { "@id": orgId() },
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
  };
}

/** Perguntas e respostas visíveis na página (FAQPage). */
export function faqJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

/** Serviço oferecido em todo o Brasil (atendimento remoto, sem endereço físico). */
export function brazilServiceJsonLd(input: { name: string; description: string; path: string; serviceType: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url: absoluteUrl(input.path),
    inLanguage: "pt-BR",
    provider: { "@id": orgId() },
    areaServed: { "@type": "Country", name: "Brasil" },
  };
}

export function itemListJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absoluteUrl(it.path) })),
  };
}
