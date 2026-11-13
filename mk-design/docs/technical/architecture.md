# Arquitetura técnica

## Stack (versões verificadas em 13/11/2026)
Next.js 16.4 (App Router) · React 19.3 · TypeScript 5.9 (strict) · Tailwind CSS 4.3 (`@theme`, sem `tailwind.config.js`) · shadcn/ui (`components.json`, estilo new-york, componentes em `src/components/ui`) · Lucide React · react-hook-form + Zod 4 · date-fns 4 · Vitest. Fontes self-hosted via `@fontsource-variable` (Space Grotesk e Inter): sem requisição ao Google no build/runtime.
Node ≥ 20.9.

## Estrutura
```
src/
  app/            rotas (App Router); páginas só compõem componentes
  components/
    ui/           primitivos do design system (Button, Card, Field, Input, Alert, SelectableCard…)
    layout/       SiteHeader, MobileMenu, Footer
    services/     ServiceCard, filtros, detalhes
    booking/      wizard, seletores, calendário, resumo
    shared/       BrandLogo, WhatsAppCTA, FAQ…
  design-system/
    tokens/       tokens.css (variáveis) · theme.css (ponte @theme) · index.ts (espelho TS) · contrast.ts
    guidelines/   regras de uso (cor, tipografia, componentes, acessibilidade)
  config/         site, business (dados pendentes = null), routes, whatsapp
  lib/            utils, repositories/ (implementações), validações Zod (futuro)
  hooks/ types/
```

## Design tokens
`tokens.css` (`--mk-*`) é a **única** fonte de valores; `theme.css` expõe-nos ao Tailwind (`bg-brand-primary`, `rounded-card`, `font-heading`…); `index.ts` espelha para TS e é validado por teste (valores iguais + contraste AA).

## Persistência desacoplada
Domínio em `src/types/booking.ts`; portas em `src/types/repositories.ts` (`BookingRepository`, `AvailabilityRepository`, `ServiceRepository`). UI/rotas dependem só das interfaces; o backend (recomendado: Supabase/Postgres) entra como nova implementação em `src/lib/repositories/`, sem mexer em componentes.
- Dupla reserva impedida **no banco** (constraint de exclusão por intervalo/lock transacional), não só na UI.
- Ações sensíveis via Route Handlers/Server Actions; validação Zod no cliente e servidor; chaves só no servidor; RLS no Postgres.
- Sem credenciais → `isDemoMode` (src/config/business.ts) e UI sinalizada; nada de disponibilidade simulada.

## Admin
Rotas `/admin/*` protegidas por `proxy.ts` (Next 16, antigo middleware) + checagem de autorização no servidor em cada ação. Provedor de auth a definir (Supabase Auth recomendado se for o backend).

## Qualidade
`npm run check` = typecheck + lint + testes. Próximas: testes das regras de agenda e E2E (Playwright) do fluxo principal.

## Decisões em aberto
Backend/auth · hospedagem · política de expiração de slot pendente · upload de fotos (storage) · domínio.
