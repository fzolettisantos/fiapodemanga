# Roadmap — Site Fiapo de Manga

Próximas evoluções planejadas. Itens que dependem de informações externas estão em
"Pendências" no `README.md`.

## Futuro

### Área administrativa (CMS)

**Objetivo:** permitir publicar cases, artigos de Insights e ajustar textos sem editar código.

**Abordagem recomendada:** CMS baseado em Git ([Keystatic](https://keystatic.com) ou [TinaCMS](https://tina.io)).

- Painel em `/admin` com login via GitHub.
- O conteúdo continua versionado no repositório: cada publicação vira um commit, e a Vercel republica o site.
- Sem banco de dados nem servidor adicional, e com custo zero no plano básico da ferramenta.
- A estrutura atual já está preparada para isso, porque o conteúdo está separado dos componentes
  (`src/content/*`) e é tipado (`src/types/content.ts`).

**Escopo previsto:**

1. Coleções de **Cases** (campos do template: contexto, problema, objetivo, pesquisa, hipóteses,
   processo, solução, resultados comprovados, aprendizados e imagens autorizadas) e de **Artigos**
   (título, slug, resumo, autor, data, categoria, conteúdo, imagem, SEO e relacionados).
2. Upload de imagens para `public/images/`, com texto alternativo obrigatório.
3. Migração do conteúdo de `src/content/projects` e `src/content/articles` de arquivos `.ts` para
   arquivos de conteúdo (JSON/Markdoc) lidos pelo CMS, mantendo os tipos atuais.
4. Opcional: tornar editáveis os textos institucionais (Home, Sobre, O que fazemos).

**Decisões em aberto:**

- Quem vai editar (todas as pessoas editoras precisam de conta no GitHub).
- Quais conteúdos ficam editáveis: só cases e artigos, ou também os textos das páginas.

**Alternativas, se a necessidade crescer:**

- Usar um CMS hospedado (Sanity, Contentful), com publicação imediata e mais editores.
- Fazer um painel próprio com banco de dados, só se surgir necessidade específica (ex.: guardar as
  mensagens do formulário ou ter uma área de clientes). Essa opção exige atenção extra a segurança e LGPD.

### Outras evoluções

- Rate limit do formulário em armazenamento compartilhado (ex.: Upstash Redis) ou proteção por
  WAF/Cloudflare Turnstile, quando o site rodar em várias instâncias.
- Página de categoria em `/insights/categoria/[slug]`, quando houver artigos suficientes.
- Medição real de Core Web Vitals após o deploy (Vercel Speed Insights ou Search Console).
