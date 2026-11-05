# Arquivos de marca — Fiapo de Manga

A logo oficial (ilustração da Luli + lettering "fiapo de manga") **ainda não foi
adicionada ao repositório**. Enquanto isso, o site mostra apenas o lettering em
texto, sem recriar a ilustração.

## Arquivos esperados nesta pasta

| Arquivo                     | Uso                                                    |
| --------------------------- | ------------------------------------------------------ |
| `logo-original.png`         | Arquivo-mestre aprovado (referência, não usado no site) |
| `logo-horizontal-dark.png`  | Header/rodapé/menu no **tema escuro** (fundo grafite)  |
| `logo-horizontal-light.png` | Header/rodapé/menu no **tema claro**                   |
| `logo-symbol-dark.png`      | Somente a cabeça da Luli, para fundo escuro            |
| `logo-symbol-light.png`     | Somente a cabeça da Luli, para fundo claro             |
| `favicon.png`               | Favicon (somente o símbolo), 512×512 recomendado       |
| `apple-touch-icon.png`      | 180×180, símbolo com respiro                           |
| `og-image.png`              | 1200×630 para Open Graph / Twitter                     |

Recomendações:

- PNG com **fundo transparente** (sem retângulo de fundo) para as variações horizontais e de símbolo.
- Se existir um **SVG vetorial verdadeiro**, prefira-o (`.svg`). Não converta PNG em SVG com a imagem embutida.
- Não altere expressão, anatomia, traço ou tipografia da marca.

## Como ativar

1. Copie os arquivos para esta pasta com os nomes acima.
2. Em `src/config/brand.ts`, defina `assetsReady: true` e informe a largura/altura reais
   (em px) de `horizontal` e `symbol`, para preservar a proporção.
3. Substitua os ícones provisórios gerados por código:
   - apague `src/app/icon.tsx` e copie `favicon.png` para `src/app/icon.png`;
   - apague `src/app/apple-icon.tsx` e copie `apple-touch-icon.png` para `src/app/apple-icon.png`;
   - (opcional) apague `src/app/opengraph-image.tsx`, copie `og-image.png` para
     `src/app/opengraph-image.png` e ajuste `DEFAULT_OG_IMAGE` em `src/lib/seo/metadata.ts`.
4. Rode `npm run build` e confira header, menu mobile, rodapé e os dois temas.
