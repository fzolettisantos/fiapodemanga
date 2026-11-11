import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@/styles/globals.css";
import { absoluteUrl, siteConfig } from "@/config/site";
import { localeInfo, locales, localizePath } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { Interactions } from "@/components/motion/Interactions";
import { PageTransition } from "@/components/motion/PageTransition";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { DEFAULT_OG_IMAGE, languageAlternates } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  const og = { ...DEFAULT_OG_IMAGE, alt: t.site.ogAlt, url: absoluteUrl(DEFAULT_OG_IMAGE.url) };
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: t.meta.home.title, template: `%s | ${siteConfig.name}` },
    description: t.site.description,
    applicationName: siteConfig.name,
    alternates: { canonical: absoluteUrl(localizePath(locale, "/")), languages: languageAlternates("/", locale) },
    openGraph: {
      type: "website",
      locale: localeInfo[locale].ogLocale,
      siteName: siteConfig.name,
      url: absoluteUrl(localizePath(locale, "/")),
      images: [og],
    },
    twitter: { card: "summary_large_image", images: [og.url] },
    formatDetection: { telephone: false, email: false, address: false },
    // Verificação do Search Console e do Bing Webmaster (preencha as variáveis na Vercel; ver docs/seo.md)
    verification: {
      ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : {}),
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } } : {}),
    },
  };
}

export const viewport: Viewport = {
  // Mesma cor do topo do site (#212121), para a barra do navegador combinar.
  themeColor: "#212121",
  width: "device-width",
  initialScale: 1,
};

/**
 * Define o tema antes da primeira pintura (sem flash):
 * 1) escolha manual salva; 2) preferência do sistema; 3) dark (tema principal).
 */
const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("fm-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}d.dataset.theme=t}catch(e){d.dataset.theme="dark"}d.classList.add("js")})();`;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { locale, t } = await getI18n();

  return (
    <html
      lang={localeInfo[locale].htmlLang}
      data-theme="dark"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">
        <SkipLink label={t.ui.skipToContent} />
        <div aria-hidden="true" className="scroll-progress" />
        <Header />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <RevealObserver />
        <Interactions />
        <JsonLd data={[organizationJsonLd(t), websiteJsonLd(locale)]} />
      </body>
    </html>
  );
}
