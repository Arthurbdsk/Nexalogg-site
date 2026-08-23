#!/usr/bin/env node
/**
 * Gera /public/sitemap.xml e /public/robots.txt a partir do domínio configurado
 * e das rotas reais do projeto.
 *
 * Uso: npm run seo:generate
 * O domínio vem de NEXT_PUBLIC_SITE_URL, com o mesmo valor padrão de src/lib/site.ts.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Domínio público do site, sem barra final. */
const DEFAULT_URL = readFileSync(resolve(root, 'src/lib/site.ts'), 'utf8').match(
  /NEXT_PUBLIC_SITE_URL \?\? '([^']+)'/,
)?.[1];

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_URL ?? '').replace(/\/$/, '');

if (!siteUrl) {
  console.error('Domínio não encontrado. Defina NEXT_PUBLIC_SITE_URL antes de gerar os arquivos.');
  process.exit(1);
}

/** Slugs das áreas de solução, lidos da fonte única de conteúdo. */
const solutionSlugs = [
  ...readFileSync(resolve(root, 'src/data/solutions.ts'), 'utf8').matchAll(/slug: '([a-z0-9-]+)'/g),
].map((match) => match[1]);

if (solutionSlugs.length === 0) {
  console.error('Nenhuma área de solução encontrada em src/data/solutions.ts.');
  process.exit(1);
}

/** Rotas indexáveis. Páginas com noindex nunca entram aqui. */
const routes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/a-nexallog', priority: '0.9', changefreq: 'monthly' },
  { path: '/metodologia', priority: '0.9', changefreq: 'monthly' },
  { path: '/solucoes', priority: '0.8', changefreq: 'monthly' },
  ...solutionSlugs.map((slug) => ({
    path: `/solucoes/${slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  })),
  { path: '/contato', priority: '0.8', changefreq: 'yearly' },
  { path: '/politica-de-privacidade', priority: '0.3', changefreq: 'yearly' },
  { path: '/termos-de-uso', priority: '0.3', changefreq: 'yearly' },
];

const lastmod = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const robots = `# robots.txt: ${siteUrl}
User-agent: *
Allow: /

# Endpoints sem conteúdo indexável
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml
`;

writeFileSync(resolve(root, 'public/sitemap.xml'), sitemap);
writeFileSync(resolve(root, 'public/robots.txt'), robots);

console.log(`sitemap.xml gerado com ${routes.length} URLs para ${siteUrl}`);
console.log('robots.txt gerado');
