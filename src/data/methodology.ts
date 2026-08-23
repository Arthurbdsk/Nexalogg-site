export type MethodologyStage = {
  id: string;
  order: string;
  title: string;
  /** Definição oficial da etapa no material institucional. */
  definition: string;
  /** Desdobramento operacional da etapa. */
  detail: string;
  /** Entregas associadas à etapa. */
  deliverables: string[];
};

/** Programa D90: as quatro etapas apresentadas pela NEXALLOG. */
export const methodologyStages: MethodologyStage[] = [
  {
    id: 'diagnostico',
    order: '01',
    title: 'Diagnóstico',
    definition:
      'Coleta e análise de dados gerenciais, operacionais e projeções financeiras.',
    detail:
      'A etapa parte dos números da empresa. Dados gerenciais, operacionais e projeções financeiras são reunidos e organizados para que a leitura do negócio deixe de depender de percepção e passe a ser sustentada por informação.',
    deliverables: [
      'Leitura consolidada dos dados gerenciais',
      'Análise operacional',
      'Projeções financeiras',
    ],
  },
  {
    id: 'identificacao',
    order: '02',
    title: 'Identificação',
    definition: 'Mapeamento das causas estruturais por área e processo.',
    detail:
      'Com os dados organizados, o trabalho passa a separar sintoma de causa. Cada desvio é rastreado até a área e o processo que o originam, o que evita ação sobre efeito e concentra o esforço onde o resultado é decidido.',
    deliverables: [
      'Causas estruturais mapeadas por área',
      'Leitura por processo',
      'Priorização das frentes críticas',
    ],
  },
  {
    id: 'plano-de-acao',
    order: '03',
    title: 'Plano de Ação',
    definition: 'Direcionamento claro, objetivo e priorizado para 90 dias.',
    detail:
      'O diagnóstico vira direção. O plano define o que será feito, em que ordem e sob qual responsabilidade dentro de uma janela de 90 dias, com prioridade definida pelo impacto no resultado.',
    deliverables: [
      'Plano de até 90 dias',
      'Prioridades definidas',
      'Responsabilidades atribuídas',
    ],
  },
  {
    id: 'execucao',
    order: '04',
    title: 'Execução',
    definition:
      'Suporte direto da NEXALLOG e da rede de parceiros especializada.',
    detail:
      'O plano é acompanhado de perto. A NEXALLOG atua junto ao time da empresa e aciona a rede de parceiros especializados nas frentes que exigem competência técnica específica.',
    deliverables: [
      'Acompanhamento da execução',
      'Suporte direto da equipe NEXALLOG',
      'Rede de parceiros especializados acionada por frente',
    ],
  },
];

/** Resultado apresentado pela empresa ao final do programa. */
export const methodologyOutcome =
  'Organização financeira, clareza de causa-raiz e um plano pronto para execução.';

export type ExpectedResult = {
  id: string;
  title: string;
  description: string;
};

/** Resultados esperados, conforme o material institucional. */
export const expectedResults: ExpectedResult[] = [
  {
    id: 'plano',
    title: 'Plano de ação de até 90 dias, claro e objetivo',
    description:
      'Uma rota de trabalho definida, com prioridades explícitas e escopo delimitado para a janela de 90 dias.',
  },
  {
    id: 'decisoes',
    title: 'Decisões baseadas em dados e informação assertiva',
    description:
      'A gestão passa a decidir sobre uma base numérica consolidada, e não sobre percepção isolada de cada área.',
  },
  {
    id: 'diagnostico',
    title: 'Diagnóstico preciso dos problemas estruturais por área',
    description:
      'Cada causa estrutural é atribuída à área e ao processo em que se origina, com leitura de impacto no resultado.',
  },
  {
    id: 'execucao',
    title: 'Suporte direto na execução, com equipe e rede de parceiros NEXALLOG',
    description:
      'O plano não é entregue e encerrado. A execução é acompanhada pela equipe NEXALLOG e pela rede de parceiros especializados.',
  },
];
