import type { Metadata } from "next";
import { getProjectsSorted } from "@/content/projects";
import { projectsPageContent as c } from "@/content/pages";
import { homeContent } from "@/content/home";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { CasePreview } from "@/components/sections/CasePreview";
import { ContactCta } from "@/components/sections/ContactCta";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Cases — Projetos de pesquisa, UX/UI e produtos digitais",
  description:
    "Projetos da Fiapo de Manga: como pesquisa, estratégia e design se conectam para transformar problemas reais em experiências digitais mais claras e funcionais.",
  path: "/projetos",
});

const narrative = [
  { title: "Contexto", description: "O negócio, o produto e o momento em que o projeto começa." },
  { title: "Problema", description: "O desafio que precisava ser compreendido e resolvido." },
  { title: "Objetivo", description: "O que o projeto buscava alcançar." },
  { title: "Pesquisa", description: "Como investigamos pessoas, dados e contexto." },
  { title: "Hipóteses", description: "O que os aprendizados indicaram como caminhos possíveis." },
  { title: "Processo", description: "As etapas de criação, validação e ajuste." },
  { title: "Solução", description: "O que foi desenhado e construído." },
  { title: "Resultados", description: "Somente resultados comprovados e autorizados para divulgação." },
  { title: "Aprendizados", description: "O que o projeto ensinou para os próximos passos." },
];

export default function ProjectsPage() {
  const projects = getProjectsSorted();

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Início", path: "/" },
          { name: "Cases", path: "/projetos" },
        ]}
      />
      <PageHero eyebrow={c.eyebrow} title={c.title} paragraphs={c.paragraphs} />

      {projects.length > 0 ? (
        <section aria-labelledby="lista-projetos-title" className="border-t border-line">
          <div className="container-site py-16 md:py-24">
            <h2 id="lista-projetos-title" className="sr-only">
              Projetos
            </h2>
            <ol className="border-t border-line">
              {projects.map((project, index) => (
                <CasePreview key={project.slug} project={project} index={index} />
              ))}
            </ol>
          </div>
        </section>
      ) : (
        <section aria-labelledby="em-breve-title" className="border-t border-line">
          <div className="container-site grid gap-10 py-16 md:py-24 lg:grid-cols-12">
            <h2 id="em-breve-title" className="type-heading lg:col-span-5">
              Nenhum case publicado por enquanto.
            </h2>
            <p className="type-lead lg:col-span-6 lg:col-start-7">
              Publicamos apenas projetos reais, com autorização para divulgação. Enquanto isso, conte sobre o seu
              desafio — podemos apresentar nossa forma de trabalho em uma conversa.
            </p>
          </div>
        </section>
      )}

      <section aria-labelledby="narrativa-title" className="border-t border-line">
        <div className="container-site py-20 md:py-28">
          <p className="eyebrow">Como contamos cada projeto</p>
          <h2 id="narrativa-title" className="type-heading mt-6 max-w-3xl">
            {homeContent.cases.title}
          </h2>
          <ol className="mt-14 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {narrative.map((item, i) => (
              <li key={item.title} className="border-b border-line py-8 sm:pr-8" data-reveal>
                <p className="index-number text-sm">{String(i + 1).padStart(2, "0")}/</p>
                <h3 className="type-subheading mt-4">{item.title}</h3>
                <p className="type-body mt-3 text-muted">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ContactCta
        eyebrow={homeContent.contact.eyebrow}
        title={homeContent.contact.title}
        description={homeContent.contact.description}
        cta={homeContent.contact.cta}
      />
    </>
  );
}
