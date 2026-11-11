import Link from "next/link";
import { notFound } from "next/navigation";
import { getRepo } from "@/lib/admin/repo";
import { eventText, proposalStatus, proposalStatusLabel } from "@/lib/admin/util";
import { termRows } from "@/lib/proposals/contract";
import { methodLabel, periodLabel, brl } from "@/lib/proposals/pricing";
import { Badge, dateBR, dateTimeBR, PageTitle } from "@/components/admin/ui";
import { CopyLink } from "@/components/admin/CopyLink";

export const metadata = { title: "Proposta" };

export default async function ProposalDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const repo = getRepo();
  const p = await repo.getProposal(id);
  if (!p) notFound();
  const [events, acceptance, clients] = await Promise.all([repo.listEvents({ proposalId: id }), repo.getAcceptance(id), repo.listClients()]);
  const client = clients.find((c) => c.proposalId === id);
  const st = proposalStatus(p);
  const link = `/proposta/${p.code}`;

  return (
    <>
      <PageTitle eyebrow="Proposta" title={p.data.client.name}>
        <Badge tone={st === "accepted" ? "ok" : st === "expired" ? "warn" : "accent"}>{proposalStatusLabel[st]}</Badge>
      </PageTitle>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="space-y-10 lg:col-span-7">
          <section aria-labelledby="link" className="rounded-sm border border-line-strong p-5">
            <h2 id="link" className="font-mono text-xs tracking-[0.06em] text-muted uppercase">Link para o cliente</h2>
            <p className="mt-3 break-all text-heading">{link}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <CopyLink path={link} />
              <a href={link} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-5 text-heading hover:border-accent">
                Abrir como cliente
              </a>
            </div>
          </section>

          <section aria-labelledby="termo">
            <h2 id="termo" className="type-subheading">Termo de Contratação {acceptance ? "(como foi aceito)" : "(como o cliente vê)"}</h2>
            <dl className="mt-4 divide-y divide-line border-y border-line text-sm">
              {(acceptance?.terms?.length ? acceptance.terms : termRows(p.data)).map((r) => (
                <div key={r.label} className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
                  <dt className="text-muted">{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <div className="space-y-10 lg:col-span-5">
          {acceptance ? (
            <section aria-labelledby="aceite" className="rounded-sm border-2 border-[#1b9e3e] p-5">
              <h2 id="aceite" className="type-subheading">Prova do aceite</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div><dt className="inline text-muted">Data e hora: </dt><dd className="inline">{dateTimeBR(acceptance.acceptedAt)}</dd></div>
                <div><dt className="inline text-muted">Escolha: </dt><dd className="inline">{periodLabel[acceptance.period]} · {methodLabel[acceptance.method]} · {brl(acceptance.amount)}</dd></div>
                <div><dt className="inline text-muted">IP: </dt><dd className="inline">{acceptance.ip ?? "—"}</dd></div>
                <div><dt className="inline text-muted">Navegador: </dt><dd className="inline break-all">{acceptance.userAgent ?? "—"}</dd></div>
                <div><dt className="inline text-muted">E-mail informado: </dt><dd className="inline">{acceptance.email ?? "—"}</dd></div>
                <div><dt className="inline text-muted">Versão do contrato: </dt><dd className="inline">{acceptance.contractVersion}</dd></div>
              </dl>
              {client ? (
                <Link href={`/admin/clientes/${client.id}`} className="link-underline mt-4 inline-block text-heading">Ver cliente</Link>
              ) : null}
            </section>
          ) : (
            <p className="text-sm text-muted">Válida até {dateBR(p.data.validUntil)}. Ainda sem aceite.</p>
          )}
          <section aria-labelledby="hist">
            <h2 id="hist" className="type-subheading">Histórico</h2>
            <ol className="mt-4 divide-y divide-line border-y border-line text-sm">
              {events.map((e) => (
                <li key={e.id} className="flex justify-between gap-4 py-3">
                  <span>
                    <span className="text-heading">{eventText(e)}</span>
                    {e.actor ? <span className="text-muted"> · {e.actor}</span> : null}
                  </span>
                  <span className="shrink-0 text-muted">{dateTimeBR(e.createdAt)}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </>
  );
}
