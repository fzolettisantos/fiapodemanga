import type { Client, Payment } from "./types";
import { daysLate, paymentStatusLabel, today } from "./util";

export type ReportFilter = { month?: string; situation?: "all" | "paid" | "open" | "late" };

export type ReportRow = {
  payment: Payment;
  client: Client | undefined;
  late: number;
  situation: string;
};

/** Linhas do relatório de cobranças (filtradas por mês de vencimento e situação). */
export function reportRows(payments: Payment[], clients: Client[], filter: ReportFilter, ref = today()): ReportRow[] {
  const byId = new Map(clients.map((c) => [c.id, c]));
  return payments
    .filter((p) => !filter.month || p.dueDate.startsWith(filter.month))
    .map((p) => {
      const late = daysLate(p, ref);
      const situation = late > 0 ? `Atrasada há ${late} ${late === 1 ? "dia" : "dias"}` : paymentStatusLabel[p.status];
      return { payment: p, client: byId.get(p.clientId), late, situation };
    })
    .filter((r) => {
      const f = filter.situation ?? "all";
      if (f === "paid") return r.payment.status === "paid";
      if (f === "late") return r.late > 0;
      if (f === "open") return r.payment.status === "open";
      return true;
    })
    .sort((a, b) => b.payment.dueDate.localeCompare(a.payment.dueDate));
}

export function reportTotals(rows: ReportRow[]) {
  const sum = (list: ReportRow[]) => list.reduce((s, r) => s + r.payment.amount, 0);
  const paid = rows.filter((r) => r.payment.status === "paid");
  const late = rows.filter((r) => r.late > 0);
  const open = rows.filter((r) => r.payment.status === "open" && r.late === 0);
  return { paid: sum(paid), late: sum(late), open: sum(open), count: rows.length };
}
