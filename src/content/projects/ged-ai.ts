import type { Locale } from "@/i18n/config";
import type { ImageAsset, Project } from "@/types/content";

/**
 * Case GED.AI — redesign do produto.
 * Conteúdo baseado nas telas do produto e no escopo informado (redesign).
 * Não inclui métricas ou resultados: adicione em `results` somente dados comprovados.
 */
const dir = "/images/projetos/ged-ai";
const shot = (file: string, alt: string, caption: string, height = 792): ImageAsset => ({
  src: `${dir}/${file}`,
  alt,
  caption,
  width: 1184,
  height,
});

const base = {
  slug: "ged-ai",
  name: "ged.ai",
  services: ["aplicativos-sistemas-plataformas", "product-design-ux-ui", "design-tecnologia-ia"],
  cover: { src: `${dir}/capa.webp`, alt: "", width: 1600, height: 1568 },
  // Demonstração montada com as telas reais (scripts/case-video/ged-ai)
  video: { mp4: `${dir}/demo.mp4`, webm: `${dir}/demo.webm`, poster: `${dir}/demo-poster.webp`, width: 1600, height: 900 },
  publishedAt: "2026-11-06",
};

export const gedAi: Record<Locale, Project> = {
  pt: {
    ...base,
    segment: "Gestão eletrônica de documentos",
    video: { ...base.video, label: "Demonstração em vídeo da plataforma ged.ai: navegação pela lista de documentos, cadastro em etapas, gerenciamento, filtros e histórico com resumo por IA." },
    scope: "Redesign de produto",
    summary:
      "Redesign de uma plataforma de gestão eletrônica de documentos com inteligência artificial: da organização e da busca ao histórico e às aprovações.",
    cover: { ...base.cover, alt: "Notebook exibindo a tela de controle de documentos da plataforma ged.ai." },
    context: [
      "O ged.ai é uma plataforma de gestão eletrônica de documentos (GED) com inteligência artificial. Ela reúne em um só lugar o armazenamento, a organização, a aprovação e o histórico de documentos de diferentes áreas de uma empresa — jurídico, financeiro, TI, RH, entre outras.",
    ],
    problem: [
      "Uma plataforma de GED concentra muitos documentos, pastas, metadados e pessoas envolvidas. O desafio do redesign foi tornar mais claras e rápidas as tarefas do dia a dia — encontrar um documento, cadastrá-lo com as informações certas, acompanhar aprovações e entender o que mudou — sem perder o controle que processos de conformidade e auditoria exigem.",
      "A inteligência artificial também precisava fazer parte da rotina de forma natural, ajudando a resumir e a orientar, em vez de ficar escondida em uma funcionalidade à parte.",
    ],
    objective: [
      "Redesenhar a experiência do produto para simplificar a organização e a busca de documentos, dar visibilidade a aprovações, confidencialidade e prazos e integrar a IA ao fluxo de trabalho.",
    ],
    research: [],
    hypotheses: [],
    processTitle: "O que foi redesenhado",
    process: [
      {
        title: "Controle de documentos",
        description:
          "Uma lista central mostra, de relance, o tipo do arquivo, o aprovador, a confidencialidade, as tags (como vencimento próximo) e o departamento de cada documento.",
      },
      {
        title: "Cadastro guiado em etapas",
        description:
          "Inserir documentos virou um passo a passo: selecionar ou criar a pasta, adicionar metadados, escolher os arquivos e finalizar.",
      },
      {
        title: "Gerenciamento de documentos",
        description:
          "Um painel lateral reúne os metadados — data de emissão, texto, valor, aprovador, confidencialidade, tags, departamento e código — sem tirar a pessoa da lista.",
      },
      {
        title: "Filtros dinâmicos e tour guiado",
        description:
          "A busca filtra por propriedades com operadores de comparação e lógicos, e um tour de boas-vindas apresenta cada recurso da tela.",
      },
      {
        title: "Histórico com IA e assistente",
        description:
          "Cada documento tem uma linha do tempo de atividades com resumo por IA, e um assistente conversacional orienta o uso da base de conhecimento, do apoio operacional e da busca.",
      },
    ],
    solution: [
      "O redesign reorganizou a plataforma em torno do documento. As informações que mais importam para decidir — quem aprova, se é confidencial, quando vence e de qual área é — ficaram visíveis na lista. As tarefas mais longas, como cadastrar e filtrar, ganharam fluxos guiados.",
      "A inteligência artificial entrou onde ajuda a economizar leitura e cliques: no resumo do histórico de cada documento e no assistente que responde dentro da própria plataforma.",
    ],
    results: [],
    learnings: [],
    images: [
      shot(
        "controle-de-documentos.webp",
        "Lista de documentos do ged.ai com aprovador, confidencialidade, tags e departamento, e o assistente conversacional aberto no canto da tela.",
        "Controle de documentos com o assistente conversacional.",
      ),
      shot(
        "cadastro-em-etapas.webp",
        "Fluxo de cadastro em quatro etapas, com a seleção de pastas por área: financeiro, TI, jurídico, RH e outras.",
        "Cadastro guiado em etapas, começando pela pasta.",
      ),
      shot(
        "gerenciamento.webp",
        "Painel lateral de gerenciamento de documentos com campos de metadados, tags e departamento.",
        "Gerenciamento de metadados sem sair da lista.",
      ),
      shot(
        "filtros-e-tour.webp",
        "Filtro dinâmico por propriedade e operador, com um balão do tour guiado explicando o recurso.",
        "Filtros dinâmicos e tour guiado.",
      ),
      shot(
        "historico-e-ia.webp",
        "Histórico do documento em linha do tempo, com o botão Resumo com I.A.",
        "Histórico em linha do tempo com resumo por IA.",
        928,
      ),
    ],
    seo: {
      title: "Case ged.ai — Redesign de Plataforma de GED",
      description:
        "Redesign da plataforma ged.ai de gestão eletrônica de documentos: controle, cadastro guiado, filtros dinâmicos, histórico e IA integrada ao fluxo.",
    },
  },
  en: {
    ...base,
    segment: "Electronic document management",
    video: { ...base.video, label: "Video demo of the ged.ai platform: browsing the document list, step-by-step upload, document management, filters and history with an AI summary." },
    scope: "Product redesign",
    summary:
      "Redesign of an AI-powered electronic document management platform: from organizing and searching to history and approvals.",
    cover: { ...base.cover, alt: "Laptop showing the document control screen of the ged.ai platform." },
    context: [
      "ged.ai is an AI-powered electronic document management (EDM) platform. It brings together the storage, organization, approval and history of documents from different areas of a company — legal, finance, IT, HR and more.",
    ],
    problem: [
      "An EDM platform holds many documents, folders, metadata and people. The challenge of the redesign was to make everyday tasks clearer and faster — finding a document, registering it with the right information, following approvals and understanding what changed — without losing the control that compliance and audit processes require.",
      "Artificial intelligence also needed to become a natural part of the routine, helping to summarize and guide instead of sitting in a separate feature.",
    ],
    objective: [
      "Redesign the product experience to simplify organizing and searching for documents, give visibility to approvals, confidentiality and deadlines, and bring AI into the workflow.",
    ],
    research: [],
    hypotheses: [],
    processTitle: "What was redesigned",
    process: [
      {
        title: "Document control",
        description:
          "A central list shows at a glance each document’s file type, approver, confidentiality, tags (such as upcoming due dates) and department.",
      },
      {
        title: "Guided, step-by-step upload",
        description:
          "Adding documents became a step-by-step flow: select or create a folder, add metadata, choose the files and finish.",
      },
      {
        title: "Document management",
        description:
          "A side panel brings together the metadata — issue date, text, amount, approver, confidentiality, tags, department and code — without leaving the list.",
      },
      {
        title: "Dynamic filters and guided tour",
        description:
          "Search filters by property with comparison and logical operators, and a welcome tour introduces each feature on the screen.",
      },
      {
        title: "AI-powered history and assistant",
        description:
          "Each document has an activity timeline with an AI summary, and a conversational assistant guides people through the knowledge base, operational support and search.",
      },
    ],
    solution: [
      "The redesign reorganized the platform around the document. The information that matters most for decisions — who approves it, whether it’s confidential, when it’s due and which area it belongs to — became visible in the list. Longer tasks, such as uploading and filtering, got guided flows.",
      "Artificial intelligence came in where it saves reading and clicks: in the summary of each document’s history and in the assistant that answers right inside the platform.",
    ],
    results: [],
    learnings: [],
    images: [
      shot(
        "controle-de-documentos.webp",
        "ged.ai document list with approver, confidentiality, tags and department, and the conversational assistant open in the corner of the screen.",
        "Document control with the conversational assistant.",
      ),
      shot(
        "cadastro-em-etapas.webp",
        "Four-step upload flow, with folder selection by area: finance, IT, legal, HR and others.",
        "Guided upload in steps, starting with the folder.",
      ),
      shot(
        "gerenciamento.webp",
        "Side panel for document management with metadata fields, tags and department.",
        "Metadata management without leaving the list.",
      ),
      shot(
        "filtros-e-tour.webp",
        "Dynamic filter by property and operator, with a guided tour tooltip explaining the feature.",
        "Dynamic filters and guided tour.",
      ),
      shot(
        "historico-e-ia.webp",
        "Document history as a timeline, with the AI Summary button.",
        "Timeline history with AI summary.",
        928,
      ),
    ],
    seo: {
      title: "ged.ai Case — AI-Powered EDM Platform Redesign",
      description:
        "Redesign of the ged.ai electronic document management platform: document control, guided upload, dynamic filters, history and AI built into the workflow.",
    },
  },
  es: {
    ...base,
    segment: "Gestión electrónica de documentos",
    video: { ...base.video, label: "Demostración en video de la plataforma ged.ai: navegación por la lista de documentos, registro por etapas, gestión, filtros e historial con resumen por IA." },
    scope: "Rediseño de producto",
    summary:
      "Rediseño de una plataforma de gestión electrónica de documentos con inteligencia artificial: de la organización y la búsqueda al historial y las aprobaciones.",
    cover: { ...base.cover, alt: "Laptop con la pantalla de control de documentos de la plataforma ged.ai." },
    context: [
      "ged.ai es una plataforma de gestión electrónica de documentos (GED) con inteligencia artificial. Reúne en un solo lugar el almacenamiento, la organización, la aprobación y el historial de los documentos de distintas áreas de una empresa: jurídico, finanzas, TI, RR. HH. y otras.",
    ],
    problem: [
      "Una plataforma de GED concentra muchos documentos, carpetas, metadatos y personas. El desafío del rediseño fue hacer más claras y rápidas las tareas del día a día —encontrar un documento, registrarlo con la información correcta, seguir las aprobaciones y entender qué cambió— sin perder el control que exigen los procesos de cumplimiento y auditoría.",
      "La inteligencia artificial también tenía que formar parte de la rutina de manera natural, ayudando a resumir y a orientar, en lugar de quedar escondida en una función aparte.",
    ],
    objective: [
      "Rediseñar la experiencia del producto para simplificar la organización y la búsqueda de documentos, dar visibilidad a las aprobaciones, la confidencialidad y los plazos, e integrar la IA al flujo de trabajo.",
    ],
    research: [],
    hypotheses: [],
    processTitle: "Qué se rediseñó",
    process: [
      {
        title: "Control de documentos",
        description:
          "Una lista central muestra de un vistazo el tipo de archivo, el aprobador, la confidencialidad, las etiquetas (como vencimiento próximo) y el departamento de cada documento.",
      },
      {
        title: "Registro guiado por etapas",
        description:
          "Agregar documentos se convirtió en un paso a paso: seleccionar o crear la carpeta, agregar metadatos, elegir los archivos y finalizar.",
      },
      {
        title: "Gestión de documentos",
        description:
          "Un panel lateral reúne los metadatos —fecha de emisión, texto, valor, aprobador, confidencialidad, etiquetas, departamento y código— sin salir de la lista.",
      },
      {
        title: "Filtros dinámicos y recorrido guiado",
        description:
          "La búsqueda filtra por propiedades con operadores de comparación y lógicos, y un recorrido de bienvenida presenta cada función de la pantalla.",
      },
      {
        title: "Historial con IA y asistente",
        description:
          "Cada documento tiene una línea de tiempo de actividades con resumen por IA, y un asistente conversacional orienta el uso de la base de conocimiento, el apoyo operativo y la búsqueda.",
      },
    ],
    solution: [
      "El rediseño reorganizó la plataforma alrededor del documento. La información más importante para decidir —quién aprueba, si es confidencial, cuándo vence y de qué área es— quedó visible en la lista. Las tareas más largas, como registrar y filtrar, ganaron flujos guiados.",
      "La inteligencia artificial entró donde ayuda a ahorrar lectura y clics: en el resumen del historial de cada documento y en el asistente que responde dentro de la propia plataforma.",
    ],
    results: [],
    learnings: [],
    images: [
      shot(
        "controle-de-documentos.webp",
        "Lista de documentos de ged.ai con aprobador, confidencialidad, etiquetas y departamento, y el asistente conversacional abierto en la esquina de la pantalla.",
        "Control de documentos con el asistente conversacional.",
      ),
      shot(
        "cadastro-em-etapas.webp",
        "Flujo de registro en cuatro etapas, con la selección de carpetas por área: finanzas, TI, jurídico, RR. HH. y otras.",
        "Registro guiado por etapas, empezando por la carpeta.",
      ),
      shot(
        "gerenciamento.webp",
        "Panel lateral de gestión de documentos con campos de metadatos, etiquetas y departamento.",
        "Gestión de metadatos sin salir de la lista.",
      ),
      shot(
        "filtros-e-tour.webp",
        "Filtro dinámico por propiedad y operador, con un globo del recorrido guiado que explica la función.",
        "Filtros dinámicos y recorrido guiado.",
      ),
      shot(
        "historico-e-ia.webp",
        "Historial del documento en línea de tiempo, con el botón Resumen con IA.",
        "Historial en línea de tiempo con resumen por IA.",
        928,
      ),
    ],
    seo: {
      title: "Caso ged.ai — Rediseño de Plataforma de GED",
      description:
        "Rediseño de la plataforma ged.ai de gestión electrónica de documentos: control, registro guiado, filtros dinámicos, historial e IA integrada al flujo.",
    },
  },
};
