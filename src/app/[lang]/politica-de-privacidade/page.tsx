import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { format, getI18n } from "@/i18n/server";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return buildMetadata({ locale, ...t.meta.privacy, path: "/politica-de-privacidade", ogAlt: t.site.ogAlt });
}

export default async function PrivacyPage() {
  const { t } = await getI18n();
  const c = t.privacy;
  const controller = siteConfig.legalName || siteConfig.name;
  const contact = siteConfig.contactEmail;
  const [emailBefore = "", emailAfter = ""] = c.contactWithEmail.split("{email}");

  return (
    <>
      <Breadcrumbs items={[{ name: c.title, path: "/politica-de-privacidade" }]} />
      <article className="container-site pt-10 pb-24 md:pt-16 md:pb-32">
        <header className="max-w-5xl">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 className="type-title mt-8">{c.title}</h1>
          <p className="mt-8 font-mono text-xs tracking-[0.04em] text-muted uppercase">
            {c.updatedLabel}: {c.updated}
          </p>
        </header>

        <div className="prose-fm type-body mt-16 max-w-[44rem] text-lg lg:ml-[calc(100%/12*5)]">
          <p>{format(c.intro, { controller })}</p>

          {c.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {section.list ? (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {section.after?.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
          ))}

          <h2>{c.contactTitle}</h2>
          {contact ? (
            <p>
              {emailBefore}
              <a href={`mailto:${contact}`}>{contact}</a>
              {emailAfter}
            </p>
          ) : (
            <p>
              {c.contactWithForm.before} <Link href="/contato">{c.contactWithForm.link}</Link>
              {c.contactWithForm.after}
            </p>
          )}

          <h2>{c.changesTitle}</h2>
          <p>{c.changes}</p>
        </div>
      </article>
    </>
  );
}
