"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/ButtonBase";
import type { ContractSection } from "@/lib/proposals/contract";
import { CONTRACT_VERSION } from "@/lib/proposals/contract";
import {
  annualSavings,
  brl,
  installment,
  MAX_INSTALLMENTS,
  methodLabel,
  paymentDescription,
  periodLabel,
} from "@/lib/proposals/pricing";
import type { Method, Period, Proposal } from "@/lib/proposals/proposal";
import { cn } from "@/lib/utils/cn";

type Props = {
  proposal: Proposal;
  expired: boolean;
  rules: string[];
  terms: { label: string; value: string }[];
  contract: ContractSection[];
  contractPending: boolean;
};

const optionCard =
  "relative flex cursor-pointer flex-col gap-1 rounded-sm border border-line-strong p-5 transition-colors hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-surface has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--color-focus)]";

export function ProposalCheckout({ proposal, expired, rules, terms, contract, contractPending }: Props) {
  const [period, setPeriod] = useState<Period>(proposal.periods[0]!);
  const [method, setMethod] = useState<Method>(proposal.methods[0]!);
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const errorId = useId();
  const savings = annualSavings(proposal);
  const showSavings = savings.amount > 0 && proposal.periods.includes("monthly");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    if (!accepted) {
      setError("Para continuar, marque que leu e aceita o contrato.");
      return;
    }
    setError("");
    setStatus(
      `Prévia: aqui você seria levado ao Mercado Pago para pagar — ${paymentDescription(proposal, period, method)} O pagamento ainda não está ligado.`,
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-12">
      <fieldset>
        <legend className="type-heading">1. Como você quer pagar</legend>
        <div className={cn("mt-6 grid gap-4", proposal.periods.length > 1 && "sm:grid-cols-2")}>
          {proposal.periods.map((p) => (
            <label key={p} className={optionCard}>
              <input
                type="radio"
                name="period"
                value={p}
                checked={period === p}
                onChange={() => setPeriod(p)}
                className="sr-only"
              />
              <span className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs tracking-[0.06em] text-muted uppercase">{periodLabel[p]}</span>
                {p === "annual" && showSavings ? (
                  <span className="rounded-full bg-accent-fill px-2.5 py-0.5 text-xs font-medium text-ink">
                    {savings.freeMonths >= 1
                      ? `${savings.freeMonths} ${savings.freeMonths === 1 ? "mês grátis" : "meses grátis"}`
                      : `Economize ${brl(savings.amount)}`}
                  </span>
                ) : null}
              </span>
              <span className="mt-2 text-3xl font-medium tracking-[-0.02em] text-heading">
                {brl(p === "monthly" ? proposal.monthly : proposal.annual)}
                <span className="text-base font-normal text-muted">{p === "monthly" ? "/mês" : "/ano"}</span>
              </span>
              <span className="text-sm text-muted">
                {p === "monthly"
                  ? "Cobrança todo mês."
                  : `Ou ${MAX_INSTALLMENTS}x de ${brl(installment(proposal.annual))} sem juros no cartão.`}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="type-heading">2. Forma de pagamento</legend>
        <div className="mt-6 grid gap-3">
          {proposal.methods.map((m) => (
            <label key={m} className={cn(optionCard, "flex-row items-start gap-4 p-4")}>
              <input
                type="radio"
                name="method"
                value={m}
                checked={method === m}
                onChange={() => setMethod(m)}
                className="mt-1 size-4 accent-[var(--color-accent)]"
              />
              <span>
                <span className="block font-medium text-heading">{methodLabel[m]}</span>
                <span className="block text-sm text-muted">{paymentDescription(proposal, period, m)}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <section aria-labelledby="regras">
        <h2 id="regras" className="type-heading">
          3. As regras, em poucas palavras
        </h2>
        <ul className="mt-6 space-y-3 border-t border-line pt-6">
          {rules.map((rule) => (
            <li key={rule} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              <span>{rule}</span>
            </li>
          ))}
        </ul>

        <details className="mt-8 rounded-sm border border-line">
          <summary className="cursor-pointer px-5 py-4 font-medium text-heading">Termo de Contratação</summary>
          <dl className="divide-y divide-line border-t border-line px-5 text-sm">
            {terms.map((row) => (
              <div key={row.label} className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
                <dt className="text-muted">{row.label}</dt>
                <dd className="text-text">{row.value}</dd>
              </div>
            ))}
          </dl>
        </details>

        <details className="mt-3 rounded-sm border border-line">
          <summary className="cursor-pointer px-5 py-4 font-medium text-heading">
            Contrato completo <span className="font-normal text-muted">(versão {CONTRACT_VERSION})</span>
          </summary>
          <div className="max-h-[28rem] space-y-6 overflow-y-auto border-t border-line px-5 py-5 text-sm leading-relaxed">
            {contractPending ? (
              <p className="text-muted">Os dados da empresa entre colchetes serão preenchidos antes do primeiro uso.</p>
            ) : null}
            <p className="font-medium text-heading">CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE SITE E MANUTENÇÃO CONTÍNUA</p>
            {contract.map((section) => (
              <div key={section.title}>
                <h3 className="font-medium text-heading">{section.title}</h3>
                {section.clauses.map((clause) => (
                  <p key={clause} className="mt-2">
                    {clause}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </details>
      </section>

      <section aria-labelledby="aceite" className="rounded-sm border border-line-strong p-6">
        <h2 id="aceite" className="type-heading">
          4. Aceite e pagamento
        </h2>
        <p className="mt-4 text-muted">
          Você vai pagar: <strong className="text-heading">{paymentDescription(proposal, period, method)}</strong>
        </p>
        <label className="mt-6 flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => {
              setAccepted(e.target.checked);
              if (e.target.checked) setError("");
            }}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className="mt-1 size-4 accent-[var(--color-accent)]"
          />
          <span>
            Li e aceito o Termo de Contratação e o contrato (versão {CONTRACT_VERSION}). Sei que posso desistir em até 7
            dias.
          </span>
        </label>
        {error ? (
          <p id={errorId} className="mt-3 text-sm text-danger">
            {error}
          </p>
        ) : null}
        <Button type="submit" size="lg" arrow className="mt-6 w-full sm:w-auto" disabled={expired}>
          Ir para o pagamento
        </Button>
        {expired ? <p className="mt-3 text-sm text-danger">Esta proposta expirou. Peça uma nova à Fiapo de Manga.</p> : null}
        <p aria-live="polite" className="mt-4 text-sm text-muted">
          {status}
        </p>
      </section>
    </form>
  );
}
