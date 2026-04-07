(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/Vs/risk-portfolio-git/utils/analytics.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ANALYTICS_EVENTS",
    ()=>ANALYTICS_EVENTS,
    "CASE_STUDY_IDS",
    ()=>CASE_STUDY_IDS,
    "trackCalendlyClicked",
    ()=>trackCalendlyClicked,
    "trackCaseStudyClicked",
    ()=>trackCaseStudyClicked,
    "trackEmailClicked",
    ()=>trackEmailClicked,
    "trackGitHubClicked",
    ()=>trackGitHubClicked,
    "trackLinkedInClicked",
    ()=>trackLinkedInClicked,
    "trackResumeDownload",
    ()=>trackResumeDownload
]);
/**
 * analytics.ts
 *
 * Centralized event tracking using Vercel Web Analytics.
 * Import these functions in client components and call them from onClick handlers.
 *
 * Events appear in: Vercel Dashboard → Project → Analytics → Events
 *
 * @vercel/analytics `track()` is a no-op:
 *   - In non-browser environments (SSR, build time)
 *   - When Analytics is not yet loaded
 * So no `typeof window` guard is needed.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f40$vercel$2f$analytics$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Vs/risk-portfolio-git/node_modules/@vercel/analytics/dist/index.mjs [app-client] (ecmascript)");
;
const ANALYTICS_EVENTS = {
    RESUME_DOWNLOADED: 'Resume Downloaded',
    CASE_STUDY_CLICKED: 'Case Study Clicked',
    LINKEDIN_CLICKED: 'LinkedIn Clicked',
    GITHUB_CLICKED: 'GitHub Clicked',
    CALENDLY_CLICKED: 'Calendly Clicked',
    EMAIL_CLICKED: 'Email Clicked'
};
const CASE_STUDY_IDS = {
    REJECTED_DEFAULT_INDICATOR: 'rejected-default-indicator',
    FFT_RFM_FEATURES: 'fft-rfm-features',
    MULTI_SCORE_GUARDRAILS: 'multi-score-guardrails'
};
function trackResumeDownload(source = 'hero') {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f40$vercel$2f$analytics$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["track"])(ANALYTICS_EVENTS.RESUME_DOWNLOADED, {
        format: 'PDF',
        source
    });
}
function trackCaseStudyClicked(id, title) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f40$vercel$2f$analytics$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["track"])(ANALYTICS_EVENTS.CASE_STUDY_CLICKED, {
        caseStudyId: id,
        caseStudyTitle: title
    });
}
function trackLinkedInClicked(source = 'cta') {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f40$vercel$2f$analytics$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["track"])(ANALYTICS_EVENTS.LINKEDIN_CLICKED, {
        source
    });
}
function trackGitHubClicked() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f40$vercel$2f$analytics$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["track"])(ANALYTICS_EVENTS.GITHUB_CLICKED);
}
function trackCalendlyClicked() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f40$vercel$2f$analytics$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["track"])(ANALYTICS_EVENTS.CALENDLY_CLICKED);
}
function trackEmailClicked() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f40$vercel$2f$analytics$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["track"])(ANALYTICS_EVENTS.EMAIL_CLICKED);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Vs/risk-portfolio-git/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * page.tsx — Full portfolio landing page.
 *
 * Architecture note: This file is marked 'use client' to allow Framer Motion
 * and event handlers inline. For a larger site you would split into a Server
 * Component that exports `metadata` + imports small Client Components. Since
 * this is a single-page portfolio, the trade-off is acceptable.
 *
 * SEO metadata and JSON-LD are rendered via <head> tags injected below.
 * Replace all YOUR_* placeholders before deploying.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Vs/risk-portfolio-git/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Vs/risk-portfolio-git/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Vs/risk-portfolio-git/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$utils$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Vs/risk-portfolio-git/utils/analytics.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
// ---------------------------------------------------------------------------
// CONSTANTS — replace before deploy
// ---------------------------------------------------------------------------
const SITE_URL = 'https://shashi-shekhar.vercel.app'; // your production domain
const RESUME_PDF = '/resume-shashi-shekhar.pdf'; // place PDF in /public/
const CALENDLY_URL = 'YOUR_CALENDLY_LINK';
const LINKEDIN_URL = 'https://linkedin.com/in/YOUR_LINKEDIN_SLUG';
const GITHUB_URL = 'https://github.com/YOUR_GITHUB_USERNAME';
const EMAIL = 'shashishekhar.ds@gmail.com';
// ---------------------------------------------------------------------------
// ANIMATION VARIANTS
// ---------------------------------------------------------------------------
const fadeUp = {
    hidden: {
        opacity: 0,
        y: 28
    },
    visible: (delay = 0)=>({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [
                    0.16,
                    1,
                    0.3,
                    1
                ],
                delay
            }
        })
};
const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08
        }
    }
};
// ---------------------------------------------------------------------------
// HERO CANVAS — interactive mesh deformation
// ---------------------------------------------------------------------------
function HeroCanvas() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroCanvas.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            let w, h;
            let pts = [];
            const mouse = {
                x: -999,
                y: -999
            };
            let rafId;
            function resize() {
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                w = canvas.parentElement.clientWidth;
                h = canvas.parentElement.clientHeight;
                canvas.width = w * dpr;
                canvas.height = h * dpr;
                canvas.style.width = `${w}px`;
                canvas.style.height = `${h}px`;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                init();
            }
            function init() {
                pts = [];
                const s = 55;
                for(let x = 0; x < w + s; x += s)for(let y = 0; y < h + s; y += s)pts.push({
                    ox: x,
                    oy: y,
                    x,
                    y
                });
            }
            const parent = canvas.parentElement;
            const onMove = {
                "HeroCanvas.useEffect.onMove": (e)=>{
                    const r = canvas.getBoundingClientRect();
                    mouse.x = e.clientX - r.left;
                    mouse.y = e.clientY - r.top;
                }
            }["HeroCanvas.useEffect.onMove"];
            const onLeave = {
                "HeroCanvas.useEffect.onLeave": ()=>{
                    mouse.x = -999;
                    mouse.y = -999;
                }
            }["HeroCanvas.useEffect.onLeave"];
            parent.addEventListener('mousemove', onMove);
            parent.addEventListener('mouseleave', onLeave);
            function draw() {
                ctx.clearRect(0, 0, w, h);
                const t = Date.now() * 0.0004;
                pts.forEach({
                    "HeroCanvas.useEffect.draw": (p)=>{
                        const dx = mouse.x - p.ox, dy = mouse.y - p.oy;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 150) {
                            const f = (1 - dist / 150) * 15;
                            p.x = p.ox + dx / dist * f;
                            p.y = p.oy + dy / dist * f;
                        } else {
                            p.x += (p.ox + Math.sin(t + p.ox * 0.007) * 2.5 - p.x) * 0.05;
                            p.y += (p.oy + Math.cos(t + p.oy * 0.007) * 2.5 - p.y) * 0.05;
                        }
                    }
                }["HeroCanvas.useEffect.draw"]);
                const cols = Math.ceil(w / 55) + 1;
                const rows = Math.ceil(h / 55) + 1;
                ctx.strokeStyle = 'rgba(15,27,45,0.03)';
                ctx.lineWidth = 0.5;
                for(let r = 0; r < rows; r++){
                    ctx.beginPath();
                    for(let co = 0; co < cols; co++){
                        const p = pts[co * rows + r];
                        if (!p) continue;
                        co === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
                    }
                    ctx.stroke();
                }
                for(let co = 0; co < cols; co++){
                    ctx.beginPath();
                    for(let r = 0; r < rows; r++){
                        const p = pts[co * rows + r];
                        if (!p) continue;
                        r === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
                    }
                    ctx.stroke();
                }
                ctx.fillStyle = 'rgba(184,134,11,0.1)';
                pts.forEach({
                    "HeroCanvas.useEffect.draw": (p)=>{
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }["HeroCanvas.useEffect.draw"]);
                rafId = requestAnimationFrame(draw);
            }
            resize();
            window.addEventListener('resize', resize);
            draw();
            return ({
                "HeroCanvas.useEffect": ()=>{
                    cancelAnimationFrame(rafId);
                    window.removeEventListener('resize', resize);
                    parent.removeEventListener('mousemove', onMove);
                    parent.removeEventListener('mouseleave', onLeave);
                }
            })["HeroCanvas.useEffect"];
        }
    }["HeroCanvas.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "absolute inset-0 w-full h-full",
        "aria-hidden": "true"
    }, void 0, false, {
        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
        lineNumber: 165,
        columnNumber: 5
    }, this);
}
_s(HeroCanvas, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = HeroCanvas;
// ---------------------------------------------------------------------------
// NAV
// ---------------------------------------------------------------------------
function Nav() {
    _s1();
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Nav.useEffect": ()=>{
            const handler = {
                "Nav.useEffect.handler": ()=>setScrolled(window.scrollY > 50)
            }["Nav.useEffect.handler"];
            window.addEventListener('scroll', handler, {
                passive: true
            });
            return ({
                "Nav.useEffect": ()=>window.removeEventListener('scroll', handler)
            })["Nav.useEffect"];
        }
    }["Nav.useEffect"], []);
    const scrollTo = (id)=>{
        document.querySelector(id)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        setMenuOpen(false);
    };
    const links = [
        {
            label: 'Outcomes',
            href: '#work'
        },
        {
            label: 'Governance',
            href: '#decisions'
        },
        {
            label: 'Philosophy',
            href: '#philosophy'
        },
        {
            label: 'Career',
            href: '#career'
        },
        {
            label: 'Contact',
            href: '#contact'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b backdrop-blur-xl ${scrolled ? 'py-3 shadow-nav bg-paper/88 border-black/5' : 'py-5 bg-paper/88 border-black/5'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-site mx-auto px-8 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-serif text-xl font-bold text-navy tracking-tight",
                        children: [
                            "Shashi",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gold",
                                children: "."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                lineNumber: 209,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                        lineNumber: 208,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "hidden md:flex gap-9",
                        children: links.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>scrollTo(l.href),
                                    className: "nav-underline relative text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-slate-dark hover:text-navy transition-colors duration-300",
                                    children: l.label
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                    lineNumber: 216,
                                    columnNumber: 15
                                }, this)
                            }, l.href, false, {
                                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                lineNumber: 215,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: RESUME_PDF,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$utils$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackResumeDownload"])('nav'),
                        className: "hidden md:inline-flex items-center px-5 py-2 bg-navy text-paper text-[0.7rem] font-semibold tracking-[0.1em] uppercase rounded-sm hover:bg-gold hover:text-navy transition-all duration-300",
                        children: "Portfolio PDF ↓"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "md:hidden flex flex-col gap-[5px] p-2",
                        onClick: ()=>setMenuOpen((o)=>!o),
                        "aria-label": "Toggle menu",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `block w-5 h-[2px] bg-navy transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `block w-5 h-[2px] bg-navy transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                lineNumber: 243,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `block w-5 h-[2px] bg-navy transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                lineNumber: 244,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this),
            menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden absolute top-full left-0 right-0 bg-paper border-b border-black/5 px-8 py-6 flex flex-col gap-5",
                children: links.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>scrollTo(l.href),
                        className: "text-left text-sm font-semibold tracking-[0.14em] uppercase text-slate-dark hover:text-navy",
                        children: l.label
                    }, l.href, false, {
                        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                        lineNumber: 252,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 250,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
        lineNumber: 200,
        columnNumber: 5
    }, this);
}
_s1(Nav, "EaXJNDiM7KISlWFYokQmqh/1M0I=");
_c1 = Nav;
// ---------------------------------------------------------------------------
// SECTION WRAPPER — reusable scroll-reveal
// ---------------------------------------------------------------------------
function Section({ children, className = '', id }) {
    _s2();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: '-60px'
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].section, {
        ref: ref,
        id: id,
        className: `py-28 ${className}`,
        initial: "hidden",
        animate: inView ? 'visible' : 'hidden',
        variants: staggerContainer,
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
        lineNumber: 281,
        columnNumber: 5
    }, this);
}
_s2(Section, "O7qYEn3iCrBBWRAefWku+E/MdDM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c2 = Section;
function SectionLabel({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        variants: fadeUp,
        custom: 0,
        className: "inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-gold mb-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "block w-5 h-[1.5px] bg-gold"
            }, void 0, false, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 299,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
        lineNumber: 296,
        columnNumber: 5
    }, this);
}
_c3 = SectionLabel;
function SectionTitle({ children, light = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h2, {
        variants: fadeUp,
        custom: 0.08,
        className: `font-serif text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.18] tracking-[-0.015em] max-w-[660px] ${light ? 'text-paper' : 'text-navy'}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
        lineNumber: 307,
        columnNumber: 5
    }, this);
}
_c4 = SectionTitle;
function SectionDesc({ children, light = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
        variants: fadeUp,
        custom: 0.16,
        className: `text-base font-light leading-[1.8] max-w-[540px] mt-3 ${light ? 'text-paper/55' : 'text-slate-dark'}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
        lineNumber: 320,
        columnNumber: 5
    }, this);
}
_c5 = SectionDesc;
// ---------------------------------------------------------------------------
// HERO SECTION
// ---------------------------------------------------------------------------
function HeroSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "min-h-screen flex items-center relative overflow-hidden pt-32 pb-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeroCanvas, {}, void 0, false, {
                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                    lineNumber: 338,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 337,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-site mx-auto px-8 relative z-10 w-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: "hidden",
                    animate: "visible",
                    variants: staggerContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            variants: fadeUp,
                            custom: 0,
                            className: "inline-block font-mono text-[0.7rem] font-medium tracking-[0.15em] uppercase text-gold border border-gold px-3.5 py-1.5 rounded-sm mb-8",
                            children: "Empirical PD Architecture × Signal Processing × Risk Governance"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                            lineNumber: 346,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h1, {
                            variants: fadeUp,
                            custom: 0.08,
                            className: "font-serif text-[clamp(2.6rem,5.2vw,4.5rem)] leading-[1.08] text-navy max-w-[780px] mb-7 tracking-[-0.02em]",
                            children: [
                                "Bridging the gap between",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                    lineNumber: 355,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                    className: "italic text-gold",
                                    children: "model metrics"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                    lineNumber: 356,
                                    columnNumber: 13
                                }, this),
                                " and",
                                ' ',
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                    className: "italic text-gold",
                                    children: "portfolio risk."
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                    lineNumber: 357,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                            lineNumber: 352,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                            variants: fadeUp,
                            custom: 0.16,
                            className: "text-[1.1rem] font-light leading-[1.85] text-slate-dark max-w-[540px] mb-10",
                            children: [
                                "Managing PD model lifecycles and decision architecture for a",
                                ' ',
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    className: "font-medium text-navy",
                                    children: "$3B+ commercial lending portfolio"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                    lineNumber: 364,
                                    columnNumber: 13
                                }, this),
                                ' ',
                                "at PayPal. Specialized in extracting high-fidelity signals from transaction data and defending risk-appetite shifts in governance forums."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                            lineNumber: 360,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            variants: fadeUp,
                            custom: 0.24,
                            className: "flex gap-4 flex-wrap",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: RESUME_PDF,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$utils$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackResumeDownload"])('hero'),
                                    className: "inline-flex items-center gap-2 px-8 py-3.5 bg-navy text-paper text-[0.78rem] font-semibold tracking-[0.1em] uppercase rounded-sm hover:bg-gold hover:text-navy hover:-translate-y-0.5 hover:shadow-gold-glow transition-all duration-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "15",
                                            height: "15",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2",
                                            "aria-hidden": "true",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                                    lineNumber: 378,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                    points: "7 10 12 15 17 10"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                                    lineNumber: 379,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                    x1: "12",
                                                    y1: "15",
                                                    x2: "12",
                                                    y2: "3"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                                    lineNumber: 380,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                            lineNumber: 377,
                                            columnNumber: 15
                                        }, this),
                                        "Full Case Studies"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                    lineNumber: 370,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>document.querySelector('#contact')?.scrollIntoView({
                                            behavior: 'smooth'
                                        }),
                                    className: "inline-flex items-center gap-2 px-8 py-3.5 bg-transparent text-navy border-[1.5px] border-navy text-[0.78rem] font-semibold tracking-[0.1em] uppercase rounded-sm hover:bg-navy hover:text-paper hover:-translate-y-0.5 transition-all duration-300",
                                    children: "Technical Discussion →"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                    lineNumber: 384,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                            lineNumber: 369,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            variants: fadeUp,
                            custom: 0.32,
                            className: "grid grid-cols-2 md:grid-cols-4 gap-8 mt-18 pt-10 border-t border-black/7",
                            children: [
                                {
                                    value: '$3B',
                                    unit: '+',
                                    label: 'Exposure Governed'
                                },
                                {
                                    value: '20',
                                    unit: 'bps',
                                    label: 'KS Lift via FFT Features'
                                },
                                {
                                    value: '3',
                                    unit: '',
                                    label: 'Fintech Cycles Scaled'
                                },
                                {
                                    value: '5',
                                    unit: '+',
                                    label: 'Years in Risk Systems'
                                }
                            ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-serif text-[2.2rem] text-navy leading-none",
                                            children: [
                                                s.value,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gold",
                                                    children: s.unit
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                                    lineNumber: 404,
                                                    columnNumber: 28
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                            lineNumber: 403,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[0.68rem] tracking-[0.12em] uppercase text-muted mt-1.5 font-medium",
                                            children: s.label
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                            lineNumber: 406,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, s.label, true, {
                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                    lineNumber: 402,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                            lineNumber: 393,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                    lineNumber: 341,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 340,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
        lineNumber: 336,
        columnNumber: 5
    }, this);
}
_c6 = HeroSection;
// ---------------------------------------------------------------------------
// SIGNATURE OUTCOMES
// ---------------------------------------------------------------------------
const outcomes = [
    {
        context: 'PayPal · Feature Engineering',
        metric: '20 bps',
        label: 'KS lift via FFT-based periodicity extraction',
        desc: 'Aggregation (mean/sum) of transaction data masks cashflow volatility. I implemented Fast Fourier Transforms (FFT) to extract dominant cyclicality in daily deposits. RFM metrics normalized by this periodicity allowed for dynamic thresholding, improving signal-to-noise ratios in production PD models.'
    },
    {
        context: 'PayPal · US/UK Portfolio',
        metric: '18%',
        label: 'Reduction in early-stage delinquency',
        desc: 'Replaced the prescribed 3-month single-horizon default indicator with a multi-horizon (3–12m) risk framework. Demonstrated that single-horizon indicators failed to capture adverse selection in specific merchant segments. Adopted as a production policy layer.'
    },
    {
        context: 'PayPal · UK Open Banking',
        metric: 'Signal',
        label: 'Transaction stability features via PSD2',
        desc: 'Engineered recurring obligation detection and income stability metrics from Open Banking APIs. These supplement bureau signals, particularly for thin-file segments where traditional credit history is an insufficient proxy for liquidity.'
    },
    {
        context: 'Liquiloans · Decisioning',
        metric: '340 bps',
        label: 'Scorecard Gini improvement',
        desc: 'Owned the full scorecard suite including SHAP-driven explainability for Model Risk Management (MRM) compliance. Led a 9-month development cycle across hiring and sprint planning, ensuring model stability through PSI/CSI monitoring.'
    },
    {
        context: 'Jodo · 0 → 1 Risk',
        metric: '$500M',
        label: 'Origination book from zero infrastructure',
        desc: 'Built initial credit architecture for education lending with no historical bad labels. Leveraged structural proxies from transaction data and designed the interest-split reconciliation logic for multi-lender syndication.'
    }
];
function OutcomesSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
        id: "work",
        className: "bg-cream",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-site mx-auto px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                    children: "Strategic Outcomes"
                }, void 0, false, {
                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                    lineNumber: 456,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                    children: [
                        "Impact validated by",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                            lineNumber: 457,
                            columnNumber: 42
                        }, this),
                        "Credit Committees."
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                    lineNumber: 457,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionDesc, {
                    children: "Moving beyond backtesting. These represent portfolio-level shifts adopted post-governance review."
                }, void 0, false, {
                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                    lineNumber: 458,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12",
                    children: outcomes.map((o, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            variants: fadeUp,
                            custom: i * 0.08,
                            className: "card-gold-bar bg-white border border-black/7 rounded-sm p-8 relative overflow-hidden hover:-translate-y-1 hover:shadow-card-hover hover:border-gold transition-all duration-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-gold mb-2",
                                    children: o.context
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                    lineNumber: 469,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-serif text-[2.4rem] text-navy leading-none mb-1",
                                    children: o.metric
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                    lineNumber: 470,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[0.85rem] font-medium text-slate-dark mb-3",
                                    children: o.label
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                    lineNumber: 471,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[0.82rem] text-muted leading-[1.75] border-t border-black/7 pt-3",
                                    children: o.desc
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                    lineNumber: 472,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, o.metric, true, {
                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                            lineNumber: 464,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                    lineNumber: 462,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
            lineNumber: 455,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
        lineNumber: 454,
        columnNumber: 5
    }, this);
}
_c7 = OutcomesSection;
// ---------------------------------------------------------------------------
// GOVERNANCE / DECISIONS
// ---------------------------------------------------------------------------
const decisions = [
    {
        id: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$utils$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CASE_STUDY_IDS"].REJECTED_DEFAULT_INDICATOR,
        num: '01',
        title: 'Rejecting the prescribed default indicator',
        tags: [
            'Strategic Trade-off',
            'Model Risk'
        ],
        body: 'The standard 30-DPD at 3 months was statistically insufficient for the portfolio\'s long-tail exposure. I argued for a multi-window definition. While the model complexity was flagged by MRM, the resulting risk segments were robust enough to be implemented as the primary policy rule engine, reducing early-life delinquency by 18%.',
        outcome: 'Reasoning →',
        result: 'Trade-off: Granularity vs. Stability. Decision: Use as Policy, not just Model.'
    },
    {
        id: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$utils$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CASE_STUDY_IDS"].FFT_RFM_FEATURES,
        num: '02',
        title: 'FFT-based RFM: Signal Processing in Risk',
        tags: [
            'Scipy',
            'Feature Engineering'
        ],
        body: 'Standard merchant deposit counts fail to distinguish between a business with $10k weekly and $40k monthly—fundamentally different credit profiles. By applying Signal Processing (FFT) to transaction series, I extracted the "dominant period," allowing us to normalize risk metrics by business cycle rather than arbitrary calendar windows.',
        outcome: 'Result →',
        result: 'Top 5 predictive variable; 20 bps KS increment in production.'
    },
    {
        id: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$utils$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CASE_STUDY_IDS"].MULTI_SCORE_GUARDRAILS,
        num: '03',
        title: 'Multi-Score Production Guardrails',
        tags: [
            'Portfolio Monitoring',
            'PSI/CSI'
        ],
        body: 'Identified that blanket PSI (Population Stability Index) thresholds failed on non-uniform joint score distributions. Developed segment-specific breach alerts and Chi-square weighted composites to reduce noise-driven false positives in automated monitoring for the $3B+ portfolio.',
        outcome: 'Outcome →',
        result: 'Automated drift detection across high-dimensional risk segments.'
    }
];
function GovernanceSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
        id: "decisions",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-site mx-auto px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                    children: "Governance & Decisions"
                }, void 0, false, {
                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                    lineNumber: 518,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                    children: [
                        "Defending positions in",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                            lineNumber: 519,
                            columnNumber: 45
                        }, this),
                        "Risk Governance."
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                    lineNumber: 519,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionDesc, {
                    children: "Case studies on technical trade-offs, rejection of prescribed metrics, and second-order thinking."
                }, void 0, false, {
                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                    lineNumber: 520,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-12 divide-y divide-black/7",
                    children: decisions.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            variants: fadeUp,
                            custom: i * 0.1,
                            onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$utils$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackCaseStudyClicked"])(d.id, d.title),
                            className: "grid grid-cols-[60px_1fr] gap-8 py-10 first:border-t first:border-black/7 cursor-pointer group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-serif text-[3rem] text-navy/5 leading-none group-hover:text-navy/10 transition-colors",
                                    children: d.num
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                    lineNumber: 532,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-serif text-[1.25rem] text-navy mb-2 leading-[1.35] group-hover:text-gold transition-colors duration-300",
                                            children: d.title
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                            lineNumber: 534,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2 mb-3 flex-wrap",
                                            children: d.tags.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-gold px-2.5 py-1 bg-gold/8 rounded-sm",
                                                    children: t
                                                }, t, false, {
                                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                                    lineNumber: 539,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                            lineNumber: 537,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[0.88rem] text-slate-dark leading-[1.8] max-w-[620px]",
                                            children: d.body
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                            lineNumber: 542,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 font-mono text-[0.78rem] text-navy font-medium",
                                            children: [
                                                d.outcome,
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gold",
                                                    children: d.result
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                                    lineNumber: 544,
                                                    columnNumber: 31
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                            lineNumber: 543,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                    lineNumber: 533,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, d.id, true, {
                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                            lineNumber: 526,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                    lineNumber: 524,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
            lineNumber: 517,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
        lineNumber: 516,
        columnNumber: 5
    }, this);
}
_c8 = GovernanceSection;
// ---------------------------------------------------------------------------
// PHILOSOPHY
// ---------------------------------------------------------------------------
const philosophies = [
    {
        icon: '◆',
        title: 'Aggregation is a lossy transformation',
        body: 'A simple sum of bank statement data destroys the temporal signal. Credit risk is often a liquidity timing problem; Signal processing (FFT) preserves what rolling averages mask.'
    },
    {
        icon: '◇',
        title: 'Bureau data is a floor, not a ceiling',
        body: 'Traditional scores tell you who defaulted in the past. Transaction data tells you who is approaching a cashflow crunch now. The former identifies bad risk; the latter manages it.'
    },
    {
        icon: '▲',
        title: 'Model risk is often an execution gap',
        body: 'A "perfect" PD model with a flawed interest-accrual or split architecture at the final EMI will consistently fail on reconciliation. Infrastructure is part of the risk model.'
    },
    {
        icon: '○',
        title: 'Explainability (SHAP) is for Governance',
        body: 'Feature importance doesn\'t guarantee fairness, but it ensures auditability. In a $3B+ portfolio, the ability to defend a single decline to a regulator is as critical as the model\'s Gini.'
    }
];
function PhilosophySection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
        id: "philosophy",
        className: "bg-navy",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-site mx-auto px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                    children: "Risk Philosophy"
                }, void 0, false, {
                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                    lineNumber: 585,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                    light: true,
                    children: "Views on Credit Architecture."
                }, void 0, false, {
                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                    lineNumber: 586,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionDesc, {
                    light: true,
                    children: "Positions held through production experience—not textbook theory."
                }, void 0, false, {
                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                    lineNumber: 587,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-6 mt-12",
                    children: philosophies.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            variants: fadeUp,
                            custom: i * 0.08,
                            className: "p-9 border border-paper/8 rounded-sm hover:border-gold hover:bg-paper/3 transition-all duration-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "block text-2xl mb-4 text-gold",
                                    "aria-hidden": "true",
                                    children: p.icon
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                    lineNumber: 598,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-serif text-[1.08rem] text-paper mb-3 leading-[1.35]",
                                    children: p.title
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                    lineNumber: 599,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[0.82rem] text-paper/50 leading-[1.8]",
                                    children: p.body
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                    lineNumber: 600,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, p.title, true, {
                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                            lineNumber: 593,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                    lineNumber: 591,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
            lineNumber: 584,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
        lineNumber: 583,
        columnNumber: 5
    }, this);
}
_c9 = PhilosophySection;
// ---------------------------------------------------------------------------
// CAREER TIMELINE
// ---------------------------------------------------------------------------
const career = [
    {
        period: '2022 — Present',
        role: 'Data Scientist — Credit Risk',
        company: 'PayPal',
        desc: 'Owning PD model governance for US/UK commercial portfolios. Leading feature engineering shifts using signal processing and Open Banking integration. Presenting risk strategies to CRSC.',
        highlight: '$3B+ portfolio | US + UK markets'
    },
    {
        period: '2020 — 2022',
        role: 'Data Scientist — Risk & Underwriting',
        company: 'Liquiloans',
        desc: 'Designed full-stack scorecard suite with champion-challenger frameworks. Led technical team for 9 months through hiring and model development reviews.',
        highlight: '340 bps Gini improvement'
    },
    {
        period: '2019 — 2020',
        role: 'Data Scientist',
        company: 'Jodo',
        desc: '0→1 credit decisioning. Built the initial transaction data pipeline and risk segmentation logic for a $500M loan book.',
        highlight: '$500M origination book'
    }
];
function CareerSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
        id: "career",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-site mx-auto px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                    children: "Career Progression"
                }, void 0, false, {
                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                    lineNumber: 640,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                    children: "Ownership & Scaling."
                }, void 0, false, {
                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                    lineNumber: 641,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-12 relative timeline-rule",
                    children: career.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            variants: fadeUp,
                            custom: i * 0.1,
                            className: "grid grid-cols-[48px_1fr] gap-7 py-8 group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2.5 h-2.5 bg-paper border-2 border-gold rounded-full mt-1.5 ml-5 relative z-10 group-hover:bg-gold group-hover:shadow-[0_0_0_5px_rgba(184,134,11,0.12)] transition-all duration-300"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                        lineNumber: 652,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                    lineNumber: 651,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-mono text-[0.7rem] text-muted mb-0.5",
                                            children: c.period
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                            lineNumber: 655,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-serif text-[1.15rem] text-navy mb-0.5",
                                            children: c.role
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                            lineNumber: 656,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-[0.82rem] font-medium text-gold mb-2",
                                            children: c.company
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                            lineNumber: 657,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[0.82rem] text-slate-dark leading-[1.8] max-w-[540px]",
                                            children: c.desc
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                            lineNumber: 658,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mt-2 inline-block text-[0.75rem] font-medium text-navy px-3 py-1 bg-gold/8 rounded-sm",
                                            children: c.highlight
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                            lineNumber: 659,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                    lineNumber: 654,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, c.company, true, {
                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                            lineNumber: 645,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                    lineNumber: 643,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
            lineNumber: 639,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
        lineNumber: 638,
        columnNumber: 5
    }, this);
}
_c10 = CareerSection;
// ---------------------------------------------------------------------------
// SKILLS
// ---------------------------------------------------------------------------
const skillCategories = [
    {
        title: 'Empirical Modelling',
        skills: [
            'PD Model Lifecycle (XGBoost/LightGBM)',
            'Scorecard WoE / IV Architecture',
            'Champion-Challenger Design',
            'SHAP / LIME Model Explainability'
        ]
    },
    {
        title: 'Risk Governance',
        skills: [
            'PSI / KS / Gini Monitoring',
            'CRSC Policy Defense',
            'Model Risk Management (MRM)',
            'Decision Rule Engines'
        ]
    },
    {
        title: 'Feature Engineering',
        skills: [
            'FFT / Signal Processing (scipy)',
            'Open Banking / PSD2 Data Ops',
            'Dynamic MAD Thresholding',
            'SQL / Advanced Pandas Pipeline'
        ]
    }
];
function SkillsSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
        className: "bg-cream",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-site mx-auto px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                    children: "Technical Stack"
                }, void 0, false, {
                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                    lineNumber: 691,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                    children: "Domain Expertise."
                }, void 0, false, {
                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                    lineNumber: 692,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    variants: fadeUp,
                    custom: 0.16,
                    className: "grid grid-cols-1 md:grid-cols-3 gap-9 mt-12",
                    children: skillCategories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-[0.68rem] font-semibold tracking-[0.15em] uppercase text-gold mb-4 pb-2.5 border-b border-black/7",
                                    children: cat.title
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                    lineNumber: 700,
                                    columnNumber: 15
                                }, this),
                                cat.skills.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 py-1.5 text-[0.85rem] text-slate-dark",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-1.5 h-1.5 bg-navy rounded-full flex-shrink-0",
                                                "aria-hidden": "true"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                                lineNumber: 703,
                                                columnNumber: 19
                                            }, this),
                                            s
                                        ]
                                    }, s, true, {
                                        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                        lineNumber: 702,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, cat.title, true, {
                            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                            lineNumber: 699,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                    lineNumber: 694,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
            lineNumber: 690,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
        lineNumber: 689,
        columnNumber: 5
    }, this);
}
_c11 = SkillsSection;
// ---------------------------------------------------------------------------
// CTA / CONTACT
// ---------------------------------------------------------------------------
function CTASection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "contact",
        className: "py-28 text-center bg-gradient-to-b from-cream to-paper",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-site mx-auto px-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: "hidden",
                whileInView: "visible",
                viewport: {
                    once: true,
                    margin: '-60px'
                },
                variants: staggerContainer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: fadeUp,
                        custom: 0,
                        className: "inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-gold mb-5 justify-center",
                        children: "Connect"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                        lineNumber: 731,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h2, {
                        variants: fadeUp,
                        custom: 0.08,
                        className: "font-serif text-[clamp(1.9rem,3.5vw,2.8rem)] text-navy mb-3 tracking-[-0.015em]",
                        children: "Exploring Senior Risk Roles."
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                        lineNumber: 737,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                        variants: fadeUp,
                        custom: 0.16,
                        className: "text-base font-light text-slate-dark max-w-[480px] mx-auto mb-9 leading-[1.8]",
                        children: "Open to relocation (UK, EU, Singapore, Canada) for roles at global fintech and banking firms. Let's discuss credit architecture."
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                        lineNumber: 743,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: fadeUp,
                        custom: 0.24,
                        className: "flex gap-4 justify-center flex-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: `mailto:${EMAIL}`,
                                onClick: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$utils$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackEmailClicked"],
                                className: "inline-flex items-center gap-2 px-8 py-3.5 bg-navy text-paper text-[0.78rem] font-semibold tracking-[0.1em] uppercase rounded-sm hover:bg-gold hover:text-navy hover:-translate-y-0.5 hover:shadow-gold-glow transition-all duration-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "15",
                                        height: "15",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        "aria-hidden": "true",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "2",
                                                y: "4",
                                                width: "20",
                                                height: "16",
                                                rx: "2"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                                lineNumber: 757,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M22 4l-10 8L2 4"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                                lineNumber: 758,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                        lineNumber: 756,
                                        columnNumber: 15
                                    }, this),
                                    "Email Professional Inquiry"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                lineNumber: 751,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: CALENDLY_URL,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                onClick: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$utils$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackCalendlyClicked"],
                                className: "inline-flex items-center gap-2 px-8 py-3.5 bg-transparent text-navy border-[1.5px] border-navy text-[0.78rem] font-semibold tracking-[0.1em] uppercase rounded-sm hover:bg-navy hover:text-paper hover:-translate-y-0.5 transition-all duration-300",
                                children: "Technical Call →"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                lineNumber: 762,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                        lineNumber: 750,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: fadeUp,
                        custom: 0.32,
                        className: "flex gap-8 justify-center mt-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: LINKEDIN_URL,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$utils$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackLinkedInClicked"])('cta'),
                                className: "text-[0.72rem] font-medium tracking-[0.1em] uppercase text-muted hover:text-gold transition-colors duration-300",
                                children: "LinkedIn"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                lineNumber: 774,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: GITHUB_URL,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                onClick: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$utils$2f$analytics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackGitHubClicked"],
                                className: "text-[0.72rem] font-medium tracking-[0.1em] uppercase text-muted hover:text-gold transition-colors duration-300",
                                children: "GitHub"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                lineNumber: 783,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                        lineNumber: 773,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                        variants: fadeUp,
                        custom: 0.4,
                        className: "mt-6 text-[0.78rem] text-muted",
                        children: [
                            "Currently at ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gold font-medium",
                                children: "PayPal"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                                lineNumber: 795,
                                columnNumber: 26
                            }, this),
                            " · Available for conversations"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                        lineNumber: 794,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 725,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
            lineNumber: 724,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
        lineNumber: 720,
        columnNumber: 5
    }, this);
}
_c12 = CTASection;
// ---------------------------------------------------------------------------
// JSON-LD — Person schema for Google Knowledge Graph
// ---------------------------------------------------------------------------
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shashi Shekhar',
    jobTitle: 'Data Scientist — Credit Risk',
    worksFor: {
        '@type': 'Organization',
        name: 'PayPal',
        url: 'https://paypal.com'
    },
    description: 'Credit Risk Data Scientist specializing in PD model governance, FFT-based feature engineering, and Open Banking integration for commercial lending portfolios exceeding $3B.',
    knowsAbout: [
        'Probability of Default Models',
        'FFT Feature Engineering',
        'Open Banking PSD2',
        'Risk Governance',
        'XGBoost LightGBM',
        'SHAP Explainability',
        'PSI KS Monitoring',
        'Scorecard WoE IV Architecture',
        'Credit Risk Data Science',
        'Fintech'
    ],
    url: SITE_URL,
    sameAs: [
        LINKEDIN_URL,
        GITHUB_URL
    ],
    email: EMAIL
};
function Page() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: {
                    __html: JSON.stringify(jsonLd)
                }
            }, void 0, false, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 842,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                children: "Shashi Shekhar — Credit Risk Data Scientist | PD Models, FFT Feature Engineering"
            }, void 0, false, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 849,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "description",
                content: "Credit Risk leader focused on PD model governance, signal processing in feature engineering, and portfolio decisioning. Managed risk for $3B+ commercial lending portfolio at PayPal."
            }, void 0, false, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 850,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "keywords",
                content: "Shashi Shekhar, Credit Risk Data Scientist, PD Models, FFT Feature Engineering, Open Banking, PayPal Risk, Scorecard, SHAP, Probability of Default"
            }, void 0, false, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 854,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                rel: "canonical",
                href: SITE_URL
            }, void 0, false, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 855,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                property: "og:type",
                content: "website"
            }, void 0, false, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 856,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                property: "og:url",
                content: SITE_URL
            }, void 0, false, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 857,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                property: "og:title",
                content: "Shashi Shekhar — Credit Risk Data Scientist"
            }, void 0, false, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 858,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                property: "og:description",
                content: "Credit Risk leader specializing in PD model governance, FFT-based signal processing, and $3B+ portfolio decisioning."
            }, void 0, false, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 859,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                property: "og:image",
                content: `${SITE_URL}/og-image.png`
            }, void 0, false, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 860,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                property: "og:image:width",
                content: "1200"
            }, void 0, false, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 861,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                property: "og:image:height",
                content: "630"
            }, void 0, false, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 862,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "twitter:card",
                content: "summary_large_image"
            }, void 0, false, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 863,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "twitter:title",
                content: "Shashi Shekhar — Credit Risk Data Scientist"
            }, void 0, false, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 864,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "twitter:description",
                content: "PD model governance, FFT feature engineering, Open Banking integration. $3B+ portfolio at PayPal."
            }, void 0, false, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 865,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "twitter:image",
                content: `${SITE_URL}/og-image.png`
            }, void 0, false, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 866,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Nav, {}, void 0, false, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 868,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeroSection, {}, void 0, false, {
                        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                        lineNumber: 870,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OutcomesSection, {}, void 0, false, {
                        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                        lineNumber: 871,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GovernanceSection, {}, void 0, false, {
                        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                        lineNumber: 872,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PhilosophySection, {}, void 0, false, {
                        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                        lineNumber: 873,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CareerSection, {}, void 0, false, {
                        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                        lineNumber: 874,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkillsSection, {}, void 0, false, {
                        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                        lineNumber: 875,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CTASection, {}, void 0, false, {
                        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                        lineNumber: 876,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 869,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "py-8 border-t border-black/7 text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-site mx-auto px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Vs$2f$risk$2d$portfolio$2d$git$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[0.72rem] text-muted tracking-[0.05em]",
                        children: "© 2026 Shashi Shekhar · Risk Architecture & Decision Systems"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                        lineNumber: 880,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                    lineNumber: 879,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/Vs/risk-portfolio-git/app/page.tsx",
                lineNumber: 878,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c13 = Page;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13;
__turbopack_context__.k.register(_c, "HeroCanvas");
__turbopack_context__.k.register(_c1, "Nav");
__turbopack_context__.k.register(_c2, "Section");
__turbopack_context__.k.register(_c3, "SectionLabel");
__turbopack_context__.k.register(_c4, "SectionTitle");
__turbopack_context__.k.register(_c5, "SectionDesc");
__turbopack_context__.k.register(_c6, "HeroSection");
__turbopack_context__.k.register(_c7, "OutcomesSection");
__turbopack_context__.k.register(_c8, "GovernanceSection");
__turbopack_context__.k.register(_c9, "PhilosophySection");
__turbopack_context__.k.register(_c10, "CareerSection");
__turbopack_context__.k.register(_c11, "SkillsSection");
__turbopack_context__.k.register(_c12, "CTASection");
__turbopack_context__.k.register(_c13, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_Vs_risk-portfolio-git_06l.8tl._.js.map