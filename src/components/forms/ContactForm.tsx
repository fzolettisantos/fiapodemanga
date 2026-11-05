"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { projectTypes } from "@/content/contact";
import { LIMITS, validateContact, type ContactErrors, type ContactField } from "@/lib/contact/validation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

const fieldOrder: ContactField[] = ["name", "email", "company", "projectType", "message", "consent"];

const inputClass =
  "block w-full border-0 border-b border-line-strong bg-transparent px-0 py-3 text-lg text-text placeholder:text-muted/70 transition-colors focus:border-accent focus:ring-0 focus:outline-none aria-[invalid=true]:border-danger";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-danger">
      {message}
    </p>
  );
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef<number>(0);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });

  useEffect(() => {
    startedAt.current = Date.now();
    // Pré-seleciona o tipo de projeto a partir de ?tipo=...
    const tipo = new URLSearchParams(window.location.search).get("tipo");
    const select = formRef.current?.elements.namedItem("projectType");
    if (tipo && select instanceof HTMLSelectElement && projectTypes.some((t) => t.value === tipo)) {
      select.value = tipo;
    }
  }, []);

  useEffect(() => {
    if (status.state === "success") successRef.current?.focus();
    if (status.state === "error") summaryRef.current?.focus();
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.state === "submitting") return;
    const form = event.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      company: fd.get("company"),
      projectType: fd.get("projectType"),
      message: fd.get("message"),
      consent: fd.get("consent") === "on",
      website: fd.get("website"),
      startedAt: startedAt.current,
    };

    const result = validateContact(payload);
    if (!result.success) {
      setErrors(result.errors);
      setStatus({ state: "idle" });
      const first = fieldOrder.find((f) => result.errors[f]);
      if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setErrors({});
    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; message?: string; errors?: ContactErrors }
        | null;

      if (response.ok && body?.ok) {
        form.reset();
        setStatus({ state: "success" });
        return;
      }
      if (body && !body.ok && body.errors) setErrors(body.errors);
      setStatus({
        state: "error",
        message:
          (body && !body.ok && body.message) ||
          "Não conseguimos enviar sua mensagem agora. Tente novamente em instantes.",
      });
    } catch {
      setStatus({
        state: "error",
        message: "Não foi possível conectar. Verifique sua conexão e tente novamente.",
      });
    }
  }

  if (status.state === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="border-t-2 border-accent pt-8 outline-none"
      >
        <p className="eyebrow">Mensagem enviada</p>
        <p className="type-heading mt-5">Obrigado! Recebemos sua mensagem.</p>
        <p className="type-lead mt-6 max-w-xl">
          Vamos ler com atenção e responder pelo e-mail informado.
        </p>
        <Button variant="outline" className="mt-10" onClick={() => setStatus({ state: "idle" })}>
          Enviar outra mensagem
        </Button>
      </div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;
  const submitting = status.state === "submitting";

  const describedBy = (field: ContactField, hint?: string) =>
    [hint, errors[field] ? `${field}-error` : null].filter(Boolean).join(" ") || undefined;

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-busy={submitting} className="space-y-10">
      <div ref={summaryRef} tabIndex={-1} aria-live="assertive" className="outline-none">
        {status.state === "error" ? (
          <div role="alert" className="border-l-2 border-danger pl-5 text-danger">
            <p className="font-medium">{status.message}</p>
          </div>
        ) : errorCount > 0 ? (
          <p role="alert" className="border-l-2 border-danger pl-5 text-danger">
            {errorCount === 1 ? "Há 1 campo para revisar." : `Há ${errorCount} campos para revisar.`}
          </p>
        ) : null}
      </div>

      <p className="text-sm text-muted">
        Campos marcados com <span aria-hidden="true">*</span>
        <span className="sr-only">asterisco</span> são obrigatórios.
      </p>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow block">
            Nome <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name.max}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            className={inputClass}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <label htmlFor="email" className="eyebrow block">
            E-mail <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={LIMITS.email.max}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            className={inputClass}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>

        <div>
          <label htmlFor="company" className="eyebrow block">
            Empresa <span className="normal-case tracking-normal text-muted">(opcional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={LIMITS.company.max}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={describedBy("company")}
            className={inputClass}
          />
          <FieldError id="company-error" message={errors.company} />
        </div>

        <div>
          <label htmlFor="projectType" className="eyebrow block">
            Tipo de projeto <span aria-hidden="true">*</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            defaultValue=""
            aria-invalid={errors.projectType ? true : undefined}
            aria-describedby={describedBy("projectType")}
            className={cn(inputClass, "cursor-pointer appearance-none bg-[length:16px] bg-[right_center] bg-no-repeat pr-8")}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="" disabled>
              Selecione
            </option>
            {projectTypes.map((type) => (
              <option key={type.value} value={type.value} className="bg-bg text-text">
                {type.label}
              </option>
            ))}
          </select>
          <FieldError id="projectType-error" message={errors.projectType} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="eyebrow block">
          Mensagem <span aria-hidden="true">*</span>
        </label>
        <p id="message-hint" className="mt-2 text-sm text-muted">
          Conte o contexto, o desafio e o que você espera resolver.
        </p>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          minLength={LIMITS.message.min}
          maxLength={LIMITS.message.max}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message", "message-hint")}
          className={cn(inputClass, "resize-y")}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      {/* Honeypot antispam: invisível para pessoas, ignorado por leitores de tela */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <div className="flex items-start gap-4">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={describedBy("consent")}
            className="mt-0.5 size-6 shrink-0 cursor-pointer accent-[var(--color-accent)]"
          />
          <label htmlFor="consent" className="cursor-pointer text-[0.98rem] leading-relaxed">
            Li e concordo com a{" "}
            <Link href="/politica-de-privacidade" className="text-accent underline underline-offset-4">
              Política de Privacidade
            </Link>{" "}
            e autorizo o uso dos meus dados para receber um retorno sobre este contato.{" "}
            <span aria-hidden="true">*</span>
          </label>
        </div>
        <FieldError id="consent-error" message={errors.consent} />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <Button type="submit" variant="primary" size="lg" disabled={submitting} arrow={!submitting}>
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 aria-hidden="true" className="size-5 motion-safe:animate-spin" />
              Enviando…
            </span>
          ) : (
            "Enviar mensagem"
          )}
        </Button>
        <p aria-live="polite" className="sr-only">
          {submitting ? "Enviando mensagem…" : ""}
        </p>
      </div>
    </form>
  );
}
