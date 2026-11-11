import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { adminEnv, isAdminEmail, isLiveConfigured } from "./env";

export type AdminSession = { mode: "live" | "demo"; email: string };

/** Cliente Supabase com a sessão do navegador (cookies). Só para autenticação. */
export async function supabaseAuthClient() {
  const store = await cookies();
  return createServerClient(adminEnv.supabaseUrl, adminEnv.anonKey, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Em Server Components não dá para gravar cookies; o proxy renova a sessão.
        }
      },
    },
  });
}

/** Quem está acessando o admin (ou null). Em modo demonstração, qualquer um vê os dados fictícios. */
export async function getAdmin(): Promise<AdminSession | null> {
  if (!isLiveConfigured()) return { mode: "demo", email: "demonstração" };
  const supabase = await supabaseAuthClient();
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email;
  return email && isAdminEmail(email) ? { mode: "live", email } : null;
}

export async function requireAdmin(): Promise<AdminSession> {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/entrar");
  return admin;
}
