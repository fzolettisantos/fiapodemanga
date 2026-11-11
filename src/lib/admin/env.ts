import "server-only";

/** Configuração da área admin. Sem Supabase, tudo roda em modo demonstração. */
export const adminEnv = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "",
  serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "",
  /** E-mails com acesso ao admin, separados por vírgula */
  adminEmails: (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean),
};

export function isLiveConfigured(): boolean {
  return Boolean(adminEnv.supabaseUrl && adminEnv.anonKey && adminEnv.serviceKey && adminEnv.adminEmails.length);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  return Boolean(email) && adminEnv.adminEmails.includes(email!.trim().toLowerCase());
}
