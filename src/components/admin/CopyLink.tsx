"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

export function CopyLink({ path, label = "Copiar link" }: { path: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.origin + path);
          setDone(true);
        } catch {
          setDone(false);
        }
      }}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-btn-primary-border)] bg-[var(--color-btn-primary-bg)] px-5 font-medium text-[var(--color-btn-primary-fg)]"
    >
      <Copy aria-hidden="true" className="size-4" />
      <span aria-live="polite">{done ? "Link copiado" : label}</span>
    </button>
  );
}
