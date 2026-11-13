import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { colors } from "@/design-system/tokens";

export const metadata: Metadata = {
  metadataBase: siteConfig.url ? new URL(siteConfig.url) : undefined,
  title: { default: siteConfig.seo.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.seo.description,
  openGraph: { siteName: siteConfig.name, locale: "pt_BR", type: "website" },
};

export const viewport: Viewport = { themeColor: colors.brandInk, width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-dvh antialiased">
        <a
          href="#conteudo"
          className="sr-only-focusable fixed left-4 top-4 z-50 rounded-button bg-brand-ink px-4 py-3 text-surface"
        >
          Pular para o conteúdo
        </a>
        <div id="conteudo">{children}</div>
      </body>
    </html>
  );
}
