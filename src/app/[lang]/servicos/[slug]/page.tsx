import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { ViewTransition } from "react";
import { services as baseServices } from "@/content/services";
import { format, getI18n } from "@/i18n/server";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ServiceTags } from "@/components/sections/ServiceTags";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ContactCta } from "@/components/sections/ContactCta";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { WordReveal } from "@/components/motion/WordReveal";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceJsonLd } from "@/lib/seo/jsonld";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return baseServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const { locale, t } = await getI18n();
  const service = t.services.find((s) => s.slug === slug);
  if (!service) return {};
  return buildMetadata({
    locale,
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    path: `/servicos/${service.slug}`,
    ogAlt: t.site.ogAlt,
  });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const { locale, t } = await getI18n();
  const services = t.services;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const L = t.ui.serviceDetail;
  const related = service.page.related
    .map((r) => services.find((s) => s.slug === r))
    .filter((s) => s !== undefined);
  const index = services.findIndex((s) => s.slug === service.slug);
  const next = services[(index + 1) % services.length]!;

  return (
    <>
      <Breadcrumbs
        items={[
          { name: t.nav.items[1]!.label, path: "/servicos" },
          { name: service.name, path: `/servicos/${service.slug}` },
        ]}
      />
      <JsonLd data={serviceJsonLd(service, locale)} />

      <section aria-labelledby="page-title" className="container-site pt-10 pb-16 md:pt-16 md:pb-24">
        <p className="eyebrow flex items-baseline gap-2">
          <span>{service.number}/</span>
          <ViewTransition name={`servico-${service.slug}`} share="morph" default="none">
            <span className="inline-block">{service.name}</span>
          </ViewTransition>
        </p>
        <WordReveal id="page-title" className="type-title mt-8 max-w-6xl" parts={service.page.h1} delay={150} />
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <p className="type-heading text-accent lg:col-span-5">{service.headline}</p>
          <div className="space-y-5 lg:col-span-6 lg:col-start-7">
            {service.description.map((p) => (
              <p key={p} className="type-lead">
                {p}
              </p>
            ))}
            <div className="flex flex-wrap gap-3 pt-6">
              <ButtonLink href={service.cta?.href ?? "/contato"} variant="primary" size="lg">
                {service.cta?.label ?? L.ctaDefault}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="competencias-title" className="border-t border-line">
        <div className="container-site grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <h2 id="competencias-title" className="type-heading lg:col-span-4">
            {L.skills}
          </h2>
          <ServiceTags items={service.skills} className="lg:col-span-8" />
        </div>
      </section>

      <section aria-labelledby="quando-title" className="border-t border-line">
        <div className="container-site grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <h2 id="quando-title" className="type-heading lg:col-span-4">
            {L.whenItHelps}
          </h2>
          <ol className="border-t border-line lg:col-span-8">
            {service.page.whenItHelps.map((item, i) => (
              <li key={item} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-6" data-reveal>
                <span className="index-number pt-1 text-sm">{String(i + 1).padStart(2, "0")}/</span>
                <p className="type-lead">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="entregas-title" className="border-t border-line bg-surface">
        <div className="container-site grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="entregas-title" className="type-heading">
              {L.deliverables}
            </h2>
            <p className="type-body mt-6 text-muted">{L.deliverablesNote}</p>
          </div>
          <ul className="border-t border-line lg:col-span-8">
            {service.page.deliverables.map((item) => (
              <li key={item} className="flex items-center gap-4 border-b border-line py-5 text-[1.05rem]">
                <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="processo-title" className="border-t border-line">
        <div className="container-site py-20 md:py-28">
          <p className="eyebrow">{t.home.process.eyebrow}</p>
          <h2 id="processo-title" className="type-heading mt-6 max-w-3xl">
            {t.home.process.title}
          </h2>
          <div className="mt-14">
            <ProcessSteps steps={t.home.process.steps} />
          </div>
        </div>
      </section>

      <section aria-labelledby="relacionadas-title" className="border-t border-line">
        <div className="container-site py-20 md:py-28">
          <h2 id="relacionadas-title" className="type-heading">
            {L.related}
          </h2>
          <ul className="mt-12 border-t border-line">
            {related.map((s) => (
              <li key={s.slug} className="border-b border-line">
                <Link
                  href={`/servicos/${s.slug}`}
                  className="sweep-row group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-6"
                >
                  <span className="index-number text-sm">{s.number}/</span>
                  <span className="sweep-shift type-subheading transition-colors group-hover:text-accent">{s.name}</span>
                  <ArrowUpRight aria-hidden="true" className="sweep-arrow size-6 text-accent" strokeWidth={1.5} />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            <ButtonLink href="/servicos" variant="link">
              {L.all}
            </ButtonLink>
            <ButtonLink href={`/servicos/${next.slug}`} variant="link">
              {format(L.next, { name: next.name })}
            </ButtonLink>
          </div>
        </div>
      </section>

      <ContactCta ctaHref={service.cta?.href} />
    </>
  );
}
