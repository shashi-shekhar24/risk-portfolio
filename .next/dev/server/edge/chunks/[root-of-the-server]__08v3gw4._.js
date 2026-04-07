(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push(["chunks/[root-of-the-server]__08v3gw4._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/Downloads/Vs/risk-portfolio-git/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/Vs/risk-portfolio-git/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Vs/risk-portfolio-git/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
;
const config = {
    matcher: [
        // Run on all HTML page requests; skip Next.js internals and static assets
        '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|ico)).*)'
    ]
};
function middleware(request) {
    const { nextUrl } = request;
    const headers = request.headers;
    // Vercel injects these headers automatically on their infrastructure.
    // They are NOT available in local next dev; use `vercel dev` for local testing.
    const country = headers.get('x-vercel-ip-country') ?? 'unknown';
    const city = headers.get('x-vercel-ip-city') ? decodeURIComponent(headers.get('x-vercel-ip-city')) : 'unknown';
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
        referrer: headers.get('referer') ?? 'direct'
    };
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(logEntry));
    // Pass through — never block, never redirect. Pure observation layer.
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__08v3gw4._.js.map