"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectableCardProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** "radio" (escolha única) ou "checkbox" (múltipla). */
  type?: "radio" | "checkbox";
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

/**
 * Base dos seletores do wizard (InstallationTypeSelector, TVSizeSelector, SupportTypeSelector,
 * RepairBrandSelector…). Usa <input> nativo (teclado, foco e leitores de tela de graça);
 * o estado "selected" não depende só de cor: mostra um ícone de check.
 */
export const SelectableCard = React.forwardRef<HTMLInputElement, SelectableCardProps>(
  ({ type = "radio", title, description, icon, className, ...props }, ref) => (
    <label
      className={cn(
        "relative flex min-h-16 cursor-pointer items-start gap-3 rounded-card border border-border bg-surface p-4 transition-colors duration-150 hover:bg-surface-muted",
        "has-[:checked]:border-2 has-[:checked]:border-brand-ink has-[:checked]:bg-surface",
        "has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus",
        "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
        className,
      )}
    >
      <input ref={ref} type={type} className="peer sr-only" {...props} />
      {icon && <span className="mt-0.5 shrink-0 [&_svg]:size-6">{icon}</span>}
      <span className="flex flex-1 flex-col">
        <span className="font-semibold text-brand-ink">{title}</span>
        {description && <span className="text-sm text-text-secondary">{description}</span>}
      </span>
      <span
        aria-hidden="true"
        className="invisible grid size-6 shrink-0 place-items-center rounded-full bg-brand-primary text-brand-ink peer-checked:visible"
      >
        <Check className="size-4" />
      </span>
    </label>
  ),
);
SelectableCard.displayName = "SelectableCard";
