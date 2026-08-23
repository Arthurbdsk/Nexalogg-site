import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#05080D',
          900: '#080C13',
          800: '#0C121B',
          700: '#121A25',
          600: '#1A2431',
          500: '#26313F',
        },
        paper: {
          DEFAULT: '#F4F3EF',
          dim: '#E8E6DF',
          muted: '#D3D0C6',
        },
        copper: {
          200: '#F2D4B7',
          300: '#E7A874',
          400: '#D98A4C',
          500: '#C4682B',
          600: '#A6511D',
        },
        slateink: {
          400: '#8A94A3',
          500: '#6B7686',
          600: '#4E5766',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Archivo', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 7vw, 5.75rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2.25rem, 5.2vw, 4.25rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.875rem, 3.6vw, 3rem)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(1.5rem, 2.4vw, 2.125rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        lead: ['clamp(1.0625rem, 1.35vw, 1.3125rem)', { lineHeight: '1.55', letterSpacing: '-0.01em' }],
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.16em' }],
      },
      maxWidth: {
        shell: '84rem',
        prose: '68ch',
      },
      spacing: {
        section: 'clamp(4.5rem, 9vw, 9rem)',
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
