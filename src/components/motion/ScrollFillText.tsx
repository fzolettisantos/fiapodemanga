import type { CSSProperties, ElementType } from "react";
import { cn } from "@/lib/utils/cn";

type ScrollFillTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** "accent" (verde) ou "accent-2" (amarelo) */
  tone?: "accent" | "accent-2";
  id?: string;
};

/**
 * Frase que "acende" palavra por palavra conforme a rolagem
 * (CSS scroll-driven animations, com view-timeline nomeada).
 * Sem suporte do navegador ou com reduced-motion, o texto aparece na cor final.
 * A cor inicial mantém contraste ≥ 3:1 (texto grande), então a frase fica legível em todos os momentos.
 */
export function ScrollFillText({ text, as: Tag = "p", className, tone = "accent", id }: ScrollFillTextProps) {
  const words = text.trim().split(/\s+/);
  return (
    <Tag
      id={id}
      className={cn("scroll-fill", tone === "accent-2" && "scroll-fill--yellow", className)}
      style={{ "--count": words.length } as CSSProperties}
    >
      {words.map((word, i) => (
        <span key={i}>
          <span className="scroll-fill__word" style={{ "--i": i } as CSSProperties}>
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
