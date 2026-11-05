/**
 * Arquivos oficiais da marca (vetorizados a partir da arte aprovada).
 * Ver public/brand/README.md e scripts/vectorize-logo.py.
 */
export const brandAssets = {
  horizontal: {
    /** Usado como máscara no site — a cor vem do token --color-accent do tema. */
    src: "/brand/logo-horizontal-dark.svg",
    width: 1692,
    height: 403,
  },
  /** Assinatura com símbolo de tamanho óptico — header e menu (altura < 56 px). */
  horizontalCompact: {
    src: "/brand/logo-horizontal-compact.svg",
    width: 1697,
    height: 410,
  },
  symbol: {
    src: "/brand/logo-symbol-dark.svg",
    width: 386,
    height: 403,
  },
  /** Versão de tamanho óptico (traço reforçado) para usos pequenos. */
  symbolSmall: {
    src: "/brand/logo-symbol-small.svg",
    width: 396,
    height: 413,
  },
  /** PNG quadrado (símbolo sobre grafite) para JSON-LD e integrações. */
  logoPng: { src: "/brand/favicon.png", width: 512, height: 512 },
  ogImage: { src: "/brand/og-image.png", width: 1200, height: 630 },
  alt: "Fiapo de Manga",
} as const;
