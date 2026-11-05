import Link from "next/link";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo/jsonld";
import { getI18n } from "@/i18n/server";

/**
 * Trilha de navegação visível + BreadcrumbList (JSON-LD).
 * Informe os caminhos sem prefixo de idioma; o primeiro item ("Início") é adicionado automaticamente.
 */
export async function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { t, href } = await getI18n();
  const all: Crumb[] = [{ name: t.nav.home, path: "/" }, ...items].map((c) => ({ ...c, path: href(c.path) }));

  return (
    <>
      <nav aria-label={t.ui.breadcrumb} className="container-site pt-8 md:pt-10">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs tracking-[0.04em] text-muted uppercase">
          {all.map((item, index) => {
            const last = index === all.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-text">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.path} className="inline-flex min-h-8 items-center hover:text-accent">
                      {item.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}
