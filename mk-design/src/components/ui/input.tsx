import * as React from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-input border border-neutral-mid bg-surface px-4 text-base text-brand-ink placeholder:text-text-secondary transition-colors duration-150 disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-60 aria-[invalid=true]:border-error aria-[invalid=true]:border-2";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => (
    <input ref={ref} type={type} className={cn(control, "h-12", className)} {...props} />
  ),
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(control, "min-h-28 py-3", className)} {...props} />
  ),
);
Textarea.displayName = "Textarea";
