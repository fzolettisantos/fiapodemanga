# MK DESIGN — BRAND, DESIGN SYSTEM, COPY E ESPECIFICAÇÃO DE PRODUTO

> Documento pronto para orientar implementação com Claude Code. Idioma: pt-BR. Versão inicial: novembro de 2026. Status: proposta, sujeita à validação do proprietário.

## 1. Objetivo do produto
Criar um site mobile-first para MK Design, especializada em instalação de TVs em paredes, painéis e móveis, instalação de suportes fixos, de teto, articulados e pedestal, além de serviços de diagnóstico e conserto de televisores. O visitante pode conhecer serviços, montar pedido, escolher data e hora disponíveis, informar contato/endereço, enviar para WhatsApp e acompanhar o status. Priorizar conversão, clareza e confiança.

## 2. Identidade da marca
- Nome: MK Design.
- Posicionamento: instalação e assistência para TVs, com serviço prático e atendimento direto.
- Tom: profissional, acessível, objetivo, sem jargão ou promessas absolutas.
- Valores comunicados: cuidado na instalação, organização, transparência na avaliação, facilidade de agendar.
- Direção de logo: modernizar o logo anexado sem descaracterizar; preservar monograma MK, moldura geométrica aberta, amarelo-limão, preto, lettering DESIGN espaçado. Produzir logo horizontal, vertical, monograma favicon; variantes claras/escuras e SVG vetorial fiel. Usar a imagem gerada como referência visual, não como SVG pronto. Evitar efeitos 3D, gradientes e ruído visual.

## 3. Design system e tokens
**Tecnologia**: Next.js 16.x estável (App Router), React, TypeScript, Tailwind CSS 4.x, shadcn/ui, Lucide React, react-hook-form + Zod, date-fns, biblioteca de persistência a definir; banco Postgres/Supabase ou alternativa equivalente se houver agenda real. Consultar versões compatíveis ao instalar. Tailwind 4 usa `@theme` e variáveis CSS; evite orientação antiga de `tailwind.config.js` como única fonte de tokens.

### Cores
- `brand-primary`: `#E4F000` — destaque, fundos de CTA com texto escuro.
- `brand-primary-hover`: `#CDD900` — hover do CTA.
- `brand-ink`: `#171717` — títulos, texto e superfícies escuras.
- `surface`: `#FFFFFF` — página.
- `surface-muted`: `#F5F5F2` — seções alternadas.
- `border`: `#E3E3DF` — bordas.
- `text-secondary`: `#5B5B59` — textos de apoio.
- `neutral-mid`: `#737373` — elementos neutros, não para texto pequeno sobre fundo claro sem checar contraste.
- `success`: `#166534`; `error`: `#B42318`; `focus`: `#2456D3` — cores de status e foco, independentes da marca.
- Usar `#171717` para texto sobre amarelo. **Não usar branco sobre amarelo-limão**. Validar contraste WCAG AA.

### Tipografia
- Headings: Space Grotesk (600 e 700).
- Body/UI: Inter (400, 500, 600).
- Escala sugerida desktop: H1 56/60, H2 40/46, H3 28/34, body 16/26, small 14/22.
- Escala mobile: H1 36/42, H2 30/36, H3 23/30, body 16/25.
- Line-height e tamanhos responsivos via `clamp()`; não usar fontes menores que 14px para informações essenciais.

### Layout, grid, cantos e efeitos
- Mobile-first, container 1200px, margens mobile 20px, desktop 32px.
- Espaçamentos: escala 4/8/12/16/24/32/48/64/96px; grid 12 colunas desktop, 4 mobile.
- Border radius: 8px inputs, 12px cards, 16px modais/containers. Botões 10px.
- Botões com altura mínima 44–48px; áreas clicáveis de no mínimo 44x44px.
- Sombra leve apenas quando necessária; transições 150–250ms; respeitar `prefers-reduced-motion`.
- Ícones Lucide com espessura consistente, 20–24px; evitar ícones decorativos excessivos.

### Componentes
`SiteHeader`, `MobileMenu`, `Hero`, `TrustSignals`, `ServiceCard`, `ServiceCategoryFilter`, `ServiceDetails`, `InstallationTypeSelector`, `TVSizeSelector`, `SupportTypeSelector`, `RepairBrandSelector`, `RepairSymptoms`, `AddressForm`, `AvailabilityCalendar`, `TimeSlotPicker`, `BookingSummary`, `WhatsAppCTA`, `PaymentMethods`, `FAQAccordion`, `Testimonials` (só depoimentos reais), `Footer`, `AdminCalendar`, `AdminAvailabilitySettings`, `AdminServices`, `AdminBookings`.

Estados obrigatórios: default, hover, focus-visible, selected, disabled, loading, error, empty, success. Criar UI acessível com navegação por teclado, labels reais, mensagens de erro associadas e feedback de envio.

## 4. Arquitetura da informação
**Páginas públicas**
1. `/` — Home (hero, benefícios, categorias, como funciona, pagamentos, FAQ, CTA).
2. `/servicos` — Catálogo com filtros e cards.
3. `/servicos/[slug]` — Detalhes, escopo e preparação.
4. `/agendar` — Wizard de seleção, dados, data/hora e revisão.
5. `/sobre` — Descritivo da empresa, fotos reais da equipe/trabalho quando disponíveis.
6. `/contato` — WhatsApp, telefone, área de atendimento confirmada, formulário opcional.
7. `/privacidade` — Informações de tratamento de dados e contato.
**Área protegida**
8. `/admin` — Dashboard: pedidos novos, aguardando confirmação, confirmados, concluídos e cancelados.
9. `/admin/agenda` — Calendário semanal/mensal e bloqueios.
10. `/admin/servicos` — Ativar/desativar serviços, durações e política de preço sob orçamento.
11. `/admin/configuracoes` — Horários, capacidade, área de atendimento e WhatsApp.

## 5. Catálogo inicial (dados editáveis; não inventar preços)
### Instalação de TVs
- Instalação de TV na parede.
- Instalação de TV em painel.
- Instalação de TV em móvel ou rack.
- Ajuste, posicionamento e reinstalação de TV (se oferecido; confirmar com dono).
### Instalação de suportes
- Suporte fixo.
- Suporte articulado.
- Suporte de teto.
- Suporte pedestal.
### Assistência técnica
- Avaliação/diagnóstico de TV.
- Solicitação de conserto de TV.
- Marcas informadas: Samsung, Sony, TCL, LG, Philips e “IOC” [**confirmar se a marca pretendida é AOC**].
- Problemas selecionáveis: não liga, sem imagem, sem som, imagem com falhas, entradas/conexões, outro.
**Nota editorial:** não afirmar assistência autorizada, reparo de qualquer defeito, garantia, disponibilidade de peças, visita grátis, preço fechado, tempo de execução ou parcelamento sem confirmação.

## 6. Copy do site
### SEO/Home
- Title: `MK Design | Instalação de TVs, suportes e assistência técnica`
- Description: `Instalação de TVs em paredes, painéis e móveis, instalação de suportes e solicitação de reparos. Escolha o serviço e agende seu atendimento com a MK Design.`

### Hero
- Eyebrow: `INSTALAÇÃO E ASSISTÊNCIA TÉCNICA`
- H1: `Sua TV no lugar certo. Sem complicação.`
- Texto: `Instalação de TVs, suportes, painéis e assistência técnica em um só lugar. Escolha o serviço, selecione o melhor horário disponível e fale diretamente com a MK Design.`
- CTA primário: `Escolher um serviço`
- CTA secundário: `Falar pelo WhatsApp`
- Microcopy: `Atendimento sujeito à confirmação de disponibilidade.`

### Serviços
- Eyebrow: `O QUE FAZEMOS`
- H2: `Da instalação ao reparo, conte com a MK Design.`
- Card 1: `Instalação de TVs` / `Na parede, em painéis ou móveis, conforme as características do ambiente.` / `Ver opções`
- Card 2: `Suportes para TV` / `Fixos, articulados, de teto e pedestais. Escolha a solução para seu espaço.` / `Selecionar suporte`
- Card 3: `Conserto de TVs` / `Conte qual é o problema da sua TV e solicite uma avaliação técnica.` / `Solicitar avaliação`

### Como funciona
- H2: `Resolva tudo em poucos passos.`
- Passo 1: `Escolha o serviço` / `Selecione o tipo de instalação ou reparo que você precisa.`
- Passo 2: `Informe os detalhes` / `Conte onde será feito o serviço e, se necessário, o modelo da TV.`
- Passo 3: `Selecione a data` / `Confira os horários disponíveis para solicitar seu atendimento.`
- Passo 4: `Confirme pelo WhatsApp` / `Enviamos um resumo pronto para você concluir o contato com a equipe.`

### Diferenciais (sem promessas sem evidência)
- H2: `Atendimento simples, desde o primeiro contato.`
- Benefícios: `Escolha fácil do serviço`; `Agendamento organizado`; `Contato direto pelo WhatsApp`; `Informações claras antes do atendimento`.

### Pagamentos
- H2: `Pague do jeito que preferir.`
- Texto: `Aceitamos Pix, cartão de débito e cartão de crédito das bandeiras Visa, Mastercard e Elo.`
- Nota: `Condições de pagamento e valores informados na confirmação do serviço.`
- Não insinuar pagamento online no MVP nem parcelamento sem integração/regra comercial.

### FAQ (respostas conservadoras)
1. `Posso agendar pelo site?` / `Sim. Você escolhe o serviço, a data e um horário disponível. A equipe confirma os detalhes do atendimento.`
2. `Vocês instalam qualquer tipo de suporte?` / `Trabalhamos com opções fixas, articuladas, de teto e pedestal. Informe o modelo da TV para avaliarmos a instalação.`
3. `Vocês consertam TVs de quais marcas?` / `Recebemos solicitações para Samsung, Sony, TCL, LG e Philips, além de outras marcas mediante consulta.`
4. `Como funciona o orçamento?` / `Ao enviar sua solicitação, a equipe avalia as informações e orienta sobre o orçamento.`
5. `Quais formas de pagamento são aceitas?` / `Pix, débito e crédito Visa, Mastercard e Elo.`
6. `O agendamento está confirmado ao escolher um horário?` / `A solicitação fica registrada e depende de confirmação pela MK Design.`

### CTA final
- H2: `Vamos resolver o que você precisa?`
- Texto: `Escolha um serviço e encontre um horário para seu atendimento.`
- Botão: `Agendar atendimento`

## 7. Experiência de contratação: wizard
**Etapa 1: serviço** — escolha entre instalação de TVs, suportes, reparos; mostrar variações.
**Etapa 2: detalhes técnicos** — instalação: tamanho da TV, marca/modelo, tipo de suporte, local de instalação, material da parede quando souber, se já possui suporte, observações e fotos opcionais; reparo: marca, modelo, tamanho, sintomas, observações e foto opcional.
**Etapa 3: localização** — CEP, bairro, cidade, endereço e complemento; validar cobertura de atendimento configurável, sem presumir que o serviço cobre todo o Brasil.
**Etapa 4: data/horário** — calendário com somente slots reais configurados e compatíveis com tipo/duração/área de atendimento; horário local `America/Sao_Paulo` se operação for em São Paulo; permitir bloqueios e buffers de deslocamento.
**Etapa 5: contato e revisão** — nome, WhatsApp, aceite de privacidade, resumo completo, preço `Sob orçamento` quando desconhecido, botão `Solicitar agendamento pelo WhatsApp`.
**Etapa 6: resultado** — registrar pedido no banco antes de abrir WhatsApp e gerar protocolo; WhatsApp pré-preenchido com serviço, detalhes, endereço resumido (dados completos apenas se necessário), data/hora desejadas e protocolo. Abrir via `https://wa.me/55NUMERO?text=...` somente após fornecer número real no config. Mensagem de status: `Solicitação recebida. O atendimento será confirmado pela equipe.`

### Regras de agendamento reais
- Agenda nunca deve ser apenas aparência de calendário: usar persistência e slots reais.
- Administrador configura dias/horários de atendimento, feriados, pausas, capacidade, duração por serviço e períodos bloqueados.
- Cliente não pode reservar horário passado ou ocupado; dupla reserva impedida no backend com checagem transacional/constraint.
- Dois modelos possíveis: (A) **Solicitação com aprovação** (recomendado para MVP): manter slot como pendente/bloqueado temporariamente e confirmar manualmente; definir política de expiração e liberação; (B) **Reserva instantânea**: somente se operação realmente garantir disponibilidade.
- WhatsApp não prova entrega ou leitura; pedido salvo no backend é fonte da verdade. Se a aba do WhatsApp for fechada, a interface deve explicar o que ficou registrado e o que ainda necessita de confirmação.
- Reagendamento/cancelamento manual no painel; política configurável.
- Usuário visualiza indisponibilidades sem expor nomes/dados de outros clientes.
- Notificações via WhatsApp **automatizadas** só com API oficial/provedor autorizado, templates e consentimentos aplicáveis; no MVP basta link com texto pronto.
- Sem backend, não simular disponibilidade verdadeira: exibir `Solicitar preferência de data e horário` e confirmar manualmente.

### Modelo de mensagem WhatsApp
`Olá! Gostaria de solicitar um atendimento com a MK Design.\n\nProtocolo: {id}\nServiço: {servico}\nDetalhes: {detalhes}\nBairro/Cidade: {localidade}\nData desejada: {data}\nHorário desejado: {hora}\nNome: {nome}\n\nPodem confirmar a disponibilidade e orientar sobre o orçamento?`

## 8. Área administrativa
- Login seguro com autenticação e autorização somente do proprietário/colaboradores autorizados.
- Lista e filtros por data, serviço, status, nome e telefone.
- Visualização semanal da agenda, bloquear intervalos e ajustar horários.
- Transição de status auditável: `novo`, `aguardando confirmação`, `confirmado`, `em atendimento`, `concluído`, `cancelado`.
- Editar duração de serviços, ordem do catálogo, zonas atendidas, dias/horários.
- Configurar número do WhatsApp em formato internacional e a mensagem-padrão.
- Exportação CSV opcional, somente acesso autenticado.

## 9. Dados e segurança
- Entidades: `ServiceCategory`, `Service`, `ServiceOption`, `BusinessHours`, `BlockedSlot`, `Booking`, `BookingStatusHistory`, `ServiceArea`, `AdminUser`, `BusinessSettings`.
- Booking: id, serviceId, variant, technicalDetails JSON validado, customerName, customerPhone, location, requestedStartAt (timestamp com timezone), durationMinutes, status, createdAt, updatedAt, privacyConsentAt.
- Supabase/Postgres com RLS ou permissões equivalentes: visitante só cria seu próprio pedido e consulta confirmação por token não adivinhável se essa função existir; nunca expor lista de clientes publicamente.
- Chaves no servidor; validação Zod no cliente **e servidor**; rate limit, proteção contra spam, sanitização, logs sem PII desnecessária.
- Política de privacidade e consentimento de contato, coleta mínima e retenção definida conforme LGPD; não pedir documento pessoal sem necessidade.
- Fotos opcionais requerem upload seguro, limite de tamanho/tipo, controle de acesso e prazo de retenção.

## 10. SEO, performance e acessibilidade
- HTML semântico, SEO por serviço, metadados, Open Graph e favicon MK.
- Schema.org LocalBusiness apenas após confirmar nome comercial, telefone, endereço público e região atendida.
- Mobile-first, imagens WebP/AVIF com dimensões corretas, lazy loading, evitar CLS, performance Core Web Vitals.
- Formulários acessíveis com orientação textual, progresso do wizard, erros específicos, mensagens status `aria-live`, foco e teclado.
- Mirar WCAG 2.2 AA.
- Não fabricar avaliações, números de clientes ou selos de assistência autorizada.

## 11. Orientações visuais para Claude
- Estética: estúdio técnico contemporâneo; clean e forte, preto/branco com detalhes lime.
- Hero em duas colunas no desktop, texto forte à esquerda e fotografia autêntica de TV sendo instalada corretamente à direita; mobile com CTA visível antes de rolar.
- Cards dos serviços com fotos reais ou ilustrações técnicas consistentes, título, frase curta e CTA.
- Fundo branco com faixas `surface-muted`, tipografia preta, barras lime finas e geometria inspirada na moldura do logo.
- Menu sticky com logotipo e botão `Agendar serviço`; no mobile pode haver CTA sticky discreto.
- Formulário wizard com indicador de progresso, resumo do serviço e opção de voltar sem apagar campos.
- Nunca usar amarelo fluorescente em grandes áreas de texto, nem foto genérica de call center.

## 12. Requisitos de qualidade / critérios de aceite
1. Completar fluxo de escolher serviço → detalhes → data/hora → contato → revisão → salvar pedido → WhatsApp.
2. Contagem de horários e status real, sem dupla reserva; administrador consegue bloquear agenda.
3. Experiência responsiva 320–1440px e testes de teclado/contraste.
4. Serviços e horários editáveis no painel; dados não hardcoded como única fonte de verdade.
5. Sem preço inventado, número de WhatsApp fictício, local de atuação inventado ou depoimentos falsos.
6. Em falhas, exibir mensagens compreensíveis e opções de retentar/contatar.
7. Rodar lint, typecheck, testes de regras de agendamento e teste end-to-end do principal fluxo.

## 13. Pendências para configuração real
- Número do WhatsApp comercial.
- Cidade/bairros/cidades cobertas, taxa de deslocamento se houver.
- Horários de funcionamento, durações médias, antecedência mínima, feriados e capacidade.
- Se suporte é fornecido ou deve ser adquirido pelo cliente.
- Política de preços, visita técnica, orçamento, garantia e cancelamento.
- Confirmação da marca `IOC` versus `AOC`.
- Fotos de trabalhos reais e dados institucionais.
- Se existe domínio, hospedagem e escolha de backend.

## 14. Prompt principal para Claude Code
Você é um squad sênior de Product Design, UX Writing e Front-end Engineering. Implemente o website da MK Design com base integral neste guia, preservando fidelidade ao logo de referência. Utilize Next.js App Router, TypeScript, Tailwind CSS 4 e shadcn/ui; componha design tokens reutilizáveis e componentes acessíveis. Entregue site público, wizard de contratação com solicitação de agendamento, integração WhatsApp por link parametrizado, e painel admin com autenticação e gestão de disponibilidade. Escolha uma arquitetura segura e simples para persistência, com migrations e `.env.example`. Não simule reserva real sem backend; caso faltem credenciais, use modo demonstrativo claramente identificado e interfaces prontas para conectar, sem inventar resultados nem horários. Não invente preço, telefone, endereço, avaliações, garantia, assistência autorizada ou fatos comerciais. Inicie pela arquitetura, tokens, layout e páginas, depois modelos/API/agenda/admin, e finalize com testes, README de deploy e checklist de variáveis e pendências. Todo texto da UI deve estar em português brasileiro. Gere uma experiência premium, objetiva, rápida e prioritariamente mobile.

## Fontes técnicas consultadas em novembro de 2026
- https://nextjs.org/docs
- https://tailwindcss.com/docs/theme
- https://ui.shadcn.com/docs/components
- https://ui.shadcn.com/docs/components/base/calendar
