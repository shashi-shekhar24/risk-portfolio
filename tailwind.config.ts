import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        bg:       '#0B0F1A',
        s1:       '#111827',
        s2:       '#1a2035',
        gold:     '#C9A84C',
      },
      maxWidth: {
        site: '1160px',
      },
    },
  },
  plugins: [],
};

export default config;
