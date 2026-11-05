import Link from "next/link";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo/jsonld";

/** Trilha de navegação visível + BreadcrumbList (JSON-LD). Inclua "Início" no primeiro item. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <nav aria-label="Trilha de navegação" className="container-site pt-8 md:pt-10">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs tracking-[0.04em] text-muted uppercase">
          {items.map((item, index) => {
            const last = index === items.length - 1;
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
      <JsonLd data={breadcrumbJsonLd(items)} />
    </>
  );
}
