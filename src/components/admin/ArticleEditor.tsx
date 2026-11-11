"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { Bold, Heading2, Heading3, ImagePlus, Italic, Link2, List, ListOrdered, Quote } from "lucide-react";
import { ArticleBody } from "@/components/articles/ArticleBody";
import { articleCategoryInfo, articleCategorySlugs } from "@/lib/articles/categories";
import { parseMarkdown, readingMinutes, slugify, wordCount } from "@/lib/articles/markdown";
import { seoChecks } from "@/lib/articles/seo-check";
import { cn } from "@/lib/utils/cn";
import type { ArticleCategory } from "@/types/content";

type SaveResult = { ok: true; id: string; slug: string; status: "draft" | "published" } | { ok: false; message: string };
type UploadResult = { ok: true; url: string } | { ok: false; message: string };

export type EditorArticle = {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
  category: ArticleCategory;
  coverUrl: string;
  coverAlt: string;
  authorName: string;
  status: "draft" | "published";
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  focusKeyword: string;
  relatedServices: string[];
};

const field = "mt-1 block w-full rounded-sm border border-line-strong bg-transparent px-3 py-2 text-text placeholder:text-muted/70";
const label = "text-sm font-medium text-heading";
const tbBtn = "inline-flex size-9 items-center justify-center rounded-sm border border-line text-muted transition-colors hover:border-accent hover:text-heading";

const toLocalInput = (iso: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export function ArticleEditor({
  initial,
  services,
  canUpload,
  onSave,
  onUpload,
  siteUrl,
}: {
  initial: EditorArticle;
  services: { slug: string; name: string }[];
  canUpload: boolean;
  onSave: (json: string) => Promise<SaveResult>;
  onUpload: (form: FormData) => Promise<UploadResult>;
  siteUrl: string;
}) {
  const [a, setA] = useState<EditorArticle>({ ...initial, publishedAt: toLocalInput(initial.publishedAt) });
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.id));
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [msg, setMsg] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [dirty, setDirty] = useState(false);
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof EditorArticle>(key: K, value: EditorArticle[K]) => {
    setA((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
    setMsg(null);
  };

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const blocks = useMemo(() => parseMarkdown(a.body), [a.body]);
  const { checks, score } = useMemo(() => seoChecks(a), [a]);
  const words = wordCount(blocks);
  const searchTitle = a.seoTitle || a.title || "Título do artigo";
  const searchDesc = a.seoDescription || a.summary || "A descrição que aparece nos resultados do Google.";

  /* ----------------------- Barra de formatação ----------------------- */
  function edit(fn: (sel: string, before: string, after: string) => { text: string; cursor?: [number, number] }) {
    const el = bodyRef.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const { text, cursor } = fn(value.slice(s, e), value.slice(0, s), value.slice(e));
    set("body", text);
    requestAnimationFrame(() => {
      el.focus();
      if (cursor) el.setSelectionRange(cursor[0], cursor[1]);
    });
  }
  const wrap = (mark: string, placeholder: string) =>
    edit((sel, before, after) => {
      const inner = sel || placeholder;
      return { text: `${before}${mark}${inner}${mark}${after}`, cursor: [before.length + mark.length, before.length + mark.length + inner.length] };
    });
  const linePrefix = (prefix: string, placeholder: string) =>
    edit((sel, before, after) => {
      const inner = (sel || placeholder).split("\n").map((l, i) => (prefix === "1. " ? `${i + 1}. ${l}` : `${prefix}${l}`)).join("\n");
      const lead = before.length === 0 || before.endsWith("\n\n") ? "" : before.endsWith("\n") ? "\n" : "\n\n";
      return { text: `${before}${lead}${inner}\n\n${after.replace(/^\n+/, "")}`, cursor: [before.length + lead.length, before.length + lead.length + inner.length] };
    });
  const insertLink = () => {
    const url = window.prompt("Endereço do link (ex.: /servicos/criacao-de-sites ou https://...)");
    if (!url) return;
    edit((sel, before, after) => {
      const text = sel || "texto do link";
      return { text: `${before}[${text}](${url.trim()})${after}` };
    });
  };

  async function sendImage(file: File): Promise<string | null> {
    setUploading(true);
    setMsg(null);
    try {
      const form = new FormData();
      form.set("file", file);
      const res = await onUpload(form);
      if (!res.ok) {
        setMsg({ kind: "error", text: res.message });
        return null;
      }
      return res.url;
    } catch {
      setMsg({ kind: "error", text: "Não foi possível enviar a imagem." });
      return null;
    } finally {
      setUploading(false);
    }
  }
  async function onBodyImage(file: File | undefined) {
    if (!file) return;
    const url = await sendImage(file);
    if (!url) return;
    const alt = window.prompt("Descreva a imagem em poucas palavras (texto alternativo)") ?? "";
    edit((_sel, before, after) => {
      const lead = before.length === 0 || before.endsWith("\n\n") ? "" : before.endsWith("\n") ? "\n" : "\n\n";
      return { text: `${before}${lead}![${alt}](${url})\n\n${after.replace(/^\n+/, "")}` };
    });
  }
  async function onCover(file: File | undefined) {
    if (!file) return;
    const url = await sendImage(file);
    if (url) set("coverUrl", url);
  }

  function save(status: "draft" | "published") {
    setMsg(null);
    startTransition(async () => {
      const publishedAt = status === "published" ? (a.publishedAt ? new Date(a.publishedAt).toISOString() : new Date().toISOString()) : "";
      const res = await onSave(JSON.stringify({ ...a, status, publishedAt }));
      if (res.ok) {
        setDirty(false);
        setA((prev) => ({ ...prev, id: res.id, slug: res.slug, status: res.status }));
        const scheduled = status === "published" && a.publishedAt && new Date(a.publishedAt) > new Date();
        setMsg({ kind: "ok", text: status === "draft" ? "Rascunho salvo." : scheduled ? "Salvo e agendado. Entra no ar na data escolhida." : "Publicado. O artigo já está no ar (a lista pode levar alguns minutos)." });
        if (!initial.id) window.history.replaceState(null, "", `/admin/artigos/${res.id}`);
      } else setMsg({ kind: "error", text: res.message });
    });
  }

  const category = articleCategoryInfo[a.category];
  const scheduled = a.status === "published" && a.publishedAt && new Date(a.publishedAt) > new Date();

  return (
    <div className="grid gap-10 xl:grid-cols-12">
      <div className="space-y-8 xl:col-span-8">
        <label className="block">
          <span className={label}>Título do artigo</span>
          <input
            className={cn(field, "text-xl font-medium")}
            value={a.title}
            onChange={(e) => {
              set("title", e.target.value);
              if (!slugTouched) setA((p) => ({ ...p, title: e.target.value, slug: slugify(e.target.value) }));
            }}
            placeholder="Ex.: Site para salão de beleza: o que precisa ter"
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className={label}>Categoria</span>
            <select className={cn(field, "bg-bg")} value={a.category} onChange={(e) => set("category", e.target.value as ArticleCategory)}>
              {articleCategorySlugs.map((s) => (
                <option key={s} value={s}>
                  {articleCategoryInfo[s].name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={label}>Autor</span>
            <input className={field} value={a.authorName} onChange={(e) => set("authorName", e.target.value)} />
          </label>
          <label className="block sm:col-span-2">
            <span className={label}>Resumo (aparece na lista e abaixo do título)</span>
            <textarea className={cn(field, "min-h-20")} value={a.summary} onChange={(e) => set("summary", e.target.value)} maxLength={300} />
            <span className="mt-1 block text-xs text-muted">{a.summary.length} de 300 caracteres</span>
          </label>
        </div>

        <fieldset className="rounded-sm border border-line p-5">
          <legend className="px-2 text-sm font-medium text-heading">Imagem de capa</legend>
          {a.coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={a.coverUrl.split("#")[0]} alt="" className="mb-4 max-h-48 rounded-sm border border-line" />
          ) : null}
          <div className="flex flex-wrap items-center gap-3">
            <input ref={coverRef} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => onCover(e.target.files?.[0])} aria-label="Escolher imagem de capa" />
            <button type="button" disabled={!canUpload || uploading} onClick={() => coverRef.current?.click()} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-heading hover:border-accent disabled:opacity-50">
              <ImagePlus aria-hidden="true" className="size-4" /> {uploading ? "Enviando…" : a.coverUrl ? "Trocar capa" : "Enviar capa"}
            </button>
            {a.coverUrl ? (
              <button type="button" onClick={() => set("coverUrl", "")} className="link-underline text-sm text-muted">
                Remover
              </button>
            ) : null}
            {!canUpload ? <span className="text-xs text-muted">O envio de imagens funciona depois que o Supabase estiver configurado.</span> : null}
          </div>
          <label className="mt-4 block">
            <span className={label}>Descrição da imagem (texto alternativo)</span>
            <input className={field} value={a.coverAlt} onChange={(e) => set("coverAlt", e.target.value)} placeholder="Ex.: Barbeiro atendendo cliente na cadeira" />
          </label>
          <p className="mt-2 text-xs text-muted">Tamanho ideal: 1600 × 900 px (proporção 16:9). Ela também aparece nas redes sociais.</p>
        </fieldset>

        <div>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <span className={label} id="texto-label">
              Texto do artigo
            </span>
            <div role="tablist" aria-label="Modo do texto" className="flex gap-1 rounded-full border border-line p-1 text-sm">
              {(["edit", "preview"] as const).map((t) => (
                <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={cn("rounded-full px-4 py-1.5", tab === t ? "bg-accent-fill font-medium text-ink" : "text-muted")}>
                  {t === "edit" ? "Escrever" : "Pré-visualizar"}
                </button>
              ))}
            </div>
          </div>

          {tab === "edit" ? (
            <>
              <div role="toolbar" aria-label="Formatação" className="mt-3 flex flex-wrap gap-2">
                <button type="button" className={tbBtn} aria-label="Negrito" title="Negrito" onClick={() => wrap("**", "texto em negrito")}><Bold aria-hidden="true" className="size-4" /></button>
                <button type="button" className={tbBtn} aria-label="Itálico" title="Itálico" onClick={() => wrap("*", "texto em itálico")}><Italic aria-hidden="true" className="size-4" /></button>
                <button type="button" className={tbBtn} aria-label="Subtítulo grande" title="Subtítulo" onClick={() => linePrefix("## ", "Subtítulo")}><Heading2 aria-hidden="true" className="size-4" /></button>
                <button type="button" className={tbBtn} aria-label="Subtítulo pequeno" title="Subtítulo menor" onClick={() => linePrefix("### ", "Subtítulo menor")}><Heading3 aria-hidden="true" className="size-4" /></button>
                <button type="button" className={tbBtn} aria-label="Lista" title="Lista" onClick={() => linePrefix("- ", "item da lista")}><List aria-hidden="true" className="size-4" /></button>
                <button type="button" className={tbBtn} aria-label="Lista numerada" title="Lista numerada" onClick={() => linePrefix("1. ", "primeiro passo")}><ListOrdered aria-hidden="true" className="size-4" /></button>
                <button type="button" className={tbBtn} aria-label="Citação" title="Citação" onClick={() => linePrefix("> ", "frase em destaque")}><Quote aria-hidden="true" className="size-4" /></button>
                <button type="button" className={tbBtn} aria-label="Link" title="Link" onClick={insertLink}><Link2 aria-hidden="true" className="size-4" /></button>
                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => { onBodyImage(e.target.files?.[0]); e.target.value = ""; }} aria-label="Escolher imagem para o texto" />
                <button type="button" className={tbBtn} aria-label="Inserir imagem" title={canUpload ? "Inserir imagem" : "Disponível com o Supabase configurado"} disabled={!canUpload || uploading} onClick={() => fileRef.current?.click()}><ImagePlus aria-hidden="true" className="size-4" /></button>
              </div>
              <textarea
                ref={bodyRef}
                aria-labelledby="texto-label"
                className={cn(field, "min-h-[28rem] font-mono text-[0.95rem] leading-relaxed")}
                value={a.body}
                onChange={(e) => set("body", e.target.value)}
                placeholder={"Escreva aqui. Use ## para subtítulos, - para listas e **negrito**.\n\n## Primeiro subtítulo\n\nSeu texto..."}
              />
              <p className="mt-2 text-xs text-muted">
                {words} palavras · {readingMinutes(blocks)} min de leitura. Dica: <code>## Subtítulo</code>, <code>- lista</code>, <code>**negrito**</code>, <code>[texto](/endereço)</code>.
              </p>
            </>
          ) : (
            <div className="mt-3 rounded-sm border border-line p-6">
              <p className="eyebrow">{category.name}</p>
              <h2 className="type-title mt-6">{a.title || "Título do artigo"}</h2>
              {a.summary ? <p className="type-lead mt-6">{a.summary}</p> : null}
              <div className="prose-fm type-body mt-10 text-lg">
                <ArticleBody blocks={blocks} />
              </div>
            </div>
          )}
        </div>

        {services.length ? (
          <fieldset>
            <legend className={label}>Serviços relacionados (aparecem no fim do artigo e ajudam o Google a ligar os temas)</legend>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {services.map((s) => (
                <label key={s.slug} className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" className="size-4 accent-[var(--color-accent)]" checked={a.relatedServices.includes(s.slug)} onChange={() => set("relatedServices", a.relatedServices.includes(s.slug) ? a.relatedServices.filter((x) => x !== s.slug) : [...a.relatedServices, s.slug])} />
                  {s.name}
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}
      </div>

      <aside aria-label="Publicação e SEO" className="space-y-8 xl:col-span-4">
        <div className="space-y-4 rounded-sm border border-line-strong p-5">
          <h2 className="type-subheading">Publicar</h2>
          <p className="text-sm text-muted">
            Situação: <strong className="text-heading">{a.status === "published" ? (scheduled ? "Agendado" : "No ar") : "Rascunho"}</strong>
            {dirty ? " · alterações não salvas" : ""}
          </p>
          <label className="block text-sm">
            Data de publicação (deixe vazio para publicar agora; no futuro = agendar)
            <input type="datetime-local" className={field} value={a.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} />
          </label>
          <div className="flex flex-wrap gap-3">
            <button type="button" disabled={pending} onClick={() => save("draft")} className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-5 text-heading hover:border-accent disabled:opacity-60">
              {a.status === "published" ? "Despublicar (voltar a rascunho)" : "Salvar rascunho"}
            </button>
            <button type="button" disabled={pending} onClick={() => save("published")} className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-btn-primary-border)] bg-[var(--color-btn-primary-bg)] px-5 font-medium text-[var(--color-btn-primary-fg)] disabled:opacity-60">
              {pending ? "Salvando…" : a.status === "published" ? "Atualizar" : "Publicar"}
            </button>
          </div>
          <p aria-live="polite" role={msg?.kind === "error" ? "alert" : undefined} className={cn("text-sm", msg?.kind === "error" ? "text-danger" : "text-muted")}>
            {msg?.text ?? ""}
          </p>
          {a.id ? (
            <a href={`/admin/artigos/${a.id}/previa`} target="_blank" rel="noopener" className="link-underline inline-block text-sm text-heading">
              Ver como vai ficar no site
            </a>
          ) : null}
        </div>

        <div className="space-y-4 rounded-sm border border-line p-5">
          <h2 className="type-subheading">Como aparece no Google</h2>
          <div className="rounded-sm bg-surface p-4">
            <p className="truncate text-xs text-muted">{siteUrl.replace(/^https?:\/\//, "")} › insights › {a.slug || "endereco-do-artigo"}</p>
            <p className="mt-1 line-clamp-2 text-lg leading-snug text-[#1a0dab] dark:text-[#8ab4f8]">{searchTitle}</p>
            <p className="mt-1 line-clamp-3 text-sm text-muted">{searchDesc}</p>
          </div>
          <label className="block text-sm">
            Endereço do artigo (/insights/…)
            <input className={field} value={a.slug} onChange={(e) => { setSlugTouched(true); set("slug", slugify(e.target.value)); }} />
          </label>
          <label className="block text-sm">
            Palavra-chave principal
            <input className={field} value={a.focusKeyword} onChange={(e) => set("focusKeyword", e.target.value)} placeholder="a busca que você quer atender" />
          </label>
          <label className="block text-sm">
            Título para o Google (opcional, até 60)
            <input className={field} value={a.seoTitle} onChange={(e) => set("seoTitle", e.target.value)} placeholder={a.title} />
            <span className="mt-1 block text-xs text-muted">{searchTitle.length} caracteres</span>
          </label>
          <label className="block text-sm">
            Descrição para o Google (opcional, 120 a 160)
            <textarea className={cn(field, "min-h-20")} value={a.seoDescription} onChange={(e) => set("seoDescription", e.target.value)} placeholder={a.summary} />
            <span className="mt-1 block text-xs text-muted">{searchDesc.length} caracteres</span>
          </label>
        </div>

        <div className="rounded-sm border border-line p-5">
          <h2 className="type-subheading">Lista de verificação de SEO</h2>
          <p className="mt-2 text-sm text-muted">
            {score}% atendido. São boas práticas, não garantia de posição no Google.
          </p>
          <ul className="mt-4 space-y-3">
            {checks.map((c) => (
              <li key={c.id} className="flex gap-3 text-sm">
                <span aria-hidden="true" className={cn("mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-bold", c.status === "ok" ? "bg-[#1b9e3e] text-white" : c.status === "warn" ? "bg-[#b7791f] text-white" : "border border-line-strong text-muted")}>
                  {c.status === "ok" ? "✓" : c.status === "warn" ? "!" : "·"}
                </span>
                <span>
                  <span className="sr-only">{c.status === "ok" ? "Feito: " : "Pendente: "}</span>
                  <span className={c.status === "ok" ? "text-heading" : ""}>{c.label}</span>
                  {c.status !== "ok" ? <span className="block text-xs text-muted">{c.hint}</span> : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
