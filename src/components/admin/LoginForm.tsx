"use client";

import { useActionState } from "react";
import { signIn, type LoginState } from "@/app/(comercial)/admin/actions";
import { Button } from "@/components/ui/ButtonBase";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(signIn, { status: "idle" });
  return (
    <form action={action} className="mt-8 space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-heading">E-mail</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 block w-full rounded-sm border border-line-strong bg-transparent px-3 py-2.5 text-text"
        />
      </label>
      <Button type="submit" disabled={pending}>
        {pending ? "Enviando…" : "Receber link de acesso"}
      </Button>
      <p aria-live="polite" className={state.status === "error" ? "text-sm text-danger" : "text-sm text-muted"}>
        {state.message ?? ""}
      </p>
    </form>
  );
}
