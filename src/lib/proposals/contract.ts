import { siteConfig } from "@/config/site";
import { getSiteType, includedInAllPlans, plans } from "./catalog";
import { annualSavings, brl, installment, MAX_INSTALLMENTS, methodLabel, periodLabel } from "./pricing";
import type { Proposal } from "./proposal";

/**
 * Contrato de prestação de serviços (minuta aprovada em 11/11/2026, pendente de revisão jurídica).
 * Fonte: documento "Fiapo de Manga — Regras dos planos e minuta de contrato".
 * Ao alterar o texto, troque CONTRACT_VERSION: o aceite registra a versão aceita.
 */
export const CONTRACT_VERSION = "2026-11-v1";

/** Dados da CONTRATADA — preencher com os dados reais da empresa. */
export const contractor = {
  legalName: siteConfig.legalName || "[RAZÃO SOCIAL]",
  tradeName: siteConfig.name,
  cnpj: "[CNPJ]",
  address: "[ENDEREÇO]",
  email: siteConfig.contactEmail || "[E-MAIL]",
  forum: "Santos/SP",
};

export const contractPending = [contractor.legalName, contractor.cnpj, contractor.address, contractor.email].some((v) =>
  v.startsWith("["),
);

export type ContractSection = { title: string; clauses: string[] };

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export function contractSections(p: Proposal): ContractSection[] {
  const f = p.fidelityMonths;
  const fee = p.exitFeeMonths;
  const fidelity =
    f > 0
      ? `5.2. ${p.setupWaived ? "A taxa de implantação prevista no Termo é isenta. Em contrapartida, a" : "A"} CONTRATANTE se compromete a permanecer por ${plural(f, "mês", "meses")}.${
          fee > 0
            ? ` Se cancelar antes, paga multa equivalente a ${plural(fee, "mensalidade", "mensalidades")}, limitada ao valor das mensalidades que faltariam para completar ${plural(f, "mês", "meses")}.`
            : ""
        }`
      : "5.2. Não há período mínimo de permanência.";

  return [
    {
      title: "1. Objeto",
      clauses: [
        "1.1. A CONTRATADA cria, hospeda e mantém um site para a CONTRATANTE, conforme o plano escolhido no Termo de Contratação: Vitrine, Catálogo ou Loja Online.",
        "1.2. O Termo de Contratação integra este contrato e define tipo de site, plano, valores, periodicidade e forma de pagamento, implantação, prazo de entrega, domínio e condições especiais.",
        "1.3. Estão incluídos, enquanto o plano estiver ativo: registro e renovação do domínio, hospedagem, certificado de segurança (HTTPS), backup semanal, atualizações de segurança e os ajustes da Cláusula 4.",
        "1.4. Não estão incluídos, salvo previsão no Termo: criação de logotipo, produção de fotos e textos, tráfego pago, gestão de redes sociais e cadastro inicial de produtos além do limite do tipo de site contratado.",
      ],
    },
    {
      title: "2. Implantação e entrega",
      clauses: [
        "2.1. A CONTRATANTE envia textos, imagens, logotipo e dados necessários em até 15 dias após o aceite. O prazo de entrega do Termo começa a contar a partir do recebimento completo desse material.",
        "2.2. A CONTRATANTE tem até 5 dias úteis para pedir correções na versão apresentada. Sem manifestação nesse prazo, ou com a publicação do site, a entrega é considerada aceita.",
      ],
    },
    {
      title: "3. Preço e pagamento",
      clauses: [
        "3.1. A CONTRATANTE paga o valor do plano mensalmente ou anualmente, conforme escolha no Termo, pelo Mercado Pago, por cartão, Pix ou boleto.",
        `3.2. No plano anual, o pagamento é feito à vista por Pix ou boleto, ou no cartão em até ${MAX_INSTALLMENTS} parcelas sem juros.`,
        "3.3. Os valores são reajustados a cada 12 meses pelo IPCA, com aviso de 30 dias.",
        "3.4. A CONTRATADA não cobra comissão ou percentual sobre as vendas da CONTRATANTE. Tarifas do Mercado Pago ou de outros meios de pagamento usados na loja são cobradas diretamente da conta da CONTRATANTE.",
        "3.5. Os valores, a periodicidade, as formas de pagamento e as condições especiais desta contratação são os que constam do Termo de Contratação aceito pela CONTRATANTE, e prevalecem sobre qualquer tabela de referência. Condições não registradas no Termo não obrigam as partes.",
        "3.6. A CONTRATADA pode reduzir valores ou conceder descontos a qualquer tempo, mediante aviso. Aumentos, além do reajuste da cláusula 3.3, dependem de novo aceite da CONTRATANTE.",
      ],
    },
    {
      title: "4. Ajustes e serviços extras",
      clauses: [
        "4.1. Estão incluídos até 3 ajustes por mês, não cumulativos. Ajuste é uma alteração simples de até 30 minutos, como troca de texto, imagem, preço, banner ou produto.",
        "4.2. Ajustes além do limite, novas páginas, novas funcionalidades, integrações ou redesign são orçados à parte e só executados após aprovação.",
        "4.3. Pedidos são feitos pelo canal indicado no Termo. A CONTRATADA responde em até 2 dias úteis e executa os ajustes em até 5 dias úteis. Site fora do ar é tratado no mesmo dia útil.",
      ],
    },
    {
      title: "5. Prazo, fidelidade e cancelamento",
      clauses: [
        "5.1. O contrato vale por 12 meses a partir do aceite e se renova automaticamente por períodos iguais, salvo aviso de cancelamento com 30 dias de antecedência.",
        fidelity,
        "5.3. A multa da cláusula 5.2 não se aplica ao plano anual, que segue a cláusula 5.5.",
        "5.4. Direito de arrependimento: a CONTRATANTE pode desistir em até 7 dias do aceite, com devolução integral dos valores pagos, conforme o art. 49 do Código de Defesa do Consumidor.",
        "5.5. No plano anual, após os 7 dias, o cancelamento antecipado só gera devolução do saldo depois de recalcular os meses usados pelo preço mensal do plano.",
        "5.6. Qualquer parte pode rescindir o contrato por descumprimento não corrigido em 15 dias após aviso por escrito.",
      ],
    },
    {
      title: "6. Atraso de pagamento",
      clauses: [
        "6.1. Valores em atraso têm multa de 2% e juros de 1% ao mês, mais correção pelo IPCA.",
        "6.2. Com 10 dias de atraso, a CONTRATADA envia aviso formal de suspensão. Com 15 dias, pode suspender o site até a regularização. Com 60 dias, pode rescindir o contrato e cobrar os valores devidos, inclusive a multa da cláusula 5.2.",
        "6.3. A suspensão não interrompe a cobrança do período contratado.",
        "6.4. Antes e depois de cada vencimento, a CONTRATADA envia lembretes automáticos aos contatos informados no Termo. O não recebimento de lembretes não dispensa o pagamento no vencimento.",
        "6.5. Durante a suspensão, o site exibe apenas um aviso de indisponibilidade temporária, sem menção a débitos. Confirmado o pagamento, o site é reativado em até 1 dia útil.",
      ],
    },
    {
      title: "7. Propriedade intelectual",
      clauses: [
        "7.1. O site é de propriedade exclusiva da CONTRATADA, incluindo código-fonte, layout, estrutura, componentes, modelos, ferramentas e hospedagem. Este contrato é de prestação de serviço: a CONTRATANTE não adquire o site, nem cópia, código-fonte ou direito de uso após o término do contrato.",
        "7.2. Pertencem à CONTRATANTE os conteúdos que ela fornecer: textos, fotos, marcas, logotipo e dados de produtos e de clientes.",
        "7.3. O domínio é registrado em nome da CONTRATANTE, com a CONTRATADA como responsável técnica, e pago pela CONTRATADA enquanto o contrato estiver ativo.",
        "7.4. A CONTRATADA pode exibir o site em seu portfólio, salvo pedido contrário por escrito.",
      ],
    },
    {
      title: "8. Responsabilidades da CONTRATANTE",
      clauses: [
        "8.1. Fornecer informações verdadeiras e conteúdos dos quais tenha os direitos, respondendo por eles perante terceiros.",
        "8.2. Na Loja Online e no Catálogo, a CONTRATANTE é a única vendedora: responde por produtos, preços, estoque, entrega, trocas, devoluções, emissão de notas fiscais, tributos, atendimento aos compradores e cumprimento do CDC perante eles.",
        "8.3. Manter ativa e em seu nome a conta do Mercado Pago e demais contas de terceiros usadas pelo site.",
        "8.4. Não usar o site para atividades ilegais, conteúdos ofensivos ou que violem direitos de terceiros. Nesse caso, a CONTRATADA pode retirar o conteúdo ou suspender o site.",
      ],
    },
    {
      title: "9. Responsabilidades e limites da CONTRATADA",
      clauses: [
        "9.1. Prestar os serviços com técnica e diligência, buscando disponibilidade de 99% ao mês.",
        "9.2. A CONTRATADA não responde por falhas de serviços de terceiros (hospedagem, provedores de internet, Mercado Pago, WhatsApp, Google e similares), por mau uso pela CONTRATANTE, ou por caso fortuito e força maior.",
        "9.3. A CONTRATADA não garante resultados de vendas, posição em buscadores ou volume de acessos.",
        "9.4. A responsabilidade total da CONTRATADA fica limitada ao valor pago pela CONTRATANTE nos 12 meses anteriores ao fato, excluindo lucros cessantes, salvo dolo ou culpa grave.",
      ],
    },
    {
      title: "10. Dados pessoais (LGPD)",
      clauses: [
        "10.1. Quanto aos dados de clientes e visitantes do site, a CONTRATANTE é controladora e a CONTRATADA é operadora, tratando os dados apenas para prestar os serviços deste contrato.",
        "10.2. A CONTRATADA adota medidas de segurança razoáveis e comunica à CONTRATANTE qualquer incidente de segurança que possa causar risco aos titulares.",
        "10.3. A CONTRATANTE mantém no site uma política de privacidade adequada ao seu negócio.",
      ],
    },
    {
      title: "11. Encerramento",
      clauses: [
        "11.1. Encerrado o contrato, a CONTRATADA devolve em até 15 dias os conteúdos da CONTRATANTE (textos, imagens e lista de produtos) em formato digital. Quitados os valores devidos, transfere à CONTRATANTE a gestão do domínio, cuja renovação passa a ser dela. Não são entregues código-fonte, layout, arquivos do site nem acesso à hospedagem.",
        "11.2. O site sai do ar no fim do período pago. Os dados são apagados em até 90 dias, salvo obrigação legal de guarda.",
      ],
    },
    {
      title: "12. Disposições gerais",
      clauses: [
        "12.1. O contrato é aceito eletronicamente. A CONTRATADA registra data, hora, IP, e-mail e a versão aceita e envia uma cópia à CONTRATANTE, nos termos do art. 10, § 2º, da MP 2.200-2/2001.",
        "12.2. Avisos são válidos por e-mail aos endereços informados no Termo.",
        "12.3. Não há vínculo empregatício, societário ou de representação entre as partes.",
        "12.4. A tolerância com um descumprimento não significa renunciar ao direito.",
        `12.5. Fica eleito o foro da comarca de ${contractor.forum}, salvo quando a lei garantir à CONTRATANTE o foro do seu domicílio.`,
      ],
    },
  ];
}

/** Linhas do Termo de Contratação, geradas a partir da proposta. */
export function termRows(p: Proposal): { label: string; value: string }[] {
  const type = getSiteType(p.siteTypeId)!;
  const plan = plans[type.plan];
  const savings = annualSavings(p);
  const prices = p.periods.map((period) =>
    period === "monthly"
      ? `${periodLabel.monthly}: ${brl(p.monthly)} por mês`
      : `${periodLabel.annual}: ${brl(p.annual)} por ano (à vista ou em até ${MAX_INSTALLMENTS}x de ${brl(installment(p.annual))} sem juros no cartão)${savings.amount > 0 ? `, economia de ${brl(savings.amount)}` : ""}`,
  );
  return [
    { label: "Contratante", value: [p.client.name, p.client.document].filter(Boolean).join(" · ") || "—" },
    { label: "Contato", value: [p.client.email, p.client.phone].filter(Boolean).join(" · ") || "—" },
    { label: "Tipo de site", value: `${type.name} — plano ${plan.name}` },
    { label: "Inclui", value: [...type.features, ...includedInAllPlans].join("; ") },
    { label: "Valores ofertados", value: prices.join(" | ") },
    { label: "Formas de pagamento", value: p.methods.map((m) => methodLabel[m]).join(", ") },
    {
      label: "Implantação",
      value: p.setupWaived ? `${brl(p.setup)} — isenta` : `${brl(p.setup)}, cobrada na contratação`,
    },
    {
      label: "Fidelidade",
      value:
        p.fidelityMonths > 0
          ? `${plural(p.fidelityMonths, "mês", "meses")}; saída antecipada: ${plural(p.exitFeeMonths, "mensalidade", "mensalidades")}, limitada ao que faltar (não se aplica ao anual)`
          : "Sem período mínimo",
    },
    { label: "Prazo de entrega", value: `${plural(p.deliveryDays, "dia útil", "dias úteis")} após o recebimento do material` },
    { label: "Domínio", value: p.domain ? `${p.domain} (incluso)` : "A definir (incluso)" },
    { label: "Condições especiais", value: p.special.length ? p.special.join(" ") : "Nenhuma" },
    { label: "Versão do contrato", value: CONTRACT_VERSION },
  ];
}

/** Regras em linguagem simples, mostradas antes do aceite. */
export function plainRules(p: Proposal): string[] {
  const rules = [
    p.fidelityMonths > 0
      ? `Fidelidade de ${plural(p.fidelityMonths, "mês", "meses")}.${p.exitFeeMonths > 0 ? ` Se sair antes, você paga ${plural(p.exitFeeMonths, "mensalidade", "mensalidades")} (nunca mais do que falta). No anual, não há multa.` : ""}`
      : "Sem fidelidade: você pode cancelar com 30 dias de aviso.",
    "Até 3 ajustes por mês incluídos. Novas páginas e funções são orçadas à parte.",
    "Sem comissão sobre as suas vendas: as taxas do Mercado Pago ficam na sua própria conta.",
    "O site é um serviço da Fiapo de Manga. Seus textos, fotos, marca e o domínio continuam seus.",
    "Com 15 dias de atraso, o site é suspenso, sempre com aviso antes. Pagou, ele volta.",
    "Você pode desistir em até 7 dias, com devolução integral.",
    "Reajuste uma vez por ano, pelo IPCA, com 30 dias de aviso.",
  ];
  return rules;
}
