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

const posts = JSON.parse(readFileSync(resolve(root, 'src/data/blog.json'), 'utf8'));
const slugs = new Set(posts.map((post) => post.slug));
if (slugs.size !== posts.length || posts.some((post) =>
  !/^[a-z0-9-]+$/.test(post.slug) || !/^\d{4}-\d{2}-\d{2}$/.test(post.updatedAt) ||
  post.related.some((slug) => !slugs.has(slug))
)) {
  throw new Error('Blog: slug, data ou conteúdo relacionado inválido.');
}
const escapeXml = (value) => String(value).replace(/[<>&"']/g, (char) => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
}[char]));

if (solutionSlugs.length === 0) {
  console.error('Nenhuma área de solução encontrada em src/data/solutions.ts.');
  process.exit(1);
}

/** Rotas indexáveis. Páginas com noindex nunca entram aqui. */
const routes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/a-nexallog', priority: '0.9', changefreq: 'monthly' },
  { path: '/nexacash', priority: '0.9', changefreq: 'monthly' },
  { path: '/metodologia', priority: '0.9', changefreq: 'monthly' },
  { path: '/solucoes', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly', lastmod: posts.map((post) => post.updatedAt).sort().at(-1) },
  ...posts.map((post) => ({
    path: '/blog/' + post.slug,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: post.updatedAt,
  })),
  ...solutionSlugs.map((slug) => ({
    path: `/solucoes/${slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  })),
  { path: '/contato', priority: '0.8', changefreq: 'yearly' },
  { path: '/politica-de-privacidade', priority: '0.3', changefreq: 'yearly' },
  { path: '/termos-de-uso', priority: '0.3', changefreq: 'yearly' },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${escapeXml(siteUrl + route.path)}</loc>${route.lastmod ? '\n    <lastmod>' + route.lastmod + '</lastmod>' : ''}
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

const rss = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<rss version="2.0"><channel>',
  '<title>Blog NEXALLOG</title>',
  '<link>' + escapeXml(siteUrl + '/blog') + '</link>',
  '<description>Gestão financeira e operação para Transporte e Logística.</description>',
  '<language>pt-br</language>',
  ...posts.map((post) => {
    const url = escapeXml(siteUrl + '/blog/' + post.slug);
    return '<item><title>' + escapeXml(post.title) + '</title><link>' + url +
      '</link><guid isPermaLink="true">' + url + '</guid><description>' +
      escapeXml(post.description) + '</description><pubDate>' +
      new Date(post.publishedAt + 'T12:00:00Z').toUTCString() + '</pubDate></item>';
  }),
  '</channel></rss>',
].join('\n') + '\n';
writeFileSync(resolve(root, 'public/blog-feed.xml'), rss);

const llms = '# NEXALLOG\n\nConsultoria para Transporte e Logística. Diagnóstico financeiro e operacional, plano de ação e suporte na execução.\n\n## Páginas principais\n\n' +
  routes.filter((route) => !route.path.startsWith('/blog/') && !route.path.startsWith('/solucoes/')).map((route) => '- ' + siteUrl + route.path).join('\n') +
  '\n\n## Blog\n\nConteúdo editorial em português, com exemplos ilustrativos e referências primárias.\n\n' +
  posts.map((post) => '- [' + post.title + '](' + siteUrl + '/blog/' + post.slug + '): ' + post.description).join('\n') +
  '\n\n## Contato\n\n- E-mail: contato@nexallog.com\n- WhatsApp: +55 11 98146-8028\n';
writeFileSync(resolve(root, 'public/llms.txt'), llms);

console.log(`sitemap.xml gerado com ${routes.length} URLs para ${siteUrl}`);
console.log('robots.txt gerado');
console.log('blog-feed.xml e llms.txt gerados');
