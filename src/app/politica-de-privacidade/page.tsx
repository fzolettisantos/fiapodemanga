import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Política de Privacidade",
  description:
    "Como a Fiapo de Manga trata os dados pessoais enviados pelo site, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).",
  path: "/politica-de-privacidade",
});

/** Atualize esta data sempre que o conteúdo da política mudar. */
const LAST_UPDATED = "5 de novembro de 2026";

export default function PrivacyPage() {
  const controller = siteConfig.legalName || siteConfig.name;
  const contact = siteConfig.contactEmail;

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Início", path: "/" },
          { name: "Política de Privacidade", path: "/politica-de-privacidade" },
        ]}
      />
      <article className="container-site pt-10 pb-24 md:pt-16 md:pb-32">
        <header className="max-w-5xl">
          <p className="eyebrow">Privacidade e LGPD</p>
          <h1 className="type-title mt-8">Política de Privacidade</h1>
          <p className="mt-8 font-mono text-xs tracking-[0.04em] text-muted uppercase">
            Última atualização: {LAST_UPDATED}
          </p>
        </header>

        <div className="prose-fm type-body mt-16 max-w-[44rem] text-lg lg:ml-[calc(100%/12*5)]">
          <p>
            Esta política explica como {controller} trata os dados pessoais enviados por meio deste site, de acordo
            com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).
          </p>

          <h2>1. Quais dados coletamos</h2>
          <p>Coletamos apenas os dados que você informa voluntariamente no formulário de contato:</p>
          <ul>
            <li>nome;</li>
            <li>e-mail;</li>
            <li>empresa (opcional);</li>
            <li>tipo de projeto;</li>
            <li>mensagem.</li>
          </ul>
          <p>
            Pedimos que não inclua na mensagem dados pessoais sensíveis ou informações confidenciais que não sejam
            necessárias para o primeiro contato.
          </p>

          <h2>2. Para que usamos os dados</h2>
          <p>
            Os dados são utilizados exclusivamente para responder ao seu contato, entender a sua necessidade e, se
            houver interesse de ambas as partes, dar continuidade à conversa sobre um possível projeto.
          </p>
          <p>Não vendemos, alugamos nem compartilhamos seus dados para fins de publicidade.</p>

          <h2>3. Base legal</h2>
          <p>
            O tratamento é realizado com base no seu consentimento (art. 7º, I, da LGPD), registrado ao marcar a
            caixa de concordância do formulário, e, quando aplicável, para procedimentos preliminares relacionados a
            um contrato do qual você seja parte (art. 7º, V).
          </p>

          <h2>4. Compartilhamento</h2>
          <p>
            Para que a mensagem chegue até nós, os dados do formulário são transmitidos por um provedor de envio de
            e-mails e pela infraestrutura de hospedagem do site, que atuam como operadores e podem processar dados
            fora do Brasil, observadas as garantias previstas na LGPD. Os dados também podem ser compartilhados
            quando houver obrigação legal ou ordem de autoridade competente.
          </p>

          <h2>5. Por quanto tempo guardamos</h2>
          <p>
            Mantemos os dados pelo tempo necessário para responder ao contato e conduzir eventuais tratativas. Depois
            disso, eles são eliminados, salvo quando a guarda for necessária para cumprimento de obrigação legal ou
            exercício regular de direitos.
          </p>

          <h2>6. Cookies e armazenamento local</h2>
          <p>
            Este site não utiliza cookies de publicidade nem ferramentas de rastreamento. Apenas a sua preferência de
            tema (claro ou escuro) é salva no armazenamento local do seu navegador, sem identificar você.
          </p>

          <h2>7. Segurança</h2>
          <p>
            Adotamos medidas técnicas razoáveis para proteger os dados, como conexão criptografada (HTTPS), validação
            das informações enviadas e mecanismos contra envios automatizados.
          </p>

          <h2>8. Seus direitos</h2>
          <p>Nos termos do art. 18 da LGPD, você pode solicitar a qualquer momento:</p>
          <ul>
            <li>confirmação da existência de tratamento e acesso aos dados;</li>
            <li>correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>anonimização, bloqueio ou eliminação de dados desnecessários;</li>
            <li>eliminação dos dados tratados com base no consentimento;</li>
            <li>informação sobre compartilhamento;</li>
            <li>revogação do consentimento.</li>
          </ul>
          <p>
            Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
          </p>

          <h2>9. Como falar conosco</h2>
          {contact ? (
            <p>
              Para exercer seus direitos ou tirar dúvidas sobre esta política, escreva para{" "}
              <a href={`mailto:${contact}`}>{contact}</a>.
            </p>
          ) : (
            <p>
              Para exercer seus direitos ou tirar dúvidas sobre esta política, entre em contato pelo{" "}
              <Link href="/contato">formulário de contato</Link>.
            </p>
          )}

          <h2>10. Alterações</h2>
          <p>
            Esta política pode ser atualizada para refletir mudanças no site ou na legislação. A data da última
            atualização está indicada no início da página.
          </p>
        </div>
      </article>
    </>
  );
}
