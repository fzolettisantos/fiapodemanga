# Mapa do site

## Público
| Rota | Pasta | Conteúdo |
| ---- | ----- | -------- |
| `/` | `src/app/page.tsx` | Hero, benefícios, categorias, como funciona, pagamentos, FAQ, CTA |
| `/servicos` | `src/app/servicos/` | Catálogo com filtros e cards |
| `/servicos/[slug]` | `src/app/servicos/[slug]/` | Detalhes, escopo e preparação |
| `/agendamento` | `src/app/agendamento/` | Wizard: serviço → detalhes → local → data/hora → contato/revisão → resultado |
| `/sobre` | `src/app/sobre/` | Empresa; fotos reais quando existirem |
| `/contato` | `src/app/contato/` | WhatsApp, telefone, área atendida confirmada |
| `/privacidade` | `src/app/privacidade/` | Tratamento de dados (LGPD) |

## Protegido (autenticação + autorização)
| Rota | Conteúdo |
| ---- | -------- |
| `/admin` | Dashboard: novos, aguardando confirmação, confirmados, concluídos, cancelados |
| `/admin/agenda` | Calendário semanal/mensal e bloqueios |
| `/admin/servicos` | Ativar/desativar serviços, durações, política "sob orçamento" |
| `/admin/configuracoes` | Horários, capacidade, área atendida, WhatsApp |

> **Decisão:** o guia cita `/agendar`; seguimos a estrutura pedida pelo projeto (`/agendamento`). Rotas centralizadas em `src/config/routes.ts` — mudar é uma linha. `/privacidade` foi adicionada à estrutura por ser exigida pelo guia (LGPD).
