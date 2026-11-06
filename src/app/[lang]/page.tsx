import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { getI18n } from "@/i18n/server";
import { getProjectsSorted } from "@/content/projects";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CasePreview } from "@/components/sections/CasePreview";
import { ProjectSlider } from "@/components/sections/ProjectSlider";
import { localizeShowcase, showcase } from "@/content/projects/showcase";
import { ContactCta } from "@/components/sections/ContactCta";
import { ConversationBadge } from "@/components/brand/ConversationBadge";
import { FiberLine } from "@/components/brand/FiberLine";
import { WordReveal } from "@/components/motion/WordReveal";
import { ScrollFillText } from "@/components/motion/ScrollFillText";
import { Marquee } from "@/components/motion/Marquee";
import { ViewTransition } from "react";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return buildMetadata({
    locale,
    title: t.meta.home.title,
    absoluteTitle: true,
    description: t.meta.home.description,
    path: "/",
    ogAlt: t.site.ogAlt,
  });
}

/** Separa as duas últimas palavras do título para o destaque ("boas perguntas."). */
function splitAccent(title: string): { text: string; accent?: boolean }[] {
  const words = title.trim().split(/\s+/);
  return [{ text: words.slice(0, -2).join(" ") }, { text: words.slice(-2).join(" "), accent: true }];
}

export default async function HomePage() {
  const { t, href } = await getI18n();
  const c = t.home;
  const services = t.services;
  const projects = getProjectsSorted().slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <div className="container-site pt-16 pb-20 md:pt-28 md:pb-32">
          <p className="eyebrow">{c.hero.eyebrow}</p>
          <WordReveal
            id="hero-title"
            className="type-display mt-8 max-w-[14ch] md:mt-10"
            parts={splitAccent(c.hero.title)}
          />

          <FiberLine className="mt-12 -mr-[10vw] w-[110%] max-w-none md:mt-16" />

          <div className="hero-enter mt-12 grid gap-10 md:mt-16 lg:grid-cols-12">
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

      <div className="bg-[#E1FF00]">
        <Marquee
          label={t.ui.marquee.specialties}
          items={services.map((s) => s.name)}
          className="marquee--highlight type-heading py-8 md:py-10"
        />
      </div>

      {/* SOBRE */}
      <section aria-labelledby="sobre-title" className="border-t border-line">
        <div className="container-site grid gap-10 py-20 md:py-32 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">{c.about.eyebrow}</p>
              <ConversationBadge
                src="/brand/vamos-conversar-sentada.svg"
                label={t.ui.badgeAria}
                href={href("/contato")}
                className="mt-10 w-full max-w-[18rem] sm:max-w-[21rem] lg:mt-12 lg:max-w-[24rem]"
              />
            </div>
          </div>
          <div className="lg:col-span-8" data-reveal>
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
            <ScrollFillText
              text={c.about.highlight}
              className="callout mt-14 max-w-3xl border-l-2 border-accent pl-6 md:mt-20 md:pl-8"
            />
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
                  className="sweep-row group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 md:grid-cols-[5rem_1fr_1fr_auto] md:gap-8 md:py-8"
                >
                  <span className="index-number text-sm">{service.number}/</span>
                  <span className="sweep-shift">
                    <ViewTransition name={`servico-${service.slug}`} share="morph" default="none">
                      <span className="type-subheading inline-block transition-colors duration-200 group-hover:text-accent">
                        {service.name}
                      </span>
                    </ViewTransition>
                  </span>
                  <span className="hidden text-[0.98rem] text-muted md:block">{service.headline}</span>
                  <ArrowUpRight aria-hidden="true" className="sweep-arrow size-6 text-accent" strokeWidth={1.5} />
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
          <ScrollFillText
            text={c.process.highlight}
            className="callout mt-16 max-w-3xl md:mt-24 lg:ml-[calc(100%/12*5)]"
          />
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
              <h3 className="eyebrow mb-5">{t.ui.home.aiApplications}</h3>
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
          <ScrollFillText text={c.ai.highlight} tone="accent-2" className="callout mt-16 max-w-4xl text-accent-2 md:mt-24" />
          <div className="mt-10">
            <ButtonLink href="/servicos/design-tecnologia-ia" variant="link">
              {t.ui.home.aiLink}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section aria-labelledby="cases-title" className="section-highlight border-t border-line bg-bg">
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
          <ProjectSlider
            projects={localizeShowcase(showcase, t.showcase)}
            labels={t.ui.slider}
            className="mt-16 md:mt-24"
          />
          {projects.length > 0 ? (
            <ol className="mt-16 border-t border-line">
              {projects.map((project, index) => (
                <CasePreview key={project.slug} project={project} index={index} />
              ))}
            </ol>
          ) : null}
        </div>
      </section>

      <ContactCta />
    </>
  );
}
