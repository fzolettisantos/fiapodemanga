import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getI18n } from "@/i18n/server";
import { niches } from "@/content/niches";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { itemListJsonLd } from "@/lib/seo/jsonld";
import { localizePath } from "@/i18n/config";

const TITLE = "Sites para Cada Tipo de Negócio";
const DESCRIPTION =
  "Veja o que o site de um salão, barbearia, restaurante, clínica, loja e outros negócios precisa ter, e qual formato a Fiapo de Manga indica para cada um.";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getI18n();
  if (locale !== "pt") return {};
  return buildMetadata({ locale, title: TITLE, description: DESCRIPTION, path: "/site-para" });
}

export default async function NichesPage() {
  const { locale } = await getI18n();
  if (locale !== "pt") notFound();
  return (
    <>
      <Breadcrumbs items={[{ name: "Sites para cada negócio", path: "/site-para" }]} />
      <JsonLd data={itemListJsonLd(niches.map((n) => ({ name: n.h1, path: localizePath(locale, `/site-para/${n.slug}`) })))} />
      <PageHero
        eyebrow="Sites para cada negócio"
        title="Cada negócio precisa de um site diferente."
        paragraphs={[
          "O que um salão precisa mostrar não é o que uma loja de roupas ou um consultório precisa. Escolha o seu tipo de negócio e veja o que o site tem que ter e qual formato indicamos. Se o seu não estiver na lista, a gente cria para qualquer negócio.",
        ]}
      />
      <section aria-labelledby="lista-title" className="border-t border-line">
        <div className="container-site py-16 md:py-24">
          <h2 id="lista-title" className="sr-only">
            Tipos de negócio
          </h2>
          <ul className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {niches.map((n) => (
              <li key={n.slug} className="border-b border-line">
                <Link
                  href={`/site-para/${n.slug}`}
                  className="sweep-row group flex h-full flex-col justify-between gap-6 py-8 sm:pr-8"
                >
                  <span>
                    <span className="type-subheading block transition-colors group-hover:text-accent">Site para {n.name}</span>
                    <span className="type-body mt-3 block text-muted">{n.description.split(".")[0]}.</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className="size-6 text-accent" strokeWidth={1.5} />
                </Link>
              </li>
            ))}
            <li className="border-b border-line">
              <Link
                href="/contato"
                className="sweep-row group flex h-full flex-col justify-between gap-6 py-8 sm:pr-8"
              >
                <span>
                  <span className="type-subheading block transition-colors group-hover:text-accent">E qualquer outro negócio</span>
                  <span className="type-body mt-3 block text-muted">
                    Não achou o seu? Cada site é feito sob medida. Conte o que você faz e a gente responde com uma proposta.
                  </span>
                </span>
                <ArrowUpRight aria-hidden="true" className="size-6 text-accent" strokeWidth={1.5} />
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
