import Image from "next/image";
import type { ShowcaseProject } from "@/content/projects/showcase";
import { cn } from "@/lib/utils/cn";

/**
 * Lista editorial de projetos (página /projetos): um projeto embaixo do outro,
 * imagem grande e legenda ao lado, alternando os lados para criar ritmo.
 */
export function ProjectList({ projects, label }: { projects: ShowcaseProject[]; label: string }) {
  return (
    <ol aria-label={label} className="project-list space-y-20 md:space-y-28">
      {projects.map((project, i) => {
        const reverse = i % 2 === 1;
        return (
          <li key={project.slug} data-reveal>
            <figure className="project-list__item grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
              <div
                className={cn(
                  "project-slide__media overflow-hidden rounded-sm lg:col-span-7",
                  reverse && "lg:order-2 lg:col-start-6",
                )}
              >
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  height={project.image.height}
                  quality={85}
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="aspect-[800/784] h-auto w-full object-cover lg:aspect-[5/4]"
                />
              </div>
              <figcaption
                className={cn(
                  "border-t border-line pt-6 lg:col-span-5 lg:pb-2",
                  reverse && "lg:order-1 lg:col-start-1 lg:row-start-1",
                )}
              >
                <p className="index-number text-sm">{String(i + 1).padStart(2, "0")}/</p>
                <h3 className="type-heading mt-4">{project.title}</h3>
                <p className="mt-4 font-mono text-xs tracking-[0.06em] text-muted uppercase">
                  {project.client ? `${project.client} · ` : ""}
                  {project.category}
                </p>
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}
