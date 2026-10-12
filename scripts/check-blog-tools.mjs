import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { blogTools, defaultToolValues, calculateBlogTool, toolCsv } from '../src/lib/blog-calculators.ts';

const cases = [
  ['empty-distance', [25, 5500, 1760]],
  ['receivables', [42, 420000, 70000]],
  ['break-even', [400000, 30000, 500000, 20]],
  ['cost-to-serve', [93000, 7000, 7, 13000]],
  ['client-loss', [40, 70000, -10000]],
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
assert.equal(calculateBlogTool('empty-distance', { ...defaultToolValues('empty-distance'), emptyKm: 0, eliminatedKm: 0 }).metrics[2].value, 0);
const noRevenue = calculateBlogTool('break-even', { ...defaultToolValues('break-even'), revenue: 0 });
assert(!noRevenue.error);
assert.equal(noRevenue.metrics[1].value, -120000);
assert.equal(noRevenue.metrics.length, 3);
const loss = calculateBlogTool('cost-to-serve', { ...defaultToolValues('cost-to-serve'), revenue: 50000 });
assert.equal(loss.metrics[1].value, -43000);
assert.equal(loss.metrics[2].value, -86);
const posts = JSON.parse(readFileSync(new URL('../src/data/blog.json', import.meta.url), 'utf8'));
assert.equal(posts.filter((post) => post.calculator).length, 5);
for (const post of posts.filter((post) => post.calculator)) assert(Object.hasOwn(blogTools, post.calculator), post.slug);
console.log('OK limites cruzados, zero, resultado negativo e associação dos cinco posts');
