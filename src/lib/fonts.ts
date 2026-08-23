import localFont from 'next/font/local';

/** Archivo, usada em títulos e marca. Variável 400 a 700. */
export const display = localFont({
  src: [{ path: '../../public/fonts/archivo-400-700-latin.woff2', weight: '400 700', style: 'normal' }],
  variable: '--font-display',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

/** Inter, usada em texto corrido. Variável 400 a 600. */
export const sans = localFont({
  src: [{ path: '../../public/fonts/inter-400-600-latin.woff2', weight: '400 600', style: 'normal' }],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

/** IBM Plex Mono, usada em rótulos técnicos, índices e marcadores. */
export const mono = localFont({
  src: [
    { path: '../../public/fonts/plexmono-400-latin.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/plexmono-500-latin.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
});
