import type { Metadata } from "next";
import { getI18n } from "@/i18n/server";
import { localizeShowcase, showcase } from "@/content/projects/showcase";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectList } from "@/components/sections/ProjectList";
import { ContactCta } from "@/components/sections/ContactCta";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return buildMetadata({ locale, ...t.meta.projects, path: "/projetos", ogAlt: t.site.ogAlt });
}

export default async function ProjectsPage() {
  const { t, href } = await getI18n();
  const c = t.projectsPage;

  return (
    <>
      <Breadcrumbs items={[{ name: t.nav.items[2]!.label, path: "/projetos" }]} />
      <PageHero eyebrow={c.eyebrow} title={c.title} paragraphs={c.paragraphs} />

      <section aria-labelledby="vitrine-title" className="section-highlight border-t border-line bg-bg">
        <div className="container-site py-16 md:py-24">
          <h2 id="vitrine-title" className="eyebrow mb-10 md:mb-14">
            {t.ui.projects.selected}
          </h2>
          <ProjectList
            projects={localizeShowcase(showcase, t.showcase, href)}
            label={t.ui.projects.list}
            viewCase={t.ui.projects.viewCase}
          />
        </div>
      </section>


      <section aria-labelledby="narrativa-title" className="border-t border-line">
        <div className="container-site py-20 md:py-28">
          <p className="eyebrow">{t.ui.projects.narrativeEyebrow}</p>
          <h2 id="narrativa-title" className="type-heading mt-6 max-w-3xl">
            {t.home.cases.title}
          </h2>
          <ol className="mt-14 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {t.ui.projects.narrative.map((item, i) => (
              <li key={item.title} className="border-b border-line py-8 sm:pr-8" data-reveal>
                <p className="index-number text-sm">{String(i + 1).padStart(2, "0")}/</p>
                <h3 className="type-subheading mt-4">{item.title}</h3>
                <p className="type-body mt-3 text-muted">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
