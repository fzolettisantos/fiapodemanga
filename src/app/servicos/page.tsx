import type { Metadata } from "next";
import { practices, services } from "@/content/services";
import { servicesPageContent as c } from "@/content/pages";
import { homeContent } from "@/content/home";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceBlock } from "@/components/sections/ServiceBlock";
import { ServiceTags } from "@/components/sections/ServiceTags";
import { ContactCta } from "@/components/sections/ContactCta";
import { buildMetadata } from "@/lib/seo/metadata";
import { ScrollFillText } from "@/components/motion/ScrollFillText";
import { Marquee } from "@/components/motion/Marquee";

export const metadata: Metadata = buildMetadata({
  title: "O que fazemos — Pesquisa, Product Design, UX/UI e Sites",
  description:
    "Consultoria e estúdio de produtos digitais: pesquisa UX, estratégia de produto, Product Design, UX/UI, criação de sites, aplicativos, sistemas, e-commerce e IA aplicada ao design.",
  path: "/servicos",
});

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Início", path: "/" },
          { name: "O que fazemos", path: "/servicos" },
        ]}
      />
      <PageHero eyebrow={c.intro.eyebrow} title={c.intro.title} paragraphs={c.intro.paragraphs} />

      <Marquee
        label="Competências"
        items={[...new Set(services.flatMap((s) => s.skills))].slice(0, 18)}
        duration={70}
        reverse
        className="type-subheading border-t border-line py-6 text-muted"
      />

      {/* COMO ATUAMOS */}
      <section aria-labelledby="como-atuamos-title" className="border-t border-line">
        <div className="container-site py-20 md:py-28">
          <p className="eyebrow">Como atuamos</p>
          <h2 id="como-atuamos-title" className="type-title mt-8 max-w-4xl">
            {c.practicesTitle}
          </h2>
          <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-2 lg:gap-12">
            {practices.map((practice) => (
              <article key={practice.number} className="border-t border-line pt-8" data-reveal>
                <p className="index-number text-sm">{practice.number}/</p>
                <h3 className="type-heading mt-4">{practice.title}</h3>
                <p className="type-body mt-6 max-w-xl">{practice.description}</p>
                <ServiceTags items={practice.items} label="Atuação" className="mt-10" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ESPECIALIDADES */}
      <section aria-labelledby="especialidades-title" className="border-t border-line">
        <div className="container-site pt-20 md:pt-28">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow">{homeContent.services.eyebrow}</p>
              <h2 id="especialidades-title" className="type-title mt-8">
                {homeContent.services.title}
              </h2>
            </div>
            <nav aria-label="Especialidades nesta página" className="self-end lg:col-span-4">
              <ol className="space-y-1 text-[0.95rem]">
                {services.map((s) => (
                  <li key={s.slug}>
                    <a href={`#${s.slug}`} className="inline-flex min-h-9 items-center gap-3 hover:text-accent">
                      <span className="index-number text-xs">{s.number}/</span>
                      {s.name}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
        <div className="container-site mt-16 md:mt-24">
          {services.map((service) => (
            <ServiceBlock key={service.slug} service={service} />
          ))}
        </div>
      </section>

      {/* DESTAQUE FINAL DE IA */}
      <section aria-labelledby="ia-destaque-title" className="border-t border-line bg-surface">
        <div className="container-site grid gap-12 py-20 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow">{c.aiHighlight.eyebrow}</p>
            <h2 id="ia-destaque-title" className="type-title mt-8">
              {c.aiHighlight.title}
            </h2>
          </div>
          <div className="space-y-5 lg:col-span-5 lg:col-start-8 lg:pt-20">
            {c.aiHighlight.paragraphs.map((p) => (
              <p key={p} className="type-body">
                {p}
              </p>
            ))}
          </div>
          <ScrollFillText text={c.aiHighlight.highlight} tone="accent-2" className="callout text-accent-2 lg:col-span-10" />
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
