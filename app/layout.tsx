import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { site } from '@/content/site';
import './globals.css';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F8F9FB',
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: 'profile',
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: site.name,
    locale: 'en_GB',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: ['/og-image.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: 'Data Scientist, Global Credit Risk',
  description: site.description,
  address: { '@type': 'PostalAddress', addressLocality: 'Bengaluru', addressCountry: 'IN' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'IIIT Guwahati' },
  knowsAbout: [
    'Credit risk strategy',
    'Underwriting rules',
    'Open Banking underwriting',
    'Probability of default models',
    'Customer lifetime value modelling',
    'Champion-challenger testing',
    'Small business lending',
  ],
  url: site.url,
  sameAs: [site.linkedin],
  email: site.email,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com; img-src 'self' data: blob:; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self';"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans bg-bg text-ink antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
