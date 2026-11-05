# Fiapo de Manga — Site institucional

Site da **Fiapo de Manga**, consultoria de design, pesquisa e experiência digital.

> Entendemos problemas, desenhamos experiências e ajudamos negócios a evoluir.

Stack: **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Geist · Lucide**.
Todas as páginas são geradas estaticamente (SSG); apenas `/api/contato` roda no servidor.

## Começando

```bash
npm install
cp .env.example .env.local   # preencha as variáveis
npm run dev                  # http://localhost:3000
```

| Script              | O que faz                                   |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento                 |
| `npm run build`     | Build de produção                           |
| `npm run start`     | Servir o build                              |
| `npm run lint`      | ESLint (regras Next + Core Web Vitals)      |
| `npm run typecheck` | Verificação de tipos                        |
| `npm run test`      | Testes unitários (Vitest)                   |
| `npm run check`     | typecheck + lint + test                     |

Requer Node.js 20.9 ou superior.

## Variáveis de ambiente

Veja `.env.example`. Nunca faça commit de `.env.local`.

| Variável                    | Obrigatória | Uso                                                                 |
| --------------------------- | ----------- | ------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | Sim (prod)  | Domínio final. Usado em canonical, sitemap, Open Graph e JSON-LD.   |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Não         | E-mail público exibido no rodapé, contato e política de privacidade. |
| `RESEND_API_KEY`            | Para envio  | Chave da API do [Resend](https://resend.com).                       |
| `CONTACT_TO_EMAIL`          | Para envio  | Quem recebe as mensagens do formulário.                             |
| `CONTACT_FROM_EMAIL`        | Para envio  | Remetente verificado no Resend (ex.: `Site <site@dominio.com.br>`). |

Sem `NEXT_PUBLIC_SITE_URL`, o site usa `VERCEL_PROJECT_PRODUCTION_URL` (na Vercel) ou `http://localhost:3000`.
**Defina-a antes de publicar**, senão as URLs canônicas ficam erradas.

## Estrutura

```
src/
  app/                    Rotas (App Router), sitemap, robots, manifest, ícones, OG
    api/contato/          Endpoint do formulário
    servicos/[slug]/      7 páginas de especialidade (SSG)
    projetos/[slug]/      Cases (gerados a partir do conteúdo)
    insights/[slug]/      Artigos (gerados a partir do conteúdo)
  components/
    brand/                BrandLogo (SVG via máscara, cor do tema), FiberLine (elemento gráfico autoral)
    layout/               Header, Footer, SkipLink, RevealObserver
    navigation/           DesktopNavigation, MobileNavigation, ThemeToggle, Breadcrumbs
    sections/             ServiceBlock, ServiceTags, ProcessSteps, CasePreview,
                          CaseTemplate, ArticleCard, ContactCta, PageHero
    forms/                ContactForm
    ui/                   Button, SectionHeading, JsonLd
  content/                Todo o copy (aprovado no briefing) e os dados editáveis
    services/             Especialidades + formas de atuação
    projects/             Cases (+ _template.ts)
    articles/             Artigos (+ _template.ts)
  config/                 site.ts (dados da empresa, navegação), brand.ts (logo)
  lib/                    seo/ (metadata, JSON-LD), contact/ (validação, envio, rate limit), utils/
  styles/globals.css      Design tokens (dark/light), tipografia, animações
  types/content.ts        Tipos de conteúdo
public/brand/             Logo vetorizada, ícones e OG (ver public/brand/README.md)
scripts/vectorize-logo.py Vetorização reproduzível da logo (potrace)
tests/                    Testes unitários
```

## Design system

Tokens semânticos em `src/styles/globals.css` (`--color-bg`, `--color-heading`, `--color-text`,
`--color-accent`, `--color-accent-2`, `--color-line`…), redefinidos por tema via `data-theme` no `<html>`.
As cores de título **não** dependem da tag (h1/h2/h3): a hierarquia HTML é semântica e o visual
vem das classes `type-display`, `type-title`, `type-heading`, `type-subheading`, `type-lead`, `type-body`,
`eyebrow`, `callout` e `index-number`.

| Token           | Dark      | Light     |
| --------------- | --------- | --------- |
| Fundo           | `#3F3F3F` | `#F7F7F3` |
| Superfície      | `#383838` | `#FFFFFF` |
| Títulos         | `#CFCFCF` | `#252525` |
| Texto           | `#FFFFFF` | `#252525` |
| Texto secundário| `#DCDCDC` | `#454545` |
| Verde           | `#CCFF7B` | `#52751E` |
| Amarelo         | `#FFF04A` | `#786800` |
| Botão primário  | `#CCFF7B` / texto `#222222` | idem, com borda escura |
| Botão secundário| `#FFF04A` / texto `#222222` | idem |

Tema: segue a preferência do sistema, salva a escolha manual (`localStorage: fm-theme`) e é aplicado por
um script inline antes da primeira pintura (sem flash). Sem JavaScript, o tema principal (dark) é usado.

## Animações

Feitas com recursos nativos da plataforma (CSS scroll-driven animations e View Transitions API),
com JavaScript mínimo e só `transform`, `opacity`, `clip-path` e `color`, para não prejudicar a performance.
Tudo é progressive enhancement: sem suporte do navegador o conteúdo aparece normalmente, e com
`prefers-reduced-motion: reduce` as animações são desligadas.

| Efeito                                   | Onde                                   | Como                                   |
| ---------------------------------------- | -------------------------------------- | -------------------------------------- |
| Título palavra por palavra (máscara)     | Hero da Home e das páginas internas    | `motion/WordReveal` + CSS keyframes    |
| Faixa tipográfica infinita (marquee)     | Home (especialidades), Serviços        | `motion/Marquee`, CSS puro, pausa no hover |
| Frase que acende com a rolagem           | Destaques (callouts)                   | `motion/ScrollFillText`, `view-timeline` |
| Revelação de blocos ligada à rolagem     | Seções com `data-reveal`               | `animation-timeline: view()` (fallback IntersectionObserver) |
| Linha de progresso das etapas            | Nossa abordagem                        | `view-timeline` nomeada                |
| Fiapo desenhado pela rolagem e parallax  | Chamada final de contato               | `stroke-dashoffset` + `view()`         |
| Barra de progresso de leitura            | Todas as páginas                       | `animation-timeline: scroll(root)`     |
| Transição entre páginas (blur + slide)   | Navegação interna                      | React `<ViewTransition>` (`motion/PageTransition`) |
| Nome do serviço que "viaja" até a página | Lista da Home → página da especialidade | `<ViewTransition name share="morph">` |
| Troca de tema com revelação circular     | Botão dark/light                       | `document.startViewTransition` + `clip-path` |
| Header que recolhe ao rolar              | Todas as páginas                       | `motion/Interactions` + CSS `translate` |
| Botões magnéticos                        | CTAs primário e secundário             | `motion/Interactions` (só ponteiro fino) |
| Varredura no hover das listas            | Especialidades                         | CSS `::before` + `scaleX`              |
| Luli que inclina / balança               | Sobre (hover) e 404                    | CSS                                    |

## Conteúdo

- **Copy**: `src/content/*.ts`. Os textos aprovados no briefing estão reproduzidos literalmente.
- **Especialidades**: `src/content/services/index.ts`. Cada uma tem copy aprovado + bloco `page`
  com conteúdo próprio da página individual e metadados de SEO únicos.
- **Cases**: copie `src/content/projects/_template.ts`, preencha **somente com dados reais e autorizados**
  e adicione ao array em `src/content/projects/index.ts`. Rotas, sitemap e Home atualizam sozinhos.
- **Insights**: mesmo processo em `src/content/articles/`. Enquanto não houver artigos, `/insights`
  fica com `noindex` e fora do sitemap.

## Formulário de contato

`/contato` → `POST /api/contato`.

- Validação compartilhada cliente/servidor (`src/lib/contact/validation.ts`) e sanitização
  (caracteres de controle, quebras de linha em campos de linha única, escape de HTML no e-mail).
- Antispam: honeypot, tempo mínimo de preenchimento, verificação de origem, limite de tamanho e
  rate limit por IP (em memória — em serverless com várias instâncias, troque por um store
  compartilhado, ex. Upstash Redis, ou use um WAF/Cloudflare Turnstile).
- Envio via API do Resend. **Se as variáveis não estiverem configuradas, a API responde 503 e o
  formulário informa que a mensagem não foi enviada** — nunca simula sucesso.
- LGPD: consentimento obrigatório com link para a política; nenhum dado é armazenado no servidor
  além do envio do e-mail; o site não usa cookies de rastreamento.

## SEO

- Metadata por rota (`src/lib/seo/metadata.ts`): title, description, canonical, Open Graph, Twitter Card.
- `sitemap.xml`, `robots.txt` e `manifest.webmanifest` gerados em `src/app`.
- JSON-LD: `Organization` e `WebSite` (global), `Service` (especialidades), `BreadcrumbList`
  (páginas internas) e `Article` (insights). Sem avaliações ou dados inventados.
- SEO local: preencha `siteConfig.location` em `src/config/site.ts` **somente** se Santos/SP e o
  atendimento remoto estiverem confirmados — isso ativa `areaServed` nos dados estruturados.

## Qualidade

Verificado nesta versão:

- `npm run typecheck`, `npm run lint`, `npm run test` (20 testes) e `npm run build` sem erros (inclui teste que garante que os SVGs da marca são vetores reais).
- axe-core (WCAG 2.0/2.1/2.2 A/AA + best practices): 0 violações em 11 páginas, temas dark e light,
  desktop (1440px) e mobile (390px); 1 `h1` por página; sem rolagem horizontal.
- Testes de interação (Playwright): menu mobile (teclado, foco preso, Esc, item ativo), alternância
  e persistência de tema, validação do formulário e estado de erro sem integração.
- Lighthouse (mobile simulado, servidor local): Performance 94–98, Acessibilidade 100,
  Boas práticas 100, SEO 100. Os números reais dependem da hospedagem — meça após o deploy.

## Próximos passos

Veja o [`ROADMAP.md`](./ROADMAP.md), que inclui a futura área administrativa (CMS).

## Pendências que dependem de informações externas

- [ ] Domínio final (`NEXT_PUBLIC_SITE_URL`).
- [ ] Conta e domínio verificados no Resend + variáveis de envio.
- [ ] E-mail público de contato, razão social/CNPJ (política de privacidade) e perfis sociais oficiais.
- [ ] Confirmação de Santos/SP e atendimento remoto para SEO local.
- [ ] Cases reais autorizados e artigos originais.
- [ ] Revisão jurídica da Política de Privacidade.
