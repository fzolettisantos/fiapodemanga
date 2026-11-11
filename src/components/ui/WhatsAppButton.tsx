import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import { base, sizes, variants, type Size, type Variant } from "./ButtonBase";

/**
 * Botão "Chamar no WhatsApp" com mensagem pronta.
 * Só aparece quando NEXT_PUBLIC_WHATSAPP_NUMBER está configurado — sem número, nada é exibido.
 */
export function WhatsAppButton({
  label,
  message,
  variant = "outline",
  size = "md",
  className,
}: {
  label: string;
  message: string;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const href = whatsappHref(message);
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener" className={cn(base, variants[variant], sizes[size], className)}>
      <MessageCircle aria-hidden="true" className="size-[1.1em]" strokeWidth={1.75} />
      <span>{label}</span>
    </a>
  );
}
