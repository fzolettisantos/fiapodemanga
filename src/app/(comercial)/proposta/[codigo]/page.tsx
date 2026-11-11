import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteType, includedInAllPlans, plans } from "@/lib/proposals/catalog";
import { contractPending, contractSections, plainRules, termRows } from "@/lib/proposals/contract";
import { decodeProposal, demoProposal } from "@/lib/proposals/proposal";
import { brl } from "@/lib/proposals/pricing";
import { ProposalCheckout } from "@/components/proposals/ProposalCheckout";

type Props = {
  params: Promise<{ codigo: string }>;
  searchParams: Promise<{ p?: string }>;
};

export const metadata: Metadata = { title: "Sua proposta" };

const dateBR = (iso: string) => iso.split("-").reverse().join("/");

export default async function ProposalPage({ params, searchParams }: Props) {
  const { codigo } = await params;
  const { p } = await searchParams;

  // Prévia: só o código "demo" existe; a proposta vem no link ou usa o exemplo.
  // Na versão final, o código será buscado no banco de dados.
  if (codigo !== "demo") notFound();
  const fromLink = decodeProposal(p);
  const proposal = fromLink ?? demoProposal();
  const type = getSiteType(proposal.siteTypeId)!;
  const plan = plans[type.plan];
  const expired = proposal.validUntil < new Date().toISOString().slice(0, 10);

  return (
    <div className="container-site py-12 md:py-20">
      <p
        role="note"
        className="mb-10 rounded-sm border border-line-strong px-4 py-3 text-sm text-muted"
      >
        <strong className="text-heading">Prévia.</strong> Esta página mostra como a proposta aparece para o cliente.
        Nenhum pagamento é feito por aqui ainda{fromLink ? "" : "; os dados abaixo são de exemplo"}.
      </p>

      <header className="max-w-3xl">
        <p className="eyebrow">Proposta · válida até {dateBR(proposal.validUntil)}</p>
        <h1 className="type-title mt-6">{proposal.client.name ? `Olá, ${proposal.client.name}.` : "Olá."} Esta é a sua proposta.</h1>
        <p className="type-lead mt-6 text-muted">
          {type.name}, no plano {plan.name}. Escolha como prefere pagar, confira as regras e aceite o contrato.
        </p>
      </header>

      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <section aria-labelledby="resumo" className="lg:col-span-5">
          <h2 id="resumo" className="type-heading">O que está incluso</h2>
          <ul className="mt-6 space-y-3 border-t border-line pt-6">
            {[...type.features, ...includedInAllPlans].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6 text-sm">
            <div>
              <dt className="font-mono text-xs tracking-[0.06em] text-muted uppercase">Implantação</dt>
              <dd className="mt-2 text-text">
                {proposal.setupWaived ? (
                  <>
                    <s className="text-muted">{brl(proposal.setup)}</s> <strong className="text-heading">Isenta</strong>
                  </>
                ) : (
                  brl(proposal.setup)
                )}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs tracking-[0.06em] text-muted uppercase">Entrega</dt>
              <dd className="mt-2 text-text">Até {proposal.deliveryDays} dias úteis</dd>
            </div>
            <div className="col-span-2">
              <dt className="font-mono text-xs tracking-[0.06em] text-muted uppercase">Domínio</dt>
              <dd className="mt-2 text-text">{proposal.domain || "A definir"} · incluso no plano</dd>
            </div>
          </dl>
          {proposal.special.length ? (
            <div className="mt-8 rounded-sm border-2 border-accent p-5">
              <h3 className="font-mono text-xs tracking-[0.06em] text-heading uppercase">Condição especial para você</h3>
              <ul className="mt-3 space-y-2">
                {proposal.special.map((item) => (
                  <li key={item} className="text-heading">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        <div className="lg:col-span-7">
          <ProposalCheckout
            proposal={proposal}
            expired={expired}
            rules={plainRules(proposal)}
            terms={termRows(proposal)}
            contract={contractSections(proposal)}
            contractPending={contractPending}
          />
        </div>
      </div>
    </div>
  );
}
