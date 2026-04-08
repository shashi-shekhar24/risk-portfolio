import type { Metadata } from 'next';
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://risk-portfolio.vercel.app'),
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  authors: [{ name: 'Shashi Shekhar', url: 'https://risk-portfolio.vercel.app' }],
  creator: 'Shashi Shekhar',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com; img-src 'self' data: blob:; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self';"
        />
      </head>
      <body className="font-sans bg-bg text-ink antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
