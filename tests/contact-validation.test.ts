import { describe, expect, it } from "vitest";
import {
  escapeHtml,
  isLikelySpam,
  isValidEmail,
  LIMITS,
  sanitizeLine,
  sanitizeText,
  validateContact,
} from "@/lib/contact/validation";

const valid = {
  name: "Maria Silva",
  email: "Maria@Empresa.com.br",
  company: "",
  projectType: "site",
  message: "Precisamos de um novo site institucional.",
  consent: true,
};

describe("validateContact", () => {
  it("aceita dados válidos e normaliza o e-mail", () => {
    const result = validateContact(valid);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.email).toBe("maria@empresa.com.br");
  });

  it("exige consentimento", () => {
    const result = validateContact({ ...valid, consent: false });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.consent).toBeDefined();
  });

  it("rejeita tipo de projeto desconhecido", () => {
    const result = validateContact({ ...valid, projectType: "hack" });
    expect(result.success).toBe(false);
  });

  it("rejeita campos obrigatórios vazios", () => {
    const result = validateContact({});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(Object.keys(result.errors).sort()).toEqual(
        ["consent", "email", "message", "name", "projectType"].sort(),
      );
    }
  });

  it("rejeita mensagens longas demais", () => {
    const result = validateContact({ ...valid, message: "a".repeat(LIMITS.message.max + 1) });
    expect(result.success).toBe(false);
  });

  it("remove quebras de linha de campos de linha única (header injection)", () => {
    const result = validateContact({ ...valid, name: "Maria\r\nBcc: x@y.com" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).not.toMatch(/[\r\n]/);
  });
});

describe("sanitização", () => {
  it("remove caracteres de controle", () => {
    expect(sanitizeLine("a\u0000b​c")).toBe("abc");
    expect(sanitizeText("linha 1\r\n\n\n\nlinha 2")).toBe("linha 1\n\nlinha 2");
  });

  it("escapa HTML", () => {
    expect(escapeHtml('<script>"x"</script>')).toBe("&lt;script&gt;&quot;x&quot;&lt;/script&gt;");
  });

  it("valida e-mails", () => {
    expect(isValidEmail("nome@empresa.com.br")).toBe(true);
    expect(isValidEmail("nome@empresa")).toBe(false);
    expect(isValidEmail("nome <x@y.com>")).toBe(false);
  });
});

describe("antispam", () => {
  const now = 1_000_000_000;
  it("bloqueia honeypot preenchido", () => {
    expect(isLikelySpam({ website: "http://spam", startedAt: now - 10_000 }, now)).toBe(true);
  });
  it("bloqueia envio rápido demais", () => {
    expect(isLikelySpam({ website: "", startedAt: now - 500 }, now)).toBe(true);
  });
  it("bloqueia sem timestamp", () => {
    expect(isLikelySpam({ website: "" }, now)).toBe(true);
  });
  it("permite envio humano", () => {
    expect(isLikelySpam({ website: "", startedAt: now - 15_000 }, now)).toBe(false);
  });
});
