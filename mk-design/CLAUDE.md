# CLAUDE.md — Regras permanentes do projeto MK Design

Plataforma pt-BR de contratação e agendamento de instalação e assistência técnica de TVs. Leia `docs/brand/style-guide.md` (fonte de verdade de marca, copy e requisitos) e `docs/technical/architecture.md` antes de trabalhar.

## Stack
Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 (`@theme`/CSS variables, **sem** `tailwind.config.js`) · shadcn/ui (`components.json`) · Lucide · react-hook-form + Zod · date-fns · Vitest. Verifique a documentação oficial antes de usar API nova (Next 16: `proxy.ts` no lugar de `middleware.ts`).

## Comandos
`npm run dev` · `npm run build` · `npm run check` (typecheck + lint + test). Rode `npm run check` antes de concluir qualquer tarefa.

## Regras de conteúdo (inegociáveis)
- Todo texto de UI em **português brasileiro**; use a copy do style guide.
- **Nunca inventar** preço, WhatsApp, telefone, endereço, área de atendimento, avaliações, garantia, "assistência autorizada", prazos, visita grátis ou parcelamento. Dado desconhecido = `null`/"Sob orçamento"/pendência registrada.
- Não pedir documento pessoal; coleta mínima (LGPD); logs sem PII.
- Tom: profissional, acessível, objetivo; sem promessas absolutas.

## Design system
- Valores vêm dos tokens em `src/design-system/tokens/` (`tokens.css` é a fonte; `index.ts` espelha). **Não** use hex/px soltos em componentes; use utilitários/variáveis.
- Texto escuro (`brand-ink`) sobre amarelo; **nunca branco sobre amarelo**; amarelo nunca em grandes áreas de texto.
- Mobile-first; alvos ≥ 44 px; foco visível; respeitar `prefers-reduced-motion`; WCAG 2.2 AA.
- Componentes: reutilizáveis, em `components/ui` (primitivos) ou pasta de domínio; estados default/hover/focus-visible/selected/disabled/loading/error/empty/success.
- Formulários: `Field` + labels reais + erro associado; seletores com `SelectableCard`.
- Não alterar a identidade visual sem necessidade; preservar o logo (monograma MK, moldura aberta, lime + preto).

## Arquitetura
- Páginas em `src/app` apenas compõem; lógica em `lib/`, tipos em `types/`, constantes em `config/`.
- Persistência **sempre** via interfaces de `src/types/repositories.ts`; nunca acessar o banco direto de componentes.
- Agenda real: slots persistidos; dupla reserva bloqueada no **backend** (transacional/constraint). Sem backend → modo demonstrativo identificado; nunca simular disponibilidade.
- Pedido é salvo **antes** de abrir o WhatsApp; backend é a fonte da verdade.
- Validação Zod no cliente **e** no servidor; segredos só no servidor (`.env.example` documenta; nunca commitar `.env*`).
- Rotas centralizadas em `src/config/routes.ts`.

## Fluxo de trabalho
- Não sobrescrever arquivos existentes sem ler. Não apagar os originais em `docs/brand/reference/`.
- Testes para regras de agendamento; E2E do fluxo principal.
- Pendências do proprietário ficam em `docs/product/requirements.md` §7 — atualize ao resolver.
- O repositório pai contém outro projeto (Fiapo de Manga); este vive em `mk-design/` e não deve ser misturado.
