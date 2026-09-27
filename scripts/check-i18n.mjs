import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const read = (locale) =>
  JSON.parse(fs.readFileSync(`src/i18n/messages/${locale}.json`, 'utf8')).copy;
const pt = read('pt');
const normalize = (value) => value.replace(/\s+/g, ' ').trim();
const sources = new Set(Object.values(pt).map(normalize));
const placeholders = (value) => [...value.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();
assert.equal(sources.size, Object.keys(pt).length, 'Duplicate Portuguese source messages');
for (const locale of ['en', 'es']) {
  const catalog = read(locale);
  assert.deepEqual(
    Object.keys(catalog).sort(),
    Object.keys(pt).sort(),
    `${locale}: missing or extra messages`,
  );
  for (const [key, value] of Object.entries(catalog)) {
    assert.ok(value.trim(), `${locale}/${key}: empty translation`);
    assert.deepEqual(
      placeholders(value),
      placeholders(pt[key]),
      `${locale}/${key}: interpolation mismatch`,
    );
  }
}
const brands = new Set(['NEXALLOG', 'NEXACASH', 'IAra', 'WhatsApp', 'LinkedIn']);
function inspect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      inspect(file);
      continue;
    }
    if (!file.endsWith('.tsx')) continue;
    const source = ts.createSourceFile(
      file,
      fs.readFileSync(file, 'utf8'),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    function visit(node) {
      if (
        ts.isCallExpression(node) &&
        node.expression.getText(source) === 't' &&
        ts.isStringLiteral(node.arguments[0])
      ) {
        const text = normalize(node.arguments[0].text);
        if (/\p{L}/u.test(text) && !brands.has(text))
          assert.ok(sources.has(text), `${file}: missing translation for ${text}`);
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
}
inspect('src/app');
inspect('src/components');
console.log(
  `Verified ${Object.keys(pt).length} messages in Portuguese, English and Spanish, including interpolation and component references.`,
);
