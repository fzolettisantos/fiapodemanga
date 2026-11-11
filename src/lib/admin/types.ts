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
}
