-- =====================================================================
-- Fiapo de Manga — área admin (propostas, clientes, cobranças e histórico)
-- Rode este arquivo uma vez no SQL Editor do Supabase.
--
-- Segurança: RLS ligado em todas as tabelas e NENHUMA política pública.
-- Só o servidor do site acessa os dados, com a chave service_role
-- (SUPABASE_SERVICE_ROLE_KEY), depois de conferir que quem pediu é admin.
-- =====================================================================

create extension if not exists pgcrypto;

-- Propostas enviadas aos clientes
create table if not exists proposals (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,                 -- código aleatório do link /proposta/<code>
  data jsonb not null,                       -- proposta completa (valores, condições, cliente)
  status text not null default 'sent'        -- sent | opened | accepted | expired | canceled
    check (status in ('sent', 'opened', 'accepted', 'expired', 'canceled')),
  created_by text,
  created_at timestamptz not null default now(),
  opened_at timestamptz,
  accepted_at timestamptz
);

-- Aceites do contrato (prova do aceite eletrônico — não apagar)
create table if not exists acceptances (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references proposals(id) on delete restrict,
  accepted_at timestamptz not null default now(),
  ip text,
  user_agent text,
  email text,
  contract_version text not null,
  period text not null check (period in ('monthly', 'annual')),
  method text not null check (method in ('card', 'pix', 'boleto')),
  amount numeric(10, 2) not null,
  terms jsonb not null,                      -- Termo de Contratação exatamente como foi aceito
  contract jsonb not null                    -- texto do contrato aceito
);

-- Clientes (criados no aceite da proposta)
create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid references proposals(id) on delete set null,
  name text not null,
  document text,
  email text,
  phone text,
  site_type text not null,
  plan text not null,
  period text not null check (period in ('monthly', 'annual')),
  method text not null check (method in ('card', 'pix', 'boleto')),
  amount numeric(10, 2) not null,
  status text not null default 'pending'     -- pending (aguardando 1º pagamento) | active | late | suspended | canceled
    check (status in ('pending', 'active', 'late', 'suspended', 'canceled')),
  started_at date,
  fidelity_until date,
  next_due date,
  domain text,
  created_at timestamptz not null default now()
);

-- Cobranças e pagamentos
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete restrict,
  amount numeric(10, 2) not null,
  due_date date not null,
  paid_at timestamptz,
  method text check (method in ('card', 'pix', 'boleto', 'other')),
  status text not null default 'open'        -- open | paid | late | canceled | refunded
    check (status in ('open', 'paid', 'late', 'canceled', 'refunded')),
  provider_id text,                          -- número da transação no Mercado Pago
  note text,
  created_at timestamptz not null default now()
);

-- Linha do tempo / registro de auditoria (tudo o que acontece)
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid references proposals(id) on delete set null,
  client_id uuid references clients(id) on delete set null,
  type text not null,                        -- proposal.created, proposal.opened, proposal.accepted, payment.registered, client.status ...
  data jsonb not null default '{}'::jsonb,
  actor text,                                -- e-mail do admin, "cliente" ou "sistema"
  created_at timestamptz not null default now()
);

create index if not exists events_client_idx on events (client_id, created_at desc);
create index if not exists events_proposal_idx on events (proposal_id, created_at desc);
create index if not exists payments_client_idx on payments (client_id, due_date desc);
create index if not exists payments_due_idx on payments (due_date);

alter table proposals enable row level security;
alter table acceptances enable row level security;
alter table clients enable row level security;
alter table payments enable row level security;
alter table events enable row level security;
-- Sem políticas: nada é legível com a chave pública (anon). Só a service_role, no servidor.
