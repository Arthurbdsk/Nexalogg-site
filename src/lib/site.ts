/**
 * Configuração central da NEXALLOG.
 *
 * Todo dado institucional editável do site vive aqui. Ao receber as informações
 * oficiais (telefone, e-mail, CNPJ, endereço, redes sociais, IDs de analytics),
 * basta preencher os campos abaixo: nenhuma outra parte do código precisa mudar.
 *
 * Campos com valor `null` ou string vazia são tratados como "ainda não informado"
 * e simplesmente não são renderizados, nunca aparecendo como placeholder no site.
 */

export type ContactChannel = {
  /** Valor bruto usado em href (ex.: "contato@dominio.com" ou "+5511999999999"). */
  value: string | null;
  /** Rótulo exibido. Quando ausente, o próprio value é exibido. */
  label?: string;
};

export type SocialLink = {
  name: string;
  href: string;
};

export const siteConfig = {
  name: 'NEXALLOG',
  legalName: '', // preencher com a razão social oficial
  tagline: 'Conectando caminhos, gerando resultados.',
  description:
    'A NEXALLOG atua com empresas e empresários de Transportes e Logística em diagnóstico financeiro e operacional, identificação de causas estruturais, plano de ação de 90 dias e suporte na execução.',
  shortDescription:
    'Diagnóstico, plano de ação e execução para empresas de transporte e logística.',
  locale: 'pt-BR',
  country: 'BR',

  /** Domínio de produção. Alterável por variável de ambiente. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.nexallog.com.br').replace(/\/$/, ''),

  /** Canais de contato oficiais. */
  contact: {
    email: {
      value: 'alexandre.felix@nexallog.com',
      label: 'alexandre.felix@nexallog.com',
    } as { value: string | null; label: string | null },
    phone: {
      value: '+5511981468028',
      label: '+55 11 98146-8028',
    } as { value: string | null; label: string | null },
    // Mesmo número do telefone. Deixe value como null para ocultar o canal.
    whatsapp: {
      value: '+5511981468028',
      label: '+55 11 98146-8028',
    } as { value: string | null; label: string | null },
  },

  /** Endereço oficial. Preencher para habilitar exibição e schema PostalAddress. */
  address: {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'BR',
  },

  /** Documentos legais. Usados na Política de Privacidade e no rodapé. */
  legal: {
    cnpj: '',
    /** Encarregado de dados (DPO) exigido pela LGPD. */
    dpoName: '',
    dpoEmail: '',
    /** Data da última atualização dos documentos legais. */
    lastUpdated: '2026-08-23',
  },

  /**
   * Alexandre Felix, Founder e Senior Advisor.
   * `photo` aceita um caminho em /public. `summary` aceita parágrafos de texto
   * corrido e `highlights` a lista de trajetória exibida na seção de liderança.
   * O QR code do LinkedIn é gerado por `npm run qr:generate`.
   */
  advisor: {
    name: 'Alexandre Felix',
    role: 'Founder e Senior Advisor',
    photo: '/images/alexandre-felix.jpg' as string | null,
    photoAlt: 'Alexandre Felix, Founder e Senior Advisor da NEXALLOG',
    /** Anos de experiência. Usado no indicador numérico da seção. */
    experienceYears: 25,
    experienceLabel: 'anos em operações, logística e supply chain',
    summary: [] as string[],
    highlights: [
      'Liderou transformações operacionais e programas de eficiência em empresas globais e nacionais',
      'Experiência em redes logísticas, centros de distribuição e operações de alta escala',
      'Posições de CEO e COO em empresas como CEVA Logistics, AGV Logística, Katoen Natie e Loggi',
      'Especialista em reconfiguração de malhas e captura de eficiência',
    ],
    education: [
      'Engenheiro de Produção',
      'MBA Executivo pela FGV',
      'Formação executiva pela Stanford Graduate School of Business',
    ],
    linkedin: 'https://www.linkedin.com/in/alexandrefelix75',
    /** QR code estático do perfil, gerado a partir da URL acima. */
    linkedinQr: '/images/qr-linkedin-alexandre-felix.svg',
  },

  /** Somente redes oficiais confirmadas devem ser adicionadas. */
  social: [] as SocialLink[],

  /** IDs de analytics. Vazios = nenhum script de terceiro é carregado. */
  analytics: {
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? '',
    gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? '',
  },

  /** Chamadas para ação usadas em todo o site. */
  cta: {
    primary: 'Falar com a NEXALLOG',
    hero: 'Conectar com a NEXALLOG',
    methodology: 'Conhecer o Programa D90',
    form: 'Enviar solicitação',
  },

  /** Imagem padrão de Open Graph. */
  ogImage: '/images/og-nexallog.png',
} as const;

export type SiteConfig = typeof siteConfig;

/** Há algum canal de contato direto configurado? */
export const hasDirectContact =
  Boolean(siteConfig.contact.email.value) ||
  Boolean(siteConfig.contact.phone.value) ||
  Boolean(siteConfig.contact.whatsapp.value);

export const absoluteUrl = (path = '/') =>
  `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
