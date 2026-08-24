import type { Config } from 'tailwindcss';

/**
 * Sistema visual da NEXALLOG, derivado do manual da marca.
 * Paleta oficial: amarelo #E0A800, preto #111111, cinza escuro #333333,
 * cinza claro #E6E6E6 e branco #FFFFFF. Tipografia oficial: Montserrat.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Tokens semânticos: mudam conforme o tom da seção (claro, cinza, preto, amarelo)
        surface: 'rgb(var(--surface) / <alpha-value>)',
        content: 'rgb(var(--content) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',

        // Preto da marca e seus degraus de superfície
        ink: {
          DEFAULT: '#111111',
          950: '#0A0A0A',
          900: '#0F0F0F',
          800: '#161616',
          700: '#1E1E1E',
          600: '#262626',
          500: '#333333',
        },
        // Amarelo da marca
        brand: {
          200: '#FFE59A',
          300: '#FFD262',
          400: '#F2BC24',
          500: '#E0A800',
          600: '#B88A00',
        },
        // Claros da marca
        paper: {
          DEFAULT: '#FFFFFF',
          dim: '#E6E6E6',
          muted: '#C9C9C9',
        },
        // Cinzas de apoio
        smoke: {
          400: '#9A9A9A',
          500: '#767676',
          600: '#4D4D4D',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Montserrat', 'system-ui', 'sans-serif'],
        display: ['var(--font-sans)', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.375rem, 5.4vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.125rem, 4.8vw, 3.875rem)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.75rem, 3.4vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.375rem, 2.2vw, 1.875rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        lead: ['clamp(1.0625rem, 1.3vw, 1.25rem)', { lineHeight: '1.6', letterSpacing: '-0.005em' }],
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.2em' }],
      },
      maxWidth: {
        shell: '84rem',
        prose: '68ch',
      },
      spacing: {
        section: 'clamp(3.75rem, 7vw, 7rem)',
      },
      transitionTimingFunction: {
        outexpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        inout: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        'dash-travel': {
          from: { strokeDashoffset: '900' },
          to: { strokeDashoffset: '0' },
        },
        pulseline: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.6' },
        },
        rise: {
          from: { transform: 'translate3d(0, 16px, 0)' },
          to: { transform: 'none' },
        },
        driftin: {
          from: { opacity: '0', transform: 'translate3d(0, 14px, 0)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        travel: 'dash-travel 5.5s linear infinite',
        pulseline: 'pulseline 4.5s ease-in-out infinite',
        driftin: 'driftin 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        rise: 'rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
