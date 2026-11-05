type JsonLdProps = { data: Record<string, unknown> | Record<string, unknown>[] };

/** Injeta dados estruturados. `<` é escapado para evitar quebra do script. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
