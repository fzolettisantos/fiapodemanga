"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const items = [
  { href: "/admin", label: "Visão geral" },
  { href: "/admin/propostas", label: "Propostas" },
  { href: "/admin/clientes", label: "Clientes" },
  { href: "/admin/relatorio", label: "Relatório" },
];

export function AdminNav() {
  const path = usePathname();
  return (
    <nav aria-label="Área admin" className="flex flex-wrap gap-1">
      {items.map((item) => {
        const active = item.href === "/admin" ? path === "/admin" : path.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-4 py-2 text-sm transition-colors",
              active ? "bg-accent-fill font-medium text-ink" : "text-muted hover:text-heading",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
