import type { Metadata } from "next";
import { contactPageContent as c } from "@/content/pages";
import { siteConfig } from "@/config/site";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contato — Vamos conversar sobre seu projeto",
  description:
    "Conte seu desafio para a Fiapo de Manga: pesquisa, estratégia, Product Design, UX/UI, criação de sites, aplicativos, sistemas, e-commerce ou inteligência artificial.",
  path: "/contato",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Início", path: "/" },
          { name: "Contato", path: "/contato" },
        ]}
      />
      <div className="container-site grid gap-16 pt-10 pb-24 md:pt-16 md:pb-32 lg:grid-cols-12 lg:gap-12">
        <section aria-labelledby="page-title" className="lg:col-span-5">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 id="page-title" className="type-title mt-8">
            {c.title}
          </h1>
          <div className="mt-10 space-y-5">
            {c.paragraphs.map((p) => (
              <p key={p} className="type-lead">
                {p}
              </p>
            ))}
          </div>
          {siteConfig.contactEmail ? (
            <p className="mt-10 text-[0.98rem]">
              Se preferir, escreva para{" "}
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-accent underline underline-offset-4">
                {siteConfig.contactEmail}
              </a>
              .
            </p>
          ) : null}
        </section>

        <section aria-label="Formulário de contato" className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <ContactForm />
        </section>
      </div>
    </>
  );
}
