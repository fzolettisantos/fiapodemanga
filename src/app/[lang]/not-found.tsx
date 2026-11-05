import type { Metadata } from "next";
import { getI18n } from "@/i18n/server";
import { ButtonLink } from "@/components/ui/Button";
import { BrandLogo } from "@/components/brand/BrandLogo";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t.meta.notFound.title, robots: { index: false, follow: true } };
}

export default async function NotFound() {
  const { t } = await getI18n();
  const c = t.ui.notFound;
  return (
    <section aria-labelledby="page-title" className="container-site py-24 md:py-40">
      <div className="luli-bob mb-10 w-fit">
        <BrandLogo variant="symbol" height={96} />
      </div>
      <p className="eyebrow">{c.eyebrow}</p>
      <h1 id="page-title" className="type-display mt-8 max-w-[14ch]">
        {c.title}
      </h1>
      <p className="type-lead mt-10 max-w-xl">{c.description}</p>
      <div className="mt-12 flex flex-wrap gap-3">
        <ButtonLink href="/" variant="primary" size="lg">
          {c.home}
        </ButtonLink>
        <ButtonLink href="/servicos" variant="secondary" size="lg">
          {c.services}
        </ButtonLink>
      </div>
    </section>
  );
}
