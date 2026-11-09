import type { ExpressionState, PeriodKind, RankingKind, RankingSlug, TabSlug } from "@/papo-reto/types";

export interface RankingCopy {
  slug: RankingSlug;
  kind: RankingKind;
  /** Rótulo curto da aba. */
  tabLabel: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  /** Período padrão (pode ser alterado no banco). */
  defaultPeriod: PeriodKind;
  /** Selo exibido para quem está no topo e na lanterna — não depende de cor. */
  badges: { top: string; bottom: string };
  /** Descrição de cada expressão (texto alternativo e legenda das caricaturas). */
  expressions: Record<ExpressionState, string>;
  /** Frases humorísticas por estado. A escolha é estável por participante. */
  phrases: Record<ExpressionState, string[]>;
  /** Mensagem de compartilhamento quando há um líder isolado e votos reais. */
  leaderMessage: (name: string) => string;
}

export const RANKINGS: Record<RankingSlug, RankingCopy> = {
  "falou-merda": {
    slug: "falou-merda",
    kind: "negative",
    tabLabel: "Falou Mais Merda",
    title: "Troféu Falou Merda",
    subtitle: "Aqui o primeiro lugar é uma vergonha.",
    description:
      "Tem opinião ruim, tem opinião péssima e tem aquelas que deveriam ser proibidas pelo Estatuto do Torcedor. Vote em quem mais falou besteira com a confiança de quem sabe tudo.",
    cta: "Votar nessa figura",
    defaultPeriod: "weekly",
    badges: { top: "Líder da vergonha", bottom: "Escapou (por enquanto)" },
    expressions: {
      top: "assustado, olhos arregalados, cara de quem se complicou",
      middle: "olhando para cima, desconfiado e preocupado",
      bottom: "sorrindo, aliviado e debochado",
      neutral: "expressão neutra",
    },
    phrases: {
      top: [
        "Falou com convicção. Era melhor ter ficado quieto.",
        "O povo ouviu. E não perdoou.",
        "Desligar o microfone teria sido um favor.",
      ],
      middle: [
        "Tá chegando perigosamente perto do topo.",
        "Olhando pra cima e torcendo pra não subir.",
        "Mais uma besteira e assume a liderança.",
      ],
      bottom: [
        "Por enquanto, escapou da vergonha.",
        "Rindo dos outros. Por enquanto.",
        "Falou pouco. Ou falou bem. Ninguém sabe.",
      ],
      neutral: ["Ninguém se destacou na besteira. Ainda."],
    },
    leaderMessage: (name) => `${name} lidera o Troféu Falou Merda. O povo não perdoou!`,
  },
  sabio: {
    slug: "sabio",
    kind: "positive",
    tabLabel: "O Mais Sábio",
    title: "O Sábio da Resenha",
    subtitle: "Milagrosamente, alguém falou algo que presta.",
    description:
      "No meio de tanta barbaridade, sempre aparece uma opinião sensata. Quem merece o título de cérebro do Papo Reto?",
    cta: "Dar moral pra esse",
    defaultPeriod: "weekly",
    badges: { top: "Cérebro do Papo Reto", bottom: "Lanterna da sabedoria" },
    expressions: {
      top: "confiante e orgulhoso, sorriso de superioridade",
      middle: "pensativo, observador e concentrado",
      bottom: "confuso e sem graça, tentando parecer inteligente",
      neutral: "expressão neutra",
    },
    phrases: {
      top: [
        "Aconteceu o impossível: virou referência.",
        "Pose de sábio, sorriso de quem acertou.",
        "Milagrosamente, falou algo que presta.",
      ],
      middle: [
        "Pensando bem… quase lá.",
        "Observa, analisa e espera a vez dele.",
        "Tem lampejos de lucidez.",
      ],
      bottom: [
        "Tentando parecer inteligente. Não colou.",
        "A sabedoria passou longe dessa vez.",
        "Fez cara de sério, mas o povo percebeu.",
      ],
      neutral: ["O título de cérebro do Papo Reto está vago."],
    },
    leaderMessage: (name) => `Aconteceu o impossível: ${name} virou o sábio do Papo Reto!`,
  },
  "bala-do-veio": {
    slug: "bala-do-veio",
    kind: "negative",
    tabLabel: "Bala do Véio",
    title: "Quem vai levar Bala do Véio?",
    subtitle: "Falou demais? Agora aguenta a bronca.",
    description:
      "Tem gente que não perde a oportunidade de provocar. Escolha quem mais merece entrar na mira da corneta do Véio.",
    cta: "Botar na mira",
    defaultPeriod: "weekly",
    badges: { top: "Na mira do Véio", bottom: "Longe da bronca" },
    expressions: {
      top: "apavorado e tenso, esperando a bronca",
      middle: "apreensivo, olhando para cima, tentando escapar da mira",
      bottom: "aliviado e rindo, feliz por ter escapado",
      neutral: "expressão neutra",
    },
    phrases: {
      top: [
        "Já pode ir se preparando pra bronca.",
        "Tá na mira. E o Véio não erra.",
        "Falou demais. Agora aguenta.",
      ],
      middle: [
        "Apreensivo, tentando sair da mira.",
        "Uma provocação a mais e a bronca é dele.",
        "Olhando pra cima e rezando.",
      ],
      bottom: [
        "Escapou da bronca. Por enquanto.",
        "Rindo de quem tá na mira.",
        "Fazendo pouco caso. Perigoso.",
      ],
      neutral: ["O Véio ainda está escolhendo o alvo."],
    },
    leaderMessage: (name) => `Segundo o povo, ${name} tá pedindo uma bronca do Véio!`,
  },
};

export const CHARGES_COPY = {
  slug: "charges" as const,
  tabLabel: "Charges do Oberdan",
  title: "As Charges do Oberdan",
  subtitle: "Se virou charge, virou história.",
  description:
    "O futebol já é uma comédia. Nas mãos do Oberdan, a resenha ganha desenho, personalidade e ainda mais zoeira.",
  cta: "Ver as charges",
};

export function tabLabel(slug: TabSlug) {
  return slug === "charges" ? CHARGES_COPY.tabLabel : RANKINGS[slug].tabLabel;
}

/** Hash simples e estável (FNV-1a) para escolher frases sem aleatoriedade entre servidor e cliente. */
export function stableHash(value: string) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export function pickPhrase(slug: RankingSlug, state: ExpressionState, participantSlug: string, position = 0) {
  const list = RANKINGS[slug].phrases[state];
  // A posição entra na conta para que vizinhos no mesmo estado não repitam a frase.
  return list[(stableHash(`${slug}:${participantSlug}`) + position) % list.length]!;
}
