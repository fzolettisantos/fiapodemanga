import "server-only";
import { projectTypeLabel } from "@/content/contact";
import { siteConfig } from "@/config/site";
import { escapeHtml, type ContactInput } from "./validation";

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "provider_error" };

/** Retorna a configuração de envio se todas as variáveis estiverem definidas. */
export function getMailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !to || !from) return null;
  return { apiKey, to, from };
}

export function buildEmail(data: ContactInput) {
  const type = projectTypeLabel(data.projectType);
  const subject = `[Site] ${type} — ${data.name}${data.company ? ` (${data.company})` : ""}`.slice(0, 180);
  const rows: [string, string][] = [
    ["Nome", data.name],
    ["E-mail", data.email],
    ["Empresa", data.company || "—"],
    ["Tipo de projeto", type],
    ["Consentimento LGPD", "Sim — aceitou a Política de Privacidade"],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMensagem:\n${data.message}\n`;
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#222">
<h1 style="font-size:18px">Nova mensagem pelo site ${escapeHtml(siteConfig.name)}</h1>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><th align="left" style="vertical-align:top">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table>
<h2 style="font-size:16px">Mensagem</h2>
<p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
</div>`;
  return { subject, text, html };
}

/** Envia a mensagem pelo Resend (https://resend.com/docs/api-reference/emails/send-email). */
export async function sendContactEmail(data: ContactInput): Promise<SendResult> {
  const config = getMailConfig();
  if (!config) return { ok: false, reason: "not_configured" };

  const { subject, text, html } = buildEmail(data);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: data.email,
        subject,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("[contato] Falha no provedor de e-mail:", response.status);
      return { ok: false, reason: "provider_error" };
    }
    return { ok: true };
  } catch (error) {
    console.error("[contato] Erro ao enviar e-mail:", error instanceof Error ? error.name : "unknown");
    return { ok: false, reason: "provider_error" };
  }
}
