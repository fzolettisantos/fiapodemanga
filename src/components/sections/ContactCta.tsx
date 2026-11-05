import { ButtonLink } from "@/components/ui/Button";
import { FiberLine } from "@/components/brand/FiberLine";

type ContactCtaProps = {
  eyebrow: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
};

/** Chamada final para contato, reutilizada em várias páginas. */
export function ContactCta({ eyebrow, title, description, cta }: ContactCtaProps) {
  return (
    <section aria-labelledby="cta-contato-title" className="relative overflow-hidden border-t border-line">
      <div className="container-site py-20 md:py-32">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id="cta-contato-title" className="type-display mt-8 max-w-[16ch]" data-reveal>
          {title}
        </h2>
        <FiberLine variant="b" className="mt-12 w-full md:mt-16" />
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <p className="type-lead max-w-xl lg:col-span-6 lg:col-start-6">{description}</p>
          <div className="lg:col-span-6 lg:col-start-6">
            <ButtonLink href={cta.href} variant="primary" size="lg">
              {cta.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
