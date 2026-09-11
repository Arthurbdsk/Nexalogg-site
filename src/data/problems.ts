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
    summary: 'Gestão e decisão no improviso.',
    description:
      'Sem uma DRE confiável e um resultado operacional exato, cada área trabalha com a sua versão de resultado.',
    signals: [
      'Gestão e decisão no improviso',
      'Impacto no caixa operacional',
      'Pouca maturidade para uma decisão de expansão',
    ],
  },
  {
    id: 'time-sem-direcao',
    index: '02',
    title: 'Time sem direção',
    summary: 'A urgência toma o lugar da prioridade.',
    description:
      'Sem prioridade clara, o time responde na urgência e no improviso, e o plano de trabalho vira execução parcial.',
    signals: [
      'Sem um objetivo claro',
      'Sem tempo para decisões assertivas',
      'Entregas e execução de baixa qualidade',
      'Engajamento comprometido',
      'Baixa maturidade técnica',
    ],
  },
  {
    id: 'margem-sob-pressao',
    index: '03',
    title: 'Margem sob pressão',
    summary: 'Custos crescem fora de proporção com a receita.',
    description:
      'A receita cresce e o resultado não acompanha, porque o custo de servir não é lido por operação.',
    signals: [
      'Custo crescendo',
      'Eficiência operacional baixa',
      'Sem dados para reversão',
      'Falta de uma rota clara para reverter o cenário',
    ],
  },
  {
    id: 'comercial-sem-funil',
    index: '04',
    title: 'Comercial sem funil',
    summary: 'Prospecção fraca e share of wallet subutilizado.',
    description:
      'A entrada de novos negócios depende de prospecção, enquanto a expansão da base atual fica sem método.',
    signals: [
      'Prospecção fraca e sem método',
      'Share of wallet subutilizado',
      'Sem critérios para conversão',
      'Falta de uma rota clara para reverter o cenário',
    ],
  },
  {
    id: 'tecnologia-defasada',
    index: '05',
    title: 'Tecnologia defasada',
    summary: 'Ferramentas abaixo do nível de serviço necessário.',
    description:
      'Sistemas independentes que não conversam, controles em planilhas e tecnologia abaixo do nível de serviço exigido.',
    signals: [
      'Falta de foco nas prioridades',
      'Sem tempo para decisões assertivas',
      'Entregas e execução de baixa qualidade',
      'Engajamento comprometido',
      'Baixa maturidade técnica',
    ],
  },
];
