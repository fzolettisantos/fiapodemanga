import type { Service } from "@/types/content";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceTags } from "./ServiceTags";
import { format, getI18n } from "@/i18n/server";

/** Grande bloco editorial de especialidade (página O que fazemos). */
export async function ServiceBlock({ service }: { service: Service }) {
  const { t } = await getI18n();
  const headingId = `especialidade-${service.slug}`;
  return (
    <article
      aria-labelledby={headingId}
      id={service.slug}
      className="scroll-mt-28 border-t border-line py-16 md:py-24"
      data-reveal
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <p className="index-number text-sm">{service.number}/</p>
          <h3 id={headingId} className="type-subheading mt-3">
            {service.name}
          </h3>
        </div>

        <div className="lg:col-span-8">
          <p className="type-heading">{service.headline}</p>
          <div className="mt-8 grid gap-10 xl:grid-cols-2">
            <div className="space-y-4">
              {service.description.map((paragraph) => (
                <p key={paragraph} className="type-body">
                  {paragraph}
                </p>
              ))}
            </div>
            <ServiceTags items={service.skills} label={t.ui.servicesPage.skillsLabel} />
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
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
