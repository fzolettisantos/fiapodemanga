import type { Metadata } from "next";
import { siteConfig, whatsappHref } from "@/config/site";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { projectTypes } from "@/content/contact";
import { getI18n } from "@/i18n/server";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return buildMetadata({ locale, ...t.meta.contact, path: "/contato", ogAlt: t.site.ogAlt });
}

export default async function ContactPage() {
  const { locale, t, href } = await getI18n();
  const c = t.contactPage;

  return (
    <>
      <Breadcrumbs items={[{ name: c.eyebrow, path: "/contato" }]} />
      <div className="container-site grid gap-16 pt-10 pb-24 md:pt-16 md:pb-32 lg:grid-cols-12 lg:gap-12">
        <section aria-labelledby="page-title" className="lg:col-span-5">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 id="page-title" className="type-title mt-8">
            {c.title}
          </h1>
          <div className="mt-10 space-y-5">
            {c.paragraphs.map((p) => (
              <p key={p} className="type-lead">
                {p}
              </p>
            ))}
          </div>
          {whatsappHref(t.ui.whatsapp.message) ? (
            <div className="mt-10">
              <p className="mb-4 text-[0.98rem]">{t.ui.whatsapp.orChat}</p>
              <WhatsAppButton label={t.ui.whatsapp.label} message={t.ui.whatsapp.message} variant="primary" />
            </div>
          ) : null}
          {siteConfig.contactEmail ? (
            <p className="mt-10 text-[0.98rem]">
              {t.ui.contact.orWrite}{" "}
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-accent underline underline-offset-4">
                {siteConfig.contactEmail}
              </a>
              .
            </p>
          ) : null}
        </section>

        <section aria-label={t.ui.contact.formRegion} className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <ContactForm
            locale={locale}
            labels={t.form}
            messages={t.validation}
            projectTypes={projectTypes.map((p) => ({ value: p.value, label: t.projectTypes[p.value] }))}
            privacyHref={href("/politica-de-privacidade")}
          />
        </section>
      </div>
    </>
  );
}
