import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getProjectsSorted } from "@/content/projects";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { CaseTemplate } from "@/components/sections/CaseTemplate";
import { ContactCta } from "@/components/sections/ContactCta";
import { ButtonLink } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo/metadata";
import { caseJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/ui/JsonLd";
import { localizePath } from "@/i18n/config";
import { getI18n } from "@/i18n/server";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getProjectsSorted().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getI18n();
  const project = getProject(slug, locale);
  if (!project) return {};
  return buildMetadata({
    locale,
    title: project.seo.title,
    description: project.seo.description,
    path: `/projetos/${project.slug}`,
    type: "article",
    publishedTime: project.publishedAt,
    image: project.cover
      ? { url: project.cover.src, width: project.cover.width, height: project.cover.height, alt: project.cover.alt }
      : undefined,
  });
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const { locale, t } = await getI18n();
  const project = getProject(slug, locale);
  if (!project) notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { name: t.nav.items[2]!.label, path: "/projetos" },
          { name: project.name, path: `/projetos/${project.slug}` },
        ]}
      />
      <JsonLd
        data={caseJsonLd({
          name: project.name,
          description: project.seo.description,
          path: localizePath(locale, `/projetos/${project.slug}`),
          image: project.cover?.src,
          publishedAt: project.publishedAt,
          locale,
        })}
      />
      <CaseTemplate project={project} />
      <div className="container-site pb-16">
        <ButtonLink href="/projetos" variant="link">
          {t.ui.projects.viewAll}
        </ButtonLink>
      </div>
      <ContactCta />
    </>
  );
}
