export type SolutionArea = {
  slug: string;
  name: string;
  /** Nome curto usado no diagrama de ecossistema. */
  shortName: string;
  /** Uma linha, exibida no card e na órbita. */
  summary: string;
  /** Parágrafo de abertura da página da área. */
  intro: string;
  /** Frentes de trabalho cobertas pela área. */
  fronts: string[];
  /** Sinais que costumam indicar atenção nessa frente. */
  signals: string[];
  /** Posição angular no diagrama de ecossistema (graus). */
  angle: number;
};

export const solutionAreas: SolutionArea[] = [
  {
    slug: 'pessoas-e-time',
    name: 'Pessoas & Time',
    shortName: 'Pessoas',
    summary: 'Estrutura, papéis e maturidade técnica do time.',
    intro:
      'Nenhum plano avança além do que o time consegue sustentar. Tratamos estrutura, papéis e maturidade técnica das posições críticas.',
    fronts: [
      'Desenho de estrutura e papéis por área',
      'Clareza de responsabilidades na execução do plano',
      'Maturidade técnica das posições críticas',
      'Direção e prioridade para os times',
    ],
    signals: ['Times sem direção', 'Baixa maturidade técnica', 'Engajamento comprometido'],
    angle: 270,
  },
  {
    slug: 'processos-administrativos',
    name: 'Processos Administrativos',
    shortName: 'Processos',
    summary: 'Rotinas administrativas e base gerencial confiável.',
    intro:
      'O resultado gerencial nasce da rotina administrativa. Organizamos os processos que alimentam o DRE gerencial e os controles internos.',
    fronts: [
      'Rotinas administrativas e controles internos',
      'Base de dados que alimenta o DRE gerencial',
      'Padronização de processos entre áreas',
      'Indicadores gerenciais recorrentes',
    ],
    signals: [
      'Ausência de DRE gerencial confiável',
      'Indicadores dispersos entre áreas',
      'Gestão no improviso',
    ],
    angle: 310,
  },
  {
    slug: 'operacoes',
    name: 'Operações',
    shortName: 'Operações',
    summary: 'Produtividade, custo de servir e nível de serviço.',
    intro:
      'A operação é onde o custo se forma e o nível de serviço é decidido. Trabalhamos produtividade, custo de servir e consistência da entrega.',
    fronts: [
      'Produtividade operacional',
      'Custo de servir por operação, rota ou cliente',
      'Nível de serviço e consistência da entrega',
      'Estrutura de indicadores operacionais',
    ],
    signals: [
      'Custos crescendo fora de proporção com a receita',
      'Margem sob pressão',
      'Decisões sem dados operacionais consolidados',
    ],
    angle: 350,
  },
  {
    slug: 'comercial-e-growth',
    name: 'Comercial & Growth',
    shortName: 'Comercial',
    summary: 'Funil, prospecção e share of wallet.',
    intro:
      'Crescimento previsível depende de funil. Estruturamos a prospecção e trabalhamos o share of wallet da base já conquistada.',
    fronts: [
      'Estruturação do funil comercial',
      'Processo de prospecção',
      'Share of wallet da base atual',
      'Alinhamento entre preço, custo de servir e margem',
    ],
    signals: ['Comercial sem funil', 'Prospecção fraca', 'Share of wallet subutilizado'],
    angle: 30,
  },
  {
    slug: 'tecnologia',
    name: 'Tecnologia',
    shortName: 'Tecnologia',
    summary: 'Arquitetura de sistemas e integração de dados.',
    intro:
      'A tecnologia precisa sustentar o nível de serviço prometido. Avaliamos arquitetura, integração e qualidade do dado que chega à gestão.',
    fronts: [
      'Avaliação da arquitetura de sistemas',
      'Integração entre sistemas e fontes de dado',
      'Qualidade e confiabilidade da informação gerencial',
      'Adequação das ferramentas ao nível de serviço',
    ],
    signals: [
      'Tecnologia defasada',
      'Ferramentas abaixo do nível de serviço necessário',
      'Controles paralelos fora dos sistemas',
    ],
    angle: 70,
  },
  {
    slug: 'wms-tms',
    name: 'WMS / TMS',
    shortName: 'WMS / TMS',
    summary: 'Sistemas de armazenagem e de transporte.',
    intro:
      'WMS e TMS são o centro do controle logístico. Tratamos seleção, implantação e uso efetivo desses sistemas no dia a dia.',
    fronts: [
      'Seleção e adequação de WMS e TMS',
      'Implantação e parametrização',
      'Aderência do time ao processo do sistema',
      'Informação de armazenagem e transporte na gestão',
    ],
    signals: [
      'Sistemas que não conversam entre si',
      'Processo real diferente do processo do sistema',
      'Controles em planilhas paralelas',
    ],
    angle: 110,
  },
  {
    slug: 'automacao',
    name: 'Automação',
    shortName: 'Automação',
    summary: 'Eliminação de retrabalho e ganho de escala.',
    intro:
      'Automação bem aplicada devolve tempo ao time. Identificamos onde ela gera ganho real e onde o processo precisa ser organizado antes.',
    fronts: [
      'Mapeamento de rotinas manuais e retrabalho',
      'Priorização do que deve ser automatizado',
      'Automação de fluxos administrativos e operacionais',
      'Ganho de escala sem aumento proporcional de custo',
    ],
    signals: [
      'Retrabalho recorrente entre áreas',
      'Rotinas manuais em pontos críticos',
      'Escala limitada pelo processo',
    ],
    angle: 150,
  },
  {
    slug: 'real-estate-e-facilities',
    name: 'Real Estate & Facilities',
    shortName: 'Real Estate',
    summary: 'Ativos físicos, malha e infraestrutura.',
    intro:
      'A estrutura física condiciona o custo logístico. Tratamos adequação de ativos, localização e infraestrutura da operação.',
    fronts: [
      'Adequação de ativos e áreas operacionais',
      'Localização e desenho de malha',
      'Infraestrutura e manutenção predial',
      'Custo de ocupação dentro do custo total',
    ],
    signals: [
      'Estrutura física desalinhada do volume operado',
      'Custo de ocupação sem leitura no resultado',
      'Limitações de infraestrutura afetando o serviço',
    ],
    angle: 190,
  },
  {
    slug: 'fiscal-e-juridico',
    name: 'Fiscal & Jurídico',
    shortName: 'Fiscal',
    summary: 'Enquadramento, contratos e exposição a risco.',
    intro:
      'Decisão financeira sem leitura fiscal é decisão incompleta. Conduzimos enquadramento, contratos e exposição a risco com a rede de parceiros.',
    fronts: [
      'Leitura fiscal aplicada à operação logística',
      'Contratos com clientes, parceiros e fornecedores',
      'Exposição a risco e passivos',
      'Suporte especializado da rede de parceiros',
    ],
    signals: [
      'Impacto fiscal fora do cálculo de margem',
      'Contratos desatualizados frente à operação atual',
      'Risco jurídico sem acompanhamento estruturado',
    ],
    angle: 230,
  },
];

export const getSolutionArea = (slug: string) =>
  solutionAreas.find((area) => area.slug === slug);

/**
 * Pilares institucionais, conforme o manual da marca NEXALLOG.
 * Os textos reproduzem o propósito oficial e não devem ser reescritos sem
 * validação da empresa.
 */
export const principles = [
  {
    id: 'conectamos',
    title: 'Conectamos',
    description: 'Criamos conexões que geram valor entre pessoas, empresas e oportunidades.',
  },
  {
    id: 'movimentamos',
    title: 'Movimentamos',
    description: 'Transformamos caminhos em oportunidades, com inteligência e eficiência.',
  },
  {
    id: 'geramos-resultados',
    title: 'Geramos resultados',
    description: 'Entregamos impacto com eficiência, para impulsionar negócios e o futuro.',
  },
  {
    id: 'olhamos-para-o-futuro',
    title: 'Olhamos para o futuro',
    description: 'Inovamos hoje para construir o amanhã da operação logística.',
  },
] as const;
