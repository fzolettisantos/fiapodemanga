import Link from "next/link";
import { getRepo } from "@/lib/admin/repo";
import { proposalStatus, proposalStatusLabel } from "@/lib/admin/util";
import { getSiteType } from "@/lib/proposals/catalog";
import { brl } from "@/lib/proposals/pricing";
import { Badge, dateBR, Empty, PageTitle, Table, td } from "@/components/admin/ui";

export const metadata = { title: "Propostas" };

const tone = { sent: "muted", opened: "accent", accepted: "ok", expired: "warn", canceled: "muted" } as const;

export default async function ProposalsPage() {
  const proposals = await getRepo().listProposals();
  return (
    <>
      <PageTitle eyebrow="Admin" title="Propostas">
        <Link href="/admin/propostas/nova" className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-btn-primary-border)] bg-[var(--color-btn-primary-bg)] px-5 font-medium text-[var(--color-btn-primary-fg)]">
          Nova proposta
        </Link>
      </PageTitle>
      {proposals.length === 0 ? (
        <Empty>Nenhuma proposta ainda.</Empty>
      ) : (
        <Table head={["Cliente", "Serviço", "Mensal / Anual", "Criada em", "Validade", "Situação"]} caption="Propostas">
          {proposals.map((p) => {
            const st = proposalStatus(p);
            return (
              <tr key={p.id}>
                <td className={td}>
                  <Link href={`/admin/propostas/${p.id}`} className="link-underline font-medium text-heading">{p.data.client.name}</Link>
                </td>
                <td className={td}>{getSiteType(p.data.siteTypeId)?.name}</td>
                <td className={td}>
                  {brl(p.data.monthly)} / {brl(p.data.annual)}
                  {p.data.special.length ? <span className="block text-xs text-muted">Condição especial</span> : null}
                </td>
                <td className={td}>{dateBR(p.createdAt)}</td>
                <td className={td}>{dateBR(p.data.validUntil)}</td>
                <td className={td}><Badge tone={tone[st]}>{proposalStatusLabel[st]}</Badge></td>
              </tr>
            );
          })}
        </Table>
      )}
    </>
  );
}
