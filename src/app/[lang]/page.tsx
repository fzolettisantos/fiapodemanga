import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { getI18n } from "@/i18n/server";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ProjectSlider } from "@/components/sections/ProjectSlider";
import { localizeShowcase, showcase } from "@/content/projects/showcase";
import { ContactCta } from "@/components/sections/ContactCta";
import { HeroMascot } from "@/components/brand/HeroMascot";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { WordReveal } from "@/components/motion/WordReveal";
import { ScrollFillText } from "@/components/motion/ScrollFillText";
import { Marquee } from "@/components/motion/Marquee";
import { ViewTransition } from "react";
import { buildMetadata } from "@/lib/seo/metadata";
import { listedServices } from "@/content/services";
import { homeFaqs } from "@/content/faq";
import { niches } from "@/content/niches";
import { FaqList } from "@/components/sections/FaqList";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { getPublishedArticles } from "@/lib/articles/public";

// Artigos novos aparecem na Home sem precisar de novo deploy.
export const revalidate = 600;

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
  const { locale, t, href } = await getI18n();
  const c = t.home;
  const isPt = locale === "pt";
  const latest = isPt ? (await getPublishedArticles()).slice(0, 3) : [];
  const services = listedServices(locale, t.services);
  const marqueeItems =
    locale === "pt" ? [...new Set(services.flatMap((s) => s.skills))].slice(0, 12) : services.map((s) => s.name);

  return (
    <>
      {/* HERO */}
      <section aria-labelledby="hero-title" className="hero hero--scene relative isolate">
        {/* No computador o hero fica fixo por um trecho da rolagem enquanto a Luli monta o site */}
        <div className="hero-stage relative isolate overflow-hidden">
        <HeroBackdrop />
        <div className="container-site grid w-full items-center gap-12 pt-16 pb-20 md:pt-24 md:pb-28 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="eyebrow">{c.hero.eyebrow}</p>
            <WordReveal
              id="hero-title"
              className={
                c.hero.title.length > 48
                  ? "type-display type-display--long mt-8 max-w-[18ch] md:mt-10"
                  : "type-display mt-8 max-w-[14ch] md:mt-10"
              }
              parts={splitAccent(c.hero.title)}
            />
            <div className="hero-enter mt-10 max-w-xl md:mt-12">
              <p className="type-lead">{c.hero.description}</p>
              <div className="mt-10 flex flex-wrap items-start gap-3">
                <ButtonLink href={c.hero.primaryCta.href} variant="primary" size="lg">
                  {c.hero.primaryCta.label}
                </ButtonLink>
                <ButtonLink href={c.hero.secondaryCta.href} variant="secondary" size="lg">
                  {c.hero.secondaryCta.label}
                </ButtonLink>
                <WhatsAppButton label={t.ui.whatsapp.label} message={t.ui.whatsapp.message} size="lg" />
              </div>
            </div>
          </div>
          <div className="hero-mascot-col lg:col-span-5">
            <HeroMascot
              label={t.ui.mascot.label}
              next={t.ui.mascot.next}
              phrases={t.ui.mascot.phrases}
              scene={t.ui.mascot.scene}
              live={t.ui.mascot.live}
            />
          </div>
        </div>
        </div>
      </section>

      <div className="bg-[#E1FF00]">
        <Marquee
          label={t.ui.marquee.specialties}
          items={marqueeItems}
          className="marquee--highlight type-heading py-8 md:py-10"
        />
      </div>

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
            projects={localizeShowcase(showcase, t.showcase, href)}
            labels={{ ...t.ui.slider, viewCase: t.ui.projects.viewCase }}
            className="mt-16 md:mt-24"
          />
        </div>
      </section>

      {isPt ? (
        <section aria-labelledby="nichos-title" className="border-t border-line">
          <div className="container-site py-20 md:py-28">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <SectionHeading
                eyebrow="Para qualquer negócio"
                title="Site para o seu tipo de negócio."
                id="nichos-title"
                size="title"
                className="lg:col-span-7"
              />
              <p className="type-body self-end lg:col-span-5">
                Salão, loja, consultório, restaurante, escritório ou qualquer outro negócio: cada um precisa mostrar coisas diferentes. Veja o que o site do seu tem que ter.
              </p>
            </div>
            <ul className="mt-12 flex flex-wrap gap-2">
              {niches.slice(0, 14).map((n) => (
                <li key={n.slug}>
                  <Link
                    href={`/site-para/${n.slug}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-5 text-[0.98rem] transition-colors hover:border-accent hover:text-accent"
                  >
                    Site para {n.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/site-para"
                  className="inline-flex min-h-11 items-center rounded-full border border-accent px-5 text-[0.98rem] font-medium text-heading transition-colors hover:bg-accent-fill hover:text-ink"
                >
                  E muito mais: ver todos os tipos
                </Link>
              </li>
            </ul>
            <p className="type-body mt-8 max-w-2xl text-muted">
              Não achou o seu? A gente cria para qualquer negócio.{" "}
              <Link href="/contato" className="link-underline text-accent">
                Conte o que você faz
              </Link>
              .
            </p>
          </div>
        </section>
      ) : null}

      {isPt ? (
        <section aria-labelledby="faq-home-title" className="border-t border-line">
          <JsonLd data={faqJsonLd(homeFaqs)} />
          <div className="container-site grid gap-12 py-20 md:py-28 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="Perguntas frequentes" title="Antes de começar." id="faq-home-title" size="title" />
              <div className="mt-8">
                <ButtonLink href="/perguntas-frequentes" variant="outline">
                  Ver todas as perguntas
                </ButtonLink>
              </div>
            </div>
            <div className="lg:col-span-8">
              <FaqList items={homeFaqs} headingId="faq-home-title" />
            </div>
          </div>
        </section>
      ) : null}

      {latest.length ? (
        <section aria-labelledby="blog-title" className="border-t border-line">
          <div className="container-site py-20 md:py-28">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading eyebrow="Blog" title="Dicas para o seu negócio." id="blog-title" size="title" />
              <ButtonLink href="/insights" variant="outline">
                Ver todos os artigos
              </ButtonLink>
            </div>
            <div className="mt-12 grid gap-x-12 md:grid-cols-3">
              {latest.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ContactCta />
    </>
  );
}
