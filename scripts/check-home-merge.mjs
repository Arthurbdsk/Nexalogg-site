import assert from 'node:assert/strict';

const base = (process.argv[2] ?? 'http://localhost:3100').replace(/\/$/, '');
const canonical = 'https://www.nexallog.com.br';
const response = await fetch(base + '/');
assert.equal(response.status, 200);
assert(!/noindex/.test(response.headers.get('x-robots-tag') ?? ''));
const html = await response.text();
assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1);
const heading = html.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
assert(heading?.includes('Uma empresa construída de dentro da Operação Logística que transforma dados em resultados.'));
assert(html.includes('Diagnóstico financeiro e operacional, com suporte direto na execução.'));
assert(html.includes('A solução NEXACASH responde a essa dor'));
assert(html.includes('href="/#a-nexallog"'));
assert(!html.includes('href="/a-nexallog'));
assert(!html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').includes('Consultoria para empresas'));
const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, 'IDs duplicados na home');
for (const id of ['inicio', 'a-nexallog', 'atuacao-titulo', 'principios', 'alexandre-felix', 'podcast-titulo']) {
  assert(ids.includes(id), 'Âncora ausente: ' + id);
}
const capabilities = html.match(/<ol aria-labelledby="atuacao-titulo"[^>]*>(.*?)<\/ol>/s)?.[1];
assert.equal((capabilities?.match(/<li(?:\s|>)/g) ?? []).length, 7, 'As sete frentes devem estar na home');
assert(capabilities.includes('Acompanhamento da execução com o “O que fazer?” e o “Como fazer?”'));
assert(html.includes('href="/contato"') && html.includes('href="/metodologia"'));
assert(html.includes('animate-x-enter-top') && html.includes('animate-x-enter-bottom'), 'Animação do X preservada');
assert(html.includes('/blog/alexandre-felix-podcast-algoritmo-pro'));
assert(html.includes('https://www.instagram.com/reel/DeOxvZszNnw/'));
assert(!html.includes('<iframe'), 'Player externo não deve carregar antes do clique');
const graphs = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)]
  .flatMap((match) => JSON.parse(match[1])['@graph'] ?? []);
const founder = graphs.find((node) => node['@type'] === 'Person');
assert.equal(founder['@id'], canonical + '/#alexandre-felix');
const redirect = await fetch(base + '/a-nexallog', { redirect: 'manual' });
assert.equal(redirect.status, 308);
assert.equal(new URL(redirect.headers.get('location'), base).pathname, '/');
for (const path of ['/sobre', '/quem-somos']) {
  const legacy = await fetch(base + path, { redirect: 'manual' });
  assert.equal(legacy.status, 308);
  assert.equal(new URL(legacy.headers.get('location'), base).hash, '#a-nexallog');
}
const sitemap = await (await fetch(base + '/sitemap.xml')).text();
assert(!sitemap.includes('<loc>' + canonical + '/a-nexallog</loc>'));
assert(sitemap.includes('<loc>' + canonical + '/blog/alexandre-felix-podcast-algoritmo-pro</loc>'));
for (const path of ['/robots.txt', '/llms.txt', '/politica-de-privacidade', '/termos-de-uso']) {
  assert.equal((await fetch(base + path)).status, 200, path);
}
assert(html.includes('Feito por Socialy') && html.includes('https://www.instagram.com/socialy_webdesign/'));
console.log('OK home unificada: texto, sete frentes, X, podcast, âncoras, JSON-LD, redirecionamentos 308, sitemap e páginas institucionais');
