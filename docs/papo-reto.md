# Papo Reto Ranking

> **A resenha é deles. A corneta é sua.**

Site de humor esportivo, feito por fãs, em que o público vota nos integrantes do Papo Reto
(Canal do Benja) em rankings humorísticos. **Projeto independente, sem vínculo oficial com o Canal do Benja.**

Fluxo: **entrar → escolher ranking → ver a zoeira → votar → compartilhar.**

Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lucide · Supabase (+ Realtime) · Vercel.

---

## Onde fica

O Papo Reto Ranking roda **dentro do site da Fiapo de Manga**, na subpasta **`/papo-reto`**, e é publicado
junto com ele (mesmo projeto na Vercel). Tem layout, CSS, tema e fontes próprios e não passa pelo roteamento
de idiomas (só português). Tudo está isolado para ser fácil de separar depois:

```
src/app/papo-reto/            # rotas: página, abas, API, painel, imagens Open Graph, CSS próprio
│   ├── page.tsx              # /papo-reto (aba padrão: Falou Mais Merda)
│   ├── [tab]/page.tsx        # /papo-reto/falou-merda, /sabio, /bala-do-veio, /charges
│   ├── api/vote              # POST: registra voto (validação no servidor)
│   ├── api/rankings/[slug]   # GET: resultados atuais (+ em quem você votou)
│   ├── api/share-card        # PNG 1080×1350 para compartilhar
│   ├── api/charges
│   └── admin/                # painel protegido
src/papo-reto/                # components, config, hooks, lib (lib/server = Supabase, voto, admin), types
public/papo-reto/             # brand/ (logos) e characters/<slug>/<ranking>/{top,middle,bottom}.webp
supabase/papo-reto.sql        # tabelas, RLS, função de voto, trigger, Realtime, buckets, seed
scripts/papo-reto-characters.mjs
tests/papo-reto/
```

No site principal, os pontos de ligação são: `src/proxy.ts` (ignora `/papo-reto` no roteamento de idiomas),
`src/app/sitemap.ts`, `src/app/robots.ts`, `next.config.ts` (imagens do Supabase, fontes do card, upload),
`src/styles/globals.css` (não lê as classes do Papo Reto) e as dependências `motion` e `@supabase/supabase-js`.

Para mudar o endereço, troque `BASE_PATH` em `src/papo-reto/config/site.ts` e renomeie as pastas
`src/app/papo-reto` e `public/papo-reto` (e os caminhos no `proxy.ts`, `robots.ts`, `sitemap.ts` e `next.config.ts`).

## Começando

```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000/papo-reto
```

Sem as variáveis do Supabase o Papo Reto sobe em **modo demonstração**: participantes reais, mas números
**simulados**, sinalizados por uma faixa amarela no topo e pelo selo "Dados simulados" em cada ranking e
em cada card compartilhável. A votação funciona (em memória, por instância do servidor), mas nada disso é voto real.
O resto do site não depende dessas variáveis.

| Script | O que faz |
| --- | --- |
| `npm run dev` / `npm run build` | Geram antes o manifesto de caricaturas (`npm run papo:characters`) |
| `npm run check` | TypeScript + ESLint + testes (inclui `tests/papo-reto`) |

## Rankings e expressões

| Ranking | Tipo | TOP (1º) | MIDDLE | BOTTOM (último) |
| --- | --- | --- | --- | --- |
| Falou Mais Merda (`falou-merda`) | negativo | assustado | olhando pra cima, desconfiado | sorrindo, aliviado |
| O Mais Sábio (`sabio`) | positivo | orgulhoso, confiante | pensativo | confuso, sem graça |
| Bala do Véio (`bala-do-veio`) | negativo, **sem votação** | apavorado | apreensivo | aliviado, rindo |

A expressão é escolhida automaticamente por **participante + ranking + posição** (`src/papo-reto/lib/ranking.ts`),
sem nenhuma regra ligada a nomes.

**Regras de classificação**

- 3+ participantes: primeiro TOP, último BOTTOM, demais MIDDLE.
- 2 participantes: primeiro TOP, segundo BOTTOM.
- 1 participante: NEUTRAL (usa `neutral.webp` se existir).

**Empates** (regra consistente, coberta por testes):

- Quem tem a mesma quantidade de votos **divide a posição** (classificação esportiva: 1º, 1º, 3º) e o card mostra "Empate".
- A expressão vale para o **grupo de votos**: o grupo com mais votos é TOP, o com menos é BOTTOM, os outros MIDDLE.
- Se **todos** estiverem empatados (inclusive com zero votos), ninguém se destacou: todos ficam NEUTRAL.
- Dentro de um empate, a ordem visual segue a ordem administrativa e o nome — sem mudar a posição.

A posição nunca é comunicada só pela caricatura ou pela cor: há numeração, selos em texto
("Líder da vergonha", "Cérebro do Papo Reto", "Na mira do Véio"…), "Subiu/Caiu", texto alternativo
descrevendo a expressão e `aria-label` em cada card.

### Bala do Véio: ranking do programa

É uma brincadeira interna do programa: **o público não vota**. A ordem é definida no painel
(`/papo-reto/admin` → "ordem do programa": 1 = mais na mira; posições iguais empatam; campo vazio tira a
pessoa da lista). As expressões seguem as mesmas regras de posição. A aba não mostra votos, porcentagem nem
botão de votar, e o voto é recusado na API (`not_votable`) e no banco (`rankings.mode = 'static'`).
No modo demonstração a ordem é simulada e sinalizada como "Ordem simulada".

**Tiros do Véio.** Cada box mostra uma tabela com **quantidade de tiros · local do tiro · localidade · tipo de arma** (localidade opcional: onde aconteceu) e o
total de tiros da pessoa; acima de todos os boxes aparece o total de tiros somando todos. Os registros são
cadastrados no painel (seção do Bala do Véio → "Tiros"), ficam na tabela `static_shots` e o card
compartilhável mostra o total de cada um. A ordem do ranking continua sendo a definida pelo programa.
No modo demonstração os tiros são simulados.

## Ilustrações dos rankings

A ilustração grande abaixo do título de cada ranking (ex.: o troféu do Falou Merda) fica em
`public/papo-reto/rankings/<ranking>.webp` (ou `.png`/`.avif`), quadrada (ex.: 800×800).
É detectada sozinha no `dev`/`build`; sem arquivo, nada aparece. O texto alternativo fica em
`illustrationAlt` (`src/papo-reto/config/rankings.ts`).

### Arte de fundo das laterais

O Troféu Falou Merda tem uma arte de fundo nas laterais da tela
(`public/papo-reto/rankings/falou-merda-bg-left.webp` e `-right.webp`), fixa nas bordas e trocada com uma
transição curta ao mudar de aba. Ela só aparece em telas a partir de 1280px e ocupa apenas o espaço livre ao
lado do conteúdo, para não ficar atrás de textos; no celular nada é carregado. Para outro ranking, adicione os dois
arquivos e a entrada em `BACKDROPS` (`src/papo-reto/components/RankingBackdrop.tsx`).

## Caricaturas

As caricaturas **não** estão incluídas. A arquitetura está pronta para receber arquivos do Oberdan ou de
titulares que autorizarem o uso:

```
public/papo-reto/characters/benja/falou-merda/top.webp
public/papo-reto/characters/benja/falou-merda/middle.webp
public/papo-reto/characters/benja/falou-merda/bottom.webp
public/papo-reto/characters/benja/sabio/…
public/papo-reto/characters/benja/bala-do-veio/…
```

- A pasta é o **slug** do participante: `kleber`, `benja`, `mano`, `joneta`, `carabina`, `gadu` (já criadas); aceita `.avif`, `.webp` ou `.png` (quadrado, ex.: 512×512, fundo transparente, rosto centralizado com a mesma margem).
- O manifesto é gerado sozinho no `dev`/`build`. Também dá para enviar pelo painel `/papo-reto/admin` (Supabase Storage), que tem prioridade sobre a pasta.
- Enquanto um arquivo não existir, aparece um **placeholder ilustrado genérico** (não retrata ninguém) com a expressão certa daquele estado. O sistema **nunca** usa outra expressão no lugar.
- Só as caricaturas da aba aberta são carregadas, e fora da tela com lazy loading.
- Os cards compartilháveis embutem a caricatura quando houver versão `.png` (o gerador de imagens não lê WebP/AVIF); senão usam o placeholder.
- Quando houver caricaturas, o rodapé mostra o crédito (`NEXT_PUBLIC_CARICATURE_CREDIT`).

## Votação

- Só **Falou Mais Merda** e **O Mais Sábio** têm votação.
- **Semana, mês e temporada.** Cada ranking com votação tem três recortes, escolhidos no seletor
  "Semana · Mês · Temporada" (e no link: `?periodo=mes` ou `?periodo=temporada`). A pessoa vota **uma vez por
  semana** em cada ranking, e esse voto soma ao mesmo tempo na semana, no mês e na temporada da data do voto.
- **A temporada é o ano** e termina em 31/12: quem estiver no topo da temporada leva o título do ano. O site mostra
  quantos dias faltam. A semana começa na segunda (configurável no painel), no fuso de São Paulo.
- No banco, cada voto guarda as três chaves (`period_key` = semana, `month_key`, `season_key`) e o placar
  `vote_totals` tem uma linha por recorte (`W2026-11-09`, `M2026-11`, `S2026`).
- A validação acontece **no servidor e no banco** (`cast_vote`): ranking ativo, participante ativo,
  voto único por votante/ranking/período (restrição `unique`) e limite de votos por IP no período.
- O votante é identificado por um cookie `httpOnly` assinado (HMAC). No banco ficam só hashes (`voter_key`, `ip_hash`), nunca o IP ou o cookie.
- Rate limit em memória por IP (12 votos/min por instância) + bloqueio de POSTs de outras origens.
- O `localStorage` não é usado como controle de voto.
- É possível ver os resultados sem votar.

**Limitação honesta:** sem login, não existe garantia absoluta de um voto por pessoa. Quem limpar os cookies
pode votar de novo — até o limite por IP do período (`VOTE_IP_LIMIT_PER_PERIOD`, padrão 20, para não punir
Wi-Fi compartilhado e 4G com CGNAT). Para eventos de grande audiência, considere somar Cloudflare Turnstile/WAF
ou login social.

**Atualização ao vivo:** os números atualizam por polling (20 s) e, com o Supabase Realtime, a cada mudança no
placar. Para não tirar o botão de baixo do dedo de ninguém, a **ordem** dos cards só muda depois do seu voto,
em ciclos de 8 s com a pessoa sem interagir, ou ao tocar em "atualizar posições". Animações respeitam
`prefers-reduced-motion`.

## Configurando o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No **SQL Editor**, rode todo o arquivo [`supabase/papo-reto.sql`](../supabase/papo-reto.sql) (pode rodar de novo sem problema). Ele cria:
   - tabelas `participants`, `rankings`, `votes`, `vote_totals`, `charges`;
   - **RLS** em todas: o público só lê participantes ativos, rankings, o placar agregado e charges publicadas; a tabela `votes` fica fechada;
   - a função `cast_vote` (executável só pela service role) e o trigger que mantém o placar;
   - o placar na publicação do **Realtime**;
   - os buckets públicos `characters` e `charges` (upload só pelo servidor);
   - os três rankings e os participantes (Kleber o Gladiador, Benja, Mano, Joneta, Carabina e Gadu Boyceta). Novos pelo `/papo-reto/admin`.
3. Em **Project Settings → API**, copie a URL, a chave `anon` e a `service_role` para o `.env.local`.
4. Gere os segredos:
   ```bash
   openssl rand -base64 48
   ```
   Use um para `VOTE_SECRET` e outro para `ADMIN_SESSION_SECRET`, e defina uma senha longa em `ADMIN_PASSWORD`.

> A `SUPABASE_SERVICE_ROLE_KEY` só é lida no servidor (`src/papo-reto/lib/server/*` importa `server-only`).
> Nunca a coloque numa variável com prefixo `NEXT_PUBLIC_`.

## Painel administrativo (`/papo-reto/admin`)

Protegido por senha (`ADMIN_PASSWORD`), com sessão em cookie `httpOnly` assinado (12 h), limite de tentativas
de login e `noindex`. Permite:

- cadastrar, editar, ordenar e ativar/desativar participantes;
- enviar e remover caricaturas por ranking e expressão;
- ativar/pausar rankings e escolher o dia em que a semana começa;
- consultar os resultados da semana, do mês e da temporada;
- cadastrar, publicar, despublicar e excluir charges;

Sem Supabase o painel avisa que o site está em modo demonstração.

## Publicação na Vercel

Vai junto com o site da Fiapo de Manga, no mesmo projeto: basta o código chegar à branch de produção.
Para ligar a votação real, cadastre as variáveis do Papo Reto (`.env.example`) em
**Settings → Environment Variables** e faça um novo deploy. Rankings revalidam a cada 15 s (ISR) e o navegador
completa com a API. O rate limit em memória vale por instância; o limite que manda de verdade é o do banco.

Se um dia o Papo Reto virar um projeto próprio, dá para extrair as pastas acima para um app Next.js separado
(e, se quiser manter o endereço `/papo-reto`, usar `basePath` + rewrite no site principal).

## Compartilhamento

- URLs por aba: `/papo-reto/falou-merda`, `/papo-reto/sabio`, `/papo-reto/bala-do-veio`, `/papo-reto/charges` (abrem a mesma experiência já na aba).
- Botões: **Mandar no WhatsApp** (primeiro no celular), **Compartilhar ranking** (Web Share API, com fallback para copiar) e **Copiar link**.
- **Cards em imagem** (`/papo-reto/api/share-card?ranking=…&participant=…`): 1080×1350 com ranking, posição, caricatura, nome, votos, frase e identidade do site. Os números vêm sempre do banco, nunca da URL, então não dá para forjar um card. No celular o card vai direto para o menu de compartilhamento; no desktop, é baixado.
- Frases como "BENJA LIDERA O TROFÉU FALOU MERDA. O POVO NÃO PERDOOU!" só aparecem quando correspondem ao resultado real (líder isolado, com votos). Em modo demonstração o texto é um convite genérico e o card leva o selo "Dados simulados".
- Open Graph/Twitter por aba, sem números (para não ficar desatualizado).

## Acessibilidade

Abas com `role="tablist"` e navegação por setas/Home/End; foco visível; áreas de toque ≥ 44 px; textos
alternativos que descrevem a expressão; anúncios de voto em `aria-live`; galeria em `<dialog>` nativo (Esc
fecha e o foco volta); link "Pular para os rankings"; nada depende de hover; safe areas respeitadas.

## Pendências (dependem de vocês)

- **Caricaturas autorizadas** do Oberdan (3 expressões × 3 rankings por participante).
- **Logos em alta resolução** (SVG): os enviados têm 98×52 e 66×65 px e perdem nitidez em telas densas.
- **Autorização de uso** das marcas Papo Reto / Canal do Benja e confirmação do link oficial do YouTube (`NEXT_PUBLIC_YOUTUBE_URL`).
- Credenciais do Supabase e domínio final.
