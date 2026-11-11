import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getI18n } from "@/i18n/server";
import { generalFaqs } from "@/content/faq";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { FaqList } from "@/components/sections/FaqList";
import { ContactCta } from "@/components/sections/ContactCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqJsonLd } from "@/lib/seo/jsonld";

const TITLE = "Perguntas Frequentes sobre Criação de Sites";
const DESCRIPTION =
  "Prazo, domínio, pagamento, fidelidade, ajustes, comissão e Google: respostas diretas sobre como funciona ter um site ou loja virtual com a Fiapo de Manga.";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getI18n();
  if (locale !== "pt") return {};
  return buildMetadata({ locale, title: TITLE, description: DESCRIPTION, path: "/perguntas-frequentes" });
}

export default async function FaqPage() {
  const { locale } = await getI18n();
  if (locale !== "pt") notFound();
  return (
    <>
      <Breadcrumbs items={[{ name: "Perguntas frequentes", path: "/perguntas-frequentes" }]} />
      <JsonLd data={faqJsonLd(generalFaqs)} />
      <PageHero
        eyebrow="Perguntas frequentes"
        title="Tudo o que você precisa saber antes de ter o seu site."
        paragraphs={["Respostas diretas sobre prazo, pagamento, domínio, contrato e Google. Se faltar alguma, é só chamar."]}
      />
      <section aria-labelledby="faq-title" className="border-t border-line">
        <div className="container-site py-16 md:py-24">
          <h2 id="faq-title" className="sr-only">
            Perguntas e respostas
          </h2>
          <div className="max-w-4xl">
            <FaqList items={generalFaqs} headingId="faq-title" />
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
