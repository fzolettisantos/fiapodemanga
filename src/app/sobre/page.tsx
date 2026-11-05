import type { Metadata } from "next";
import { aboutPageContent as c } from "@/content/pages";
import { homeContent } from "@/content/home";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ContactCta } from "@/components/sections/ContactCta";
import { ButtonLink } from "@/components/ui/Button";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { buildMetadata } from "@/lib/seo/metadata";
import { ScrollFillText } from "@/components/motion/ScrollFillText";

export const metadata: Metadata = buildMetadata({
  title: "Sobre nós — Consultoria de design e experiência digital",
  description:
    "Conheça a Fiapo de Manga: uma consultoria que conecta pesquisa, estratégia, design e tecnologia para transformar desafios em produtos e experiências digitais.",
  path: "/sobre",
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Início", path: "/" },
          { name: "Sobre nós", path: "/sobre" },
        ]}
      />
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} paragraphs={c.hero.paragraphs} />

      <section aria-labelledby="visao-title" className="border-t border-line">
        <div className="container-site grid gap-10 py-20 md:py-32 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-between gap-10 lg:col-span-3">
            <p className="eyebrow">{c.vision.eyebrow}</p>
            <div className="luli-tilt hidden w-fit lg:block">
              <BrandLogo variant="symbol" height={120} />
            </div>
          </div>
          <div className="lg:col-span-9" data-reveal>
            <h2 id="visao-title" className="type-title">
              {c.vision.title}
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-10">
              {c.vision.paragraphs.map((p) => (
                <p key={p} className="type-body">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="principios-title" className="border-t border-line">
        <div className="container-site py-20 md:py-32">
          <p className="eyebrow">Princípios</p>
          <h2 id="principios-title" className="sr-only">
            Princípios
          </h2>
          <dl className="mt-12 border-t border-line">
            {c.principles.map((principle, i) => (
              <div
                key={principle.title}
                className="grid gap-3 border-b border-line py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
                data-reveal
              >
                <dt className="flex items-baseline gap-6 md:col-span-6 md:gap-10">
                  <span className="index-number w-10 shrink-0 text-sm">{String(i + 1).padStart(2, "0")}/</span>
                  <span className="type-heading">{principle.title}</span>
                </dt>
                <dd className="type-lead text-muted md:col-span-6">{principle.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="diferenciais-title" className="border-t border-line bg-surface">
        <div className="container-site grid gap-12 py-20 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">O que nos orienta</p>
            <ScrollFillText as="h2" id="diferenciais-title" text={homeContent.about.highlight} className="type-heading mt-6" />
          </div>
          <ul className="border-t border-line lg:col-span-6 lg:col-start-7">
            {c.differentials.map((item) => (
              <li key={item} className="flex items-center gap-4 border-b border-line py-5 text-[1.05rem]">
                <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="abordagem-title" className="border-t border-line">
        <div className="container-site py-20 md:py-32">
          <p className="eyebrow">{homeContent.process.eyebrow}</p>
          <h2 id="abordagem-title" className="type-title mt-8 max-w-4xl">
            {homeContent.process.title}
          </h2>
          <div className="mt-16">
            <ProcessSteps steps={homeContent.process.steps} />
          </div>
          <div className="mt-12">
            <ButtonLink href="/servicos" variant="outline">
              {homeContent.services.cta.label}
            </ButtonLink>
          </div>
        </div>
      </section>

      <ContactCta
        eyebrow={homeContent.contact.eyebrow}
        title={homeContent.contact.title}
        description={homeContent.contact.description}
        cta={homeContent.contact.cta}
      />
    </>
  );
}
