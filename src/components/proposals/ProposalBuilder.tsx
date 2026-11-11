"use client";

import { useMemo, useState } from "react";
import { Copy, ExternalLink, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/ButtonBase";
import { getSiteType, plans, siteTypes, type PlanId } from "@/lib/proposals/catalog";
import { annualSavings, brl, installment, MAX_INSTALLMENTS, methodLabel, periodLabel } from "@/lib/proposals/pricing";
import {
  DEFAULT_TYPE_ID,
  encodeProposal,
  methods,
  periods,
  proposalForType,
  proposalWarnings,
  type Proposal,
} from "@/lib/proposals/proposal";
import { cn } from "@/lib/utils/cn";

const field =
  "mt-2 block w-full rounded-sm border border-line-strong bg-transparent px-3 py-2.5 text-text placeholder:text-muted/70 focus-visible:border-accent";
const labelText = "text-sm font-medium text-heading";
const groupTitle = "font-mono text-xs tracking-[0.06em] text-muted uppercase";

function toggle<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

export function ProposalBuilder() {
  const [p, setP] = useState<Proposal>(() => proposalForType(getSiteType(DEFAULT_TYPE_ID)!));
  const [specialText, setSpecialText] = useState("");
  const [copied, setCopied] = useState(false);

  const type = getSiteType(p.siteTypeId)!;
  const plan = plans[type.plan];
  const proposal = useMemo<Proposal>(
    () => ({ ...p, special: specialText.split("\n").map((s) => s.trim()).filter(Boolean) }),
    [p, specialText],
  );
  const warnings = proposalWarnings(proposal);
  if (!proposal.client.name) warnings.unshift("Preencha o nome do cliente.");
  const link = `/proposta/demo?p=${encodeProposal(proposal)}`;
  const savings = annualSavings(proposal);
  const isReference = p.monthly === type.monthly && p.annual === type.annual && p.setup === type.setup;

  const set = <K extends keyof Proposal>(key: K, value: Proposal[K]) => {
    setCopied(false);
    setP((prev) => ({ ...prev, [key]: value }));
  };
  const setClient = (key: keyof Proposal["client"], value: string) =>
    set("client", { ...p.client, [key]: value });
  const num = (value: string) => (value === "" ? 0 : Number(value));

  function chooseType(id: string) {
    setCopied(false);
    setP((prev) => proposalForType(getSiteType(id)!, prev));
  }

  function setMonthly(value: number) {
    setCopied(false);
    // Enquanto o anual seguir a regra 12 por 10, ele acompanha o mensal.
    setP((prev) => ({ ...prev, monthly: value, annual: prev.annual === prev.monthly * 10 ? value * 10 : prev.annual }));
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.origin + link);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const byPlan = (Object.keys(plans) as PlanId[]).map((id) => ({ plan: plans[id], types: siteTypes.filter((t) => t.plan === id) }));

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <form className="space-y-12 lg:col-span-7" onSubmit={(e) => e.preventDefault()}>
        <fieldset className="space-y-5">
          <legend className="type-heading">Cliente</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className={labelText}>Nome ou razão social</span>
              <input className={field} value={p.client.name} onChange={(e) => setClient("name", e.target.value)} autoComplete="off" />
            </label>
            <label>
              <span className={labelText}>CPF ou CNPJ</span>
              <input className={field} value={p.client.document} onChange={(e) => setClient("document", e.target.value)} inputMode="numeric" />
            </label>
            <label>
              <span className={labelText}>WhatsApp</span>
              <input className={field} value={p.client.phone} onChange={(e) => setClient("phone", e.target.value)} inputMode="tel" />
            </label>
            <label className="sm:col-span-2">
              <span className={labelText}>E-mail</span>
              <input className={field} type="email" value={p.client.email} onChange={(e) => setClient("email", e.target.value)} />
            </label>
          </div>
        </fieldset>

        <fieldset className="space-y-5">
          <legend className="type-heading">Serviço</legend>
          <label className="block">
            <span className={labelText}>Tipo de site</span>
            <select className={cn(field, "bg-bg")} value={p.siteTypeId} onChange={(e) => chooseType(e.target.value)}>
              {byPlan.map(({ plan: pl, types }) => (
                <optgroup key={pl.id} label={`Plano ${pl.name}`}>
                  {types.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} — {brl(t.monthly)}/mês
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
          <p className="text-sm text-muted">
            Plano {plan.name}: {type.features.join(", ")}. Para: {type.audience}.
          </p>
        </fieldset>

        <fieldset className="space-y-5">
          <legend className="type-heading">Valores desta proposta</legend>
          <p className="text-sm text-muted">
            Preenchidos com a referência ({brl(type.monthly)}/mês, {brl(type.annual)}/ano, implantação {brl(type.setup)}).
            Mude o que quiser: o cliente vê e assina exatamente estes valores.
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            <label>
              <span className={labelText}>Mensal (R$)</span>
              <input className={field} type="number" min={0} step="1" value={p.monthly} onChange={(e) => setMonthly(num(e.target.value))} />
            </label>
            <label>
              <span className={labelText}>Anual (R$)</span>
              <input className={field} type="number" min={0} step="1" value={p.annual} onChange={(e) => set("annual", num(e.target.value))} />
            </label>
            <label>
              <span className={labelText}>Implantação (R$)</span>
              <input className={field} type="number" min={0} step="1" value={p.setup} onChange={(e) => set("setup", num(e.target.value))} />
            </label>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" className="size-4 accent-[var(--color-accent)]" checked={p.setupWaived} onChange={(e) => set("setupWaived", e.target.checked)} />
              <span>Implantação isenta</span>
            </label>
            {!isReference ? (
              <button type="button" className="inline-flex items-center gap-1.5 text-sm text-accent link-underline" onClick={() => chooseType(p.siteTypeId)}>
                <RotateCcw aria-hidden="true" className="size-3.5" /> Voltar aos valores de referência
              </button>
            ) : null}
          </div>
        </fieldset>

        <fieldset className="grid gap-8 sm:grid-cols-2">
          <legend className="type-heading mb-5">O que o cliente pode escolher</legend>
          <div>
            <p className={groupTitle}>Periodicidade</p>
            <div className="mt-3 space-y-2">
              {periods.map((period) => (
                <label key={period} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="size-4 accent-[var(--color-accent)]"
                    checked={p.periods.includes(period)}
                    disabled={p.periods.length === 1 && p.periods.includes(period)}
                    onChange={() => set("periods", periods.filter((x) => toggle(p.periods, period).includes(x)))}
                  />
                  <span>{periodLabel[period]}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className={groupTitle}>Formas de pagamento</p>
            <div className="mt-3 space-y-2">
              {methods.map((m) => (
                <label key={m} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="size-4 accent-[var(--color-accent)]"
                    checked={p.methods.includes(m)}
                    disabled={p.methods.length === 1 && p.methods.includes(m)}
                    onChange={() => set("methods", methods.filter((x) => toggle(p.methods, m).includes(x)))}
                  />
                  <span>{methodLabel[m]}</span>
                </label>
              ))}
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-5">
          <legend className="type-heading">Condições</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <label>
              <span className={labelText}>Fidelidade (meses)</span>
              <input className={field} type="number" min={0} max={60} value={p.fidelityMonths} onChange={(e) => set("fidelityMonths", num(e.target.value))} />
            </label>
            <label>
              <span className={labelText}>Multa de saída (mensalidades)</span>
              <input className={field} type="number" min={0} max={12} value={p.exitFeeMonths} onChange={(e) => set("exitFeeMonths", num(e.target.value))} />
            </label>
            <label>
              <span className={labelText}>Prazo de entrega (dias úteis)</span>
              <input className={field} type="number" min={1} max={365} value={p.deliveryDays} onChange={(e) => set("deliveryDays", num(e.target.value))} />
            </label>
            <label>
              <span className={labelText}>Proposta válida até</span>
              <input className={field} type="date" value={p.validUntil} onChange={(e) => set("validUntil", e.target.value)} />
            </label>
            <label className="sm:col-span-2">
              <span className={labelText}>Domínio desejado</span>
              <input className={field} placeholder="ex.: nomedocliente.com.br" value={p.domain} onChange={(e) => set("domain", e.target.value)} />
            </label>
            <label className="sm:col-span-2">
              <span className={labelText}>Condições especiais (uma por linha)</span>
              <textarea
                className={cn(field, "min-h-28")}
                placeholder={"ex.: Primeiro mês grátis.\nValor de R$ 89 por mês até dez/2027."}
                value={specialText}
                onChange={(e) => {
                  setCopied(false);
                  setSpecialText(e.target.value);
                }}
              />
              <span className="mt-2 block text-sm text-muted">Aparecem em destaque para o cliente e entram no Termo de Contratação.</span>
            </label>
          </div>
        </fieldset>
      </form>

      <aside aria-labelledby="resumo-proposta" className="lg:col-span-5">
        <div className="space-y-6 rounded-sm border border-line-strong p-6 lg:sticky lg:top-6">
          <h2 id="resumo-proposta" className="type-heading">
            O que o cliente vai ver
          </h2>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className={groupTitle}>Serviço</dt>
              <dd className="mt-1 text-text">
                {type.name} · plano {plan.name}
              </dd>
            </div>
            {proposal.periods.map((period) => (
              <div key={period}>
                <dt className={groupTitle}>{periodLabel[period]}</dt>
                <dd className="mt-1 text-2xl font-medium text-heading">
                  {brl(period === "monthly" ? proposal.monthly : proposal.annual)}
                  <span className="text-sm font-normal text-muted">{period === "monthly" ? "/mês" : "/ano"}</span>
                </dd>
                {period === "annual" ? (
                  <dd className="text-muted">
                    ou {MAX_INSTALLMENTS}x de {brl(installment(proposal.annual))} sem juros
                    {savings.amount > 0 && proposal.periods.includes("monthly") ? ` · economia de ${brl(savings.amount)}` : ""}
                  </dd>
                ) : null}
              </div>
            ))}
            <div>
              <dt className={groupTitle}>Pagamento</dt>
              <dd className="mt-1 text-text">{proposal.methods.map((m) => methodLabel[m]).join(", ")}</dd>
            </div>
            {proposal.special.length ? (
              <div>
                <dt className={groupTitle}>Condições especiais</dt>
                <dd className="mt-1 text-text">{proposal.special.join(" ")}</dd>
              </div>
            ) : null}
          </dl>

          {warnings.length ? (
            <ul className="space-y-1 border-t border-line pt-4 text-sm text-danger" aria-live="polite">
              {warnings.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          ) : null}

          <div className="space-y-3 border-t border-line pt-6">
            <p className={groupTitle}>Link da proposta</p>
            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={copy}>
                <span className="inline-flex items-center gap-2">
                  <Copy aria-hidden="true" className="size-4" /> {copied ? "Link copiado" : "Copiar link"}
                </span>
              </Button>
              <a
                href={link}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-heading transition-colors hover:border-accent hover:text-accent"
              >
                <ExternalLink aria-hidden="true" className="size-4" /> Abrir como cliente
              </a>
            </div>
            <p className="text-sm text-muted" aria-live="polite">
              {copied ? "Pronto para enviar pelo WhatsApp." : "Prévia: a proposta vai dentro do link e nada é salvo."}
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
