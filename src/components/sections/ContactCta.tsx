import { ButtonLink } from "@/components/ui/Button";
import { FiberLine } from "@/components/brand/FiberLine";
import { ConversationBadge } from "@/components/brand/ConversationBadge";

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
        <div data-reveal>
          <h2 id="cta-contato-title" className="type-display mt-8 max-w-[16ch]" data-parallax>
            {title}
          </h2>
        </div>
        <FiberLine variant="b" className="fiber-scroll mt-12 w-full md:mt-16" />
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-10 lg:col-span-6 lg:col-start-6 lg:row-start-1">
            <p className="type-lead max-w-xl">{description}</p>
            <ButtonLink href={cta.href} variant="primary" size="lg">
              {cta.label}
            </ButtonLink>
          </div>
          <ConversationBadge className="w-full max-w-[16rem] sm:max-w-[19rem] lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:-mt-16 lg:max-w-[22rem]" />
        </div>
      </div>
    </section>
  );
}
