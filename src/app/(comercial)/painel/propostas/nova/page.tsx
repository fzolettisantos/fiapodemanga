import type { Metadata } from "next";
import { ProposalBuilder } from "@/components/proposals/ProposalBuilder";

export const metadata: Metadata = { title: "Nova proposta" };

/**
 * Painel: criar proposta (PRÉVIA).
 * Ainda sem login e sem banco de dados: nada é salvo, a proposta vai dentro do link.
 * Antes de publicar de verdade, esta rota precisa de autenticação (ver ROADMAP.md).
 */
export default function NewProposalPage() {
  return (
    <div className="container-site py-12 md:py-16">
      <p role="note" className="mb-10 rounded-sm border border-line-strong px-4 py-3 text-sm text-muted">
        <strong className="text-heading">Prévia do painel.</strong> Ainda sem login, sem banco de dados e sem pagamento:
        serve para validar o fluxo e o desenho.
      </p>
      <header className="mb-12 max-w-3xl">
        <p className="eyebrow">Painel · Propostas</p>
        <h1 className="type-title mt-6">Nova proposta</h1>
        <p className="type-lead mt-6 text-muted">
          Escolha o serviço, ajuste os valores se quiser e gere o link para o cliente.
        </p>
      </header>
      <ProposalBuilder />
    </div>
  );
}
