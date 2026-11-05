import { cn } from "@/lib/utils/cn";

export function Eyebrow({ children, className }: { children: string; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}
