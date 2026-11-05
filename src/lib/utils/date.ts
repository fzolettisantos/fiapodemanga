import { localeInfo, type Locale } from "@/i18n/config";

export function formatDate(iso: string, locale: Locale = "pt"): string {
  return new Intl.DateTimeFormat(localeInfo[locale].intl, {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
