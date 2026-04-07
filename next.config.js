/** @type {import('next').NextConfig} */

// Content Security Policy
// NOTE: 'unsafe-inline' for script-src is required because Vercel Analytics
// injects an inline bootstrap script. A nonce-based CSP would be more secure
// but is incompatible with output: 'export' (static generation). For a
// personal static portfolio this is an acceptable trade-off.
// These headers apply at the Vercel CDN edge even with output: 'export'.
const CSP = [
  "default-src 'self'",
  // Vercel Analytics loader + inline bootstrap
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  // Tailwind inline styles + Google Fonts CSS API
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // Google Fonts binary files
  "font-src 'self' https://fonts.gstatic.com",
  // Vercel Analytics beacon + Web Vitals endpoint
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  // Self-hosted images, OG image, data URIs for canvas
  "img-src 'self' data:",
  // Prevent clickjacking
  "frame-ancestors 'none'",
  // Block all plugin/embed objects
  "object-src 'none'",
  // Prevent base tag injection
  "base-uri 'self'",
  // No external form targets
  "form-action 'self'",
]
  .join('; ')
  .trim();

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: CSP,
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    // Disable unused browser APIs
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
];

const nextConfig = {
  // Pure static site generation — zero server, zero API routes, zero DB.
  // Builds all pages to .html at build time. Deploy /out to any static host.
  output: 'export',

  // next/image optimization requires a server. Disable for static export.
  images: {
    unoptimized: true,
  },

  // Strict React mode
  reactStrictMode: true,

  // Remove /index.html suffix from output paths (cleaner URLs on Vercel)
  trailingSlash: false,

  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
