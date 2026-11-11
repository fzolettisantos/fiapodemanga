import { getSiteType } from "@/lib/proposals/catalog";
import { demoProposal, proposalForType, type Proposal } from "@/lib/proposals/proposal";
import { clientFromProposal, firstCharge } from "./core";
import type { AcceptInput, AdminEvent, AdminRepo, ArticleInput, ArticleRecord, Client, Payment, PaymentInput, ProposalRecord, Acceptance } from "./types";
import { addMonths, proposalCode, today } from "./util";

/**
 * Repositório de DEMONSTRAÇÃO: dados fictícios em memória, usados enquanto o Supabase
 * não está configurado. Nada é salvo de verdade (some quando o servidor reinicia).
 */
type Store = {
  proposals: ProposalRecord[];
  acceptances: Acceptance[];
  clients: Client[];
  payments: Payment[];
  events: AdminEvent[];
  articles: ArticleRecord[];
};

const uid = () => crypto.randomUUID();
const iso = (d: string, h = "10:00") => `${d}T${h}:00.000Z`;

function seed(): Store {
  const t = today();
  const m = (n: number) => addMonths(t, n);
  const mk = (typeId: string, name: string, extra: Partial<Proposal> = {}): Proposal => ({
    ...proposalForType(getSiteType(typeId)!),
    client: { name, document: "", email: `${name.split(" ")[0]!.toLowerCase()}@exemplo.com.br`, phone: "(13) 90000-0000" },
    ...extra,
  });
  const proposals: ProposalRecord[] = [
    { id: uid(), code: "demo-barbearia", data: mk("agendamento", "Barbearia do Zé (exemplo)", { monthly: 119, annual: 1190 }), status: "accepted", createdAt: iso(m(-3)), openedAt: iso(m(-3), "12:00"), acceptedAt: iso(m(-3), "12:30") },
    { id: uid(), code: "demo-cafe", data: mk("cardapio", "Café da Praça (exemplo)"), status: "accepted", createdAt: iso(m(-2)), openedAt: iso(m(-2), "15:00"), acceptedAt: iso(m(-2), "15:20") },
    { id: uid(), code: "demo-loja", data: mk("loja-50", "Loja Bela (exemplo)"), status: "accepted", createdAt: iso(t, "09:00"), openedAt: iso(t, "09:30"), acceptedAt: iso(t, "09:40") },
    { id: uid(), code: "demo-studio", data: mk("portfolio", "Studio Luz (exemplo)", { special: ["Primeiro mês grátis."] }), status: "opened", createdAt: iso(t, "08:00"), openedAt: iso(t, "11:00") },
    { id: uid(), code: "demo-clinica", data: { ...demoProposal(), client: { ...demoProposal().client, name: "Clínica Exemplo" } }, status: "sent", createdAt: iso(t, "07:00") },
  ];
  const [pb, pc, pl] = proposals as [ProposalRecord, ProposalRecord, ProposalRecord];
  const clients: Client[] = [
    { id: uid(), proposalId: pb.id, name: pb.data.client.name, email: pb.data.client.email, phone: pb.data.client.phone, siteType: "Site com agendamento", plan: "Vitrine", period: "monthly", method: "card", amount: 119, status: "active", startedAt: m(-3), fidelityUntil: m(9), nextDue: m(1), domain: "barbeariadoze.com.br", createdAt: iso(m(-3)) },
    { id: uid(), proposalId: pc.id, name: pc.data.client.name, email: pc.data.client.email, phone: pc.data.client.phone, siteType: "Cardápio digital", plan: "Catálogo", period: "monthly", method: "pix", amount: 149, status: "active", startedAt: m(-2), fidelityUntil: m(10), nextDue: addMonths(t, 0), domain: "cafedapraca.com.br", createdAt: iso(m(-2)) },
    { id: uid(), proposalId: pl.id, name: pl.data.client.name, email: pl.data.client.email, phone: pl.data.client.phone, siteType: "Loja online (até 50 produtos)", plan: "Loja Online", period: "annual", method: "card", amount: 2490, status: "pending", startedAt: t, fidelityUntil: m(12), nextDue: t, domain: "lojabela.com.br", createdAt: iso(t) },
  ];
  const [cb, cc, cl] = clients as [Client, Client, Client];
  const lateDue = new Date(Date.now() - 12 * 86_400_000).toISOString().slice(0, 10);
  const payments: Payment[] = [
    ...[-3, -2, -1, 0].map((n) => ({ id: uid(), clientId: cb.id, amount: 119, dueDate: m(n), paidAt: iso(m(n), "08:00"), method: "card" as const, status: "paid" as const, providerId: `MP-${1000 + n + 3}`, createdAt: iso(m(n)) })),
    { id: uid(), clientId: cc.id, amount: 149, dueDate: m(-1), paidAt: iso(m(-1), "13:00"), method: "pix", status: "paid", providerId: "MP-2001", createdAt: iso(m(-1)) },
    { id: uid(), clientId: cc.id, amount: 149, dueDate: lateDue, method: "pix", status: "open", createdAt: iso(lateDue) },
    { id: uid(), clientId: cl.id, amount: 2490, dueDate: t, method: "card", status: "open", createdAt: iso(t) },
  ];
  const events: AdminEvent[] = proposals.flatMap((p) => [
    { id: uid(), proposalId: p.id, type: "proposal.created", data: {}, actor: "admin (exemplo)", createdAt: p.createdAt },
    ...(p.openedAt ? [{ id: uid(), proposalId: p.id, type: "proposal.opened", data: {}, actor: "cliente", createdAt: p.openedAt }] : []),
  ]);
  for (const c of clients) {
    events.push({ id: uid(), proposalId: c.proposalId, clientId: c.id, type: "proposal.accepted", data: { period: c.period, method: c.method, ip: "200.0.0.1 (exemplo)" }, actor: "cliente", createdAt: proposals.find((p) => p.id === c.proposalId)!.acceptedAt! });
  }
  for (const p of payments.filter((x) => x.status === "paid")) {
    events.push({ id: uid(), clientId: p.clientId, type: "payment.registered", data: { amount: p.amount, method: p.method, providerId: p.providerId }, actor: "Mercado Pago (exemplo)", createdAt: p.paidAt! });
  }
  const acceptances: Acceptance[] = clients.map((c) => ({
    id: uid(), proposalId: c.proposalId!, acceptedAt: proposals.find((p) => p.id === c.proposalId)!.acceptedAt!, ip: "200.0.0.1 (exemplo)", userAgent: "Exemplo", email: c.email, contractVersion: "2026-11-v1", period: c.period, method: c.method, amount: c.amount, terms: [], contract: null,
  }));
  const now = new Date().toISOString();
  const articles: ArticleRecord[] = [
    {
      id: uid(),
      slug: "exemplo-como-o-cliente-encontra-seu-negocio",
      title: "[Exemplo] Como o cliente encontra o seu negócio no Google",
      summary: "Rascunho de exemplo para mostrar o editor. Não vai ao ar: só existe no modo demonstração.",
      body: "Quando alguém procura um serviço no Google, decide em poucos segundos em quem confiar.\n\n## O que o Google mostra primeiro\n\nUm título claro, uma descrição que explica o que você faz e um site que abre rápido no celular.\n\n- **Título:** o nome do negócio e o que ele faz\n- **Descrição:** uma frase sobre como você ajuda\n- **Velocidade:** o site precisa abrir em poucos segundos\n\n## Próximo passo\n\nEscreva o seu artigo aqui, troque o título e use a lista de verificação ao lado para revisar antes de publicar.",
      category: "google-e-seo",
      coverUrl: null,
      coverAlt: null,
      authorName: "Fiapo de Manga",
      status: "draft",
      publishedAt: null,
      seoTitle: null,
      seoDescription: null,
      focusKeyword: "como ser encontrado no google",
      relatedServices: ["criacao-de-sites"],
      createdAt: now,
      updatedAt: now,
    },
  ];
  return { proposals, acceptances, clients, payments, events, articles };
}

const g = globalThis as unknown as { __fmDemoStore?: Store };
const store = () => (g.__fmDemoStore ??= seed());
const byDateDesc = <T extends { createdAt: string }>(a: T, b: T) => b.createdAt.localeCompare(a.createdAt);

export const demoRepo: AdminRepo = {
  mode: "demo",
  async listProposals() {
    return [...store().proposals].sort(byDateDesc);
  },
  async getProposal(id) {
    return store().proposals.find((p) => p.id === id) ?? null;
  },
  async getProposalByCode(code) {
    return store().proposals.find((p) => p.code === code) ?? null;
  },
  async createProposal(data, actor) {
    const rec: ProposalRecord = { id: uid(), code: proposalCode(), data, status: "sent", createdBy: actor, createdAt: new Date().toISOString() };
    store().proposals.push(rec);
    store().events.push({ id: uid(), proposalId: rec.id, type: "proposal.created", data: { monthly: data.monthly, annual: data.annual }, actor, createdAt: rec.createdAt });
    return rec;
  },
  async markOpened(p) {
    if (p.openedAt) return;
    p.openedAt = new Date().toISOString();
    if (p.status === "sent") p.status = "opened";
    store().events.push({ id: uid(), proposalId: p.id, type: "proposal.opened", data: {}, actor: "cliente", createdAt: p.openedAt });
  },
  async acceptProposal(p, input: AcceptInput) {
    const now = new Date().toISOString();
    const base = clientFromProposal(p, input);
    const client: Client = { ...base, id: uid(), createdAt: now };
    const acceptance: Acceptance = { id: uid(), proposalId: p.id, acceptedAt: now, ip: input.ip, userAgent: input.userAgent, email: p.data.client.email, contractVersion: input.contractVersion, period: input.period, method: input.method, amount: client.amount, terms: input.terms, contract: input.contract };
    p.status = "accepted";
    p.acceptedAt = now;
    const s = store();
    s.clients.push(client);
    s.acceptances.push(acceptance);
    const charge = firstCharge(base);
    s.payments.push({ id: uid(), clientId: client.id, ...charge, createdAt: now });
    s.events.push({ id: uid(), proposalId: p.id, clientId: client.id, type: "proposal.accepted", data: { period: input.period, method: input.method, ip: input.ip, version: input.contractVersion }, actor: "cliente", createdAt: now });
    return { acceptance, client };
  },
  async getAcceptance(proposalId) {
    return store().acceptances.find((a) => a.proposalId === proposalId) ?? null;
  },
  async listClients() {
    return [...store().clients].sort(byDateDesc);
  },
  async getClient(id) {
    return store().clients.find((c) => c.id === id) ?? null;
  },
  async updateClient(id, patch, actor) {
    const c = store().clients.find((x) => x.id === id);
    if (!c) return;
    Object.assign(c, patch);
    store().events.push({ id: uid(), clientId: id, type: "client.status", data: patch, actor, createdAt: new Date().toISOString() });
  },
  async listPayments(filter = {}) {
    return store()
      .payments.filter((p) => (!filter.clientId || p.clientId === filter.clientId) && (!filter.from || p.dueDate >= filter.from) && (!filter.to || p.dueDate <= filter.to))
      .sort((a, b) => b.dueDate.localeCompare(a.dueDate));
  },
  async addPayment(clientId, input: PaymentInput, actor) {
    const pay: Payment = { id: uid(), clientId, ...input, createdAt: new Date().toISOString() };
    store().payments.push(pay);
    store().events.push({ id: uid(), clientId, type: input.status === "paid" ? "payment.registered" : "payment.created", data: { amount: input.amount, method: input.method, note: input.note }, actor, createdAt: pay.createdAt });
    return pay;
  },
  async listArticles() {
    return [...store().articles].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  },
  async getArticle(id) {
    return store().articles.find((a) => a.id === id) ?? null;
  },
  async saveArticle(input: ArticleInput, actor) {
    const s = store();
    if (s.articles.some((a) => a.slug === input.slug && a.id !== input.id)) throw new Error("Já existe um artigo com este endereço.");
    const now = new Date().toISOString();
    const existing = input.id ? s.articles.find((a) => a.id === input.id) : undefined;
    const rec: ArticleRecord = existing ? Object.assign(existing, input, { updatedAt: now }) : { ...input, id: uid(), createdAt: now, updatedAt: now };
    if (!existing) s.articles.push(rec);
    s.events.push({ id: uid(), type: existing ? "article.updated" : "article.created", data: { title: rec.title, status: rec.status }, actor, createdAt: now });
    return rec;
  },
  async deleteArticle(id, actor) {
    const s = store();
    const a = s.articles.find((x) => x.id === id);
    s.articles = s.articles.filter((x) => x.id !== id);
    if (a) s.events.push({ id: uid(), type: "article.deleted", data: { title: a.title }, actor, createdAt: new Date().toISOString() });
  },
  async uploadArticleImage() {
    throw new Error("O envio de imagens funciona depois que o Supabase estiver configurado.");
  },
  async listEvents(filter) {
    return store()
      .events.filter((e) => (!filter.clientId || e.clientId === filter.clientId) && (!filter.proposalId || e.proposalId === filter.proposalId))
      .sort(byDateDesc)
      .slice(0, filter.limit ?? 200);
  },
};
