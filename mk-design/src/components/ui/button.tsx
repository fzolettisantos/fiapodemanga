import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-12 min-w-11 items-center justify-center gap-2 rounded-button px-6 font-body text-base font-semibold transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Texto escuro sobre amarelo — nunca branco (guia §3)
        primary: "bg-brand-primary text-brand-ink hover:bg-brand-primary-hover",
        dark: "bg-brand-ink text-surface hover:bg-brand-ink/85",
        outline: "border border-brand-ink bg-transparent text-brand-ink hover:bg-surface-muted",
        ghost: "bg-transparent text-brand-ink hover:bg-surface-muted",
      },
      size: { md: "min-h-12", sm: "min-h-11 px-4 text-sm", icon: "size-11 px-0" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {loading && <Loader2 className="animate-spin" aria-hidden="true" />}
            {children}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";
