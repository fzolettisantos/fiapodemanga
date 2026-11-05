import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/** Estilos e botão simples (seguro para Client Components). */
export type Variant = "primary" | "secondary" | "outline" | "link";
export type Size = "md" | "lg";

export const base =
  "group inline-flex items-center justify-center gap-2 font-medium tracking-[-0.01em] transition-[background-color,color,transform,border-color,translate] duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-60";

export const variants: Record<Variant, string> = {
  primary:
    "rounded-full border bg-[var(--color-btn-primary-bg)] text-[var(--color-btn-primary-fg)] border-[var(--color-btn-primary-border)] hover:bg-brand-yellow hover:border-brand-yellow active:scale-[0.98]",
  secondary:
    "rounded-full border bg-[var(--color-btn-secondary-bg)] text-[var(--color-btn-secondary-fg)] border-[var(--color-btn-secondary-bg)] hover:bg-accent-fill hover:border-accent-fill active:scale-[0.98]",
  outline:
    "rounded-full border border-line-strong text-heading hover:border-accent hover:text-accent active:scale-[0.98]",
  link: "text-accent link-underline px-0 py-1",
};

export const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-[0.95rem]",
  lg: "min-h-14 px-7 text-base md:text-lg",
};

export type CommonProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

export function Content({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {arrow ? (
        <ArrowUpRight
          aria-hidden="true"
          className="size-[1.1em] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.75}
        />
      ) : null}
    </>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  ...rest
}: CommonProps & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={cn(base, variants[variant], variant !== "link" && sizes[size], className)} {...rest}>
      <Content arrow={arrow}>{children}</Content>
    </button>
  );
}
