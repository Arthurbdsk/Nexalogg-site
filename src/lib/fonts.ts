import localFont from 'next/font/local';

/**
 * Montserrat, tipografia oficial da marca NEXALLOG.
 * Bold em títulos e Regular em corpo de texto, conforme o manual.
 * O arquivo é variável (400 a 700) e auto-hospedado, sem requisição externa.
 */
export const montserrat = localFont({
  src: [
    {
      path: '../../public/fonts/montserrat-400-700-latin.woff2',
      weight: '400 700',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
});
