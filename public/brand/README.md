# Marca — Fiapo de Manga

Logo oficial: a Luli (ilustração de traço orgânico) + lettering "fiapo de manga".

## Como os vetores foram feitos

A arte aprovada (`logo-original.png`, raster 2000×667) foi **vetorizada de verdade**: o contorno de
cada forma foi traçado com [potrace](https://potrace.sourceforge.net/) e virou curvas Bézier. Nenhum
SVG contém imagem rasterizada embutida, e o teste `tests/brand.test.ts` garante isso.
O processo pode ser refeito com `scripts/vectorize-logo.py` (veja as instruções no topo do arquivo).

Ajustes de ilustração aplicados na vetorização:

1. **Limpeza do traço.** Ampliar 4× e suavizar antes de traçar removeu os artefatos de compressão,
   então as bordas viraram curvas contínuas. Expressão, anatomia, orelhas e pelagem foram mantidas.
2. **Cores oficiais.** O verde da arte (~#D1FA7B, alterado pela compressão) foi corrigido para
   `#CCFF7B`. A versão para fundo claro usa `#52751E`, que tem contraste AA sobre `#F7F7F3`.
3. **Tamanho óptico.** `logo-symbol-small.svg` e `logo-horizontal-compact.svg` têm traço reforçado
   (cerca de 2,5 px na escala original) e micro-pelos simplificados, para a Luli continuar legível
   em 16–56 px (favicon, header, menu). Abaixo desses tamanhos o traço fino original some ou vira ruído.
4. **Favicon e app icon.** O símbolo de tamanho óptico fica centralizado sobre grafite `#3F3F3F`, com
   respiro de cerca de 11%. O cantos são arredondados no favicon e retos no Apple Touch Icon, porque o
   iOS aplica a própria máscara.

## Arquivos

| Arquivo                            | Uso                                                        |
| ---------------------------------- | ---------------------------------------------------------- |
| `logo-original.png`                | Arte-mestre aprovada (referência)                          |
| `logo-horizontal-dark.svg` / `.png`  | Assinatura para fundo escuro (#CCFF7B)                     |
| `logo-horizontal-light.svg` / `.png` | Assinatura para fundo claro (#52751E)                      |
| `logo-horizontal-mono.svg`         | Monocromática (preta), para gravação, impressão 1 cor e máscara |
| `logo-horizontal-on-graphite.svg`  | Aplicação oficial com fundo grafite e área de proteção     |
| `logo-horizontal-compact.svg`      | Assinatura em tamanho óptico (header e menu)               |
| `logo-symbol-dark.svg` / `.png`    | Símbolo para fundo escuro                                  |
| `logo-symbol-light.svg` / `.png`   | Símbolo para fundo claro                                   |
| `logo-symbol-small.svg`            | Símbolo em tamanho óptico (usos abaixo de 48 px)           |
| `favicon.svg` / `favicon.png`      | Favicon e ícone 512×512 (também usado como logo no JSON-LD) |
| `apple-touch-icon.png`             | 180×180                                                    |
| `og-image.png`                     | Open Graph / Twitter, 1200×630                             |

| `luli-deitada.svg`                 | Silhueta da Luli deitada (rodapé), vetorizada de `luli-deitada-original.webp` |
| `vamos-conversar.svg`              | Ilustração "Vamos conversar" (Luli com caneca + lettering em arco), vetorizada por camada de cor e por letra |
| `vamos-conversar-original.webp`    | Arte original da ilustração                                |

A ilustração é refeita com `scripts/vectorize-badge.py`. Como `/brand/*` é servido com cache de 1 ano,
**renomeie o arquivo** (ex.: `vamos-conversar-v2.svg`) se a arte mudar, e atualize `SRC` em
`src/components/brand/ConversationBadge.tsx`.

No app Next.js, `src/app/icon.svg`, `src/app/favicon.ico` e `src/app/apple-icon.png` são cópias dos ícones acima.

## Uso no site

O componente `BrandLogo` aplica o SVG como **máscara CSS** e o preenche com a cor de destaque do tema
(`--color-accent`). Assim um único arquivo atende os temas dark e light, sem fundo retangular nem troca
de imagem, e o componente escolhe sozinho a versão de tamanho óptico quando a logo é pequena.

## Regras

- Não distorcer nem alterar as proporções. Redimensione sempre pela altura.
- Área de proteção mínima: a altura da letra "f" do lettering em todos os lados.
- Não aplicar sombras, gradientes, contornos ou outras cores além das oficiais.
- Não reposicionar o símbolo em relação ao lettering.
