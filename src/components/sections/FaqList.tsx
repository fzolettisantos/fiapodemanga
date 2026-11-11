import { ChevronDown } from "lucide-react";
import type { Faq } from "@/content/faq";

/**
 * Perguntas e respostas em blocos que abrem e fecham (<details>), acessíveis por teclado e leitor de tela.
 * O texto fica no HTML mesmo fechado, e o Google lê tudo.
 */
export function FaqList({ items, headingId }: { items: readonly Faq[]; headingId?: string }) {
  return (
    <div className="border-t border-line" data-faq={headingId}>
      {items.map((item) => (
        <details key={item.q} className="group border-b border-line">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="type-subheading text-[1.15rem] md:text-[1.3rem]">{item.q}</h3>
            <ChevronDown aria-hidden="true" className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <p className="type-body max-w-3xl pb-6 text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
