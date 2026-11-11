import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/admin/auth";
import { isLiveConfigured } from "@/lib/admin/env";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Entrar no admin" };
export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  if (!isLiveConfigured()) redirect("/admin");
  if (await getAdmin()) redirect("/admin");
  const { erro } = await searchParams;
  return (
    <div className="container-site flex min-h-[60vh] items-center justify-center py-16">
      <div className="w-full max-w-md">
        <p className="eyebrow">Admin</p>
        <h1 className="type-heading mt-4">Entrar</h1>
        <p className="mt-4 text-muted">Você recebe um link por e-mail para entrar, sem senha.</p>
        {erro ? (
          <p role="alert" className="mt-4 text-sm text-danger">
            O link expirou ou não é válido. Peça um novo.
          </p>
        ) : null}
        <LoginForm />
      </div>
    </div>
  );
}
