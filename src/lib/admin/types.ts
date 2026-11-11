import type { ArticleCategory } from "@/types/content";
import type { Method, Period, Proposal } from "@/lib/proposals/proposal";

export type ProposalStatus = "sent" | "opened" | "accepted" | "expired" | "canceled";
export type ClientStatus = "pending" | "active" | "late" | "suspended" | "canceled";
export type PaymentStatus = "open" | "paid" | "late" | "canceled" | "refunded";

export type ProposalRecord = {
  id: string;
  code: string;
  data: Proposal;
  status: ProposalStatus;
  createdBy?: string | null;
  createdAt: string;
  openedAt?: string | null;
  acceptedAt?: string | null;
};

export type Acceptance = {
  id: string;
  proposalId: string;
  acceptedAt: string;
  ip?: string | null;
  userAgent?: string | null;
  email?: string | null;
  contractVersion: string;
  period: Period;
  method: Method;
  amount: number;
  terms: { label: string; value: string }[];
  contract: unknown;
};

export type Client = {
  id: string;
  proposalId?: string | null;
  name: string;
  document?: string | null;
  email?: string | null;
  phone?: string | null;
  siteType: string;
  plan: string;
  period: Period;
  method: Method;
  amount: number;
  status: ClientStatus;
  startedAt?: string | null;
  fidelityUntil?: string | null;
  nextDue?: string | null;
  domain?: string | null;
  createdAt: string;
};

export type Payment = {
  id: string;
  clientId: string;
  amount: number;
  dueDate: string;
  paidAt?: string | null;
  method?: Method | "other" | null;
  status: PaymentStatus;
  providerId?: string | null;
  note?: string | null;
  createdAt: string;
};

export type AdminEvent = {
  id: string;
  proposalId?: string | null;
  clientId?: string | null;
  type: string;
  data: Record<string, unknown>;
  actor?: string | null;
  createdAt: string;
};

export type AcceptInput = {
  period: Period;
  method: Method;
  ip?: string | null;
  userAgent?: string | null;
  contractVersion: string;
  terms: { label: string; value: string }[];
  contract: unknown;
};

export type PaymentInput = {
  amount: number;
  dueDate: string;
  paidAt?: string | null;
  method?: Method | "other" | null;
  status: PaymentStatus;
  providerId?: string | null;
  note?: string | null;
};

export type ArticleStatus = "draft" | "published";

/** Artigo como é guardado (texto em Markdown). */
export type ArticleRecord = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: ArticleCategory;
  /** Endereço da capa, com o tamanho no fim (`#1600x900`) */
  coverUrl?: string | null;
  coverAlt?: string | null;
  authorName: string;
  status: ArticleStatus;
  /** Data de publicação; no futuro = agendado */
  publishedAt?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  focusKeyword?: string | null;
  relatedServices: string[];
  createdAt: string;
  updatedAt: string;
};

export type ArticleInput = Omit<ArticleRecord, "id" | "createdAt" | "updatedAt"> & { id?: string };

/** Operações de dados da área admin (Supabase ou demonstração). */
export interface AdminRepo {
  readonly mode: "live" | "demo";
  listProposals(): Promise<ProposalRecord[]>;
  getProposal(id: string): Promise<ProposalRecord | null>;
  getProposalByCode(code: string): Promise<ProposalRecord | null>;
  createProposal(data: Proposal, actor: string): Promise<ProposalRecord>;
  markOpened(proposal: ProposalRecord): Promise<void>;
  acceptProposal(proposal: ProposalRecord, input: AcceptInput): Promise<{ acceptance: Acceptance; client: Client }>;
  getAcceptance(proposalId: string): Promise<Acceptance | null>;
  listClients(): Promise<Client[]>;
  getClient(id: string): Promise<Client | null>;
  updateClient(id: string, patch: Partial<Pick<Client, "status" | "nextDue" | "startedAt">>, actor: string): Promise<void>;
  listPayments(filter?: { clientId?: string; from?: string; to?: string }): Promise<Payment[]>;
  addPayment(clientId: string, input: PaymentInput, actor: string): Promise<Payment>;
  listEvents(filter: { clientId?: string; proposalId?: string; limit?: number }): Promise<AdminEvent[]>;
  listArticles(): Promise<ArticleRecord[]>;
  getArticle(id: string): Promise<ArticleRecord | null>;
  /** Cria ou atualiza. Falha se o endereço (slug) já existir em outro artigo. */
  saveArticle(input: ArticleInput, actor: string): Promise<ArticleRecord>;
  deleteArticle(id: string, actor: string): Promise<void>;
  /** Envia uma imagem (só com o Supabase configurado). Devolve o endereço público. */
  uploadArticleImage(file: { name: string; type: string; bytes: Uint8Array }): Promise<{ url: string; width: number; height: number }>;
}
