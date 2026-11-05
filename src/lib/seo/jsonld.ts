import { absoluteUrl, siteConfig } from "@/config/site";
import { brandAssets } from "@/config/brand";
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
  const areas: Record<string, unknown>[] = [
    { "@type": "City", name: `${city}, ${region}` },
  ];
  if (remote) areas.push({ "@type": "Country", name: country === "BR" ? "Brasil" : country });
  return areas;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId(),
    name: siteConfig.name,
    ...(siteConfig.legalName ? { legalName: siteConfig.legalName } : {}),
    url: absoluteUrl("/"),
    ...(brandAssets.assetsReady ? { logo: absoluteUrl(brandAssets.symbol.light) } : {}),
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    ...(siteConfig.contactEmail ? { email: siteConfig.contactEmail } : {}),
    ...(siteConfig.social.length ? { sameAs: siteConfig.social.map((s) => s.href) } : {}),
    ...(areaServed() ? { areaServed: areaServed() } : {}),
    knowsAbout: [
      "UX Research",
      "Product Design",
      "UX/UI Design",
      "Estratégia de Produto",
      "Criação de Sites",
      "Design de Aplicativos",
      "E-commerce",
      "Inteligência Artificial aplicada ao Design",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": siteId(),
    url: absoluteUrl("/"),
    name: siteConfig.name,
    inLanguage: siteConfig.language,
    publisher: { "@id": orgId() },
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.seo.title,
    description: service.seo.description,
    url: absoluteUrl(`/servicos/${service.slug}`),
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

export function articleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@type": "Person", name: article.author.name },
    publisher: { "@id": orgId() },
    mainEntityOfPage: absoluteUrl(`/insights/${article.slug}`),
    articleSection: article.category,
    inLanguage: siteConfig.language,
    ...(article.image ? { image: absoluteUrl(article.image.src) } : {}),
  };
}
