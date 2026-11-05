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
    name: "Sites e Experiências Web",
    headline: "Sua presença digital precisa funcionar tão bem quanto parece.",
    description: [
      "Criamos sites e experiências web que combinam identidade, clareza, usabilidade e desempenho.",
      "Da estrutura do conteúdo à implementação, cada decisão considera a experiência de navegação e os objetivos do negócio.",
      "Utilizamos ferramentas contemporâneas, incluindo inteligência artificial, para acelerar etapas de prototipação e desenvolvimento sem abrir mão da revisão profissional e da qualidade da entrega.",
    ],
    skills: [
      "Criação de Sites",
      "Sites Institucionais",
      "Landing Pages",
      "Desenvolvimento Web",
      "Redesign",
      "SEO Técnico",
      "Acessibilidade",
      "Performance",
      "Design Responsivo",
    ],
    cta: { label: "Vamos criar seu site", href: "/contato?tipo=site" },
    page: {
      h1: "Criação de sites profissionais: institucionais, landing pages e experiências web",
      whenItHelps: [
        "Quando o site atual não comunica o que a empresa faz hoje.",
        "Quando é preciso lançar uma landing page para um produto, serviço ou campanha.",
        "Quando o site é lento, difícil de atualizar ou não funciona bem no celular.",
        "Quando a presença digital precisa ser encontrada em buscas orgânicas.",
      ],
      deliverables: [
        "Estrutura de conteúdo e arquitetura das páginas",
        "Design responsivo alinhado à identidade da marca",
        "Desenvolvimento com foco em desempenho e acessibilidade",
        "Base de SEO técnico: metadados, sitemap e dados estruturados",
        "Revisão profissional antes da publicação",
      ],
      related: ["product-design-ux-ui", "design-tecnologia-ia", "ecommerce"],
    },
    seo: {
      title: "Criação de Sites Profissionais e Landing Pages",
      description:
        "Criação e desenvolvimento de sites institucionais e landing pages com design responsivo, SEO técnico, acessibilidade e performance, do conteúdo à implementação.",
      keywords: ["criação de sites", "desenvolvimento de sites", "sites institucionais", "landing pages"],
    },
  },
  {
    number: "05",
    slug: "aplicativos-sistemas-plataformas",
    name: "Aplicativos, Sistemas e Plataformas",
    headline: "Simplicidade para experiências complexas.",
    description: [
      "Projetamos aplicativos, sistemas corporativos e plataformas digitais que tornam tarefas mais claras, processos mais eficientes e experiências mais intuitivas.",
      "Combinamos entendimento do negócio, pesquisa com usuários e design de interfaces para organizar informações e reduzir a complexidade do uso.",
    ],
    skills: [
      "Aplicativos",
      "UX/UI Mobile",
      "Sistemas Corporativos",
      "SaaS",
      "Dashboards",
      "Plataformas B2B/B2C",
      "Modernização de Sistemas",
      "MVPs",
    ],
    page: {
      h1: "Design de aplicativos e UX/UI para sistemas corporativos, SaaS e plataformas",
      whenItHelps: [
        "Quando um sistema interno exige treinamento demais para tarefas simples.",
        "Quando dashboards têm muitos dados e pouca clareza para decidir.",
        "Quando um sistema legado precisa ser modernizado sem interromper a operação.",
        "Quando um aplicativo ou SaaS precisa de um MVP bem definido para chegar ao mercado.",
      ],
      deliverables: [
        "Mapeamento de tarefas, perfis e regras de negócio",
        "Fluxos e arquitetura de informação para cenários complexos",
        "Interfaces para web e mobile",
        "Dashboards orientados à tomada de decisão",
        "Protótipos para validação com pessoas usuárias",
      ],
      related: ["product-design-ux-ui", "estrategia-de-produto", "pesquisa-ux-discovery"],
    },
    seo: {
      title: "Design de Aplicativos, Sistemas Corporativos e SaaS",
      description:
        "UX/UI para aplicativos, sistemas corporativos, SaaS, dashboards e plataformas B2B/B2C. Organizamos informações e reduzimos a complexidade do uso.",
      keywords: ["design de aplicativos", "UX para sistemas corporativos", "SaaS", "dashboards", "plataformas digitais"],
    },
  },
  {
    number: "06",
    slug: "ecommerce",
    name: "E-commerce e Experiência de Compra",
    headline: "Jornadas de compra com menos obstáculos.",
    description: [
      "Desenhamos experiências de comércio digital que facilitam a descoberta de produtos, a navegação e a conclusão de compras.",
      "Analisamos a jornada para identificar atritos, compreender comportamentos e encontrar oportunidades de melhoria.",
    ],
    skills: [
      "UX para E-commerce",
      "Lojas Virtuais",
      "Catálogos",
      "Navegação",
      "Busca e Filtros",
      "Checkout",
      "Conversão",
      "Testes de Usabilidade",
      "Redesign",
    ],
    page: {
      h1: "UX para e-commerce: experiências de compra mais simples",
      whenItHelps: [
        "Quando muitas pessoas chegam ao carrinho, mas poucas concluem a compra.",
        "Quando o catálogo cresceu e encontrar produtos ficou difícil.",
        "Quando a busca e os filtros não ajudam a decidir.",
        "Antes de migrar ou redesenhar uma loja virtual.",
      ],
      deliverables: [
        "Análise da jornada de compra e identificação de atritos",
        "Revisão de navegação, catálogo, busca e filtros",
        "Desenho de páginas de produto, carrinho e checkout",
        "Testes de usabilidade com pessoas compradoras",
        "Recomendações priorizadas de melhoria",
      ],
      related: ["pesquisa-ux-discovery", "criacao-de-sites", "product-design-ux-ui"],
    },
    seo: {
      title: "UX para E-commerce e Experiência de Compra",
      description:
        "UX para e-commerce e lojas virtuais: navegação, catálogo, busca, filtros e checkout desenhados para reduzir atritos na jornada de compra.",
      keywords: ["UX para e-commerce", "loja virtual", "checkout", "experiência de compra"],
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

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServicePath(slug: string): string {
  return `/servicos/${slug}`;
}

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
