/**
 * Arquivos de marca.
 *
 * A logo oficial (ilustração da Luli + lettering "fiapo de manga") deve ser
 * colocada em /public/brand com os nomes abaixo. Enquanto os arquivos não
 * estiverem no projeto, `assetsReady` permanece `false` e o site exibe
 * apenas o lettering tipográfico provisório — sem recriar a ilustração.
 *
 * Depois de adicionar os arquivos, altere `assetsReady` para `true` e
 * ajuste `horizontal.width/height` e `symbol.width/height` para as
 * dimensões reais (em px) das imagens, preservando a proporção.
 */
export const brandAssets = {
  assetsReady: false,
  horizontal: {
    dark: "/brand/logo-horizontal-dark.png", // para fundo escuro (tema dark)
    light: "/brand/logo-horizontal-light.png", // para fundo claro (tema light)
    width: 1200,
    height: 300,
  },
  symbol: {
    dark: "/brand/logo-symbol-dark.png",
    light: "/brand/logo-symbol-light.png",
    width: 512,
    height: 512,
  },
  alt: "Fiapo de Manga",
} as const;
