#!/usr/bin/env node
/**
 * Gera o QR code do perfil de LinkedIn como SVG estático em /public/images.
 *
 * Uso: npm run qr:generate
 * A URL vem de siteConfig.advisor.linkedin, mantendo a fonte única de dados.
 * O SVG resultante é versionado, então o site não carrega nenhuma biblioteca
 * de QR code em produção.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const linkedin = readFileSync(resolve(root, 'src/lib/site.ts'), 'utf8').match(
  /linkedin: '([^']+)'/,
)?.[1];

if (!linkedin) {
  console.error('URL de LinkedIn não encontrada em src/lib/site.ts.');
  process.exit(1);
}

const svg = await QRCode.toString(linkedin, {
  type: 'svg',
  errorCorrectionLevel: 'M',
  margin: 1,
  color: { dark: '#111111', light: '#FFFFFF' },
});

const output = resolve(root, 'public/images/qr-linkedin-alexandre-felix.svg');
writeFileSync(output, svg);
console.log(`QR code gerado para ${linkedin}`);
