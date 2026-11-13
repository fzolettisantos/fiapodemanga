import { BrandLogo } from "@/components/shared/brand-logo";
import { Alert, Button } from "@/components/ui";
import { isDemoMode } from "@/config/business";

/** Página provisória: valida tokens, fontes e componentes base. Será substituída pela Home real. */
export default function HomePlaceholder() {
  return (
    <main className="container-mk flex min-h-dvh flex-col justify-center gap-8 py-16">
      <BrandLogo className="h-auto w-40" priority />
      <p className="text-sm font-semibold uppercase tracking-widest text-text-secondary">
        Instalação e assistência técnica
      </p>
      <h1>Sua TV no lugar certo. Sem complicação.</h1>
      <p className="max-w-xl text-text-secondary">
        Fundação do projeto pronta: arquitetura, design tokens e componentes base. As páginas serão
        construídas nas próximas etapas.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button disabled>Escolher um serviço</Button>
        <Button variant="outline" disabled>
          Falar pelo WhatsApp
        </Button>
      </div>
      {isDemoMode && (
        <Alert title="Modo demonstrativo">Nenhum banco configurado. Não há disponibilidade real.</Alert>
      )}
    </main>
  );
}
