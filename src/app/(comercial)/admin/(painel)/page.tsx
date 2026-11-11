import Link from "next/link";
import { getRepo } from "@/lib/admin/repo";
import { clientSituation, daysLate, eventText, proposalStatus, proposalStatusLabel, today } from "@/lib/admin/util";
import { brl } from "@/lib/proposals/pricing";
import { Badge, dateTimeBR, PageTitle, Stat } from "@/components/admin/ui";

export const metadata = { title: "Visão geral" };

export default async function AdminHome() {
  const repo = getRepo();
  const [proposals, clients, payments, events] = await Promise.all([
    repo.listProposals(),
    repo.listClients(),
    repo.listPayments(),
    repo.listEvents({ limit: 12 }),
  ]);
  const t = today();
  const month = t.slice(0, 7);
  const open = proposals.filter((p) => ["sent", "opened"].includes(proposalStatus(p)));
  const active = clients.filter((c) => c.status !== "canceled");
  const late = active.filter((c) => clientSituation(c, payments).maxLate > 0);
  const lateAmount = payments.reduce((s, p) => s + (daysLate(p) > 0 ? p.amount : 0), 0);
  const received = payments.filter((p) => p.status === "paid" && p.paidAt?.slice(0, 7) === month).reduce((s, p) => s + p.amount, 0);
  const mrr = active.reduce((s, c) => s + (c.period === "monthly" ? c.amount : c.amount / 12), 0);
  const names = new Map(clients.map((c) => [c.id, c.name]));
  const pnames = new Map(proposals.map((p) => [p.id, p.data.client.name]));

  return (
    <>
      <PageTitle eyebrow="Admin" title="Visão geral">
        <Link href="/admin/propostas/nova" className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-btn-primary-border)] bg-[var(--color-btn-primary-bg)] px-5 font-medium text-[var(--color-btn-primary-fg)]">
          Nova proposta
        </Link>
      </PageTitle>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Clientes" value={active.length} hint={`Receita mensal estimada: ${brl(Math.round(mrr * 100) / 100)}`} />
        <Stat label="Recebido no mês" value={brl(received)} />
        <Stat label="Em atraso" value={late.length} hint={lateAmount ? `${brl(lateAmount)} em aberto` : "Ninguém atrasado"} tone={late.length ? "danger" : undefined} />
        <Stat label="Propostas em aberto" value={open.length} />
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <section aria-labelledby="atencao">
          <h2 id="atencao" className="type-subheading">Precisa de atenção</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {late.length === 0 && open.length === 0 ? <li className="py-4 text-muted">Tudo em dia.</li> : null}
            {late.map((c) => {
              const s = clientSituation(c, payments);
              return (
                <li key={c.id} className="flex items-center justify-between gap-4 py-3">
                  <Link href={`/admin/clientes/${c.id}`} className="link-underline text-heading">{c.name}</Link>
                  <Badge tone={s.tone === "ok" ? "ok" : s.tone}>{s.label}</Badge>
                </li>
              );
            })}
            {open.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-4 py-3">
                <Link href={`/admin/propostas/${p.id}`} className="link-underline text-heading">{p.data.client.name}</Link>
                <Badge tone="accent">{proposalStatusLabel[proposalStatus(p)]}</Badge>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="atividade">
          <h2 id="atividade" className="type-subheading">Atividade recente</h2>
          <ol className="mt-4 divide-y divide-line border-y border-line">
            {events.map((e) => (
              <li key={e.id} className="flex justify-between gap-4 py-3 text-sm">
                <span>
                  <span className="text-heading">{eventText(e)}</span>
                  <span className="text-muted"> · {(e.clientId && names.get(e.clientId)) || (e.proposalId && pnames.get(e.proposalId)) || ""}</span>
                </span>
                <span className="shrink-0 text-muted">{dateTimeBR(e.createdAt)}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}
