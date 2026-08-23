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

  /** Canais de contato. Preencher quando os dados oficiais forem definidos. */
  contact: {
    email: { value: null, label: null } as { value: string | null; label: string | null },
    phone: { value: null, label: null } as { value: string | null; label: string | null },
    whatsapp: { value: null, label: null } as { value: string | null; label: string | null },
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
   * Alexandre Felix, conforme o material institucional.
   * `photo` aceita um caminho em /public (ex.: '/images/alexandre-felix.jpg')
   * e `bio` aceita parágrafos que serão renderizados na ordem informada.
   * Enquanto estiverem vazios, a seção é exibida em sua composição gráfica,
   * sem qualquer marcador de conteúdo pendente.
   */
  advisor: {
    name: 'Alexandre Felix',
    role: 'Advisor, Board Member e Consultor de Transformação Logística',
    photo: null as string | null,
    photoAlt: '' as string,
    bio: [] as string[],
    linkedin: '' as string,
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
