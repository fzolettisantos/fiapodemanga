# Área admin

Endereço: `/admin` (fora do Google e sem link no site).

| Tela | O que tem |
|---|---|
| Visão geral | Clientes ativos, receita mensal estimada, recebido no mês, atrasados, propostas em aberto, o que precisa de atenção e a atividade recente |
| Propostas | Lista com situação (enviada, aberta, aceita, expirada); criar nova; detalhe com link, Termo e **prova do aceite** (data, hora, IP, navegador, versão do contrato) |
| Clientes | Lista com plano, valor, próximo vencimento, fidelidade e situação pela régua (aviso com 10 dias, suspensão com 15, rescisão com 60); detalhe com cobranças, registro manual de pagamento, mudança de situação e histórico completo |
| Relatório | Cobranças filtradas por mês e situação, totais (recebido, em atraso, a vencer) e exportação em planilha (CSV para Excel) |

Tudo o que acontece fica registrado na tabela `events` (quem fez, o quê e quando).

## Modo demonstração

Sem o Supabase configurado, o admin abre sem login e mostra **dados fictícios** (aviso no topo).
Dá para testar o fluxo inteiro (criar proposta, aceitar como cliente, registrar pagamento), mas nada é salvo:
os dados somem quando o servidor reinicia.

## Ligar de verdade (Supabase)

1. Crie um projeto gratuito em supabase.com (região São Paulo).
2. Em **SQL Editor**, rode o arquivo `supabase/admin.sql` (cria as tabelas com RLS ligado e sem acesso público).
3. Em **Authentication → URL Configuration**, coloque o endereço do site em *Site URL* e adicione
   `https://SEU-DOMINIO/admin/auth/callback` em *Redirect URLs* (e o endereço de prévia da Vercel, se for testar nele).
4. Em **Project Settings → API**, copie a URL, a chave `anon` e a chave `service_role`.
5. Na Vercel (**Settings → Environment Variables**), crie:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (secreta, só servidor)
   - `ADMIN_EMAILS` (o seu e-mail; vários separados por vírgula)
6. Faça um **Redeploy**. Em `/admin`, informe o seu e-mail e entre pelo link que chega.

O envio do link usa o e-mail do próprio Supabase (limite baixo por hora). Para volume maior, configure um SMTP
(por exemplo, o Resend do formulário de contato) em **Authentication → SMTP Settings**.

## Segurança

- Login sem senha (link mágico) e só para os e-mails de `ADMIN_EMAILS`; a tela de login não revela quem tem acesso.
- Limite de tentativas no login e no aceite da proposta.
- O banco não aceita leitura pública: o site acessa com a chave `service_role`, só no servidor, depois de conferir o login.
- O link da proposta usa um código aleatório; os valores ficam gravados no banco (o cliente não altera nada pela URL).

## Ainda falta

- Mercado Pago: gerar a cobrança no aceite, assinatura no cartão e confirmação automática do pagamento (webhook).
- E-mails automáticos: cópia do contrato, lembretes e avisos da régua de cobrança.
- Gerar o PDF do contrato aceito.
