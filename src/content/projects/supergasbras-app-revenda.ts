import type { Locale } from "@/i18n/config";
import type { ImageAsset, Project } from "@/types/content";

/**
 * Case Supergasbras — App de Revenda (redesign do produto).
 * Conteúdo baseado nas telas do aplicativo e no escopo informado (redesign).
 * Não inclui métricas ou resultados: adicione em `results` somente dados comprovados.
 */
const dir = "/images/projetos/supergasbras-app-revenda";
const shot = (file: string, width: number, height: number, alt: string, caption: string): ImageAsset => ({
  src: `${dir}/${file}`,
  alt,
  caption,
  width,
  height,
});

const files = {
  home: ["inicio-e-condicoes.webp", 892, 942],
  finance: ["financeiro.webp", 868, 1772],
  deal: ["negociacao.webp", 868, 1772],
  invoice: ["parcelas-e-boleto.webp", 880, 992],
  orders: ["compra-de-vasilhame.webp", 868, 1772],
  damaged: ["avariados.webp", 1350, 862],
} as const;

const img = (key: keyof typeof files, alt: string, caption: string) => {
  const [file, width, height] = files[key];
  return shot(file, width, height, alt, caption);
};

const base = {
  slug: "supergasbras-app-revenda",
  name: "App de Revenda",
  client: "Supergasbras",
  services: ["aplicativos-sistemas-plataformas", "product-design-ux-ui"],
  cover: { src: `${dir}/capa.webp`, alt: "", width: 1600, height: 1568 },
  // Demonstração montada com as telas reais (scripts/case-video/supergasbras-app-revenda)
  video: { mp4: `${dir}/demo.mp4`, webm: `${dir}/demo.webm`, poster: `${dir}/demo-poster.webp`, width: 1600, height: 900 },
  shotTone: "warm" as const,
  publishedAt: "2026-11-06",
  research: [],
  hypotheses: [],
  results: [],
  learnings: [],
};

export const supergasbrasAppRevenda: Record<Locale, Project> = {
  pt: {
    ...base,
    segment: "Distribuição de gás (GLP)",
    scope: "Redesign de produto",
    video: { ...base.video, label: "Demonstração em vídeo do App de Revenda da Supergasbras: central financeira, detalhes de uma negociação, acompanhamento de pedidos, histórico de avariados e filtro por mês." },
    summary:
      "Redesign do aplicativo que a Supergasbras oferece às suas revendas: condições comerciais, compras, pedidos e vida financeira reunidos no celular.",
    cover: {
      ...base.cover,
      alt: "Duas telas do aplicativo de revenda da Supergasbras: a tela inicial com campanhas de marketing e portal de compras, e a tela de condições comerciais com preços e descontos.",
    },
    context: [
      "O App de Revenda é o canal da Supergasbras com as revendas de gás que distribuem seus produtos. Pelo aplicativo, cada revenda consulta as condições comerciais, faz e acompanha pedidos, compra vasilhames e cuida da parte financeira da relação com a distribuidora.",
    ],
    problem: [
      "A rotina de uma revenda mistura decisões comerciais e tarefas financeiras: saber o preço do dia e os descontos vigentes, pedir produtos, acompanhar entregas, emitir a segunda via de um boleto ou de uma nota fiscal e controlar parcelas de negociações. O desafio do redesign foi organizar tudo isso em um aplicativo simples de usar no dia a dia, muitas vezes no balcão ou na rua.",
      "Informações sensíveis, como valores, vencimentos e status de pedidos, precisavam ficar claras e fáceis de encontrar, sem exigir contato com a central para tarefas rotineiras.",
    ],
    objective: [
      "Redesenhar a experiência do aplicativo para dar autonomia à revenda: consultar condições, comprar, acompanhar pedidos e resolver pendências financeiras em poucos toques.",
    ],
    processTitle: "O que foi redesenhado",
    process: [
      {
        title: "Início e condições comerciais",
        description:
          "A tela inicial identifica a revenda e traz atalhos para as tarefas mais frequentes, além de campanhas de marketing, portal de compras e conteúdos de capacitação. As condições comerciais mostram, por praça, o prazo, o preço atual de cada embalagem (P13, P20…) nas modalidades CIF e FOB e os descontos vigentes.",
      },
      {
        title: "Central financeira",
        description:
          "Um hub reúne a segunda via de nota fiscal e de boleto, o histórico de pagamentos e as negociações. Os boletos a vencer aparecem logo abaixo, com cores que indicam a proximidade do vencimento.",
      },
      {
        title: "Detalhes da negociação",
        description:
          "Cada negociação resume, em uma única tela, identificação, vencimento, valor negociado, valor da parcela e quantas parcelas já foram pagas e quantas restam.",
      },
      {
        title: "Parcelas e segunda via do boleto",
        description:
          "As negociações ficam agrupadas por ano, com o status de cada vencimento. Das parcelas a pagar, a revenda chega ao boleto, copia o código de barras ou compartilha a segunda via direto do aplicativo.",
      },
      {
        title: "Pedidos e compra de vasilhame",
        description:
          "Os pedidos podem ser filtrados por status — em andamento, aguardando pagamento ou finalizado — e mostram a previsão de entrega, o acompanhamento em etapas e os dados do pedido: embalagem, quantidade, nota fiscal e valores.",
      },
      {
        title: "Gestão de avariados",
        description:
          "Uma área própria organiza o processo de vasilhames avariados: regras, formulário para download, acompanhamento das solicitações, consulta aos tipos de defeito e um histórico mensal de aprovados e reprovados, com o saldo do ano e filtro por mês e ano.",
      },
    ],
    solution: [
      "O redesign organizou o aplicativo em torno das tarefas da revenda. A navegação inferior separa início, financeiro, pedidos e demais recursos, e cada área abre com atalhos para o que é mais usado.",
      "Valores, prazos e status passaram a seguir um mesmo padrão visual de cartões, rótulos e cores, o que facilita a leitura rápida e reduz a dúvida sobre o que precisa de atenção — um boleto perto do vencimento, uma parcela em aberto ou um pedido a caminho.",
    ],
    images: [
      img(
        "home",
        "Duas telas do aplicativo: a tela inicial com atalhos, campanhas de marketing e portal de compras, e a tela de condições comerciais com prazo, preços por embalagem e descontos.",
        "Tela inicial e condições comerciais.",
      ),
      img(
        "finance",
        "Tela Financeiro com atalhos para segunda via de nota fiscal e de boleto, histórico de pagamentos e negociações, e a lista de boletos a vencer.",
        "Central financeira com os boletos a vencer.",
      ),
      img(
        "deal",
        "Tela de detalhes da negociação com identificação, vencimento, valor negociado, parcela, número de parcelas, pagas e restantes.",
        "Resumo de uma negociação.",
      ),
      img(
        "invoice",
        "Três telas: lista de negociações por ano, parcelas a pagar e detalhes do boleto com os botões para copiar o código de barras e compartilhar a segunda via.",
        "Negociações, parcelas e segunda via do boleto.",
      ),
      img(
        "orders",
        "Tela de compra de vasilhame com filtros por status, previsão de entrega, acompanhamento do pedido em etapas e dados de embalagem, quantidade, nota fiscal e valores.",
        "Acompanhamento de pedidos.",
      ),
      img(
        "damaged",
        "Três telas da área de avariados: o menu com regras, formulário, acompanhamento e histórico; o histórico mensal de aprovados e reprovados com o saldo anual; e o filtro por mês e ano.",
        "Gestão de avariados.",
      ),
    ],
    seo: {
      title: "Case Supergasbras — Redesign do App de Revenda",
      description:
        "Redesign do aplicativo de revenda da Supergasbras: condições comerciais, central financeira, negociações, segunda via de boleto e acompanhamento de pedidos.",
    },
  },
  en: {
    ...base,
    name: "Reseller App",
    segment: "Gas distribution (LPG)",
    scope: "Product redesign",
    video: { ...base.video, label: "Video demo of the Supergasbras Reseller App: financial hub, agreement details, order tracking, damaged cylinder history and month filter." },
    summary:
      "Redesign of the app Supergasbras offers its resellers: commercial terms, purchases, orders and finances brought together on the phone.",
    cover: {
      ...base.cover,
      alt: "Two screens of the Supergasbras reseller app: the home screen with marketing campaigns and the purchase portal, and the commercial terms screen with prices and discounts.",
    },
    context: [
      "The Reseller App is Supergasbras’ channel with the gas resellers that distribute its products. Through the app, each reseller checks commercial terms, places and tracks orders, buys cylinders and handles the financial side of its relationship with the distributor.",
    ],
    problem: [
      "A reseller’s routine mixes commercial decisions and financial tasks: knowing today’s price and current discounts, ordering products, tracking deliveries, getting a copy of a bank slip or an invoice and keeping track of installment agreements. The challenge of the redesign was to organize all of this into an app that is easy to use every day, often at the counter or on the road.",
      "Sensitive information such as amounts, due dates and order status had to be clear and easy to find, without requiring a call to the support center for routine tasks.",
    ],
    objective: [
      "Redesign the app experience to give resellers autonomy: check terms, buy, track orders and settle financial matters in just a few taps.",
    ],
    processTitle: "What was redesigned",
    process: [
      {
        title: "Home and commercial terms",
        description:
          "The home screen identifies the reseller and offers shortcuts to the most frequent tasks, along with marketing campaigns, the purchase portal and training content. Commercial terms show, by region, the payment term, the current price of each cylinder size (P13, P20…) under CIF and FOB and the discounts in effect.",
      },
      {
        title: "Financial hub",
        description:
          "A hub brings together invoice and bank slip copies, payment history and installment agreements. Upcoming bank slips appear right below, color-coded by how close they are to the due date.",
      },
      {
        title: "Agreement details",
        description:
          "Each agreement sums up, on a single screen, its ID, due date, negotiated amount, installment amount and how many installments have been paid and how many remain.",
      },
      {
        title: "Installments and bank slip copies",
        description:
          "Agreements are grouped by year, with the status of each due date. From the installments to be paid, the reseller opens the bank slip, copies the barcode or shares a copy straight from the app.",
      },
      {
        title: "Orders and cylinder purchases",
        description:
          "Orders can be filtered by status — in progress, awaiting payment or completed — and show the expected delivery date, step-by-step tracking and order details: cylinder size, quantity, invoice and amounts.",
      },
      {
        title: "Damaged cylinder management",
        description:
          "A dedicated area organizes the damaged cylinder process: rules, a downloadable form, request tracking, a guide to defect types and a monthly history of approved and rejected items, with the yearly balance and a month and year filter.",
      },
    ],
    solution: [
      "The redesign organized the app around the reseller’s tasks. The bottom navigation separates home, finances, orders and other features, and each area opens with shortcuts to what is used most.",
      "Amounts, deadlines and statuses now follow the same visual pattern of cards, labels and colors, which makes them quick to read and removes doubt about what needs attention — a bank slip close to its due date, an open installment or an order on its way.",
    ],
    images: [
      img(
        "home",
        "Two app screens: the home screen with shortcuts, marketing campaigns and the purchase portal, and the commercial terms screen with payment term, prices by cylinder size and discounts.",
        "Home screen and commercial terms.",
      ),
      img(
        "finance",
        "Finance screen with shortcuts to invoice and bank slip copies, payment history and agreements, and the list of upcoming bank slips.",
        "Financial hub with upcoming bank slips.",
      ),
      img(
        "deal",
        "Agreement details screen with ID, due date, negotiated amount, installment, number of installments, paid and remaining.",
        "Summary of an agreement.",
      ),
      img(
        "invoice",
        "Three screens: agreements by year, installments to be paid and bank slip details with buttons to copy the barcode and share a copy.",
        "Agreements, installments and bank slip copies.",
      ),
      img(
        "orders",
        "Cylinder purchase screen with status filters, expected delivery, step-by-step order tracking and details on cylinder size, quantity, invoice and amounts.",
        "Order tracking.",
      ),
      img(
        "damaged",
        "Three screens of the damaged cylinder area: the menu with rules, form, tracking and history; the monthly history of approved and rejected items with the yearly balance; and the month and year filter.",
        "Damaged cylinder management.",
      ),
    ],
    seo: {
      title: "Supergasbras case — Reseller App redesign",
      description:
        "Redesign of the Supergasbras reseller app: commercial terms, financial hub, installment agreements, bank slip copies and order tracking.",
    },
  },
  es: {
    ...base,
    name: "App de Reventa",
    segment: "Distribución de gas (GLP)",
    scope: "Rediseño de producto",
    video: { ...base.video, label: "Demostración en video de la App de Reventa de Supergasbras: centro financiero, detalles de una negociación, seguimiento de pedidos, historial de cilindros averiados y filtro por mes." },
    summary:
      "Rediseño de la aplicación que Supergasbras ofrece a sus revendedores: condiciones comerciales, compras, pedidos y finanzas reunidos en el celular.",
    cover: {
      ...base.cover,
      alt: "Dos pantallas de la aplicación de reventa de Supergasbras: la pantalla de inicio con campañas de marketing y portal de compras, y la pantalla de condiciones comerciales con precios y descuentos.",
    },
    context: [
      "La App de Reventa es el canal de Supergasbras con los revendedores de gas que distribuyen sus productos. A través de la aplicación, cada revendedor consulta las condiciones comerciales, hace y sigue pedidos, compra cilindros y gestiona la parte financiera de su relación con la distribuidora.",
    ],
    problem: [
      "La rutina de un revendedor combina decisiones comerciales y tareas financieras: conocer el precio del día y los descuentos vigentes, pedir productos, seguir entregas, obtener la segunda vía de una boleta de pago o de una factura y controlar las cuotas de las negociaciones. El desafío del rediseño fue organizar todo esto en una aplicación sencilla de usar en el día a día, muchas veces en el mostrador o en la calle.",
      "La información sensible, como montos, vencimientos y estado de los pedidos, debía quedar clara y fácil de encontrar, sin tener que contactar a la central para tareas rutinarias.",
    ],
    objective: [
      "Rediseñar la experiencia de la aplicación para dar autonomía al revendedor: consultar condiciones, comprar, seguir pedidos y resolver pendientes financieros con pocos toques.",
    ],
    processTitle: "Qué se rediseñó",
    process: [
      {
        title: "Inicio y condiciones comerciales",
        description:
          "La pantalla de inicio identifica al revendedor y ofrece accesos directos a las tareas más frecuentes, además de campañas de marketing, portal de compras y contenidos de capacitación. Las condiciones comerciales muestran, por plaza, el plazo, el precio actual de cada envase (P13, P20…) en las modalidades CIF y FOB y los descuentos vigentes.",
      },
      {
        title: "Centro financiero",
        description:
          "Un hub reúne la segunda vía de factura y de boleta, el historial de pagos y las negociaciones. Las boletas por vencer aparecen justo debajo, con colores que indican la cercanía del vencimiento.",
      },
      {
        title: "Detalles de la negociación",
        description:
          "Cada negociación resume, en una sola pantalla, identificación, vencimiento, monto negociado, valor de la cuota y cuántas cuotas ya se pagaron y cuántas faltan.",
      },
      {
        title: "Cuotas y segunda vía de la boleta",
        description:
          "Las negociaciones se agrupan por año, con el estado de cada vencimiento. Desde las cuotas por pagar, el revendedor llega a la boleta, copia el código de barras o comparte la segunda vía directamente desde la aplicación.",
      },
      {
        title: "Pedidos y compra de cilindros",
        description:
          "Los pedidos se pueden filtrar por estado — en curso, esperando pago o finalizado — y muestran la previsión de entrega, el seguimiento por etapas y los datos del pedido: envase, cantidad, factura y montos.",
      },
      {
        title: "Gestión de cilindros averiados",
        description:
          "Un área propia organiza el proceso de cilindros averiados: reglas, formulario para descargar, seguimiento de las solicitudes, consulta de los tipos de defecto y un historial mensual de aprobados y rechazados, con el saldo del año y filtro por mes y año.",
      },
    ],
    solution: [
      "El rediseño organizó la aplicación en torno a las tareas del revendedor. La navegación inferior separa inicio, finanzas, pedidos y demás recursos, y cada área se abre con accesos directos a lo más usado.",
      "Montos, plazos y estados pasaron a seguir un mismo patrón visual de tarjetas, etiquetas y colores, lo que facilita la lectura rápida y reduce las dudas sobre lo que requiere atención: una boleta cerca del vencimiento, una cuota pendiente o un pedido en camino.",
    ],
    images: [
      img(
        "home",
        "Dos pantallas de la aplicación: el inicio con accesos directos, campañas de marketing y portal de compras, y las condiciones comerciales con plazo, precios por envase y descuentos.",
        "Inicio y condiciones comerciales.",
      ),
      img(
        "finance",
        "Pantalla Financiero con accesos a la segunda vía de factura y de boleta, historial de pagos y negociaciones, y la lista de boletas por vencer.",
        "Centro financiero con las boletas por vencer.",
      ),
      img(
        "deal",
        "Pantalla de detalles de la negociación con identificación, vencimiento, monto negociado, cuota, número de cuotas, pagadas y restantes.",
        "Resumen de una negociación.",
      ),
      img(
        "invoice",
        "Tres pantallas: negociaciones por año, cuotas por pagar y detalles de la boleta con botones para copiar el código de barras y compartir la segunda vía.",
        "Negociaciones, cuotas y segunda vía de la boleta.",
      ),
      img(
        "orders",
        "Pantalla de compra de cilindros con filtros por estado, previsión de entrega, seguimiento del pedido por etapas y datos de envase, cantidad, factura y montos.",
        "Seguimiento de pedidos.",
      ),
      img(
        "damaged",
        "Tres pantallas del área de averiados: el menú con reglas, formulario, seguimiento e historial; el historial mensual de aprobados y rechazados con el saldo anual; y el filtro por mes y año.",
        "Gestión de cilindros averiados.",
      ),
    ],
    seo: {
      title: "Caso Supergasbras — App de Reventa",
      description:
        "Rediseño de la aplicación de reventa de Supergasbras: condiciones comerciales, centro financiero, negociaciones, segunda vía de boleta y seguimiento de pedidos.",
    },
  },
};
