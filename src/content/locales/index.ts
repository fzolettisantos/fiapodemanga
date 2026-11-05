import type { Locale } from "@/i18n/config";
import type { SiteContent } from "./types";
import { pt } from "./pt";
import { en } from "./en";
import { es } from "./es";

export const content: Record<Locale, SiteContent> = { pt, en, es };
export type { SiteContent };
