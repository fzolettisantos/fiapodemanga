import { NextResponse, type NextRequest } from "next/server";
import { isLikelySpam, validateContact } from "@/lib/contact/validation";
import { rateLimit } from "@/lib/contact/rate-limit";
import { getMailConfig, sendContactEmail } from "@/lib/contact/send";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 20_000;

type ApiResponse =
  | { ok: true }
  | { ok: false; code: string; message: string; errors?: Record<string, string> };

function reply(body: ApiResponse, status: number, headers?: Record<string, string>) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // alguns navegadores omitem em same-origin
  try {
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return reply({ ok: false, code: "forbidden", message: "Origem não permitida." }, 403);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return reply({ ok: false, code: "bad_request", message: "Formato de requisição inválido." }, 415);
  }

  const limit = rateLimit(clientIp(request));
  if (!limit.allowed) {
    return reply(
      {
        ok: false,
        code: "rate_limited",
        message: "Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.",
      },
      429,
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  let raw: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return reply({ ok: false, code: "too_large", message: "A mensagem é muito longa." }, 413);
    }
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("invalid");
    raw = parsed as Record<string, unknown>;
  } catch {
    return reply({ ok: false, code: "bad_request", message: "Não foi possível ler os dados enviados." }, 400);
  }

  if (isLikelySpam(raw)) {
    return reply(
      {
        ok: false,
        code: "spam_suspected",
        message: "Não foi possível validar o envio. Aguarde alguns segundos e tente novamente.",
      },
      400,
    );
  }

  const result = validateContact(raw);
  if (!result.success) {
    return reply(
      { ok: false, code: "validation_error", message: "Revise os campos destacados.", errors: result.errors },
      422,
    );
  }

  if (!getMailConfig()) {
    return reply(
      {
        ok: false,
        code: "not_configured",
        message:
          "O envio de mensagens pelo site ainda não está disponível. Sua mensagem não foi enviada.",
      },
      503,
    );
  }

  const sent = await sendContactEmail(result.data);
  if (!sent.ok) {
    return reply(
      {
        ok: false,
        code: "send_failed",
        message: "Não conseguimos enviar sua mensagem agora. Tente novamente em instantes.",
      },
      502,
    );
  }

  return reply({ ok: true }, 200);
}
