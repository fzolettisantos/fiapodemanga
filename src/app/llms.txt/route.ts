import { absoluteUrl, siteConfig } from "@/config/site";
import { niches } from "@/content/niches";
import { services, ptListedServices } from "@/content/services";
import { content } from "@/content/locales";

export const dynamic = "force-static";

/**
 * /llms.txt: resumo do site em texto simples para assistentes de IA e mecanismos de busca com IA.
 * Só informações verdadeiras e públicas. Sem preços (decisão comercial).
 */
export function GET() {
  const t = content.pt;
  const listed = ptListedServices
    .map((slug) => t.services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${t.site.description} Atendimento em todo o Brasil, em português.`,
    "",
    "A Fiapo de Manga cria sites, lojas virtuais, landing pages, aplicativos e sistemas, e usa inteligência artificial para entregar mais rápido e levar IA ao negócio do cliente (assistente virtual, automação). O serviço é por mensalidade ou anuidade, com domínio, hospedagem, segurança e ajustes mensais inclusos, e sem comissão sobre as vendas das lojas.",
    "",
    "## Serviços",
    ...listed.map((s) => `- [${s.name}](${absoluteUrl(`/servicos/${s.slug}`)}): ${s.headline}`),
    "",
    "## Sites por tipo de negócio",
    ...niches.map((n) => `- [Site para ${n.name}](${absoluteUrl(`/site-para/${n.slug}`)}): ${n.description}`),
    "",
    "## Informações úteis",
    `- [Perguntas frequentes](${absoluteUrl("/perguntas-frequentes")}): prazo, pagamento, domínio, fidelidade, ajustes e Google.`,
    `- [Projetos](${absoluteUrl("/projetos")}): plataformas e aplicativos já desenhados.`,
    `- [Blog](${absoluteUrl("/insights")}): guias sobre sites, lojas virtuais, Google, WhatsApp e IA.`,
    `- [Contato](${absoluteUrl("/contato")}): peça uma proposta.`,
    "",
    "## Observações",
    "- Não há promessa de posição no Google; o site é entregue com a base técnica de SEO.",
    "- O site é um serviço mantido pela Fiapo de Manga enquanto o plano estiver ativo; conteúdo, marca e domínio do cliente continuam sendo do cliente.",
    "",
  ];
  void services;
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
