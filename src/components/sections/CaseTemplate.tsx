import Image from "next/image";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { getI18n } from "@/i18n/server";
import type { Project } from "@/types/content";

type SectionProps = { number: string; title: string; children: React.ReactNode };

function CaseSection({ number, title, children }: SectionProps) {
  return (
    <section className="grid gap-6 border-t border-line py-14 md:py-20 lg:grid-cols-12 lg:gap-12" data-reveal>
      <div className="lg:col-span-4">
        <p className="index-number text-sm">{number}/</p>
        <h2 className="type-subheading mt-3">{title}</h2>
      </div>
      <div className="space-y-5 lg:col-span-8">{children}</div>
    </section>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <>
      {items.map((p) => (
        <p key={p} className="type-lead">
          {p}
        </p>
      ))}
    </>
  );
}

/**
 * Template de case: narrativa Contexto → Problema → Objetivo → Pesquisa →
 * Hipóteses → Processo → Solução → Resultados → Aprendizados → Imagens.
 * Seções sem conteúdo não são exibidas.
 */
export async function CaseTemplate({ project }: { project: Project }) {
  const { t } = await getI18n();
  const L = t.ui.projects.sections;
  const textSections: { title: string; items: string[] }[] = [
    { title: L.context, items: project.context },
    { title: L.problem, items: project.problem },
    { title: L.objective, items: project.objective },
    { title: L.research, items: project.research },
    { title: L.hypotheses, items: project.hypotheses },
  ];

  const blocks: { title: string; node: React.ReactNode }[] = [
    ...textSections
      .filter((s) => s.items.length > 0)
      .map((s) => ({ title: s.title, node: <Paragraphs items={s.items} /> })),
  ];

  if (project.process.length) {
    blocks.push({
      title: L.process,
      node: (
        <ol className="border-t border-line">
          {project.process.map((step, i) => (
            <li key={step.title} className="grid gap-2 border-b border-line py-6 md:grid-cols-[4rem_1fr]">
              <span className="index-number text-sm">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-lg font-medium text-heading">{step.title}</h3>
                <p className="type-body mt-2 text-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      ),
    });
  }
  if (project.solution.length) blocks.push({ title: L.solution, node: <Paragraphs items={project.solution} /> });
  if (project.results.length) {
    blocks.push({
      title: L.results,
      node: (
        <dl className="grid gap-px border-t border-line sm:grid-cols-2">
          {project.results.map((r) => (
            <div key={r.label} className="border-b border-line py-6 sm:pr-6">
              <dt className="eyebrow">{r.label}</dt>
              {r.value ? <dd className="type-title mt-3 text-accent">{r.value}</dd> : null}
              <dd className="type-body mt-2 text-muted">{r.description}</dd>
            </div>
          ))}
        </dl>
      ),
    });
  }
  if (project.learnings.length) blocks.push({ title: L.learnings, node: <Paragraphs items={project.learnings} /> });

  const relatedServices = project.services.map((slug) => t.services.find((s) => s.slug === slug)).filter((s) => s !== undefined);

  return (
    <>
      <header className="container-site pt-12 pb-16 md:pt-20 md:pb-24">
        <p className="eyebrow">{project.segment}</p>
        <h1 className="type-display mt-6 max-w-6xl">{project.name}</h1>
        <p className="type-lead mt-8 max-w-3xl">{project.summary}</p>
        <dl className="mt-12 grid gap-6 border-t border-line pt-8 text-sm sm:grid-cols-3">
          {project.client ? (
            <div>
              <dt className="eyebrow text-muted">{t.ui.projects.client}</dt>
              <dd className="mt-2 text-text">{project.client}</dd>
            </div>
          ) : null}
          {project.year ? (
            <div>
              <dt className="eyebrow text-muted">{t.ui.projects.year}</dt>
              <dd className="mt-2 text-text">{project.year}</dd>
            </div>
          ) : null}
          {relatedServices.length ? (
            <div>
              <dt className="eyebrow text-muted">{t.ui.projects.specialties}</dt>
              <dd className="mt-2">
                <ul className="space-y-1">
                  {relatedServices.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/servicos/${s.slug}`} className="link-underline text-text">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ) : null}
        </dl>
      </header>

      {project.cover ? (
        <div className="container-site">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(min-width: 1536px) 1408px, 100vw"
            priority
            className="h-auto w-full"
          />
        </div>
      ) : null}

      <div className="container-site py-8">
        {blocks.map((block, i) => (
          <CaseSection key={block.title} number={String(i + 1).padStart(2, "0")} title={block.title}>
            {block.node}
          </CaseSection>
        ))}

        {project.images.length ? (
          <section aria-label={t.ui.projects.images} className="grid gap-8 border-t border-line py-14 md:grid-cols-2">
            {project.images.map((img) => (
              <figure key={img.src} className="md:even:mt-24">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="h-auto w-full"
                />
                {img.caption ? <figcaption className="mt-3 text-sm text-muted">{img.caption}</figcaption> : null}
              </figure>
            ))}
          </section>
        ) : null}
      </div>
    </>
  );
}
