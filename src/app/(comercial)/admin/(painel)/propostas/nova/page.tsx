import { ProposalBuilder } from "@/components/proposals/ProposalBuilder";
import { PageTitle } from "@/components/admin/ui";
import { createProposal } from "../../../actions";

export const metadata = { title: "Nova proposta" };

export default function NewProposalPage() {
  return (
    <>
      <PageTitle eyebrow="Propostas" title="Nova proposta" />
      <ProposalBuilder onSave={createProposal} />
    </>
  );
}
