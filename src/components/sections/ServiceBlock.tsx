import type { Service } from "@/types/content";
import { ButtonLink } from "@/components/ui/Button";
import { format, getI18n } from "@/i18n/server";
import { ServiceIllustration } from "./ServiceIllustration";

/**
 * Bloco editorial de especialidade (página O que fazemos):
 * painel com ilustração isométrica + etiqueta, e o texto ao lado.
 */
export async function ServiceBlock({ service, total }: { service: Service; total: number }) {
  const { t } = await getI18n();
  const index = t.services.findIndex((s) => s.slug === service.slug);
  // 01–02 pertencem a "Consultoria e Estratégia"; as demais ao "Estúdio de Produtos Digitais"
  const practice = t.practices[index < 2 ? 0 : 1]?.title ?? "";
  const headingId = `especialidade-${service.slug}`;

  return (
    <article
      aria-labelledby={headingId}
      id={service.slug}
      data-service={service.slug}
      className="svc-card relative scroll-mt-28 border-t border-line py-12 md:py-16"
      data-reveal
    >
      <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] xl:gap-14">
        <div className="svc-panel relative overflow-hidden xl:sticky xl:top-28">
          <ServiceIllustration slug={service.slug} />
          <div className="svc-chip absolute bottom-3 left-3 max-w-[80%] rounded-sm px-3 py-2 md:bottom-6 md:left-6 md:px-4 md:py-3">
            <p className="text-sm leading-tight tracking-[-0.01em] sm:text-lg md:text-xl">
              {format(t.ui.servicesPage.skillsCount, { n: service.skills.length })}
            </p>
            <p className="mt-1 hidden text-xs text-white/75 sm:block">{practice}</p>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs tracking-[0.08em] text-muted uppercase">
            <span className="text-accent">{service.number}</span> / {String(total).padStart(2, "0")} · {practice}
          </p>
          <h3 id={headingId} className="type-heading mt-5">
            {service.name}
          </h3>
          <p className="type-subheading mt-6 text-accent">{service.headline}</p>
          <div className="mt-6 space-y-4">
            {service.description.map((paragraph) => (
              <p key={paragraph} className="type-body text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <h4 className="sr-only">{t.ui.servicesPage.skillsLabel}</h4>
          <ul className="mt-8 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {service.skills.map((skill) => (
              <li key={skill} className="flex gap-3 text-[0.98rem]">
                <span aria-hidden="true" className="text-accent">
                  —
                </span>
                {skill}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-6">
            {service.cta ? (
              <ButtonLink href={service.cta.href} variant="primary">
                {service.cta.label}
              </ButtonLink>
            ) : null}
            <ButtonLink href={`/servicos/${service.slug}`} variant="link">
              {format(t.ui.servicesPage.learnMore, { name: service.name })}
            </ButtonLink>
          </div>
        </div>
      </div>
    </article>
  );
}
