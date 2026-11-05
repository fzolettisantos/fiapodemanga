import { cn } from "@/lib/utils/cn";

/**
 * Elemento gráfico autoral: um "fiapo" — traço orgânico contínuo.
 * Decorativo (aria-hidden). A animação de traçado respeita reduced-motion.
 */
export function FiberLine({ className, variant = "a" }: { className?: string; variant?: "a" | "b" }) {
  const d =
    variant === "a"
      ? "M2 118 C 120 30, 210 168, 330 92 S 520 8, 640 74 S 820 170, 918 58 C 960 18, 1010 30, 1038 64"
      : "M2 40 C 140 96, 260 -6, 400 52 S 640 120, 760 46 S 940 10, 1038 88";
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1040 180"
      fill="none"
      preserveAspectRatio="none"
      className={cn("pointer-events-none block h-auto w-full text-accent", className)}
    >
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        className="fiber-path"
      />
    </svg>
  );
}
