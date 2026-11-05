import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { BrandLogo } from "@/components/brand/BrandLogo";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section aria-labelledby="page-title" className="container-site py-24 md:py-40">
      <BrandLogo variant="symbol" height={96} className="mb-10" />
      <p className="eyebrow">Erro 404</p>
      <h1 id="page-title" className="type-display mt-8 max-w-[14ch]">
        Essa pergunta ficou sem resposta.
      </h1>
      <p className="type-lead mt-10 max-w-xl">
        A página que você procura não existe ou mudou de endereço.
      </p>
      <div className="mt-12 flex flex-wrap gap-3">
        <ButtonLink href="/" variant="primary" size="lg">
          Voltar ao início
        </ButtonLink>
        <ButtonLink href="/servicos" variant="secondary" size="lg">
          O que fazemos
        </ButtonLink>
      </div>
    </section>
  );
}
