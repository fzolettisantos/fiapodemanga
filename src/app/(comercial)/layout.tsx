import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Link from "next/link";
import "@/styles/globals.css";
import { siteConfig } from "@/config/site";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SkipLink } from "@/components/layout/SkipLink";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";

/**
 * Área comercial (propostas e painel): só em português, fora do roteamento de idiomas,
 * sem menu do site e fora dos buscadores.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Proposta", template: `%s | ${siteConfig.name}` },
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = { themeColor: "#212121", width: "device-width", initialScale: 1 };

const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("fm-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}d.dataset.theme=t}catch(e){d.dataset.theme="dark"}d.classList.add("js")})();`;

export default function CommercialLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-theme="dark" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">
        <SkipLink label="Pular para o conteúdo" />
        <header className="border-b border-line">
          <div className="container-site flex h-16 items-center justify-between">
            <Link href="/" className="inline-flex items-center" aria-label="Fiapo de Manga — ir para o site">
              <BrandLogo height={30} />
            </Link>
            <ThemeToggle labels={{ toggle: "Alternar tema", toLight: "Usar tema claro", toDark: "Usar tema escuro" }} />
          </div>
        </header>
        <main id="conteudo" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <footer className="border-t border-line">
          <div className="container-site flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-muted">
            <p>© {new Date().getFullYear()} {siteConfig.name}</p>
            <Link href="/politica-de-privacidade" className="link-underline">
              Política de privacidade
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
