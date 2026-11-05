import { cn } from "@/lib/utils/cn";

type MarqueeProps = {
  items: readonly string[];
  /** Direção do movimento */
  reverse?: boolean;
  /** Duração de um ciclo em segundos */
  duration?: number;
  className?: string;
  label: string;
};

/**
 * Faixa tipográfica em loop infinito, feita só com CSS.
 * Pausa no hover e no foco; com reduced-motion vira uma lista estática que quebra linha.
 * A cópia duplicada (necessária para o loop) fica oculta para leitores de tela.
 */
export function Marquee({ items, reverse, duration = 40, className, label }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <ul className="marquee__group" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="marquee__item">
          <span>{item}</span>
          <span aria-hidden="true" className="marquee__sep">
            ✳
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      role="region"
      aria-label={label}
      className={cn("marquee", reverse && "marquee--reverse", className)}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
