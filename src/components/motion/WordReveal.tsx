import type { CSSProperties, ElementType } from "react";
import { cn } from "@/lib/utils/cn";

type Part = { text: string; accent?: boolean };

type WordRevealProps = {
  /** Texto simples ou trechos (com destaque opcional). */
  parts: string | Part[];
  as?: ElementType;
  id?: string;
  className?: string;
  /** Atraso inicial em ms */
  delay?: number;
};

/**
 * Título que surge palavra por palavra, de baixo para cima, revelado por máscara.
 * Animação 100% CSS ao carregar a página; com reduced-motion o texto aparece direto.
 * Os espaços continuam como nós de texto, então leitores de tela leem a frase normalmente.
 */
export function WordReveal({ parts, as: Tag = "h1", id, className, delay = 0 }: WordRevealProps) {
  const list: Part[] = typeof parts === "string" ? [{ text: parts }] : parts;
  let index = 0;

  return (
    <Tag id={id} className={cn("word-reveal", className)}>
      {list.map((part, p) => {
        const words = part.text.trim().split(/\s+/);
        return (
          <span key={p} className={part.accent ? "text-accent" : undefined}>
            {words.map((word, w) => {
              const i = index++;
              return (
                <span key={w}>
                  <span className="word-reveal__mask">
                    <span
                      className="word-reveal__word"
                      style={{ "--i": i, "--delay": `${delay}ms` } as CSSProperties}
                    >
                      {word}
                    </span>
                  </span>
                  {w < words.length - 1 || p < list.length - 1 ? " " : null}
                </span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
