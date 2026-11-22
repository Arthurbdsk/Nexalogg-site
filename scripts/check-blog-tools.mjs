import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { blogTools, defaultToolValues, calculateBlogTool, toolCsv } from '../src/lib/blog-calculators.ts';

const cases = [
  ['cost-per-km', [4, 4.45, 3.7]],
  ['otif', [92, 95, 89]],
  ['flex-budget', [142000, 146400, 2600, 4400]],
  ['empty-distance', [25, 5500, 1760]],
  ['receivables', [42, 420000, 70000]],
  ['break-even', [400000, 30000, 500000, 20]],
  ['cost-to-serve', [93000, 7000, 7, 13000]],
  ['client-loss', [40, 70000, -10000]],
  ['diesel-impact', [20000, 21666.666666666668, 1666.666666666668, 3.333333333333336]],
  ['freight-discount', [300, 200, 200 / 900 * 100, 50]],
];
for (const [kind, expected] of cases) {
  const values = defaultToolValues(kind);
  const result = calculateBlogTool(kind, values);
  assert(!result.error, kind);
  expected.forEach((value, index) => assert(Math.abs(result.metrics[index].value - value) < 1e-8, kind + ': ' + result.metrics[index].label));
  const csv = toolCsv(kind, values, result);
  assert(csv.startsWith('\uFEFF'));
  for (const field of blogTools[kind].fields) assert(csv.includes(field.label));
  assert(csv.includes(blogTools[kind].formula));
  assert(csv.includes(blogTools[kind].note));
  for (const field of blogTools[kind].fields) {
    assert(calculateBlogTool(kind, { ...values, [field.key]: NaN }).error);
    assert(calculateBlogTool(kind, { ...values, [field.key]: Infinity }).error);
    assert(calculateBlogTool(kind, { ...values, [field.key]: field.min - 1 }).error);
  }
  console.log('OK ' + kind + ': exemplo, campos inválidos e CSV');
}
const checkError = (kind, overrides) => {
  const values = { ...defaultToolValues(kind), ...overrides };
  const result = calculateBlogTool(kind, values);
  assert(result.error);
  assert.equal(result.metrics.length, 0);
  assert.equal(toolCsv(kind, values, result), '');
};
checkError('empty-distance', { emptyKm: 11000 });
checkError('empty-distance', { eliminatedKm: 3000 });
checkError('receivables', { reducedDays: 43 });
checkError('break-even', { contribution: 0 });
checkError('break-even', { contribution: 101 });
checkError('cost-to-serve', { revenue: 0 });
checkError('client-loss', { clientRevenue: 600000 });
checkError('client-loss', { contribution: 101 });
checkError('cost-per-km', { kilometers: 0 });
checkError('otif', { onTime: 101 });
checkError('otif', { inFull: 101 });
checkError('otif', { both: 93 });
checkError('otif', { both: 86 });
checkError('otif', { total: 100.5 });
checkError('otif', { onTime: 92.5 });
checkError('otif', { both: 89.5 });
assert.equal(calculateBlogTool('otif', { total: 100, onTime: 0, inFull: 0, both: 0 }).metrics[2].value, 0);
assert.equal(calculateBlogTool('otif', { total: 1, onTime: 1, inFull: 1, both: 1 }).metrics[2].value, 100);
assert.equal(calculateBlogTool('flex-budget', { ...defaultToolValues('flex-budget'), actual: 0, actualCost: 119000 }).metrics[2].value, -1000);
assert.equal(calculateBlogTool('cost-per-km', { ...defaultToolValues('cost-per-km'), fixed: 0, variable: 0 }).metrics[0].value, 0);
checkError('diesel-impact', { efficiency: 0 });
checkError('diesel-impact', { revenue: 0 });
checkError('freight-discount', { discount: 100 });
checkError('freight-discount', { discount: 30 });
checkError('freight-discount', { discount: 40 });
checkError('freight-discount', { variableCost: 1000 });
checkError('freight-discount', { variableCost: 1200 });
assert.equal(calculateBlogTool('diesel-impact', { ...defaultToolValues('diesel-impact'), distance: 0 }).metrics[2].value, 0);
assert(calculateBlogTool('diesel-impact', { ...defaultToolValues('diesel-impact'), scenarioPrice: 5.5 }).metrics[2].value < 0);
assert.equal(calculateBlogTool('freight-discount', { ...defaultToolValues('freight-discount'), discount: 0 }).metrics[3].value, 0);
assert.equal(calculateBlogTool('empty-distance', { ...defaultToolValues('empty-distance'), emptyKm: 0, eliminatedKm: 0 }).metrics[2].value, 0);
const noRevenue = calculateBlogTool('break-even', { ...defaultToolValues('break-even'), revenue: 0 });
assert(!noRevenue.error);
assert.equal(noRevenue.metrics[1].value, -120000);
assert.equal(noRevenue.metrics.length, 3);
const loss = calculateBlogTool('cost-to-serve', { ...defaultToolValues('cost-to-serve'), revenue: 50000 });
assert.equal(loss.metrics[1].value, -43000);
assert.equal(loss.metrics[2].value, -86);
const posts = JSON.parse(readFileSync(new URL('../src/data/blog.json', import.meta.url), 'utf8'));
assert.equal(posts.filter((post) => post.calculator).length, Object.keys(blogTools).length);
assert.deepEqual(new Set(posts.filter((post) => post.calculator).map((post) => post.calculator)), new Set(Object.keys(blogTools)));
for (const post of posts.filter((post) => post.calculator)) assert(Object.hasOwn(blogTools, post.calculator), post.slug);
console.log('OK limites cruzados, zero, resultado negativo e associação de todos os simuladores');
