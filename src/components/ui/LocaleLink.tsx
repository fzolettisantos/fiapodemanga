import Link from "next/link";
import type { ComponentProps } from "react";
import { getLocale } from "@/i18n/server";
import { localizePath } from "@/i18n/config";

/** next/link que prefixa automaticamente os caminhos internos com o idioma atual. */
export async function LocaleLink({ href, ...rest }: ComponentProps<typeof Link>) {
  const locale = await getLocale();
  const target = typeof href === "string" ? localizePath(locale, href) : href;
  return <Link href={target} {...rest} />;
}
