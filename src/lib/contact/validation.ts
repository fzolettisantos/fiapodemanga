import { projectTypeValues, type ProjectTypeValue } from "@/content/contact";
import { format } from "@/i18n/format";

/** Mensagens de validação (vêm do dicionário do idioma; padrão em português). */
export type ValidationMessages = {
  nameRequired: string;
  tooLong: string;
  emailRequired: string;
  emailInvalid: string;
  projectType: string;
  messageShort: string;
  consent: string;
};

const defaultMessages: ValidationMessages = {
  nameRequired: "Informe seu nome.",
  tooLong: "Use até {max} caracteres.",
  emailRequired: "Informe seu e-mail.",
  emailInvalid: "Informe um e-mail válido, como nome@empresa.com.br.",
  projectType: "Selecione o tipo de projeto.",
  messageShort: "Conte um pouco mais sobre o desafio (mínimo de {min} caracteres).",
  consent: "É preciso concordar com a Política de Privacidade para enviar.",
};

/**
 * Validação e sanitização do formulário de contato.
 * Compartilhada entre cliente (feedback imediato) e servidor (fonte da verdade).
 */

export const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  company: { max: 120 },
  message: { min: 10, max: 5000 },
  /** Tempo mínimo (ms) entre abrir e enviar o formulário — antispam */
  minFillTime: 3000,
  /** Validade máxima do formulário aberto (ms) */
  maxFillTime: 1000 * 60 * 60 * 24,
} as const;

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  projectType: ProjectTypeValue;
  message: string;
  consent: boolean;
};

export type ContactField = keyof ContactInput;
export type ContactErrors = Partial<Record<ContactField, string>>;

export type ValidationResult =
  | { success: true; data: ContactInput }
  | { success: false; errors: ContactErrors };

const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F​-‏‪-‮⁦-⁩]/g;

/** Linha única: remove controles e quebras de linha, normaliza espaços. */
export function sanitizeLine(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.normalize("NFC").replace(CONTROL_CHARS, "").replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim();
}

/** Texto longo: mantém quebras de linha, remove controles e excesso de linhas vazias. */
export function sanitizeText(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .normalize("NFC")
    .replace(/\r\n?/g, "\n")
    .replace(CONTROL_CHARS, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

export function isValidEmail(email: string): boolean {
  return email.length <= LIMITS.email.max && EMAIL_RE.test(email);
}

export function validateContact(
  raw: Record<string, unknown>,
  m: ValidationMessages = defaultMessages,
): ValidationResult {
  const name = sanitizeLine(raw.name);
  const email = sanitizeLine(raw.email).toLowerCase();
  const company = sanitizeLine(raw.company);
  const projectType = sanitizeLine(raw.projectType);
  const message = sanitizeText(raw.message);
  const consent = raw.consent === true || raw.consent === "true" || raw.consent === "on";

  const errors: ContactErrors = {};

  if (name.length < LIMITS.name.min) errors.name = m.nameRequired;
  else if (name.length > LIMITS.name.max) errors.name = format(m.tooLong, { max: LIMITS.name.max });

  if (!email) errors.email = m.emailRequired;
  else if (!isValidEmail(email)) errors.email = m.emailInvalid;

  if (company.length > LIMITS.company.max) errors.company = format(m.tooLong, { max: LIMITS.company.max });

  if (!projectTypeValues.includes(projectType as ProjectTypeValue)) errors.projectType = m.projectType;

  if (message.length < LIMITS.message.min) errors.message = format(m.messageShort, { min: LIMITS.message.min });
  else if (message.length > LIMITS.message.max) errors.message = format(m.tooLong, { max: LIMITS.message.max });

  if (!consent) errors.consent = m.consent;

  if (Object.keys(errors).length > 0) return { success: false, errors };

  return {
    success: true,
    data: { name, email, company, projectType: projectType as ProjectTypeValue, message, consent },
  };
}

/** Verificações antispam (honeypot + tempo de preenchimento). */
export function isLikelySpam(raw: Record<string, unknown>, now = Date.now()): boolean {
  const honeypot = typeof raw.website === "string" ? raw.website.trim() : "";
  if (honeypot.length > 0) return true;
  const startedAt = Number(raw.startedAt);
  if (!Number.isFinite(startedAt)) return true;
  const elapsed = now - startedAt;
  return elapsed < LIMITS.minFillTime || elapsed > LIMITS.maxFillTime;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
