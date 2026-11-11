import type { Metadata } from "next";
import { getI18n } from "@/i18n/server";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceBlock } from "@/components/sections/ServiceBlock";
import { ServicesNav } from "@/components/navigation/ServicesNav";
import { ServiceTags } from "@/components/sections/ServiceTags";
import { ContactCta } from "@/components/sections/ContactCta";
import { ScrollFillText } from "@/components/motion/ScrollFillText";
import { Marquee } from "@/components/motion/Marquee";
import { buildMetadata } from "@/lib/seo/metadata";
import { listedServices } from "@/content/services";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return buildMetadata({ locale, ...t.meta.services, path: "/servicos", ogAlt: t.site.ogAlt });
}

export default async function ServicesPage() {
  const { locale, t } = await getI18n();
  const c = t.servicesPage;
  const services = listedServices(locale, t.services);
  // Em português o foco é sites e lojas virtuais: sem a lista de competências de design e sem as frentes de atuação.
  const simple = locale === "pt";

  return (
    <>
      <Breadcrumbs items={[{ name: t.nav.items[1]!.label, path: "/servicos" }]} />
      <PageHero eyebrow={c.intro.eyebrow} title={c.intro.title} paragraphs={c.intro.paragraphs} />

      {simple ? null : (
      <Marquee
        label={t.ui.marquee.skills}
        items={[...new Set(services.flatMap((s) => s.skills))].slice(0, 18)}
        duration={70}
        reverse
        className="type-subheading border-t border-line py-6 text-muted"
      />
      )}

      {/* COMO ATUAMOS */}
      {simple ? null : (
      <section aria-labelledby="como-atuamos-title" className="border-t border-line">
        <div className="container-site py-20 md:py-28">
          <p className="eyebrow">{t.ui.servicesPage.practicesEyebrow}</p>
          <h2 id="como-atuamos-title" className="type-title mt-8 max-w-4xl">
            {c.practicesTitle}
          </h2>
          <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-2 lg:gap-12">
            {t.practices.map((practice) => (
              <article key={practice.number} className="border-t border-line pt-8" data-reveal>
                <p className="index-number text-sm">{practice.number}/</p>
                <h3 className="type-heading mt-4">{practice.title}</h3>
                <p className="type-body mt-6 max-w-xl">{practice.description}</p>
                <ServiceTags items={practice.items} label={t.ui.servicesPage.practicesItems} className="mt-10" />
              </article>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ESPECIALIDADES */}
      <section aria-labelledby="especialidades-title" className="border-t border-line">
        <div className="container-site pt-20 md:pt-28">
          <div className="max-w-4xl">
            <p className="eyebrow">{t.home.services.eyebrow}</p>
            <h2 id="especialidades-title" className="type-title mt-8">
              {t.home.services.title}
            </h2>
          </div>
        </div>
        <div className="container-site mt-16 grid gap-10 pb-12 md:mt-24 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <ServicesNav
              label={t.ui.servicesPage.specialtiesNav}
              items={services.map((s) => ({ slug: s.slug, name: s.name, number: s.number }))}
            />
          </aside>
          <div className="lg:col-span-9">
            {services.map((service) => (
              <ServiceBlock key={service.slug} service={service} total={services.length} />
            ))}
          </div>
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
          <ScrollFillText
            text={c.aiHighlight.highlight}
            tone="accent-2"
            className="callout text-accent-2 lg:col-span-10"
          />
        </div>
      </section>

      <ContactCta />
    </>
  );
}
