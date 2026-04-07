import { NextRequest, NextResponse } from 'next/server';

// Edge Runtime — this executes at Vercel's CDN edge before serving the static
// file. With output: 'export', Next.js builds static .html files, but Vercel
// still runs middleware as a separate Edge Function. The flow is:
//   Request → Vercel Edge → middleware.ts → static .html served from CDN
//
// IMPORTANT: This geo-logging only works in Vercel deployments.
// Run `vercel dev` locally to test middleware behavior.
// Plain `next dev` will NOT inject the x-vercel-ip-* headers.

export const config = {
  matcher: [
    // Run on all HTML page requests; skip Next.js internals and static assets
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|ico)).*)',
  ],
};

export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const headers = request.headers;

  // Vercel injects these headers automatically on their infrastructure.
  // They are NOT available in local next dev; use `vercel dev` for local testing.
  const country = headers.get('x-vercel-ip-country') ?? 'unknown';
  const city = headers.get('x-vercel-ip-city')
    ? decodeURIComponent(headers.get('x-vercel-ip-city')!)
    : 'unknown';
  const region = headers.get('x-vercel-ip-country-region') ?? 'unknown';

  // Structured log — captured by Vercel Functions log stream.
  // Safe: no PII stored, no external write, no DB. IP is never logged.
  // To view: Vercel Dashboard → Project → Functions → Logs
  const logEntry = {
    event: 'page_visit',
    path: nextUrl.pathname,
    country,
    city,
    region,
    timestamp: new Date().toISOString(),
    // User-agent for device/browser cohort analysis (no PII)
    userAgent: headers.get('user-agent') ?? 'unknown',
    // Referrer for traffic source analysis
    referrer: headers.get('referer') ?? 'direct',
  };

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(logEntry));

  // Pass through — never block, never redirect. Pure observation layer.
  return NextResponse.next();
}
