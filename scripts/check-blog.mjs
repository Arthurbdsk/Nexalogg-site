import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const base = (process.argv[2] ?? 'http://localhost:3100').replace(/\/$/, '');
const canonicalBase = 'https://www.nexallog.com.br';
const posts = JSON.parse(readFileSync(new URL('../src/data/blog.json', import.meta.url), 'utf8'));

for (const post of posts) {
  const path = '/blog/' + post.slug;
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  assert(!/noindex/.test(response.headers.get('x-robots-tag') ?? ''), 'Bloqueio de indexação: ' + path);
  const html = await response.text();
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, 'H1: ' + path);
  assert(html.includes('href="' + canonicalBase + path + '"'), 'Canonical: ' + path);
  assert(html.includes(post.intro), 'Texto não renderizado no servidor: ' + path);
  const graphs = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)]
    .flatMap((match) => JSON.parse(match[1])['@graph'] ?? []);
  const article = graphs.find((node) => node['@type'] === 'BlogPosting');
  assert(article, 'BlogPosting: ' + path);
  assert.equal(article.headline, post.title);
  assert.equal(article.author.name, 'NEXALLOG');
  assert.equal(article.dateModified.slice(0, 10), post.updatedAt);
  assert.equal(article.citation.length, post.sources.length);
  for (const slug of post.related) assert(html.includes('href="/blog/' + slug + '"'), 'Link relacionado: ' + slug);
  for (const section of post.sections) {
    assert(html.includes('id="' + section.id + '"'), 'Âncora: ' + section.id);
    for (const sourceId of section.sourceIds ?? []) assert(post.sources.some((source) => source.id === sourceId), 'Fonte: ' + sourceId);
    if (section.table) for (const row of section.table.rows) assert.equal(row.length, section.table.headers.length);
  }
  const image = await fetch(base + path + '/opengraph-image');
  assert.equal(image.status, 200, 'Imagem: ' + path);
  assert.match(image.headers.get('content-type') ?? '', /image\/png/);
  const dimensions = await sharp(Buffer.from(await image.arrayBuffer())).metadata();
  assert.equal(dimensions.width, 1200);
  assert.equal(dimensions.height, 630);
  console.log('OK ' + path + ': conteúdo, canonical, JSON-LD, referências, links e imagem 1200x630');
}

const sitemap = await (await fetch(base + '/sitemap.xml')).text();
for (const post of posts) assert(sitemap.includes(canonicalBase + '/blog/' + post.slug), 'Artigo fora do sitemap');
const rss = await (await fetch(base + '/blog-feed.xml')).text();
assert.equal((rss.match(/<item>/g) ?? []).length, posts.length);
const unknown = await fetch(base + '/blog/artigo-inexistente');
assert.equal(unknown.status, 404, 'Artigo inexistente deve retornar 404');
const home = await (await fetch(base + '/')).text();
assert(home.includes('/blog/' + posts[0].slug), 'Entrevista ausente na home');
const hub = await (await fetch(base + '/blog')).text();
for (const post of posts) assert(hub.includes('href="/blog/' + post.slug + '"'), 'Artigo ausente no hub');
console.log('OK sitemap, RSS, links do blog, destaque na home e 404');
