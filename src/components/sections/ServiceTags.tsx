import { cn } from "@/lib/utils/cn";

/** Lista de competências — itens separados por traços finos, sem cards. */
export function ServiceTags({
  items,
  label,
  className,
}: {
  items: readonly string[];
  label?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {label ? <p className="eyebrow mb-4">{label}</p> : null}
      <ul className={cn("grid grid-cols-1 border-t border-line sm:grid-cols-2")}>
        {items.map((item) => (
          <li
            key={item}
            className="flex min-h-12 items-center gap-3 border-b border-line py-3 text-[0.98rem] text-text sm:odd:pr-6"
          >
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
