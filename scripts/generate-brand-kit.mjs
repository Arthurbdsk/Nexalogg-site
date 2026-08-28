/**
 * Gera o kit da marca NEXALLOG em `marca/`, a partir dos mesmos valores que o
 * site usa: o traçado do símbolo em `src/components/ui/Logo.tsx`, a paleta de
 * `tailwind.config.ts` e a Montserrat auto-hospedada em `public/fonts`.
 *
 * Cada peça sai em três formatos:
 *   .pdf  vetor, para impressão e para quem trabalha em Illustrator ou Corel
 *   .svg  vetor, para uso em tela e em qualquer editor
 *   .png  4096px de largura, para quem só consegue abrir imagem
 *
 * Uso: npm run marca:generate
 *
 * O PDF é impresso pelo Chromium do Playwright, que preserva os traçados como
 * vetor e embute a fonte, então o arquivo não perde qualidade em nenhuma
 * ampliação. Playwright é dependência de desenvolvimento e não vai para
 * produção.
 */
import { chromium } from 'playwright';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const destino = join(raiz, 'marca');

const AMARELO = '#E0A800';
const PRETO = '#111111';
const BRANCO = '#FFFFFF';
const CINZA = '#E6E6E6';

/** Mesmo traçado exportado por src/components/ui/Logo.tsx. */
const X = 'M0 0 H24 L50 30 L76 0 H100 L62 50 L100 100 H76 L50 70 L24 100 H0 L38 50 Z';
/** Traçado do ícone de aplicativo, com margem interna no quadrado. */
const X_ICONE = 'M17 24 H33 L50 44 L67 24 H83 L58 50 L83 76 H67 L50 56 L33 76 H17 L42 50 Z';

const TAGLINE = 'CONECTANDO CAMINHOS, GERANDO RESULTADOS.';

/**
 * Símbolo isolado, preenchido ou vazado como no bloco de abertura do site.
 * A folga em volta evita que o traçado fique encostado na borda do arquivo,
 * o que atrapalharia o posicionamento em qualquer aplicação.
 */
function simbolo({ cor, vazado = false }) {
  const traco = vazado ? 2.4 : 0;
  const folga = 6 + traco / 2;
  const lado = 100 + folga * 2;
  return {
    largura: lado,
    altura: lado,
    conteudo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-folga} ${-folga} ${lado} ${lado}" width="${lado}" height="${lado}">
  <path d="${X}" fill="${vazado ? 'none' : cor}"${vazado ? ` stroke="${cor}" stroke-width="${traco}" stroke-linejoin="miter"` : ''}/>
</svg>`,
  };
}

/** Ícone de aplicativo: X sobre quadrado preto de cantos arredondados. */
function icone() {
  return {
    largura: 100,
    altura: 100,
    conteudo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="24" fill="${PRETO}"/>
  <path d="${X_ICONE}" fill="${AMARELO}"/>
</svg>`,
  };
}

/**
 * Logotipo. O lettering é texto em Montserrat Bold: o Chromium embute a fonte
 * no PDF, então o arquivo continua vetorial e fiel ao que está no site.
 */
function logotipo({ corTexto, fundo, comAssinatura }) {
  const largura = 1000;
  const altura = comAssinatura ? 280 : 210;
  const baseTexto = comAssinatura ? 138 : 136;

  // O espaçamento entre letras também é aplicado depois da última letra, o que
  // desloca o bloco para a esquerda quando centralizado. Metade do valor
  // devolve o lettering ao centro óptico.
  const espacoTitulo = 17;
  const espacoAssinatura = 6.6;

  const fundoSvg = fundo ? `<rect width="${largura}" height="${altura}" fill="${fundo}"/>` : '';
  const assinatura = comAssinatura
    ? `<text x="${largura / 2 + espacoAssinatura / 2}" y="196" text-anchor="middle" font-family="Montserrat" font-size="18" font-weight="600" letter-spacing="${espacoAssinatura}" fill="${
        fundo === PRETO ? CINZA : '#4D4D4D'
      }">${TAGLINE}</text>`
    : '';

  return {
    largura,
    altura,
    conteudo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${largura} ${altura}" width="${largura}" height="${altura}">
  ${fundoSvg}
  <text x="${largura / 2 + espacoTitulo / 2}" y="${baseTexto}" text-anchor="middle" font-family="Montserrat" font-size="76" font-weight="700" letter-spacing="${espacoTitulo}" fill="${corTexto}">NE<tspan fill="${AMARELO}">X</tspan>ALLOG</text>
  ${assinatura}
</svg>`,
  };
}

const PECAS = [
  { nome: 'nexallog-logotipo-positivo', peca: logotipo({ corTexto: PRETO, fundo: null, comAssinatura: false }) },
  { nome: 'nexallog-logotipo-negativo', peca: logotipo({ corTexto: BRANCO, fundo: PRETO, comAssinatura: false }) },
  { nome: 'nexallog-logotipo-assinatura-positivo', peca: logotipo({ corTexto: PRETO, fundo: null, comAssinatura: true }) },
  { nome: 'nexallog-logotipo-assinatura-negativo', peca: logotipo({ corTexto: BRANCO, fundo: PRETO, comAssinatura: true }) },
  { nome: 'nexallog-simbolo-x-amarelo', peca: simbolo({ cor: AMARELO }) },
  { nome: 'nexallog-simbolo-x-preto', peca: simbolo({ cor: PRETO }) },
  { nome: 'nexallog-simbolo-x-branco', peca: simbolo({ cor: BRANCO }) },
  { nome: 'nexallog-simbolo-x-vazado-amarelo', peca: simbolo({ cor: AMARELO, vazado: true }) },
  { nome: 'nexallog-icone-aplicativo', peca: icone() },
];

/** Largura de exportação dos PNG, em pixels. */
const LARGURA_PNG = 4096;

const fonte = await readFile(join(raiz, 'public/fonts/montserrat-400-700-latin.woff2'));
const fonteBase64 = fonte.toString('base64');

const estiloFonte = `@font-face {
  font-family: 'Montserrat';
  src: url(data:font/woff2;base64,${fonteBase64}) format('woff2');
  font-weight: 400 700;
  font-style: normal;
}`;

function pagina({ conteudo, largura, altura, escala = 1, fundoTransparente }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
${estiloFonte}
html, body { margin: 0; padding: 0; ${fundoTransparente ? 'background: transparent;' : ''} }
svg { display: block; width: ${largura * escala}px; height: ${altura * escala}px; }
</style></head><body>${conteudo}</body></html>`;
}

await mkdir(destino, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

for (const { nome, peca } of PECAS) {
  const { conteudo, largura, altura } = peca;

  await writeFile(join(destino, `${nome}.svg`), `${conteudo}\n`, 'utf8');

  // PDF: uma página do tamanho exato da peça, sem margem.
  await page.setContent(pagina({ conteudo, largura, altura }), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: join(destino, `${nome}.pdf`),
    width: `${largura}px`,
    height: `${altura}px`,
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  // PNG: mesma peça ampliada, com fundo transparente onde não há fundo sólido.
  const escala = LARGURA_PNG / largura;
  await page.setContent(pagina({ conteudo, largura, altura, escala, fundoTransparente: true }), {
    waitUntil: 'load',
  });
  await page.evaluate(() => document.fonts.ready);
  await page.setViewportSize({
    width: Math.round(largura * escala),
    height: Math.round(altura * escala),
  });
  await page.locator('svg').screenshot({
    path: join(destino, `${nome}.png`),
    omitBackground: true,
  });

  console.log(`marca: ${nome} (pdf, svg, png)`);
}

await browser.close();
console.log(`\n${PECAS.length} peças geradas em marca/`);
