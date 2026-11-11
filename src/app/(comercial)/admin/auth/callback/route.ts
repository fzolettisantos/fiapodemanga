import { NextResponse } from "next/server";
import { supabaseAuthClient } from "@/lib/admin/auth";
import { isAdminEmail } from "@/lib/admin/env";

/** Volta do link mágico: troca o código pela sessão e entra no admin. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (code) {
    const supabase = await supabaseAuthClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && isAdminEmail(data.user?.email)) return NextResponse.redirect(new URL("/admin", url.origin));
    await supabase.auth.signOut();
  }
  return NextResponse.redirect(new URL("/admin/entrar?erro=1", url.origin));
}
