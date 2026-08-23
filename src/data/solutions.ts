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
      'Nenhum plano avança além do que o time consegue sustentar. A frente de Pessoas trata da estrutura da equipe, da clareza de papéis e da maturidade técnica necessária para que a execução aconteça dentro da janela de 90 dias.',
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
      'O resultado gerencial nasce da rotina administrativa. Esta frente organiza os processos que alimentam o DRE gerencial, os controles internos e a base de informação que sustenta a decisão.',
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
      'A operação é onde o custo se forma e o nível de serviço é decidido. Esta frente trabalha a produtividade, o custo de servir e a consistência da entrega, conectando o que acontece no dia a dia ao resultado financeiro.',
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
      'Crescimento previsível depende de funil. Esta frente estrutura a prospecção, organiza o funil comercial e trabalha o share of wallet da base já conquistada.',
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
      'A tecnologia precisa sustentar o nível de serviço prometido ao cliente. Esta frente avalia a arquitetura de sistemas, a integração entre eles e a qualidade do dado que chega à gestão.',
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
      'WMS e TMS são o centro do controle logístico. Esta frente trata da seleção, da implantação e do uso efetivo desses sistemas, da parametrização à aderência do time ao processo desenhado.',
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
      'Automação bem aplicada devolve tempo ao time e reduz erro de processo. Esta frente identifica onde a automação gera ganho real e onde a prioridade ainda é organizar o processo antes de automatizar.',
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
      'A estrutura física condiciona o custo logístico. Esta frente trata da adequação dos ativos, da localização e da infraestrutura que suporta a operação no dia a dia.',
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
      'Decisão financeira sem leitura fiscal e jurídica é decisão incompleta. Esta frente é conduzida com a rede de parceiros especializados e trata do enquadramento, dos contratos e da exposição a risco da operação.',
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

/** Princípios institucionais da NEXALLOG. */
export const principles = [
  {
    id: 'conectamos',
    title: 'Conectamos',
    description:
      'Caminhos, pessoas e empresas. A NEXALLOG aproxima quem decide, quem executa e quem tem a competência técnica para resolver.',
  },
  {
    id: 'movimentamos',
    title: 'Movimentamos',
    description:
      'Diagnóstico vira direção e direção vira execução. O trabalho acompanha o plano até que ele produza efeito na operação.',
  },
  {
    id: 'geramos-resultados',
    title: 'Geramos resultados',
    description:
      'Soluções simples, aplicadas sobre causa estrutural, que geram resultados consistentes e impulsionam o futuro da empresa.',
  },
] as const;
