import Link from "next/link";
import { getRepo } from "@/lib/admin/repo";
import { reportRows, reportTotals, type ReportFilter } from "@/lib/admin/report";
import { brl, methodLabel } from "@/lib/proposals/pricing";
import { Badge, dateBR, Empty, PageTitle, Stat, Table, td } from "@/components/admin/ui";

export const metadata = { title: "Relatório" };

const situations = [
  { value: "all", label: "Todas" },
  { value: "paid", label: "Pagas" },
  { value: "late", label: "Atrasadas" },
  { value: "open", label: "Em aberto" },
] as const;

export default async function ReportPage({ searchParams }: { searchParams: Promise<{ mes?: string; situacao?: string }> }) {
  const sp = await searchParams;
  const month = /^\d{4}-\d{2}$/.test(sp.mes ?? "") ? sp.mes : "";
  const situation = (situations.find((s) => s.value === sp.situacao)?.value ?? "all") as ReportFilter["situation"];
  const repo = getRepo();
  const [payments, clients] = await Promise.all([repo.listPayments(), repo.listClients()]);
  const rows = reportRows(payments, clients, { month, situation });
  const totals = reportTotals(rows);
  const csv = `/admin/relatorio/csv?${new URLSearchParams({ ...(month ? { mes: month } : {}), situacao: situation ?? "all" })}`;
  const field = "mt-1 block rounded-sm border border-line-strong bg-bg px-3 py-2 text-text";

  return (
    <>
      <PageTitle eyebrow="Admin" title="Relatório de cobranças">
        <a href={csv} className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-5 text-heading hover:border-accent">
          Exportar planilha (CSV)
        </a>
      </PageTitle>

      <form className="mb-8 flex flex-wrap items-end gap-4" method="get">
        <label className="text-sm">
          Mês de vencimento
          <input type="month" name="mes" defaultValue={month} className={field} />
        </label>
        <label className="text-sm">
          Situação
          <select name="situacao" defaultValue={situation} className={field}>
            {situations.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </label>
        <button type="submit" className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-btn-primary-border)] bg-[var(--color-btn-primary-bg)] px-5 font-medium text-[var(--color-btn-primary-fg)]">Filtrar</button>
        {month || situation !== "all" ? <Link href="/admin/relatorio" className="link-underline text-sm text-heading">Limpar</Link> : null}
      </form>

      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <Stat label="Recebido" value={brl(totals.paid)} />
        <Stat label="Em atraso" value={brl(totals.late)} tone={totals.late ? "danger" : undefined} />
        <Stat label="A vencer" value={brl(totals.open)} />
      </div>

      {rows.length === 0 ? (
        <Empty>Nenhuma cobrança com esses filtros.</Empty>
      ) : (
        <Table head={["Cliente", "Vencimento", "Valor", "Situação", "Pago em", "Forma", "Transação"]} caption="Cobranças">
          {rows.map(({ payment: p, client, late, situation: label }) => (
            <tr key={p.id}>
              <td className={td}>
                {client ? <Link href={`/admin/clientes/${client.id}`} className="link-underline text-heading">{client.name}</Link> : "—"}
              </td>
              <td className={td}>{dateBR(p.dueDate)}</td>
              <td className={td}>{brl(p.amount)}</td>
              <td className={td}>
                <Badge tone={p.status === "paid" ? "ok" : late >= 15 ? "danger" : late > 0 ? "warn" : "muted"}>{label}</Badge>
              </td>
              <td className={td}>{dateBR(p.paidAt)}</td>
              <td className={td}>{p.method ? (p.method === "other" ? "Outra" : methodLabel[p.method]) : "—"}</td>
              <td className={td}>{p.providerId ?? "—"}</td>
            </tr>
          ))}
        </Table>
      )}
    </>
  );
}
