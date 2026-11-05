import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  paragraphs?: readonly string[];
  children?: ReactNode;
};

/** Abertura padrão das páginas internas (H1 único da página). */
export function PageHero({ eyebrow, title, paragraphs = [], children }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="container-site pt-10 pb-16 md:pt-16 md:pb-28">
      <p className="eyebrow">{eyebrow}</p>
      <h1 id="page-title" className="type-title mt-8 max-w-6xl">
        {title}
      </h1>
      {paragraphs.length || children ? (
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-7 lg:col-start-6">
            {paragraphs.map((p) => (
              <p key={p} className="type-lead">
                {p}
              </p>
            ))}
            {children}
          </div>
        </div>
      ) : null}
    </section>
  );
}
