import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getI18n } from "@/i18n/server";
import { getNiche, niches } from "@/content/niches";
import { generalFaqs } from "@/content/faq";
import { getSiteType, includedInAllPlans, plans } from "@/lib/proposals/catalog";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { FaqList } from "@/components/sections/FaqList";
import { ContactCta } from "@/components/sections/ContactCta";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { brazilServiceJsonLd, faqJsonLd } from "@/lib/seo/jsonld";
import { localizePath } from "@/i18n/config";

type Params = { nicho: string };

export function generateStaticParams(): Params[] {
  return niches.map((n) => ({ nicho: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { nicho } = await params;
  const { locale } = await getI18n();
  const niche = getNiche(nicho);
  if (!niche || locale !== "pt") return {};
  return buildMetadata({ locale, title: niche.title, description: niche.description, path: `/site-para/${niche.slug}` });
}

export default async function NichePage({ params }: { params: Promise<Params> }) {
  const { nicho } = await params;
  const { locale, t } = await getI18n();
  const niche = getNiche(nicho);
  if (!niche || locale !== "pt") notFound();

  const type = getSiteType(niche.siteTypeId)!;
  const plan = plans[type.plan];
  // 3 perguntas do segmento + 2 gerais (prazo e domínio) que todo cliente faz
  const faqs = [...niche.faqs, generalFaqs[0]!, generalFaqs[1]!];
  const others = niches.filter((n) => n.slug !== niche.slug).slice(0, 6);
  const path = localizePath(locale, `/site-para/${niche.slug}`);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Sites para cada negócio", path: "/site-para" },
          { name: `Site para ${niche.name}`, path: `/site-para/${niche.slug}` },
        ]}
      />
      <JsonLd
        data={[
          brazilServiceJsonLd({ name: niche.h1, description: niche.description, path, serviceType: "Criação de sites" }),
          faqJsonLd(faqs),
        ]}
      />
      <PageHero eyebrow={`Site para ${niche.name}`} title={niche.h1} paragraphs={niche.intro} />

      <section aria-labelledby="precisa-title" className="border-t border-line">
        <div className="container-site py-16 md:py-24">
          <h2 id="precisa-title" className="type-title max-w-4xl">
            O que o site do seu {niche.name} precisa ter
          </h2>
          <ul className="mt-14 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {niche.features.map((f, i) => (
              <li key={f.title} className="border-b border-line py-8 sm:pr-8" data-reveal>
                <p className="index-number text-sm">{String(i + 1).padStart(2, "0")}/</p>
                <h3 className="type-subheading mt-4">{f.title}</h3>
                <p className="type-body mt-3 text-muted">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="achar-title" className="border-t border-line bg-surface">
        <div className="container-site grid gap-10 py-16 md:py-24 lg:grid-cols-12">
          <h2 id="achar-title" className="type-heading lg:col-span-5">
            Como os clientes encontram o seu {niche.name}
          </h2>
          <p className="type-lead lg:col-span-6 lg:col-start-7">{niche.discovery}</p>
        </div>
      </section>

      <section aria-labelledby="formato-title" className="border-t border-line">
        <div className="container-site grid gap-12 py-16 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow">Formato indicado · plano {plan.name}</p>
            <h2 id="formato-title" className="type-title mt-6">
              {type.name}
            </h2>
            <p className="type-lead mt-8">{niche.format}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={`/contato?tipo=${niche.contactType}`} variant="primary" size="lg">
                Pedir uma proposta
              </ButtonLink>
              <WhatsAppButton label={t.ui.whatsapp.label} message={`Olá! Quero um site para ${niche.name}.`} size="lg" />
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h3 className="eyebrow">O que vem no formato</h3>
            <ul className="mt-5 border-t border-line">
              {[...type.features, ...includedInAllPlans].map((item) => (
                <li key={item} className="flex gap-4 border-b border-line py-3">
                  <span aria-hidden="true" className="text-accent">
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="border-t border-line">
        <div className="container-site py-16 md:py-24">
          <h2 id="faq-title" className="type-title max-w-4xl">
            Perguntas frequentes
          </h2>
          <div className="mt-12 max-w-4xl">
            <FaqList items={faqs} headingId="faq-title" />
          </div>
          <p className="mt-8">
            <Link href="/perguntas-frequentes" className="link-underline text-accent">
              Ver todas as perguntas
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="outros-title" className="border-t border-line">
        <div className="container-site py-16">
          <h2 id="outros-title" className="eyebrow">
            Sites para outros negócios
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {others.map((n) => (
              <li key={n.slug}>
                <Link
                  href={`/site-para/${n.slug}`}
                  className="inline-flex min-h-10 items-center rounded-full border border-line-strong px-4 text-[0.95rem] transition-colors hover:border-accent hover:text-accent"
                >
                  Site para {n.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/site-para" className="inline-flex min-h-10 items-center px-2 text-[0.95rem] text-accent link-underline">
                Ver todos
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
