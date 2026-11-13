"use client";

import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

interface FieldProps {
  label: string;
  /** Texto de ajuda associado via aria-describedby. */
  hint?: string;
  /** Mensagem de erro específica; associada ao controle e anunciada por leitores de tela. */
  error?: string;
  required?: boolean;
  className?: string;
  /** Recebe os atributos de acessibilidade prontos para espalhar no controle. */
  children: (a11y: {
    id: string;
    "aria-describedby"?: string;
    "aria-invalid"?: true;
    "aria-required"?: true;
  }) => React.ReactNode;
}

/** Label real + dica + erro associados ao controle (WCAG 1.3.1, 3.3.1, 3.3.3). */
export function Field({ label, hint, error, required, className, children }: FieldProps) {
  const id = React.useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </Label>
      {hint && (
        <p id={hintId} className="text-sm text-text-secondary">
          {hint}
        </p>
      )}
      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
        "aria-required": required ? true : undefined,
      })}
      {error && (
        <p id={errorId} role="alert" className="flex items-start gap-2 text-sm font-medium text-error">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
