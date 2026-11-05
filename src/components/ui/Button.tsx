import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";
import { getLocale } from "@/i18n/server";
import { localizePath } from "@/i18n/config";
import { base, Content, sizes, variants, type CommonProps } from "./ButtonBase";

export { Button } from "./ButtonBase";

/** Link com aparência de botão. Caminhos internos recebem o prefixo do idioma atual. */
export async function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  arrow = true,
  className,
  children,
  ...rest
}: CommonProps & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link
      href={typeof href === "string" ? localizePath(await getLocale(), href) : href}
      data-magnetic={variant === "primary" || variant === "secondary" ? "" : undefined}
      className={cn(base, variants[variant], variant !== "link" && sizes[size], className)}
      {...rest}
    >
      <Content arrow={arrow}>{children}</Content>
    </Link>
  );
}

