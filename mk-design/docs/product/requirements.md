# Requisitos de produto — MK Design

Extraído de `docs/brand/style-guide.md` (fonte de verdade). Em caso de conflito, o guia prevalece, salvo decisão registrada aqui.

## 1. Objetivo
Site mobile-first para instalação de TVs (parede, painel, móvel/rack), instalação de suportes (fixo, articulado, teto, pedestal) e assistência técnica (diagnóstico e conserto). O visitante conhece os serviços, monta o pedido, escolhe data/horário, informa contato/endereço, envia o resumo ao WhatsApp e acompanha o status. Prioridade: conversão, clareza e confiança.

## 2. Requisitos funcionais
| ID | Requisito | Fase |
| -- | --------- | ---- |
| RF01 | Site institucional: Home, Serviços, Detalhe de serviço, Sobre, Contato, Privacidade | 2 |
| RF02 | Catálogo editável com filtro por categoria; **sem preços inventados** (`Sob orçamento`) | 2 |
| RF03 | Wizard de contratação em 6 etapas (ver `user-flows.md`) com progresso e "voltar" sem perder dados | 3 |
| RF04 | Detalhes técnicos por tipo de serviço (instalação × reparo) | 3 |
| RF05 | Localização com validação de área atendida **configurável** | 3 |
| RF06 | Agenda com slots reais (horários, feriados, pausas, capacidade, duração, bloqueios, buffers) | 4 |
| RF07 | Pedido salvo no backend **antes** de abrir o WhatsApp; protocolo gerado | 4 |
| RF08 | Link `wa.me` pré-preenchido com o modelo de mensagem do guia (§7) | 3 |
| RF09 | Sem dupla reserva (checagem transacional/constraint no servidor) | 4 |
| RF10 | Modelo MVP: **solicitação com aprovação** (slot pendente com expiração configurável) | 4 |
| RF11 | Painel admin protegido: dashboard, agenda, serviços, configurações | 5 |
| RF12 | Transição de status auditável: novo → aguardando confirmação → confirmado → em atendimento → concluído / cancelado | 5 |
| RF13 | Reagendar/cancelar manualmente; política configurável | 5 |
| RF14 | Exportação CSV opcional (somente autenticado) | 5 |
| RF15 | Sem backend: **modo demonstrativo identificado**, exibindo "Solicitar preferência de data e horário" — nunca disponibilidade falsa | 1+ |

## 3. Requisitos não funcionais
- **Acessibilidade:** WCAG 2.2 AA; teclado, foco visível, labels reais, erros associados, `aria-live` para status; alvos ≥ 44×44 px.
- **Responsivo:** 320–1440 px, mobile-first (container 1200 px; margens 20/32 px).
- **Performance:** Core Web Vitals, imagens WebP/AVIF com dimensões, lazy loading, sem CLS.
- **SEO:** HTML semântico, metadados por serviço, Open Graph, favicon MK; `LocalBusiness` só após confirmar dados.
- **Segurança/LGPD:** validação Zod no cliente **e** servidor; chaves só no servidor; rate limit/anti-spam; logs sem PII; coleta mínima; consentimento de privacidade; sem documento pessoal; RLS ou equivalente (visitante só cria o próprio pedido; consulta por token não adivinhável; nunca listar clientes).
- **Fotos opcionais:** upload seguro (tipo/tamanho), controle de acesso e prazo de retenção.
- **Idioma:** todo texto de UI em pt-BR. Fuso `America/Sao_Paulo`.

## 4. Catálogo inicial (dados editáveis)
- **Instalação de TVs:** parede; painel; móvel/rack; ajuste/posicionamento/reinstalação *(confirmar com o dono)*.
- **Instalação de suportes:** fixo; articulado; teto; pedestal.
- **Assistência técnica:** avaliação/diagnóstico; solicitação de conserto. Marcas: Samsung, Sony, TCL, LG, Philips e "IOC" *(confirmar se é **AOC**)*. Problemas: não liga, sem imagem, sem som, imagem com falhas, entradas/conexões, outro.

## 5. Restrições editoriais (não afirmar sem confirmação)
Assistência autorizada, reparo de qualquer defeito, garantia, peças, visita grátis, preço fechado, prazos, parcelamento, pagamento online, depoimentos/números de clientes/selos. Nunca usar número de WhatsApp, endereço ou área de atendimento fictícios.

## 6. Critérios de aceite (guia §12)
1. Fluxo completo serviço → detalhes → data/hora → contato → revisão → salvar → WhatsApp.
2. Horários e status reais, sem dupla reserva; admin consegue bloquear agenda.
3. Responsivo 320–1440 px; testes de teclado e contraste.
4. Serviços e horários editáveis no painel (não hardcoded como única fonte).
5. Nenhum preço, telefone, local ou depoimento inventado.
6. Falhas com mensagens claras e opção de tentar de novo/contatar.
7. `lint`, `typecheck`, testes das regras de agendamento e teste E2E do fluxo principal.

## 7. Pendências para configuração real (dependem do proprietário)
- [ ] Número do WhatsApp comercial
- [ ] Cidade/bairros atendidos; taxa de deslocamento, se houver
- [ ] Horários, durações médias, antecedência mínima, feriados, capacidade
- [ ] Suporte fornecido pela MK ou comprado pelo cliente?
- [ ] Política de preço, visita técnica, orçamento, garantia, cancelamento
- [ ] Marca **IOC × AOC**
- [ ] Fotos reais de trabalhos e dados institucionais
- [ ] Domínio, hospedagem e escolha do backend
