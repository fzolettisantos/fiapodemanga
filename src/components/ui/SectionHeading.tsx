import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  /** Tag HTML do título — independente do tamanho visual */
  as?: "h1" | "h2" | "h3";
  size?: "display" | "title" | "heading" | "subheading";
  id?: string;
  className?: string;
  children?: ReactNode;
};

const sizeClass = {
  display: "type-display",
  title: "type-title",
  heading: "type-heading",
  subheading: "type-subheading",
} as const;

export function SectionHeading({
  eyebrow,
  title,
  as: Tag = "h2",
  size = "heading",
  id,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-5xl", className)}>
      {eyebrow ? <p className="eyebrow mb-5 md:mb-7">{eyebrow}</p> : null}
      <Tag id={id} className={sizeClass[size]}>
        {title}
      </Tag>
      {children ? <div className="mt-6 space-y-4 md:mt-8">{children}</div> : null}
    </div>
  );
}
