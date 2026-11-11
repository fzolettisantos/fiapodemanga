import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminNav } from "@/components/admin/AdminNav";
import { signOut } from "../actions";

export const metadata: Metadata = { title: { default: "Admin", template: "%s | Admin Fiapo de Manga" } };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  return (
    <div className="container-site py-10 md:py-14">
      {admin.mode === "demo" ? (
        <p role="note" className="mb-8 rounded-sm border-2 border-[#b7791f] px-4 py-3 text-sm">
          <strong className="text-heading">Modo demonstração.</strong> Os dados são fictícios e nada é salvo de verdade.
          Para usar com clientes reais, configure o Supabase (veja <code>docs/admin.md</code>).
        </p>
      ) : null}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <AdminNav />
        <form action={signOut} className="flex items-center gap-4 text-sm text-muted">
          <span>{admin.email}</span>
          <button type="submit" className="link-underline text-heading">
            Sair
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}
