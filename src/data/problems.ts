export type Problem = {
  id: string;
  index: string;
  title: string;
  /** Frase curta usada na navegação lateral. */
  summary: string;
  /** Texto exibido no painel central da seção. */
  description: string;
  /** Sinais concretos observados na operação. */
  signals: string[];
};

/**
 * Os cinco problemas estruturais apresentados no material institucional.
 * Nenhum dado quantitativo é atribuído a eles.
 */
export const problems: Problem[] = [
  {
    id: 'decisoes-sem-dados',
    index: '01',
    title: 'Decisões sem dados',
    summary: 'Gestão no improviso e ausência de DRE gerencial confiável.',
    description:
      'Sem DRE gerencial confiável, cada área trabalha com uma versão diferente do mesmo número.',
    signals: [
      'Gestão no improviso',
      'Ausência de DRE gerencial confiável',
      'Indicadores dispersos entre áreas',
    ],
  },
  {
    id: 'margem-sob-pressao',
    index: '02',
    title: 'Margem sob pressão',
    summary: 'Custos crescendo fora de proporção com a receita.',
    description:
      'A receita cresce e o resultado não acompanha, porque o custo de servir não é lido por operação.',
    signals: [
      'Custos crescendo fora de proporção com a receita',
      'Margem sob pressão',
      'Custo de servir sem visibilidade por operação',
    ],
  },
  {
    id: 'time-sem-direcao',
    index: '03',
    title: 'Time sem direção',
    summary: 'Baixa maturidade técnica e engajamento comprometido.',
    description:
      'Sem prioridade clara, o time responde a urgências e o plano vira execução parcial.',
    signals: [
      'Times sem direção',
      'Baixa maturidade técnica',
      'Engajamento comprometido',
    ],
  },
  {
    id: 'comercial-sem-funil',
    index: '04',
    title: 'Comercial sem funil',
    summary: 'Prospecção fraca e share of wallet subutilizado.',
    description:
      'A entrada de negócios depende de indicação, e a base atual permanece subexplorada.',
    signals: [
      'Comercial sem funil',
      'Prospecção fraca',
      'Share of wallet subutilizado',
    ],
  },
  {
    id: 'tecnologia-defasada',
    index: '05',
    title: 'Tecnologia defasada',
    summary: 'Ferramentas abaixo do nível de serviço necessário.',
    description:
      'Sistemas que não conversam e controles em planilhas limitam o nível de serviço.',
    signals: [
      'Tecnologia defasada',
      'Ferramentas abaixo do nível de serviço necessário',
      'Falta de rota clara para reverter o cenário',
    ],
  },
];
