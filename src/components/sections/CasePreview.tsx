import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";

/** Linha editorial de case para listagens. */
export function CasePreview({ project, index }: { project: Project; index: number }) {
  return (
    <li className="border-b border-line" data-reveal>
      <Link
        href={`/projetos/${project.slug}`}
        className="group grid gap-6 py-10 md:grid-cols-12 md:items-center md:gap-10 md:py-14"
      >
        <span className="index-number text-sm md:col-span-1">{String(index + 1).padStart(2, "0")}/</span>
        <div className="md:col-span-6">
          <p className="eyebrow text-muted">{project.segment}</p>
          <h3 className="type-heading mt-3 transition-colors group-hover:text-accent">{project.name}</h3>
          <p className="type-body mt-4 max-w-xl text-muted">{project.summary}</p>
        </div>
        <div className="md:col-span-5">
          {project.cover ? (
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
          ) : (
            <ArrowUpRight aria-hidden="true" className="ml-auto size-10 text-accent" strokeWidth={1.25} />
          )}
        </div>
      </Link>
    </li>
  );
}
