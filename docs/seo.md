# SEO — plano e checklist

> **Importante:** ninguém controla a posição no Google, e este plano **não promete primeiro lugar**. O que dá para
> fazer é deixar a base técnica correta, publicar conteúdo útil e específico, e construir sinais de confiança.
> Termos como "criação de sites" têm muita concorrência (Wix, Hostgator, agências grandes). O caminho realista é
> **busca específica + busca local + conteúdo**, e ele leva meses.

## O que já está no site (técnico)

| Item | Situação |
|---|---|
| Título e descrição únicos por página, no tamanho que o Google mostra | Feito, e protegido por teste (`tests/seo-meta.test.ts`) |
| Um único H1 por página, hierarquia de títulos, texto alternativo em todas as imagens | Feito (auditado em todas as páginas) |
| Canonical, Open Graph, Twitter Card | Feito |
| `hreflang` correto: páginas só em português não declaram outros idiomas; Home, serviços e contato em português não se declaram equivalentes às versões em inglês/espanhol (que são de consultoria) | Feito |
| Sitemap com `lastmod` só quando é a data real (artigos e cases) | Feito |
| `robots.txt` (bloqueia `/admin`, `/proposta`, `/api`) e páginas comerciais com `noindex` | Feito |
| Dados estruturados: Organization, WebSite, Service, FAQPage, BreadcrumbList, Article, ItemList, CreativeWork | Feito |
| `/llms.txt` (resumo para buscadores com IA) | Feito |
| Rapidez: Lighthouse 96–97 em desempenho, 100 em acessibilidade, boas práticas e SEO | Medido em 11/2026 |
| Verificação do Search Console e do Bing por variável de ambiente | Pronto (veja abaixo) |

## O que cada página atende (mapa de palavras-chave)

| Página | Busca que atende |
|---|---|
| `/` | criação de sites e lojas virtuais para empresas |
| `/servicos/criacao-de-sites` | criação de sites profissionais, landing page, site institucional |
| `/servicos/ecommerce` | criação de loja virtual, e-commerce, vender pela internet |
| `/servicos/aplicativos-sistemas-plataformas` | criação de aplicativo e sistema sob medida |
| `/servicos/design-tecnologia-ia` | IA para empresas, chatbot para site, automação |
| `/site-para/salao-de-beleza` | site para salão de beleza |
| `/site-para/barbearia` | site para barbearia |
| `/site-para/restaurante` | cardápio digital, site para restaurante |
| `/site-para/confeitaria` | site para confeitaria, doces por encomenda |
| `/site-para/clinica` | site para clínica / consultório |
| `/site-para/psicologo` | site para psicólogo |
| `/site-para/advogado` | site para advogado / escritório de advocacia |
| `/site-para/personal-trainer` | site para personal trainer |
| `/site-para/pet-shop` | site para pet shop |
| `/site-para/loja-de-roupas` | loja virtual para roupas / moda |
| `/site-para/fotografo` | portfólio para fotógrafo |
| `/site-para/oficina-mecanica` | site para oficina mecânica |
| `/site-para/imobiliaria` | site para imobiliária / corretor de imóveis |
| `/site-para/contador` | site para contador / escritório de contabilidade |
| `/site-para/arquiteto` | portfólio para arquiteto e designer de interiores |
| `/site-para/nutricionista` | site para nutricionista |
| `/site-para/clinica-de-estetica` | site para clínica de estética |
| `/site-para/floricultura` | site para floricultura |
| `/site-para/pousada` | site para pousada / hotel |
| `/site-para/prestador-de-servicos` | site para eletricista, encanador, pintor, diarista (autônomos) |
| `/site-para/artesanato` | loja virtual para artesanato |
| `/perguntas-frequentes` | site tem fidelidade? domínio incluso? quanto tempo leva? |
| `/insights` e `/insights/categoria/*` | busca informacional (guias), ver pauta abaixo |

Novos tipos de negócio: copie um bloco de `src/content/niches.ts`. Escreva texto próprio para cada um (o teste
barra textos repetidos).

## O que depende de você (fora do site)

Estes itens pesam mais do que qualquer ajuste técnico e **só você consegue fazer**:

1. **Search Console** (search.google.com/search-console): adicione o domínio, envie `https://SEU-DOMINIO/sitemap.xml`
   e acompanhe quais buscas trazem gente. Para verificar pelo site, copie o código da tag HTML e coloque em
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` na Vercel. Faça o mesmo no Bing Webmaster (`NEXT_PUBLIC_BING_SITE_VERIFICATION`).
2. **Perfil da empresa no Google (Google Meu Negócio)**: é o que faz a empresa aparecer no mapa e nas buscas locais.
   Exige endereço (ou área de atuação, no caso de serviço remoto) e verificação do Google. **Confirme a cidade antes**
   (Santos/SP está pendente): com ela, preenchemos `siteConfig.location` e a empresa passa a declarar a região.
3. **Domínio definitivo** em `NEXT_PUBLIC_SITE_URL` (sitemap, canonical e imagens apontam para ele).
4. **Redes sociais oficiais** em `siteConfig.social` (entram nos dados estruturados e ajudam o Google a reconhecer a marca).
5. **Avaliações reais** de clientes no perfil do Google (peça a quem já contratou, nunca invente).
6. **Links de outros sites** (parcerias, diretórios sérios, menções): é o sinal mais forte e o mais lento.
7. **Artigos**: o blog só ajuda se tiver conteúdo bom e constante (veja a pauta).
8. **Medição**: o site não usa cookies de análise (LGPD). Quando quiser medir visitas, use uma ferramenta sem cookies,
   como Plausible, ou o Vercel Analytics.

## Pauta de artigos (blog)

Escreva com a sua experiência, com exemplos reais, e use a lista de verificação do editor. Cada artigo deve ligar
para 2 ou mais páginas do site (serviços e tipos de negócio).

| Categoria | Ideia de artigo (busca) |
|---|---|
| Google e SEO | Como aparecer no Google Maps (empresa local) |
| Google e SEO | Meu site não aparece no Google: 7 motivos comuns |
| Google e SEO | O que é SEO, em linguagem simples, para quem tem um negócio |
| Sites | Site ou Instagram? O que cada um faz pelo seu negócio |
| Sites | Quanto tempo leva e o que preparar para ter um site (textos e fotos) |
| Sites | Landing page ou site institucional: qual escolher |
| Lojas virtuais | Como vender pelo Mercado Pago: pagamento, frete e taxas |
| Lojas virtuais | Fotos de produto que vendem (com o celular) |
| Lojas virtuais | Loja virtual própria ou marketplace: vantagens e custos |
| WhatsApp e vendas | Como organizar pedidos do WhatsApp |
| WhatsApp e vendas | Botão de WhatsApp no site: como configurar a mensagem pronta |
| Inteligência Artificial | Assistente virtual no site: o que faz e o que não faz |
| Inteligência Artificial | Descrições de produtos com IA sem perder o seu jeito |
| Para o seu negócio | Como pedir avaliações aos clientes no Google |
| Para o seu negócio | O que é LGPD para pequena empresa: o básico do site |

Por tipo de negócio, vale um guia para cada página `/site-para/...`, por exemplo "Como divulgar um salão de beleza
na internet", ligando de volta para a página do segmento.

## Como saber se está funcionando

- **Primeiras semanas:** o Search Console mostra páginas indexadas e erros. A meta é todas as páginas do sitemap indexadas.
- **1 a 3 meses:** aparecem as primeiras impressões e buscas de nicho (cidade + serviço, tipos de negócio).
- **3 a 6 meses ou mais:** o efeito do conteúdo e dos links. Acompanhe cliques, posição média e contatos recebidos.

## Variáveis de ambiente de SEO

| Variável | Para quê |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Endereço definitivo (canonical, sitemap, imagens) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Código da tag do Search Console |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Código do Bing Webmaster |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Botão de WhatsApp e telefone nos dados estruturados |
