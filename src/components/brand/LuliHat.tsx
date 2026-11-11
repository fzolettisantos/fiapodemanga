import { cn } from "@/lib/utils/cn";

/**
 * Capacete de obra da Luli (vetor próprio, no mesmo traço grosso da ilustração).
 * Fica sobre a arte da Luli usando o MESMO viewBox do SVG dela, para encaixar na cabeça:
 *  - luli-mascote.svg ............ "451 209 613 613"
 *  - vamos-conversar-sentada.svg . "318 53 901 901"
 * Decorativo (aria-hidden).
 */
export function LuliHat({ viewBox, className }: { viewBox: string; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={viewBox}
      className={cn("pointer-events-none absolute inset-0 h-full w-full overflow-visible", className)}
    >
      <g className="luli-hat" style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}>
        <g transform="rotate(-7 760 300)">
          {/* aba */}
          <rect x="650" y="282" width="230" height="30" rx="15" className="luli-hat__shell" strokeWidth="11" />
          {/* casco */}
          <path d="M682 290 C682 214 718 178 765 178 C812 178 848 214 848 290 Z" className="luli-hat__shell" strokeWidth="11" strokeLinejoin="round" />
          {/* faixa central */}
          <rect x="748" y="176" width="34" height="112" rx="12" className="luli-hat__ridge" strokeWidth="9" />
          {/* brilho */}
          <path d="M700 262 C702 230 716 210 734 200" fill="none" stroke="#ffffff" strokeWidth="9" strokeLinecap="round" opacity="0.9" />
        </g>
      </g>
    </svg>
  );
}
