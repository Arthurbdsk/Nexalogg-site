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
      'A operação decide pelo histórico e pela percepção de quem está mais perto do problema. Sem um DRE gerencial confiável e sem indicadores consolidados, cada área trabalha com uma versão diferente do mesmo número e a diretoria perde a capacidade de antecipar.',
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
      'A receita cresce e o resultado não acompanha. Custos avançam fora de proporção, o preço deixa de refletir o custo real de servir e a margem se estreita sem que a causa esteja identificada por rota, cliente ou operação.',
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
      'Sem prioridades claras, o time responde a urgências. A baixa maturidade técnica em pontos críticos e o engajamento comprometido transformam qualquer plano em execução parcial, e o esforço se dispersa antes de virar resultado.',
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
      'A entrada de novos negócios depende de indicação e relacionamento. Sem funil estruturado, a prospecção perde consistência e a base atual permanece subexplorada, com share of wallet muito abaixo do potencial já conquistado.',
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
      'Sistemas que não conversam entre si, controles em planilhas paralelas e ferramentas abaixo do nível de serviço exigido pelo cliente. A tecnologia deixa de sustentar a operação e passa a limitar o que a operação consegue entregar.',
    signals: [
      'Tecnologia defasada',
      'Ferramentas abaixo do nível de serviço necessário',
      'Falta de rota clara para reverter o cenário',
    ],
  },
];
