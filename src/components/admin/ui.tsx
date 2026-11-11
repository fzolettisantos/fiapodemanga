import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

const toneClass = {
  ok: "border-[#1b9e3e] text-[#137a2f] dark:text-[#7ee29a]",
  warn: "border-[#b7791f] text-[#8a5a12] dark:text-[#ffd28a]",
  danger: "border-danger text-danger",
  muted: "border-line-strong text-muted",
  accent: "border-accent text-heading",
} as const;
export type Tone = keyof typeof toneClass;

export function Badge({ tone = "muted", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap", toneClass[tone])}>
      {children}
    </span>
  );
}

export function Stat({ label, value, hint, tone }: { label: string; value: ReactNode; hint?: ReactNode; tone?: Tone }) {
  return (
    <div className={cn("rounded-sm border p-5", tone === "danger" ? "border-danger" : tone === "warn" ? "border-[#b7791f]" : "border-line")}>
      <p className="font-mono text-xs tracking-[0.06em] text-muted uppercase">{label}</p>
      <p className="mt-3 text-3xl font-medium tracking-[-0.02em] text-heading">{value}</p>
      {hint ? <p className="mt-2 text-sm text-muted">{hint}</p> : null}
    </div>
  );
}

export function PageTitle({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="type-heading mt-4">{title}</h1>
      </div>
      {children ? <div className="flex flex-wrap gap-3">{children}</div> : null}
    </header>
  );
}

export function Table({ head, children, caption }: { head: string[]; children: ReactNode; caption?: string }) {
  return (
    <div className="overflow-x-auto rounded-sm border border-line">
      <table className="w-full min-w-[40rem] text-left text-sm">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead className="border-b border-line bg-surface">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-mono text-xs font-normal tracking-[0.06em] text-muted uppercase">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">{children}</tbody>
      </table>
    </div>
  );
}

export const td = "px-4 py-3 align-top";

export function Empty({ children }: { children: ReactNode }) {
  return <p className="rounded-sm border border-dashed border-line-strong p-8 text-center text-muted">{children}</p>;
}

export const dateBR = (iso?: string | null) => (iso ? iso.slice(0, 10).split("-").reverse().join("/") : "—");
export const dateTimeBR = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo" }) : "—";
