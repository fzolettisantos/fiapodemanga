import type { homeContent } from "@/content/home";
import type {
  aboutPageContent,
  contactPageContent,
  insightsPageContent,
  projectsPageContent,
  servicesPageContent,
} from "@/content/pages";
import type { practices } from "@/content/services";
import type { ArticleCategory, Service } from "@/types/content";
import type { ProjectTypeValue } from "@/content/contact";

/** Remove os tipos literais (`as const`) para que EN/ES tenham a mesma forma com outros textos. */
export type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : T extends object
      ? { -readonly [K in keyof T]: Widen<T[K]> }
      : T;

type PageMeta = { title: string; description: string };

export type PrivacySection = {
  title: string;
  paragraphs?: string[];
  list?: string[];
  after?: string[];
};

/**
 * Todo o conteúdo do site em um idioma.
 * O TypeScript garante que EN e ES tenham exatamente os mesmos campos do português.
 */
export type SiteContent = {
  site: {
    name: string;
    tagline: string;
    centralMessage: string;
    description: string;
    ogAlt: string;
    knowsAbout: string[];
  };
  nav: {
    items: { label: string; href: string }[];
    contact: { label: string; href: string };
    home: string;
  };
  meta: {
    home: PageMeta;
    services: PageMeta;
    about: PageMeta;
    projects: PageMeta;
    insights: PageMeta;
    contact: PageMeta;
    privacy: PageMeta;
    notFound: { title: string };
  };
  ui: {
    skipToContent: string;
    homeAria: string;
    mainNavigation: string;
    menu: string;
    menuNavigation: string;
    close: string;
    breadcrumb: string;
    themeToggle: string;
    themeToLight: string;
    themeToDark: string;
    language: string;
    languageCurrent: string;
    footer: {
      navigation: string;
      specialties: string;
      institutional: string;
      insights: string;
      privacy: string;
      rights: string;
    };
    marquee: { specialties: string; skills: string };
    servicesPage: {
      practicesEyebrow: string;
      practicesItems: string;
      specialtiesNav: string;
      skillsLabel: string;
      learnMore: string; // "Saiba mais sobre {name}"
      skillsCount: string; // "{n} competências"
    };
    serviceDetail: {
      skills: string;
      whenItHelps: string;
      deliverables: string;
      deliverablesNote: string;
      related: string;
      all: string;
      next: string; // "Próxima: {name}"
      ctaDefault: string;
    };
    home: { aiApplications: string; aiLink: string };
    about: { principles: string; guides: string };
    projects: {
      selected: string;
      list: string;
      narrativeEyebrow: string;
      narrative: { title: string; description: string }[];
      viewAll: string;
      viewCase: string;
      videoPause: string;
      videoPlay: string;
      scope: string;
      segment: string;
      client: string;
      year: string;
      specialties: string;
      images: string;
      sections: {
        context: string;
        problem: string;
        objective: string;
        research: string;
        hypotheses: string;
        process: string;
        solution: string;
        results: string;
        learnings: string;
      };
    };
    slider: {
      region: string;
      roleSlide: string;
      roleCarousel: string;
      list: string;
      previous: string;
      next: string;
      of: string; // "de"
      item: string; // "Projeto"
    };
    insights: {
      categories: string;
      articles: string;
      empty: string;
      emptyDescription: string;
      relatedServices: string;
      readAlso: string;
    };
    contact: { orWrite: string; formRegion: string };
    /** Botão de WhatsApp (aparece só com NEXT_PUBLIC_WHATSAPP_NUMBER configurado) */
    whatsapp: { label: string; message: string; orChat: string };
    badgeAria: string;
    /** Balão de fala da Luli no hero */
    mascot: {
      label: string;
      next: string;
      phrases: { line1: string; line2: string }[];
    };
    notFound: { eyebrow: string; title: string; description: string; home: string; services: string };
  };
  form: {
    /** "{mark}" é substituído pelo asterisco */
    required: string;
    requiredSr: string;
    name: string;
    email: string;
    company: string;
    optional: string;
    projectType: string;
    select: string;
    message: string;
    messageHint: string;
    honeypot: string;
    consentBefore: string;
    consentLink: string;
    consentAfter: string;
    submit: string;
    sending: string;
    sendingSr: string;
    oneError: string;
    manyErrors: string; // "Há {n} campos para revisar."
    successEyebrow: string;
    successTitle: string;
    successText: string;
    sendAnother: string;
    networkError: string;
    genericError: string;
  };
  validation: {
    nameRequired: string;
    tooLong: string; // "Use até {max} caracteres."
    emailRequired: string;
    emailInvalid: string;
    projectType: string;
    messageShort: string; // "... (mínimo de {min} caracteres)."
    consent: string;
  };
  api: {
    forbidden: string;
    badFormat: string;
    rateLimited: string;
    tooLarge: string;
    unreadable: string;
    spam: string;
    validation: string;
    notConfigured: string;
    sendFailed: string;
  };
  projectTypes: Record<ProjectTypeValue, string>;
  articleCategories: Record<ArticleCategory, string>;
  home: Widen<typeof homeContent>;
  servicesPage: Widen<typeof servicesPageContent>;
  aboutPage: Widen<typeof aboutPageContent>;
  projectsPage: Widen<typeof projectsPageContent>;
  insightsPage: Widen<typeof insightsPageContent>;
  contactPage: Widen<typeof contactPageContent>;
  services: Service[];
  practices: Widen<typeof practices>;
  showcase: Record<string, { title: string; category: string; alt: string }>;
  privacy: {
    eyebrow: string;
    title: string;
    updatedLabel: string;
    updated: string;
    intro: string; // "{controller}" é substituído
    sections: PrivacySection[];
    contactTitle: string;
    contactWithEmail: string; // "... escreva para {email}."
    contactWithForm: { before: string; link: string; after: string };
    changesTitle: string;
    changes: string;
  };
};
