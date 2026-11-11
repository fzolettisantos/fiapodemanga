import Link from "next/link";
import { getRepo } from "@/lib/admin/repo";
import { clientSituation } from "@/lib/admin/util";
import { brl, methodLabel, periodLabel } from "@/lib/proposals/pricing";
import { Badge, dateBR, Empty, PageTitle, Table, td } from "@/components/admin/ui";

export const metadata = { title: "Clientes" };

export default async function ClientsPage() {
  const repo = getRepo();
  const [clients, payments] = await Promise.all([repo.listClients(), repo.listPayments()]);
  return (
    <>
      <PageTitle eyebrow="Admin" title="Clientes" />
      {clients.length === 0 ? (
        <Empty>Os clientes aparecem aqui quando aceitam uma proposta.</Empty>
      ) : (
        <Table head={["Cliente", "Serviço", "Valor", "Pagamento", "Próx. vencimento", "Fidelidade até", "Situação"]} caption="Clientes">
          {clients.map((c) => {
            const s = clientSituation(c, payments);
            return (
              <tr key={c.id}>
                <td className={td}>
                  <Link href={`/admin/clientes/${c.id}`} className="link-underline font-medium text-heading">{c.name}</Link>
                  {c.domain ? <span className="block text-xs text-muted">{c.domain}</span> : null}
                </td>
                <td className={td}>{c.siteType}<span className="block text-xs text-muted">Plano {c.plan}</span></td>
                <td className={td}>{brl(c.amount)}<span className="block text-xs text-muted">{periodLabel[c.period]}</span></td>
                <td className={td}>{methodLabel[c.method]}</td>
                <td className={td}>{dateBR(c.nextDue)}</td>
                <td className={td}>{dateBR(c.fidelityUntil)}</td>
                <td className={td}><Badge tone={s.tone}>{s.label}</Badge></td>
              </tr>
            );
          })}
        </Table>
      )}
    </>
  );
}
