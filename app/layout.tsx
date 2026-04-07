import type { Metadata } from 'next';
import { Playfair_Display, Outfit, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

// --- Fonts ---
// Using next/font/google for self-hosted font delivery (better performance,
// privacy, and no Google Fonts round-trip required at runtime).
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

// --- Site-wide metadata defaults ---
// Page-level metadata in page.tsx will override these.
export const metadata: Metadata = {
  metadataBase: new URL('https://shashishekhar.dev'),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  authors: [{ name: 'Shashi Shekhar', url: 'https://shashishekhar.dev' }],
  creator: 'Shashi Shekhar',
  publisher: 'Shashi Shekhar',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${outfit.variable} ${jetbrains.variable}`}
    >
      <head>
        {/*
          Belt-and-suspenders CSP meta tag.
          Primary CSP is set via next.config.js headers (applied at Vercel CDN edge).
          This meta tag acts as a fallback for non-Vercel environments (local dev,
          GitHub Pages). The Vercel edge header always takes precedence.
        */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com; img-src 'self' data:; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self';"
        />
      </head>
      <body className="font-sans bg-paper text-ink antialiased">
        {children}
        {/*
          Vercel Web Analytics — injects the tracking script.
          Event tracking is done via utils/analytics.ts track() calls.
          No cookies, GDPR-friendly by default.
        */}
        <Analytics />
      </body>
    </html>
  );
}
