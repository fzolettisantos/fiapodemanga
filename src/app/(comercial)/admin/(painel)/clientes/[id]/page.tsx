import Link from "next/link";
import { notFound } from "next/navigation";
import { getRepo } from "@/lib/admin/repo";
import { clientSituation, daysLate, eventText, paymentStatusLabel, today } from "@/lib/admin/util";
import { brl, methodLabel, periodLabel } from "@/lib/proposals/pricing";
import { Badge, dateBR, dateTimeBR, Empty, PageTitle, Table, td } from "@/components/admin/ui";
import { registerPayment, setClientStatus } from "../../../actions";

export const metadata = { title: "Cliente" };

const field = "mt-1 block w-full rounded-sm border border-line-strong bg-transparent px-3 py-2 text-text";

export default async function ClientDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const repo = getRepo();
  const client = await repo.getClient(id);
  if (!client) notFound();
  const [payments, events] = await Promise.all([repo.listPayments({ clientId: id }), repo.listEvents({ clientId: id })]);
  const s = clientSituation(client, payments);
  const paid = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
  const statusAction = setClientStatus.bind(null, id);
  const paymentAction = registerPayment.bind(null, id);

  return (
    <>
      <PageTitle eyebrow="Cliente" title={client.name}>
        <Badge tone={s.tone}>{s.label}</Badge>
      </PageTitle>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="space-y-10 lg:col-span-7">
          <dl className="grid gap-x-8 gap-y-5 rounded-sm border border-line p-5 text-sm sm:grid-cols-2">
            {[
              ["Serviço", `${client.siteType} · plano ${client.plan}`],
              ["Valor", `${brl(client.amount)} · ${periodLabel[client.period]}`],
              ["Forma de pagamento", methodLabel[client.method]],
              ["Início", dateBR(client.startedAt)],
              ["Fidelidade até", dateBR(client.fidelityUntil)],
              ["Próximo vencimento", dateBR(client.nextDue)],
              ["Domínio", client.domain ?? "—"],
              ["Documento", client.document ?? "—"],
              ["E-mail", client.email ?? "—"],
              ["WhatsApp", client.phone ?? "—"],
              ["Total pago até hoje", brl(paid)],
              ["Em atraso", s.openAmount ? brl(s.openAmount) : "Nada"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-xs tracking-[0.06em] text-muted uppercase">{k}</dt>
                <dd className="mt-1 text-heading">{v}</dd>
              </div>
            ))}
          </dl>
          {client.proposalId ? (
            <Link href={`/admin/propostas/${client.proposalId}`} className="link-underline text-heading">
              Ver proposta, Termo e prova do aceite
            </Link>
          ) : null}

          <section aria-labelledby="cobrancas">
            <h2 id="cobrancas" className="type-subheading">Cobranças</h2>
            <div className="mt-4">
              {payments.length === 0 ? (
                <Empty>Nenhuma cobrança.</Empty>
              ) : (
                <Table head={["Vencimento", "Valor", "Situação", "Pago em", "Forma", "Transação / nota"]} caption="Cobranças do cliente">
                  {payments.map((p) => {
                    const late = daysLate(p);
                    return (
                      <tr key={p.id}>
                        <td className={td}>{dateBR(p.dueDate)}</td>
                        <td className={td}>{brl(p.amount)}</td>
                        <td className={td}>
                          <Badge tone={p.status === "paid" ? "ok" : late > 0 ? (late >= 15 ? "danger" : "warn") : "muted"}>
                            {late > 0 ? `Atrasada há ${late} ${late === 1 ? "dia" : "dias"}` : paymentStatusLabel[p.status]}
                          </Badge>
                        </td>
                        <td className={td}>{dateBR(p.paidAt)}</td>
                        <td className={td}>{p.method ? (p.method === "other" ? "Outra" : methodLabel[p.method]) : "—"}</td>
                        <td className={td}>{[p.providerId, p.note].filter(Boolean).join(" · ") || "—"}</td>
                      </tr>
                    );
                  })}
                </Table>
              )}
            </div>
          </section>

          <section aria-labelledby="registrar" className="rounded-sm border border-line-strong p-5">
            <h2 id="registrar" className="type-subheading">Registrar pagamento ou cobrança</h2>
            <p className="mt-2 text-sm text-muted">Para pagamentos fora do Mercado Pago (Pix direto, transferência) ou ajustes. Fica no histórico com o seu e-mail.</p>
            <form action={paymentAction} className="mt-5 grid gap-4 sm:grid-cols-3">
              <label className="text-sm">Valor (R$)<input name="amount" required inputMode="decimal" defaultValue={client.amount} className={field} /></label>
              <label className="text-sm">Vencimento<input name="dueDate" type="date" required defaultValue={client.nextDue ?? today()} className={field} /></label>
              <label className="text-sm">Pago em<input name="paidAt" type="date" defaultValue={today()} className={field} /></label>
              <label className="text-sm">Situação
                <select name="status" defaultValue="paid" className={`${field} bg-bg`}>
                  <option value="paid">Paga</option>
                  <option value="open">Em aberto</option>
                  <option value="canceled">Cancelada</option>
                  <option value="refunded">Estornada</option>
                </select>
              </label>
              <label className="text-sm">Forma
                <select name="method" defaultValue={client.method} className={`${field} bg-bg`}>
                  <option value="pix">Pix</option>
                  <option value="card">Cartão</option>
                  <option value="boleto">Boleto</option>
                  <option value="other">Outra</option>
                </select>
              </label>
              <label className="text-sm">Nº da transação<input name="providerId" className={field} /></label>
              <label className="text-sm sm:col-span-3">Observação<input name="note" maxLength={300} className={field} /></label>
              <div className="sm:col-span-3">
                <button type="submit" className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-btn-primary-border)] bg-[var(--color-btn-primary-bg)] px-5 font-medium text-[var(--color-btn-primary-fg)]">Registrar</button>
              </div>
            </form>
          </section>
        </div>

        <div className="space-y-10 lg:col-span-5">
          <section aria-labelledby="situacao" className="rounded-sm border border-line p-5">
            <h2 id="situacao" className="type-subheading">Situação do contrato</h2>
            <form action={statusAction} className="mt-4 flex flex-wrap items-end gap-3">
              <label className="text-sm">
                Alterar para
                <select name="status" defaultValue={client.status} className={`${field} bg-bg`}>
                  <option value="pending">Aguardando 1º pagamento</option>
                  <option value="active">Ativo</option>
                  <option value="late">Atrasado</option>
                  <option value="suspended">Suspenso (site fora do ar)</option>
                  <option value="canceled">Cancelado</option>
                </select>
              </label>
              <button type="submit" className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-5 text-heading hover:border-accent">Salvar</button>
            </form>
            <p className="mt-3 text-xs text-muted">Régua: aviso formal com 10 dias de atraso, suspensão com 15 e rescisão com 60.</p>
          </section>
          <section aria-labelledby="hist">
            <h2 id="hist" className="type-subheading">Histórico completo</h2>
            <ol className="mt-4 divide-y divide-line border-y border-line text-sm">
              {events.map((e) => (
                <li key={e.id} className="py-3">
                  <div className="flex justify-between gap-4">
                    <span className="text-heading">{eventText(e)}</span>
                    <span className="shrink-0 text-muted">{dateTimeBR(e.createdAt)}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    {e.actor ? `Por: ${e.actor}` : ""}
                    {Object.keys(e.data).length
                      ? ` · ${Object.entries(e.data)
                          .filter(([, v]) => v !== null && v !== undefined && v !== "")
                          .map(([k, v]) => `${k}: ${String(v)}`)
                          .join(" · ")}`
                      : ""}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </>
  );
}
