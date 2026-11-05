/**
 * Limite de envios por IP em memória.
 * Em ambientes serverless com várias instâncias, cada instância mantém
 * sua própria contagem — para proteção global, use um store compartilhado
 * (ex.: Upstash Redis) ou um WAF.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

export function rateLimit(key: string, now = Date.now()): { allowed: boolean; retryAfter: number } {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    const retryAfter = Math.ceil((WINDOW_MS - (now - recent[0]!)) / 1000);
    return { allowed: false, retryAfter };
  }
  recent.push(now);
  hits.set(key, recent);

  // Limpeza simples para não crescer indefinidamente.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return { allowed: true, retryAfter: 0 };
}

export function __resetRateLimit() {
  hits.clear();
}
