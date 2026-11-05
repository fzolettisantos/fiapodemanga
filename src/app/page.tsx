import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { homeContent as c } from "@/content/home";
import { services } from "@/content/services";
import { getProjectsSorted } from "@/content/projects";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CasePreview } from "@/components/sections/CasePreview";
import { ContactCta } from "@/components/sections/ContactCta";
import { FiberLine } from "@/components/brand/FiberLine";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Fiapo de Manga — Consultoria de Design, Pesquisa e UX/UI",
  absoluteTitle: true,
  description:
    "Consultoria de design e UX/UI que une pesquisa, estratégia de produto e tecnologia para criar sites, aplicativos, sistemas e produtos digitais que fazem sentido.",
  path: "/",
  keywords: ["consultoria de design", "UX/UI", "Product Design", "pesquisa UX", "criação de sites"],
});

export default function HomePage() {
  const projects = getProjectsSorted().slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <div className="container-site pt-16 pb-20 md:pt-28 md:pb-32">
          <p className="eyebrow">{c.hero.eyebrow}</p>
          <h1 id="hero-title" className="type-display mt-8 max-w-[14ch] md:mt-10">
            Boas experiências começam com <span className="text-accent">boas perguntas.</span>
          </h1>

          <FiberLine className="mt-12 -mr-[10vw] w-[110%] max-w-none md:mt-16" />

          <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12">
            <p className="type-lead max-w-xl lg:col-span-6 lg:col-start-6">{c.hero.description}</p>
            <div className="flex flex-wrap items-start gap-3 lg:col-span-6 lg:col-start-6">
              <ButtonLink href={c.hero.primaryCta.href} variant="primary" size="lg">
                {c.hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={c.hero.secondaryCta.href} variant="secondary" size="lg">
                {c.hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section aria-labelledby="sobre-title" className="border-t border-line">
        <div className="container-site grid gap-10 py-20 md:py-32 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <p className="eyebrow lg:sticky lg:top-28">{c.about.eyebrow}</p>
          </div>
          <div className="lg:col-span-9" data-reveal>
            <h2 id="sobre-title" className="type-title">
              {c.about.title}
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-10">
              {c.about.paragraphs.map((p) => (
                <p key={p} className="type-body">
                  {p}
                </p>
              ))}
            </div>
            <p className="callout mt-14 max-w-3xl border-l-2 border-accent pl-6 md:mt-20 md:pl-8">
              {c.about.highlight}
            </p>
            <div className="mt-12">
              <ButtonLink href={c.about.cta.href} variant="outline">
                {c.about.cta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* O QUE FAZEMOS */}
      <section aria-labelledby="especialidades-title" className="border-t border-line">
        <div className="container-site py-20 md:py-32">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <SectionHeading
              eyebrow={c.services.eyebrow}
              title={c.services.title}
              id="especialidades-title"
              size="title"
              className="lg:col-span-8"
            />
            <div className="space-y-4 self-end lg:col-span-4">
              {c.services.paragraphs.map((p) => (
                <p key={p} className="type-body">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <ol className="mt-16 border-t border-line md:mt-24">
            {services.map((service) => (
              <li key={service.slug} className="border-b border-line">
                <Link
                  href={`/servicos/${service.slug}`}
                  className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 md:grid-cols-[5rem_1fr_1fr_auto] md:gap-8 md:py-8"
                >
                  <span className="index-number text-sm">{service.number}/</span>
                  <span className="type-subheading transition-colors duration-200 group-hover:text-accent">
                    {service.name}
                  </span>
                  <span className="hidden text-[0.98rem] text-muted md:block">{service.headline}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-6 text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    strokeWidth={1.5}
                  />
                </Link>
              </li>
            ))}
          </ol>

          <div className="mt-12">
            <ButtonLink href={c.services.cta.href} variant="primary">
              {c.services.cta.label}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* COMO TRABALHAMOS */}
      <section aria-labelledby="abordagem-title" className="border-t border-line">
        <div className="container-site py-20 md:py-32">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <SectionHeading
              eyebrow={c.process.eyebrow}
              title={c.process.title}
              id="abordagem-title"
              size="title"
              className="lg:col-span-7"
            />
            <div className="space-y-4 self-end lg:col-span-5">
              {c.process.paragraphs.map((p) => (
                <p key={p} className="type-body">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-16 md:mt-24">
            <ProcessSteps steps={c.process.steps} />
          </div>
          <p className="callout mt-16 max-w-3xl md:mt-24 lg:ml-[calc(100%/12*5)]" data-reveal>
            {c.process.highlight}
          </p>
        </div>
      </section>

      {/* INTELIGÊNCIA ARTIFICIAL */}
      <section aria-labelledby="ia-title" className="border-t border-line bg-surface">
        <div className="container-site py-20 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <SectionHeading eyebrow={c.ai.eyebrow} title={c.ai.title} id="ia-title" size="title" />
              <div className="mt-10 max-w-2xl space-y-5">
                {c.ai.paragraphs.map((p) => (
                  <p key={p} className="type-body">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 lg:pt-24" data-reveal>
              <h3 className="eyebrow mb-5">Aplicações</h3>
              <ul className="border-t border-line">
                {c.ai.applications.map((item, i) => (
                  <li key={item} className="flex gap-4 border-b border-line py-4 text-[1.02rem]">
                    <span className="index-number pt-0.5 text-xs">{String(i + 1).padStart(2, "0")}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="callout mt-16 max-w-4xl text-accent-2 md:mt-24" data-reveal>
            {c.ai.highlight}
          </p>
          <div className="mt-10">
            <ButtonLink href="/servicos/design-tecnologia-ia" variant="link">
              Design, Tecnologia e IA
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section aria-labelledby="cases-title" className="border-t border-line">
        <div className="container-site py-20 md:py-32">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <SectionHeading
              eyebrow={c.cases.eyebrow}
              title={c.cases.title}
              id="cases-title"
              size="title"
              className="lg:col-span-7"
            />
            <div className="self-end lg:col-span-5">
              <p className="type-body">{c.cases.description}</p>
              <div className="mt-8">
                <ButtonLink href={c.cases.cta.href} variant="outline">
                  {c.cases.cta.label}
                </ButtonLink>
              </div>
            </div>
          </div>
          {projects.length > 0 ? (
            <ol className="mt-16 border-t border-line">
              {projects.map((project, index) => (
                <CasePreview key={project.slug} project={project} index={index} />
              ))}
            </ol>
          ) : null}
        </div>
      </section>

      <ContactCta
        eyebrow={c.contact.eyebrow}
        title={c.contact.title}
        description={c.contact.description}
        cta={c.contact.cta}
      />
    </>
  );
}
