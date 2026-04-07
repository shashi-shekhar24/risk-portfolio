import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Design tokens mirroring the original CSS variables
        ink:    '#0a0f1a',
        paper:  '#f7f5f0',
        cream:  '#eee9df',
        navy:   '#0f1b2d',
        'slate-dark': '#3d405b',
        gold:   '#b8860b',
        accent: '#1b6ca8',
        muted:  '#7a7a7a',
      },
      fontFamily: {
        // CSS variable names emitted by next/font/google in layout.tsx
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        mono:  ['var(--font-jetbrains)', 'monospace'],
      },
      maxWidth: {
        site: '1140px',
      },
      backgroundImage: {
        'gold-fade': 'linear-gradient(90deg, #b8860b, #0f1b2d)',
      },
      boxShadow: {
        'card-hover': '0 16px 50px rgba(15,27,45,0.05)',
        'gold-glow':  '0 8px 30px rgba(184,134,11,0.18)',
        'nav':        '0 1px 40px rgba(0,0,0,0.03)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
