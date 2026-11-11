import type { Service } from "@/types/content";

/**
 * Especialidades da Fiapo de Manga.
 * `headline`, `description` e `skills` reproduzem o copy aprovado no briefing.
 * O bloco `page` complementa as páginas individuais com conteúdo próprio
 * de cada rota, sem promessas de resultado.
 */
export const services: Service[] = [
  {
    number: "01",
    slug: "pesquisa-ux-discovery",
    name: "Pesquisa e Discovery",
    headline: "Entender antes de decidir.",
    description: [
      "Investigamos comportamentos, necessidades e dificuldades para identificar problemas reais e oportunidades de negócio.",
      "Combinamos métodos qualitativos e quantitativos para compreender contextos, validar hipóteses e apoiar decisões de produto com evidências.",
    ],
    skills: [
      "UX Research",
      "Discovery",
      "Entrevistas",
      "Pesquisa Qualitativa",
      "Pesquisa Quantitativa",
      "Testes de Usabilidade",
      "Jornada do Usuário",
      "Diagnóstico de Experiência",
      "Mapeamento de Oportunidades",
    ],
    page: {
      h1: "UX Research e Discovery para decisões de produto com evidências",
      whenItHelps: [
        "Antes de iniciar um novo produto, para saber se o problema existe e para quem ele importa.",
        "Quando métricas indicam abandono ou baixa adoção, mas ninguém sabe exatamente por quê.",
        "Quando a equipe tem muitas ideias e precisa decidir por onde começar.",
        "Antes de um redesign, para preservar o que funciona e corrigir o que atrapalha.",
      ],
      deliverables: [
        "Plano de pesquisa com perguntas, métodos e perfis de participantes",
        "Roteiros e condução de entrevistas e testes",
        "Síntese de achados com evidências organizadas",
        "Mapas de jornada e de oportunidades",
        "Recomendações priorizadas para as próximas decisões",
      ],
      related: ["estrategia-de-produto", "product-design-ux-ui", "ecommerce"],
    },
    seo: {
      title: "UX Research e Discovery",
      description:
        "Pesquisa UX e Discovery para entender comportamentos, validar hipóteses e apoiar decisões de produto com evidências. Entrevistas, testes de usabilidade e jornadas.",
      keywords: ["pesquisa UX", "UX Research", "Discovery", "testes de usabilidade", "jornada do usuário"],
    },
  },
  {
    number: "02",
    slug: "estrategia-de-produto",
    name: "Estratégia de Produto",
    headline: "Boas decisões constroem produtos melhores.",
    description: [
      "Conectamos objetivos de negócio às necessidades das pessoas para definir prioridades, validar caminhos e orientar a evolução de produtos digitais.",
      "Apoiamos equipes na identificação de oportunidades e na construção de estratégias que façam sentido para o contexto de cada projeto.",
    ],
    skills: [
      "Product Strategy",
      "Diagnóstico de Produto",
      "Priorização",
      "MVP",
      "Roadmap",
      "Métricas",
      "Estratégia UX",
      "Validação de Hipóteses",
    ],
    page: {
      h1: "Estratégia de produto digital: prioridades claras, caminhos validados",
      whenItHelps: [
        "Quando o roadmap cresce mais rápido do que a capacidade de entregar.",
        "Quando é preciso definir o escopo de um MVP sem perder o que é essencial.",
        "Quando produto, negócio e tecnologia precisam de uma visão compartilhada.",
        "Quando faltam métricas para saber se o produto está evoluindo na direção certa.",
      ],
      deliverables: [
        "Diagnóstico do produto e do contexto de negócio",
        "Mapa de oportunidades e critérios de priorização",
        "Definição de escopo de MVP",
        "Roadmap orientado a objetivos",
        "Indicadores para acompanhar a evolução",
      ],
      related: ["pesquisa-ux-discovery", "product-design-ux-ui", "aplicativos-sistemas-plataformas"],
    },
    seo: {
      title: "Estratégia de Produto Digital",
      description:
        "Consultoria em estratégia de produto: diagnóstico, priorização, definição de MVP, roadmap e métricas que conectam objetivos de negócio às necessidades das pessoas.",
      keywords: ["estratégia de produto", "product strategy", "MVP", "roadmap de produto"],
    },
  },
  {
    number: "03",
    slug: "product-design-ux-ui",
    name: "Product Design e UX/UI",
    headline: "Experiências pensadas para quem usa.",
    description: [
      "Projetamos produtos digitais que equilibram as necessidades dos usuários aos objetivos de negócio.",
      "Transformamos problemas complexos em jornadas, fluxos e interfaces mais simples, intuitivos e consistentes.",
      "Nosso processo considera a experiência completa, da primeira interação à evolução contínua do produto.",
    ],
    skills: [
      "Product Design",
      "UX Design",
      "UI Design",
      "Arquitetura da Informação",
      "Wireframes",
      "Prototipação",
      "Design Systems",
      "Testes de Interface",
      "Redesign de Produtos",
    ],
    page: {
      h1: "Product Design e UX/UI: design de produtos digitais centrado nas pessoas",
      whenItHelps: [
        "Quando um produto cresceu e as interfaces ficaram inconsistentes.",
        "Quando fluxos importantes geram dúvidas, erros ou chamados de suporte.",
        "Quando uma ideia validada precisa virar jornadas, telas e protótipos.",
        "Quando a equipe precisa de um design system para ganhar consistência e velocidade.",
      ],
      deliverables: [
        "Arquitetura da informação e fluxos de navegação",
        "Wireframes e protótipos navegáveis",
        "Interfaces de alta fidelidade",
        "Design system e documentação de componentes",
        "Testes de interface e ajustes a partir dos aprendizados",
      ],
      related: ["pesquisa-ux-discovery", "aplicativos-sistemas-plataformas", "criacao-de-sites"],
    },
    seo: {
      title: "Product Design e UX/UI — Design de Produtos Digitais",
      description:
        "Design de produtos digitais com UX e UI: arquitetura da informação, wireframes, prototipação, design systems e redesign de interfaces centrados em quem usa.",
      keywords: ["Product Design", "UX/UI", "design de interfaces", "design system", "prototipação"],
    },
  },
  {
    number: "04",
    slug: "criacao-de-sites",
    name: "Sites",
    headline: "Seu negócio bem apresentado, em qualquer tela.",
    description: [
      "Criamos sites institucionais, portfólios e landing pages bonitos, rápidos e fáceis de usar no celular.",
      "Cada página é pensada para o seu cliente encontrar o que procura e falar com você em poucos cliques.",
      "Domínio, hospedagem, segurança e ajustes ficam com a gente.",
    ],
    skills: [
      "Sites institucionais",
      "Landing pages",
      "Portfólios",
      "Cardápios digitais",
      "Sites com agendamento",
      "WhatsApp e Google Maps",
      "Pronto para o Google",
      "Rápido no celular",
      "Renovação de sites antigos",
    ],
    cta: { label: "Vamos criar seu site", href: "/contato?tipo=site" },
    page: {
      h1: "Criação de sites profissionais para o seu negócio",
      whenItHelps: [
        "Quando o seu negócio ainda não tem site, ou tem um que não ajuda.",
        "Quando o cliente procura você no Google e não encontra.",
        "Quando o site atual é lento, desatualizado ou ruim de usar no celular.",
        "Quando você precisa de uma página para um lançamento ou campanha.",
      ],
      deliverables: [
        "Site pronto e publicado, com domínio",
        "Visual com a cara da sua marca, feito primeiro para o celular",
        "Botão de WhatsApp, mapa e formulário de contato",
        "Base para aparecer no Google: títulos, descrições e sitemap",
        "Ajustes mensais, segurança e atualizações",
      ],
      related: ["ecommerce", "aplicativos-sistemas-plataformas"],
    },
    seo: {
      title: "Criação de Sites Profissionais e Landing Pages",
      description:
        "Criação de sites institucionais, portfólios e landing pages modernos, rápidos e prontos para o celular e para o Google, com domínio, hospedagem e ajustes inclusos.",
      keywords: ["criação de sites", "site para empresa", "sites institucionais", "landing pages"],
    },
  },
  {
    number: "05",
    slug: "aplicativos-sistemas-plataformas",
    name: "Aplicativos e Sistemas",
    headline: "Quando o seu negócio precisa de algo sob medida.",
    description: [
      "Criamos aplicativos, sistemas e plataformas para quem precisa ir além do site: área do cliente, agendamentos, painéis e ferramentas internas.",
      "Começamos entendendo como o seu negócio funciona, para entregar algo simples de usar desde o primeiro dia.",
    ],
    skills: [
      "Aplicativos",
      "Sistemas internos",
      "Áreas do cliente",
      "Painéis e relatórios",
      "Plataformas on-line",
      "Automação de processos",
      "Primeira versão (MVP)",
      "Modernização de sistemas",
    ],
    cta: { label: "Conte sua ideia", href: "/contato?tipo=sistema" },
    page: {
      h1: "Criação de aplicativos e sistemas sob medida",
      whenItHelps: [
        "Quando planilhas e mensagens já não dão conta da operação.",
        "Quando seus clientes precisam de uma área para acompanhar pedidos ou serviços.",
        "Quando um sistema antigo atrapalha mais do que ajuda.",
        "Quando você tem uma ideia de produto e quer tirar do papel.",
      ],
      deliverables: [
        "Entendimento do seu processo e das regras do negócio",
        "Telas simples para web e celular",
        "Painéis com as informações que importam",
        "Primeira versão para testar com clientes reais",
        "Evolução contínua depois do lançamento",
      ],
      related: ["criacao-de-sites", "ecommerce"],
    },
    seo: {
      title: "Criação de Aplicativos e Sistemas Sob Medida",
      description:
        "Aplicativos, sistemas internos, áreas do cliente e plataformas on-line sob medida, simples de usar e feitos a partir de como o seu negócio funciona.",
      keywords: ["criação de aplicativos", "sistema sob medida", "área do cliente", "plataformas digitais"],
    },
  },
  {
    number: "06",
    slug: "ecommerce",
    name: "Lojas virtuais",
    headline: "Venda pela internet sem complicação.",
    description: [
      "Montamos a sua loja virtual completa: catálogo, carrinho, pagamento pelo Mercado Pago, frete e painel de pedidos.",
      "Tudo pensado para o seu cliente achar o produto e comprar sem desistir no meio do caminho.",
    ],
    skills: [
      "Lojas virtuais",
      "Catálogos com pedido pelo WhatsApp",
      "Pagamento pelo Mercado Pago",
      "Cálculo de frete",
      "Cupons de desconto",
      "Painel de pedidos",
      "Produtos digitais",
      "Checkout simples",
    ],
    cta: { label: "Quero vender on-line", href: "/contato?tipo=ecommerce" },
    page: {
      h1: "Criação de loja virtual: venda pela internet com pagamento, frete e painel",
      whenItHelps: [
        "Quando você vende pelo WhatsApp ou Instagram e quer organizar os pedidos.",
        "Quando quer vender para clientes de fora da sua cidade.",
        "Quando a loja atual é difícil de usar ou cobra comissão sobre cada venda.",
        "Quando o catálogo cresceu e o cliente não acha o que procura.",
      ],
      deliverables: [
        "Loja publicada, com domínio e certificado de segurança",
        "Catálogo com fotos, preços, variações e busca",
        "Pagamento por cartão, Pix e boleto pelo Mercado Pago",
        "Cálculo de frete e painel de pedidos",
        "Ajustes mensais, segurança e atualizações",
      ],
      related: ["criacao-de-sites", "aplicativos-sistemas-plataformas"],
    },
    seo: {
      title: "Criação de Loja Virtual (E-commerce)",
      description:
        "Criação de loja virtual completa: catálogo, pagamento por cartão, Pix e boleto pelo Mercado Pago, frete e painel de pedidos, sem comissão sobre as vendas.",
      keywords: ["criação de loja virtual", "e-commerce", "loja online", "vender pela internet"],
    },
  },
  {
    number: "07",
    slug: "design-tecnologia-ia",
    name: "Design, Tecnologia e IA",
    headline: "A tecnologia acelera. O entendimento faz a diferença.",
    description: [
      "Incorporamos inteligência artificial ao processo de criação para explorar alternativas, acelerar protótipos e apoiar o desenvolvimento de produtos digitais.",
      "Utilizamos a tecnologia para reduzir atividades operacionais e abrir mais espaço para o trabalho estratégico.",
      "Na criação de sites, aplicativos e plataformas, a IA pode ajudar a encurtar ciclos de desenvolvimento, permitindo testar e aprimorar soluções com mais agilidade.",
      "As decisões continuam fundamentadas em pesquisa, validação e experiência profissional.",
    ],
    skills: [
      "IA aplicada ao Design",
      "Prototipação Acelerada",
      "Desenvolvimento Assistido",
      "Automação",
      "Análise de Informações",
      "Exploração de Interfaces",
      "Apoio a Testes",
      "Otimização",
    ],
    page: {
      h1: "Inteligência artificial aplicada ao design e ao desenvolvimento digital",
      whenItHelps: [
        "Quando é preciso testar várias alternativas de interface em pouco tempo.",
        "Quando um volume grande de informações de pesquisa precisa ser organizado.",
        "Quando tarefas repetitivas consomem o tempo que deveria ir para a estratégia.",
        "Quando um site ou produto precisa sair do protótipo com mais agilidade.",
      ],
      deliverables: [
        "Protótipos acelerados com apoio de IA e revisão profissional",
        "Exploração de alternativas de interface",
        "Apoio à organização e análise de informações",
        "Automação de etapas operacionais do processo",
        "Desenvolvimento assistido com revisão técnica",
      ],
      related: ["criacao-de-sites", "product-design-ux-ui", "pesquisa-ux-discovery"],
    },
    seo: {
      title: "Inteligência Artificial aplicada ao Design",
      description:
        "IA aplicada ao design e ao desenvolvimento: prototipação acelerada, exploração de interfaces, automação e desenvolvimento assistido, com decisões orientadas por pesquisa.",
      keywords: ["IA aplicada ao design", "inteligência artificial", "prototipação acelerada", "desenvolvimento assistido por IA"],
    },
  },
];

/** Formas de atuação (página O que fazemos) */
export const practices = [
  {
    number: "01",
    title: "Consultoria e Estratégia",
    description:
      "Investigamos problemas, analisamos oportunidades e ajudamos empresas a tomar decisões mais fundamentadas sobre seus produtos e experiências digitais.",
    items: [
      "Pesquisa e Discovery",
      "Estratégia de Produto",
      "Diagnóstico de Experiência",
      "Validação de Hipóteses",
      "Consultoria UX",
      "Evolução de Produtos",
    ],
  },
  {
    number: "02",
    title: "Estúdio de Produtos Digitais",
    description:
      "Projetamos e desenvolvemos experiências digitais de ponta a ponta, conectando pesquisa, UX/UI, prototipação e tecnologia em um processo colaborativo.",
    items: [
      "Product Design",
      "UX/UI",
      "Sites",
      "Aplicativos",
      "Sistemas",
      "Plataformas Digitais",
      "E-commerce",
      "Desenvolvimento assistido por IA",
    ],
  },
] as const;

/**
 * Especialidades listadas em português (posicionamento: sites e lojas virtuais).
 * As demais continuam com página própria e em inglês/espanhol, mas não aparecem nas listas em português.
 */
export const ptListedServices = ["criacao-de-sites", "ecommerce", "aplicativos-sistemas-plataformas"] as const;

export function listedServices<T extends { slug: string; number: string }>(locale: string, all: readonly T[]): T[] {
  if (locale !== "pt") return [...all];
  return ptListedServices
    .map((slug) => all.find((s) => s.slug === slug))
    .filter((s): s is T => Boolean(s))
    .map((s, i) => ({ ...s, number: String(i + 1).padStart(2, "0") }));
}
