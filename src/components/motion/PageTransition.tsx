"use client";

import { usePathname } from "next/navigation";
import { ViewTransition, type ReactNode } from "react";

/**
 * Transição entre páginas com a View Transitions API (via React <ViewTransition>).
 * A chave pela rota faz o conteúdo antigo sair e o novo entrar; o header fica ancorado.
 * Sem suporte do navegador, a navegação funciona normalmente, sem animação.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <ViewTransition key={pathname} enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
