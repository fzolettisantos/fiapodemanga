import "server-only";
import { demoRepo } from "./demo-repo";
import { isLiveConfigured } from "./env";
import { supabaseRepo } from "./supabase-repo";
import type { AdminRepo } from "./types";

/** Supabase quando configurado; senão, dados de demonstração. */
export function getRepo(): AdminRepo {
  return isLiveConfigured() ? supabaseRepo : demoRepo;
}
