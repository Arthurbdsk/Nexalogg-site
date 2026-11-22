import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const base = new URL(process.argv[2] ?? 'http://localhost:3100');
const sitemap = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
const cache = new Map();
async function load(path) {
  if (!cache.has(path)) {
    const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(15000) });
    cache.set(path, { status: response.status, html: await response.text() });
  }
  return cache.get(path);
}

for (let index = 0; index < paths.length; index += 8) {
  await Promise.all(paths.slice(index, index + 8).map(load));
}

const checked = new Set();
const issues = [];
for (const [source, { status, html }] of cache) {
  if (status !== 200) issues.push(`${source}: HTTP ${status}`);
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = match[1].replace(/&amp;/g, '&');
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const url = new URL(href, new URL(source, base));
    if (url.origin !== base.origin) continue;
    const key = url.pathname + url.hash;
    if (checked.has(key)) continue;
    checked.add(key);
    const target = await load(url.pathname);
    if (target.status !== 200) issues.push(`${source} → ${href}: HTTP ${target.status}`);
    else if (url.hash && !target.html.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)) {
      issues.push(`${source} → ${href}: âncora ausente`);
    }
  }
}
assert.equal(issues.length, 0, issues.join('\n'));
console.log(`OK ${paths.length} páginas e ${checked.size} destinos internos: HTTP e âncoras`);
