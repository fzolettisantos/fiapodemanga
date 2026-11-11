import { getAdmin } from "@/lib/admin/auth";
import { getRepo } from "@/lib/admin/repo";
import { reportRows, type ReportFilter } from "@/lib/admin/report";
import { toCsv } from "@/lib/admin/util";

export const dynamic = "force-dynamic";

/** Planilha do relatório de cobranças (CSV com ";", abre no Excel). */
export async function GET(request: Request) {
  const admin = await getAdmin();
  if (!admin) return new Response("Não autorizado", { status: 401 });
  const url = new URL(request.url);
  const month = /^\d{4}-\d{2}$/.test(url.searchParams.get("mes") ?? "") ? url.searchParams.get("mes")! : "";
  const situation = (url.searchParams.get("situacao") ?? "all") as ReportFilter["situation"];
  const repo = getRepo();
  const [payments, clients] = await Promise.all([repo.listPayments(), repo.listClients()]);
  const rows = reportRows(payments, clients, { month, situation });
  const money = (n: number) => n.toFixed(2).replace(".", ",");
  const csv = toCsv([
    ["Cliente", "Documento", "E-mail", "Serviço", "Vencimento", "Valor (R$)", "Situação", "Dias de atraso", "Pago em", "Forma", "Transação", "Observação"],
    ...rows.map(({ payment: p, client: c, late, situation: label }) => [
      c?.name, c?.document, c?.email, c?.siteType, p.dueDate, money(p.amount), label, late, p.paidAt?.slice(0, 10), p.method, p.providerId, p.note,
    ]),
  ]);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="cobrancas-${month || "todas"}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
