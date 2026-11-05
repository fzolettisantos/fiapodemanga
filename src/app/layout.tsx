import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@/styles/globals.css";
import { absoluteUrl, siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { Interactions } from "@/components/motion/Interactions";
import { PageTransition } from "@/components/motion/PageTransition";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { DEFAULT_OG_IMAGE } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Consultoria de Design e UX/UI`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: absoluteUrl("/"),
    images: [{ ...DEFAULT_OG_IMAGE, url: absoluteUrl(DEFAULT_OG_IMAGE.url) }],
  },
  twitter: { card: "summary_large_image", images: [absoluteUrl(DEFAULT_OG_IMAGE.url)] },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#3f3f3f" },
    { media: "(prefers-color-scheme: light)", color: "#f7f7f3" },
  ],
  width: "device-width",
  initialScale: 1,
};

/**
 * Define o tema antes da primeira pintura (sem flash):
 * 1) escolha manual salva; 2) preferência do sistema; 3) dark (tema principal).
 */
const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("fm-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}d.dataset.theme=t}catch(e){d.dataset.theme="dark"}d.classList.add("js")})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      data-theme="dark"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">
        <SkipLink />
        <div aria-hidden="true" className="scroll-progress" />
        <Header />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <RevealObserver />
        <Interactions />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
