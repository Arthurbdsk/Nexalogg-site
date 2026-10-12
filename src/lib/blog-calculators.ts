export type CalculatorKind = 'empty-distance' | 'receivables' | 'break-even' | 'cost-to-serve' | 'client-loss';
type Field = { key: string; label: string; defaultValue: number; min: number; max?: number; step: number };
export type ToolDefinition = { kind: CalculatorKind; title: string; description: string; note: string; formula: string; fields: Field[] };
export type ToolMetric = { label: string; value: number; format: 'currency' | 'percent' | 'days' };
export type ToolResult = { error?: string; metrics: ToolMetric[] };
export type ToolValues = Record<string, number>;

export const blogTools: Record<CalculatorKind, ToolDefinition> = {
  'empty-distance': {
    kind: 'empty-distance',
    title: 'Simule o custo dos quilômetros vazios',
    description: 'Veja o peso da distância sem carga e a economia variável de eliminar parte desse percurso.',
    note: 'Mantém custo variável unitário constante. A economia exige eliminar distância sem reduzir os serviços. Não inclui custos fixos, receitas adicionais ou custos de redesenho da rota.',
    formula: 'Km vazios / km totais × 100; custo variável = km vazios × custo por km; economia = km eliminados × custo por km.',
    fields: [
      { key: 'totalKm', label: 'Km totais no mês', defaultValue: 10000, min: 1, step: 100 },
      { key: 'emptyKm', label: 'Km vazios no mês', defaultValue: 2500, min: 0, step: 100 },
      { key: 'variable', label: 'Custo variável por km (R$)', defaultValue: 2.2, min: 0, step: 0.01 },
      { key: 'eliminatedKm', label: 'Km vazios que podem ser eliminados', defaultValue: 800, min: 0, step: 100 },
    ],
  },
  receivables: {
    kind: 'receivables',
    title: 'Simule o efeito do prazo no caixa',
    description: 'Some os intervalos entre entrega, faturamento e recebimento e estime o efeito de reduzir dias.',
    note: 'Aproximação com mês de 30 dias e desembolsos uniformes. Não deduz prazo de fornecedores nem considera sazonalidade. Não é o cálculo de DSO da APQC nem uma previsão do saldo bancário.',
    formula: 'Ciclo = dias até faturar + dias até receber; financiamento aproximado = desembolsos mensais / 30 × ciclo; redução = desembolsos mensais / 30 × dias reduzidos.',
    fields: [
      { key: 'invoiceDays', label: 'Dias da entrega ao faturamento', defaultValue: 7, min: 0, step: 1 },
      { key: 'paymentDays', label: 'Dias do faturamento ao recebimento', defaultValue: 35, min: 0, step: 1 },
      { key: 'monthlyOutflow', label: 'Desembolsos operacionais mensais (R$)', defaultValue: 300000, min: 0, step: 1000 },
      { key: 'reducedDays', label: 'Dias a reduzir no ciclo', defaultValue: 7, min: 0, step: 1 },
    ],
  },
  'break-even': {
    kind: 'break-even',
    title: 'Calcule o ponto de equilíbrio',
    description: 'Compare receita atual, estrutura fixa e contribuição. Simule também a receita necessária para uma meta de resultado.',
    note: 'Supõe contribuição percentual e custos fixos constantes. Usa receita líquida. Não incorpora degraus de capacidade, despesas financeiras ou impostos sobre lucro fora do escopo informado.',
    formula: 'Equilíbrio = custos fixos / (contribuição % / 100); resultado = receita × contribuição − custos fixos; receita da meta = (custos fixos + meta) / contribuição.',
    fields: [
      { key: 'fixed', label: 'Custos fixos mensais (R$)', defaultValue: 120000, min: 0, step: 1000 },
      { key: 'contribution', label: 'Margem de contribuição (%)', defaultValue: 30, min: 0, max: 100, step: 0.1 },
      { key: 'revenue', label: 'Receita líquida mensal atual (R$)', defaultValue: 500000, min: 0, step: 1000 },
      { key: 'target', label: 'Meta de resultado operacional (R$)', defaultValue: 30000, min: 0, step: 1000 },
    ],
  },
  'cost-to-serve': {
    kind: 'cost-to-serve',
    title: 'Estime o custo de servir um cliente',
    description: 'Informe grupos de custos sem sobreposição. Veja como atendimento e retrabalho afetam o resultado do contrato.',
    note: 'Não repita despesas já incluídas em outra categoria. Receita líquida e custos devem ter o mesmo período. O resultado inclui apenas os grupos informados, com a alocação definida por você.',
    formula: 'Custo = transporte + dedicação + horas × custo/hora + retrabalho + compartilhados; resultado = receita − custo; margem = resultado / receita × 100.',
    fields: [
      { key: 'revenue', label: 'Receita líquida do cliente (R$)', defaultValue: 100000, min: 1, step: 1000 },
      { key: 'transport', label: 'Custos de transporte (R$)', defaultValue: 62000, min: 0, step: 1000 },
      { key: 'dedicated', label: 'Estrutura dedicada não incluída acima (R$)', defaultValue: 18000, min: 0, step: 1000 },
      { key: 'hours', label: 'Horas adicionais de atendimento', defaultValue: 100, min: 0, step: 1 },
      { key: 'hourCost', label: 'Custo por hora de atendimento (R$)', defaultValue: 50, min: 0, step: 1 },
      { key: 'rework', label: 'Retrabalho não incluído acima (R$)', defaultValue: 3000, min: 0, step: 100 },
      { key: 'shared', label: 'Estrutura compartilhada atribuída (R$)', defaultValue: 5000, min: 0, step: 100 },
    ],
  },
  'client-loss': {
    kind: 'client-loss',
    title: 'Simule a saída de um cliente',
    description: 'Avalie participação na receita, contribuição perdida e resultado após remover os custos fixos que realmente deixam de existir.',
    note: 'Supõe retirada integral dos custos variáveis do cliente e estabilidade dos demais contratos. Não inclui transição, multas, inadimplência ou prazo de realocação. Use custos removíveis no mesmo período.',
    formula: 'Participação = receita cliente / receita total × 100; contribuição perdida = receita cliente × contribuição %; resultado após saída = resultado atual − contribuição perdida + custos fixos removidos.',
    fields: [
      { key: 'revenue', label: 'Receita líquida total mensal (R$)', defaultValue: 500000, min: 1, step: 1000 },
      { key: 'clientRevenue', label: 'Receita líquida mensal do cliente (R$)', defaultValue: 200000, min: 0, step: 1000 },
      { key: 'contribution', label: 'Contribuição do cliente (%)', defaultValue: 35, min: 0, max: 100, step: 0.1 },
      { key: 'currentResult', label: 'Resultado operacional mensal atual (R$)', defaultValue: 50000, min: -1000000000, step: 1000 },
      { key: 'removedFixed', label: 'Custos fixos removíveis no período (R$)', defaultValue: 10000, min: 0, step: 1000 },
    ],
  },
};

export function getBlogTool(kind: string | undefined) {
  return kind && Object.hasOwn(blogTools, kind) ? blogTools[kind as CalculatorKind] : undefined;
}

export const defaultToolValues = (kind: CalculatorKind): ToolValues =>
  Object.fromEntries(blogTools[kind].fields.map((field) => [field.key, field.defaultValue]));

export function calculateBlogTool(kind: CalculatorKind, values: ToolValues): ToolResult {
  for (const field of blogTools[kind].fields) {
    const value = values[field.key];
    if (!Number.isFinite(value) || value < field.min || (field.max !== undefined && value > field.max)) {
      return { error: 'Confira o campo: ' + field.label + '.', metrics: [] };
    }
  }
  const currency = (label: string, value: number): ToolMetric => ({ label, value, format: 'currency' });
  const percent = (label: string, value: number): ToolMetric => ({ label, value, format: 'percent' });
  let metrics: ToolMetric[];
  switch (kind) {
    case 'empty-distance': {
      const { totalKm, emptyKm, variable, eliminatedKm } = values;
      if (emptyKm > totalKm) return { error: 'Os km vazios não podem superar os km totais.', metrics: [] };
      if (eliminatedKm > emptyKm) return { error: 'Os km elimináveis não podem superar os km vazios.', metrics: [] };
      metrics = [percent('Quilômetros vazios', emptyKm / totalKm * 100), currency('Custo variável dos km vazios', emptyKm * variable), currency('Economia variável estimada', eliminatedKm * variable)];
      break;
    }
    case 'receivables': {
      const cycle = values.invoiceDays + values.paymentDays;
      if (values.reducedDays > cycle) return { error: 'A redução não pode superar o ciclo atual.', metrics: [] };
      const daily = values.monthlyOutflow / 30;
      metrics = [{ label: 'Ciclo entrega-recebimento', value: cycle, format: 'days' }, currency('Financiamento aproximado do intervalo', daily * cycle), currency('Redução estimada da necessidade', daily * values.reducedDays)];
      break;
    }
    case 'break-even': {
      const ratio = values.contribution / 100;
      if (ratio <= 0) return { error: 'A contribuição precisa ser maior que zero para existir equilíbrio neste modelo.', metrics: [] };
      const equilibrium = values.fixed / ratio;
      metrics = [currency('Receita líquida de equilíbrio', equilibrium), currency('Resultado operacional estimado', values.revenue * ratio - values.fixed), currency('Receita líquida para a meta', (values.fixed + values.target) / ratio)];
      if (values.revenue > 0) metrics.push(percent('Margem de segurança', (values.revenue - equilibrium) / values.revenue * 100));
      break;
    }
    case 'cost-to-serve': {
      const support = values.hours * values.hourCost + values.rework + values.shared;
      const total = values.transport + values.dedicated + support;
      const result = values.revenue - total;
      metrics = [currency('Custo total estimado', total), currency('Resultado do contrato', result), percent('Margem sobre receita', result / values.revenue * 100), currency('Atendimento e suporte', support)];
      break;
    }
    case 'client-loss': {
      if (values.clientRevenue > values.revenue) return { error: 'A receita do cliente não pode superar a receita total.', metrics: [] };
      const contribution = values.clientRevenue * values.contribution / 100;
      metrics = [percent('Participação do cliente', values.clientRevenue / values.revenue * 100), currency('Contribuição mensal perdida', contribution), currency('Resultado estimado após a saída', values.currentResult - contribution + values.removedFixed)];
      break;
    }
  }
  if (metrics.some((metric) => !Number.isFinite(metric.value))) return { error: 'Os valores informados excedem o limite do cálculo. Revise os campos.', metrics: [] };
  return { metrics };
}

const number = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 });
const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
export function formatToolMetric(metric: ToolMetric) {
  if (metric.format === 'currency') return money.format(metric.value);
  return number.format(metric.value) + (metric.format === 'percent' ? '%' : ' dias');
}

export function toolCsv(kind: CalculatorKind, values: ToolValues, result: ToolResult) {
  if (result.error) return '';
  const definition = blogTools[kind];
  const rows = [
    ['NEXALLOG', definition.title],
    ['Tipo', 'Simulação gerencial com premissas informadas pelo visitante'],
    ['Entradas', 'Valor'],
    ...definition.fields.map((field) => [field.label, number.format(values[field.key])]),
    ['Resultados', 'Valor'],
    ...result.metrics.map((metric) => [metric.label, formatToolMetric(metric)]),
    ['Fórmula', definition.formula],
    ['Premissas', definition.note],
  ];
  return '\uFEFF' + rows.map((row) => row.map((cell) => '"' + cell.replace(/"/g, '""') + '"').join(';')).join('\r\n');
}
