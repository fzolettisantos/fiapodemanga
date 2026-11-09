import { formatNumber } from "@/papo-reto/lib/ranking";
import type { BalaShot } from "@/papo-reto/types";

export const shotsTotal = (shots: BalaShot[]) => shots.reduce((total, s) => total + s.quantity, 0);
export const shotsLabel = (n: number) => `${formatNumber(n)} ${n === 1 ? "tiro" : "tiros"}`;

/** Tabela de tiros do Bala do Véio no box de cada participante (cabe em 360px, sem rolagem lateral). */
export function ShotsTable({ shots, name }: { shots: BalaShot[]; name: string }) {
  const total = shotsTotal(shots);
  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-line">
      <table className="w-full table-fixed text-left text-[13px]">
        <caption className="sr-only">Tiros em {name}</caption>
        <thead className="bg-surface-2 text-[11px] font-extrabold uppercase tracking-wide text-muted">
          <tr>
            <th scope="col" className="w-[22%] px-2.5 py-2">Tiros</th>
            <th scope="col" className="px-2.5 py-2">Local do tiro</th>
            <th scope="col" className="px-2.5 py-2">Tipo de arma</th>
          </tr>
        </thead>
        <tbody>
          {shots.length === 0 ? (
            <tr className="border-t border-line">
              <td colSpan={3} className="px-2.5 py-2.5 text-muted">Nenhum tiro registrado. Por enquanto.</td>
            </tr>
          ) : (
            shots.map((shot) => (
              <tr key={shot.id} className="border-t border-line align-top">
                <td className="px-2.5 py-2 font-display text-[17px] leading-none tabular text-yellow">{formatNumber(shot.quantity)}</td>
                <td className="break-words px-2.5 py-2 font-semibold">{shot.location}</td>
                <td className="break-words px-2.5 py-2 text-muted">{shot.weapon}</td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot className="border-t-2 border-line bg-surface-2">
          <tr>
            <th scope="row" colSpan={2} className="px-2.5 py-2 text-[11px] font-extrabold uppercase tracking-wide text-muted">
              Total de tiros
            </th>
            <td className="px-2.5 py-2 text-right font-display text-xl leading-none tabular text-white">{formatNumber(total)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
