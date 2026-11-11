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

## Propostas e pagamento recorrente (em andamento)

Prévia publicada em `/painel/propostas/nova` (montar a proposta) e `/proposta/demo` (página do cliente).
Regras e contrato: documento "Fiapo de Manga — Regras dos planos e minuta de contrato".
Código: `src/lib/proposals/` (catálogo, valores, contrato e Termo) e `src/components/proposals/`.

Feito: área admin em `/admin` (ver `docs/admin.md`) com login por link mágico, propostas salvas com código aleatório,
aceite registrado (data, hora, IP, navegador, versão), clientes, cobranças, histórico e relatório com exportação CSV.

Falta para usar com clientes reais:
- Criar o projeto no Supabase e configurar as variáveis (o admin roda em modo demonstração até lá).
- Mercado Pago: checkout (anual e mensal por Pix/boleto) e assinatura no cartão (mensal), com webhook de confirmação.
- Envio da cópia do contrato por e-mail (o registro do aceite já está feito).
- Régua de cobrança automática, suspensão com 15 dias e reativação após pagamento.
- Dados da empresa no contrato e revisão jurídica.

### Relatório de clientes (área admin)

Tela de relatório para ter tudo registrado em caso de problema (depois pode virar um dashboard):
- Clientes: plano, valor, periodicidade, forma de pagamento, início, fim da fidelidade, próximo vencimento, situação (em dia, atrasado, suspenso, cancelado).
- Pagamentos: cada cobrança com valor, vencimento, data do pagamento, forma, número da transação no Mercado Pago e status; filtros por mês, cliente e situação; exportar CSV/PDF.
- Inadimplência: quem está atrasado, há quantos dias, total em aberto, multa e juros calculados.
- Histórico por cliente (linha do tempo): proposta enviada e aberta, aceite (data, hora, IP, e-mail, versão do contrato), pagamentos, avisos de cobrança enviados, suspensões, reativações, alterações de valor (com o novo aceite, quando houver) e cancelamento.
- Documentos: contrato aceito e Termo de cada cliente em PDF, sempre na versão aceita.
- Registro de auditoria: quem mudou o quê no painel e quando.

## SEO e blog (feito em 11/2026)

Ver `docs/seo.md`: auditoria, mapa de palavras-chave, páginas por tipo de negócio (`/site-para/...`), perguntas
frequentes, editor de artigos no admin (`/admin/artigos`), sitemap/hreflang corrigidos e `llms.txt`.

Ideias para depois:
- Imagem de compartilhamento (Open Graph) gerada por página/artigo.
- Páginas por cidade, quando a região de atuação estiver confirmada.
- Artigos em inglês e espanhol, se a consultoria internacional voltar a ser foco.
- Avaliações reais no perfil do Google e marcação de avaliações (só com dados verdadeiros).
