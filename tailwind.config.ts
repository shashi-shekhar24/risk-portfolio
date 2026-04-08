import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-ibm-plex-sans)', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'IBM Plex Mono', 'monospace'],
      },
      colors: {
        bg:      '#F8F9FB',
        bgalt:   '#F1F3F7',
        surface: '#FFFFFF',
        ink:     '#0F172A',
        ink2:    '#334155',
        ink3:    '#64748B',
        border:  '#E2E8F0',
        accent:  '#4F46E5',
      },
      maxWidth: {
        site: '1160px',
      },
    },
  },
  plugins: [],
};

export default config;
