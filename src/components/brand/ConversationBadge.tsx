"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";

const DEFAULT_SRC = "/brand/vamos-conversar.svg";

/**
 * Ilustração "Vamos conversar": a Luli com a caneca + lettering em arco (SVG vetorizado).
 *
 * O SVG (~100 KB, ~30 KB com gzip) é carregado só quando a seção se aproxima da tela
 * e inserido no DOM, para que:
 *  - não pese no HTML inicial nem no LCP;
 *  - as cores sigam os tokens do tema (dark/light) e cada letra, o vapor e a Luli
 *    sejam animados por CSS (ver "Ilustração Vamos conversar" em globals.css).
 * Sem JavaScript, exibe o mesmo SVG como imagem. O arquivo é estático e do próprio site.
 */
export function ConversationBadge({
  className,
  label,
  href,
  src = DEFAULT_SRC,
}: {
  className?: string;
  label: string;
  href: string;
  /** Arte: /brand/vamos-conversar.svg (deitada) ou /brand/vamos-conversar-sentada.svg (sentada) */
  src?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;

    const load = () => {
      fetch(src)
        .then((res) => (res.ok ? res.text() : Promise.reject(new Error(String(res.status)))))
        .then((svg) => {
          if (cancelled) return;
          el.innerHTML = svg
            .replace(/<title[^>]*>.*?<\/title>/, "")
            .replace(/\s(role|aria-labelledby)="[^"]*"/g, "")
            .replace("<svg ", '<svg aria-hidden="true" focusable="false" ');
          el.dataset.loaded = "";
        })
        .catch(() => {
          // Em caso de falha, o espaço fica reservado e o link continua funcionando.
        });
    };

    if (!("IntersectionObserver" in window)) {
      load();
      return () => {
        cancelled = true;
      };
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          load();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(el);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [src]);

  return (
    <Link
      href={href}
      aria-label={label}
      className={cn("conversation-badge block", className)}
    >
      <span ref={ref} className="conversation-badge__art block aspect-square" />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={1254} height={1254} className="block h-auto w-full" />
      </noscript>
    </Link>
  );
}
