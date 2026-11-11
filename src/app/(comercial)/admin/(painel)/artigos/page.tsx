import Link from "next/link";
import { getRepo } from "@/lib/admin/repo";
import { articleCategoryInfo } from "@/lib/articles/categories";
import { Badge, dateBR, Empty, PageTitle, Table, td } from "@/components/admin/ui";

export const metadata = { title: "Artigos" };

export default async function ArticlesPage() {
  const articles = await getRepo().listArticles();
  const now = new Date();
  return (
    <>
      <PageTitle eyebrow="Admin" title="Artigos">
        <Link href="/admin/artigos/novo" className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-btn-primary-border)] bg-[var(--color-btn-primary-bg)] px-5 font-medium text-[var(--color-btn-primary-fg)]">
          Novo artigo
        </Link>
      </PageTitle>
      {articles.length === 0 ? (
        <Empty>Nenhum artigo ainda. Comece pelo primeiro.</Empty>
      ) : (
        <Table head={["Título", "Categoria", "Situação", "Publicação", "Atualizado"]} caption="Artigos">
          {articles.map((a) => {
            const scheduled = a.status === "published" && a.publishedAt && new Date(a.publishedAt) > now;
            return (
              <tr key={a.id}>
                <td className={td}>
                  <Link href={`/admin/artigos/${a.id}`} className="link-underline font-medium text-heading">{a.title}</Link>
                  <span className="block text-xs text-muted">/insights/{a.slug}</span>
                </td>
                <td className={td}>{articleCategoryInfo[a.category]?.name ?? a.category}</td>
                <td className={td}>
                  <Badge tone={a.status === "published" ? (scheduled ? "warn" : "ok") : "muted"}>{a.status === "published" ? (scheduled ? "Agendado" : "No ar") : "Rascunho"}</Badge>
                </td>
                <td className={td}>{a.status === "published" ? dateBR(a.publishedAt) : "—"}</td>
                <td className={td}>{dateBR(a.updatedAt)}</td>
              </tr>
            );
          })}
        </Table>
      )}
    </>
  );
}
