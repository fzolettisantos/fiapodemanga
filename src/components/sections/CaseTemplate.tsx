import Image from "next/image";
import type { ReactNode } from "react";
import type { Project } from "@/types/content";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { getI18n } from "@/i18n/server";
import { cn } from "@/lib/utils/cn";
import { CaseVideo } from "./CaseVideo";

function CaseSection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
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
 * Página de case: abertura → capa → Contexto, Desafio, Objetivo, Pesquisa, Hipóteses, Solução
 * → recursos/etapas lado a lado com as telas → Resultados (somente comprovados) → Aprendizados.
 * Seções sem conteúdo não aparecem.
 */
export async function CaseTemplate({ project }: { project: Project }) {
  const { t } = await getI18n();
  const L = t.ui.projects.sections;
  const P = t.ui.projects;

  const narrative = [
    { title: L.context, items: project.context },
    { title: L.problem, items: project.problem },
    { title: L.objective, items: project.objective },
    { title: L.research, items: project.research },
    { title: L.hypotheses, items: project.hypotheses },
    { title: L.solution, items: project.solution },
  ].filter((s) => s.items.length > 0);

  const relatedServices = project.services
    .map((slug) => t.services.find((s) => s.slug === slug))
    .filter((s) => s !== undefined);

  // Quando há uma tela para cada etapa, elas aparecem lado a lado com o texto.
  const paired = project.process.length > 0 && project.images.length >= project.process.length;
  const extraImages = paired ? project.images.slice(project.process.length) : project.images;

  return (
    <>
      <header className="container-site pt-12 pb-14 md:pt-20 md:pb-20">
        <p className="eyebrow">{project.segment}</p>
        <h1 className="type-display mt-6 max-w-6xl">{project.name}</h1>
        <p className="type-lead mt-8 max-w-3xl">{project.summary}</p>
        <dl className="mt-12 grid gap-6 border-t border-line pt-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="font-mono text-xs tracking-[0.06em] text-muted uppercase">{P.segment}</dt>
            <dd className="mt-2 text-text">{project.segment}</dd>
          </div>
          {project.scope ? (
            <div>
              <dt className="font-mono text-xs tracking-[0.06em] text-muted uppercase">{P.scope}</dt>
              <dd className="mt-2">
                <span className="inline-flex min-h-8 items-center rounded-full border border-line-strong px-3 py-1 text-[0.85rem] leading-tight text-text">{project.scope}</span>
              </dd>
            </div>
          ) : null}
          {project.client ? (
            <div>
              <dt className="font-mono text-xs tracking-[0.06em] text-muted uppercase">{P.client}</dt>
              <dd className="mt-2 text-text">{project.client}</dd>
            </div>
          ) : null}
          {project.year ? (
            <div>
              <dt className="font-mono text-xs tracking-[0.06em] text-muted uppercase">{P.year}</dt>
              <dd className="mt-2 text-text">{project.year}</dd>
            </div>
          ) : null}
          {relatedServices.length ? (
            <div className="lg:col-span-2">
              <dt className="font-mono text-xs tracking-[0.06em] text-muted uppercase">{P.specialties}</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-2">
                  {relatedServices.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/servicos/${s.slug}`} className="inline-flex min-h-8 items-center rounded-full border border-line-strong px-3 py-1 text-[0.85rem] leading-tight text-text transition-colors hover:border-accent hover:text-accent focus-visible:border-accent">
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

      {project.video ? (
        <div className="container-site">
          <CaseVideo
            {...project.video}
            label={project.video.label ?? project.name}
            pauseLabel={P.videoPause}
            playLabel={P.videoPlay}
          />
        </div>
      ) : project.cover ? (
        <div className="container-site">
          <div className="overflow-hidden rounded-sm">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              sizes="(min-width: 1536px) 1408px, 100vw"
              quality={85}
              priority
              className="aspect-[4/3] h-auto w-full object-cover md:aspect-[16/9]"
            />
          </div>
        </div>
      ) : null}

      <div className="container-site py-10">
        {narrative.map((block, i) => (
          <CaseSection key={block.title} number={String(i + 1).padStart(2, "0")} title={block.title}>
            <Paragraphs items={block.items} />
          </CaseSection>
        ))}
      </div>

      {project.process.length ? (
        <section aria-labelledby="case-process-title" className="case-features border-t border-line">
          <div className="container-site py-16 md:py-24">
            <p className="eyebrow">{project.name}</p>
            <h2 id="case-process-title" className="type-title mt-6 max-w-4xl">
              {project.processTitle ?? L.process}
            </h2>

            {paired ? (
              <ol className="mt-16 space-y-20 md:mt-24 md:space-y-28">
                {project.process.map((step, i) => {
                  const img = project.images[i]!;
                  const reverse = i % 2 === 1;
                  return (
                    <li key={step.title} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12" data-reveal>
                      <figure
                        className={cn(
                          "case-shot lg:col-span-7",
                          project.shotTone === "warm" && "case-shot--warm",
                          reverse && "lg:order-2 lg:col-start-6",
                        )}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          width={img.width}
                          height={img.height}
                          sizes="(min-width: 1024px) 56vw, 100vw"
                          quality={90}
                          className={cn(
                            img.height > img.width * 1.2
                              ? "mx-auto h-auto max-h-[min(44rem,80vh)] w-auto max-w-full"
                              : "h-auto w-full",
                          )}
                        />
                        {img.caption ? <figcaption className="sr-only">{img.caption}</figcaption> : null}
                      </figure>
                      <div className={cn("lg:col-span-5", reverse && "lg:order-1 lg:col-start-1 lg:row-start-1")}>
                        <p className="index-number text-sm">{String(i + 1).padStart(2, "0")}/</p>
                        <h3 className="type-heading mt-4">{step.title}</h3>
                        <p className="type-lead mt-6 text-muted">{step.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            ) : (
              <ol className="mt-14 border-t border-line">
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
            )}
          </div>
        </section>
      ) : null}

      <div className="container-site">
        {project.results.length ? (
          <CaseSection number={String(narrative.length + 1).padStart(2, "0")} title={L.results}>
            <dl className="grid gap-px border-t border-line sm:grid-cols-2">
              {project.results.map((r) => (
                <div key={r.label} className="border-b border-line py-6 sm:pr-6">
                  <dt className="eyebrow">{r.label}</dt>
                  {r.value ? <dd className="type-title mt-3 text-accent">{r.value}</dd> : null}
                  <dd className="type-body mt-2 text-muted">{r.description}</dd>
                </div>
              ))}
            </dl>
          </CaseSection>
        ) : null}
        {project.learnings.length ? (
          <CaseSection number={String(narrative.length + 2).padStart(2, "0")} title={L.learnings}>
            <Paragraphs items={project.learnings} />
          </CaseSection>
        ) : null}

        {extraImages.length ? (
          <section aria-label={P.images} className="grid gap-8 border-t border-line py-14 md:grid-cols-2">
            {extraImages.map((img) => (
              <figure key={img.src} className="case-shot md:even:mt-24">
                <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full" />
                {img.caption ? <figcaption className="mt-3 text-sm text-muted">{img.caption}</figcaption> : null}
              </figure>
            ))}
          </section>
        ) : null}
      </div>
    </>
  );
}
