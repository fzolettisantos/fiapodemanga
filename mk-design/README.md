# MK Design

Site de contratação e agendamento de **instalação de TVs, suportes e assistência técnica** — mobile-first, em português do Brasil.

> Estado: **fundação** (estrutura, design tokens, componentes base). Páginas, wizard, agenda e admin virão nas próximas etapas.

## Stack
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui · Lucide · react-hook-form + Zod · date-fns · Vitest.

## Instalação e execução
Requer Node.js ≥ 20.9.

```bash
cd mk-design
npm install
cp .env.example .env.local   # preencha o que já souber
npm run dev                  # http://localhost:3000
```

| Script              | O que faz                          |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento        |
| `npm run build`     | Build de produção                  |
| `npm run start`     | Serve o build                      |
| `npm run lint`      | ESLint                             |
| `npm run typecheck` | Verificação de tipos               |
| `npm run test`      | Testes (Vitest)                    |
| `npm run check`     | typecheck + lint + test            |

## Variáveis de ambiente
Veja `.env.example`. `NEXT_PUBLIC_WHATSAPP_NUMBER` (somente dígitos, formato internacional) ativa o CTA de WhatsApp; sem ela o botão fica desabilitado. Sem banco configurado o site opera em **modo demonstrativo** (sem disponibilidade real).

## Estrutura
```
docs/        brand/ (style-guide + reference/ originais) · product/ · technical/
public/      images/ (logo, services, banners, icons) · fonts/
src/app/     rotas · src/components/ (ui, layout, services, booking, shared)
src/design-system/  tokens/ (CSS variables) · guidelines/
src/config · lib · hooks · types
tests/       Vitest
```

## Documentação
- Marca, copy e requisitos originais: [`docs/brand/style-guide.md`](docs/brand/style-guide.md)
- Requisitos de produto e pendências: [`docs/product/requirements.md`](docs/product/requirements.md)
- Fluxos e mapa do site: [`user-flows.md`](docs/product/user-flows.md) · [`sitemap.md`](docs/product/sitemap.md)
- Arquitetura: [`docs/technical/architecture.md`](docs/technical/architecture.md)
- Regras para o Claude Code: [`CLAUDE.md`](CLAUDE.md)

## Próximos passos
1. Layout global (SiteHeader, MobileMenu, Footer) e Home.
2. Catálogo e detalhe de serviços.
3. Wizard de agendamento e integração WhatsApp.
4. Persistência (Supabase/Postgres), migrations e agenda real.
5. Painel admin com autenticação.
6. Testes de agenda, E2E, README de deploy.
