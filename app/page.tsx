'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  trackResumeDownload,
  trackCaseStudyClicked,
  trackLinkedInClicked,
  trackCalendlyClicked,
  trackEmailClicked,
  CASE_STUDY_IDS,
} from '@/utils/analytics';

// ─── Replace these before deploying ────────────────────────────────────────
const SITE_URL     = 'https://risk-portfolio.vercel.app';
const RESUME_PDF   = '/resume-shashi-shekhar.pdf';
const CALENDLY_URL = 'https://calendly.com/shashi__shekhar';
const LINKEDIN_URL = 'https://www.linkedin.com/in/shashi--shekhar';
const EMAIL        = 'shashishekhar.ds@gmail.com';

// ─── Motion preset ──────────────────────────────────────────────────────────
const rise = (delay = 0) => ({
  initial:     { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

// ─── ROC / KS discrimination curve — inline SVG ─────────────────────────────
function RocCurve() {
  return (
    <div className="relative w-full rounded-xl border border-border bg-surface shadow-sm overflow-hidden p-6">
      {/* Card header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-ink3 mb-0.5">PD Model · Champion</p>
          <p className="text-[0.82rem] font-semibold text-ink">Discrimination Curve</p>
        </div>
        <div className="flex gap-3">
          {[
            { label: 'AUC', val: '0.89' },
            { label: 'KS',  val: '0.41' },
            { label: 'Gini', val: '0.78' },
          ].map(m => (
            <div key={m.label} className="text-right">
              <div className="text-[0.65rem] font-mono text-ink3 tracking-wider">{m.label}</div>
              <div className="text-[0.9rem] font-semibold text-accent">{m.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SVG chart */}
      <svg
        viewBox="0 0 320 200"
        className="w-full"
        aria-label="ROC curve showing AUC 0.89, KS 0.41, Gini 0.78"
        role="img"
      >
        <defs>
          <linearGradient id="rocFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#4F46E5" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map(t => (
          <line
            key={t}
            x1={t * 280 + 20} y1="10"
            x2={t * 280 + 20} y2="175"
            stroke="#E2E8F0" strokeWidth="1"
          />
        ))}
        {[0.25, 0.5, 0.75].map(t => (
          <line
            key={t}
            x1="20" y1={t * 165 + 10}
            x2="300" y2={t * 165 + 10}
            stroke="#E2E8F0" strokeWidth="1"
          />
        ))}

        {/* Axis labels */}
        <text x="160" y="195" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="IBM Plex Mono">False Positive Rate</text>
        <text x="8" y="92" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="IBM Plex Mono" transform="rotate(-90,8,92)">True Positive Rate</text>

        {/* Random classifier baseline */}
        <line x1="20" y1="175" x2="300" y2="10" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 3" />

        {/* Champion model — filled area */}
        <path
          d="M20,175 C60,150 80,60 120,35 C160,12 200,10 300,10"
          fill="url(#rocFill)"
          stroke="none"
        />
        <path
          d="M20,175 C60,150 80,60 120,35 C160,12 200,10 300,10"
          fill="none"
          stroke="#4F46E5"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Challenger model — dashed */}
        <path
          d="M20,175 C55,158 90,90 130,58 C170,28 220,14 300,10"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="1.5"
          strokeDasharray="5 3"
          strokeLinecap="round"
        />

        {/* KS annotation */}
        <line x1="118" y1="35" x2="118" y2="108" stroke="#4F46E5" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
        <rect x="90" y="64" width="52" height="16" rx="3" fill="#4F46E5" opacity="0.1" />
        <text x="116" y="74" textAnchor="middle" fontSize="7.5" fill="#4F46E5" fontFamily="IBM Plex Mono" fontWeight="500">KS = 0.41</text>

        {/* Legend */}
        <line x1="170" y1="185" x2="185" y2="185" stroke="#4F46E5" strokeWidth="2" />
        <text x="187" y="188" fontSize="7" fill="#64748B" fontFamily="IBM Plex Mono">Champion</text>
        <line x1="220" y1="185" x2="235" y2="185" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 2" />
        <text x="237" y="188" fontSize="7" fill="#64748B" fontFamily="IBM Plex Mono">Challenger</text>
      </svg>
    </div>
  );
}

// ─── Navigation ─────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = useCallback((id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  }, []);

  const links = [
    ['Work',       '#work'],
    ['Governance', '#decisions'],
    ['Thinking',   '#philosophy'],
    ['Career',     '#career'],
    ['Contact',    '#contact'],
  ] as const;

  return (
    <nav
      aria-label="Primary"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3.5 bg-white/90 backdrop-blur-xl border-b border-border shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-site mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Wordmark */}
        <span className="font-mono text-[0.72rem] font-medium tracking-[0.22em] uppercase text-ink2 select-none">
          Shashi Shekhar
        </span>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10" role="list">
          {links.map(([label, href]) => (
            <li key={href}>
              <button
                onClick={() => go(href)}
                className="text-[0.72rem] font-medium tracking-[0.1em] uppercase text-ink3 hover:text-ink transition-colors duration-200"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackCalendlyClicked}
            className="text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-white bg-accent px-4 py-2 rounded hover:bg-[#4338CA] transition-colors duration-200"
          >
            Schedule a Call
          </a>
          <a
            href={RESUME_PDF}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackResumeDownload('nav')}
            className="text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-ink2 border border-border px-4 py-2 rounded hover:border-ink3 hover:text-ink transition-colors duration-200"
          >
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="md:hidden text-ink3 hover:text-ink transition-colors p-1"
          onClick={() => setOpen(o => !o)}
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
            <rect x="0" y="0" width="22" height="1.5" rx="1" fill="currentColor"
              className={`transition-all duration-300 origin-center ${open ? 'translate-y-[7px] rotate-45' : ''}`}
              style={{ transformBox: 'fill-box' }}
            />
            <rect x="0" y="7" width="16" height="1.5" rx="1" fill="currentColor"
              className={`transition-all duration-300 ${open ? 'opacity-0' : ''}`}
            />
            <rect x="0" y="14" width="22" height="1.5" rx="1" fill="currentColor"
              className={`transition-all duration-300 origin-center ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
              style={{ transformBox: 'fill-box' }}
            />
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute inset-x-0 top-full bg-surface border-b border-border px-6 py-7 flex flex-col gap-6 shadow-sm"
        >
          {links.map(([label, href]) => (
            <button
              key={href}
              onClick={() => go(href)}
              className="text-left text-[0.8rem] font-medium tracking-[0.1em] uppercase text-ink3 hover:text-ink"
            >
              {label}
            </button>
          ))}
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
            onClick={trackCalendlyClicked}
            className="self-start text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-white bg-accent px-4 py-2 rounded">
            Schedule a Call
          </a>
        </motion.div>
      )}
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-bg"
    >
      {/* Subtle indigo glow top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #4F46E5 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-site mx-auto w-full px-6 md:px-10 pt-36 pb-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 items-center">

          {/* Left: text */}
          <div>
            {/* Status */}
            <motion.div {...rise(0)} className="flex items-center gap-3 mb-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-ink3">
                Open to Senior Risk &amp; Director roles — UK · EU · Singapore · Canada
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...rise(0.08)}
              className="text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink max-w-[760px] mb-7"
            >
              Credit risk is a<br className="hidden sm:block" /> signal processing problem.
            </motion.h1>

            {/* Sub */}
            <motion.p {...rise(0.16)} className="text-[1.05rem] font-light leading-[1.85] text-ink3 max-w-[520px] mb-12">
              Five years governing PD models across a{' '}
              <span className="text-ink2 font-normal">$3B+ commercial lending portfolio</span>{' '}
              at PayPal. I extract signals others aggregate away —
              then defend the architecture in governance forums.
            </motion.p>

            {/* CTAs */}
            <motion.div {...rise(0.24)} className="flex flex-wrap items-center gap-3 mb-20">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackCalendlyClicked}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-[0.8rem] font-semibold tracking-[0.06em] uppercase bg-accent text-white hover:bg-[#4338CA] transition-colors duration-200 shadow-sm"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Schedule a Call
              </a>
              <a
                href="#work"
                onClick={e => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-[0.8rem] font-semibold tracking-[0.06em] uppercase text-ink2 border border-border hover:border-ink3 hover:text-ink transition-all duration-200"
              >
                View Work
              </a>
            </motion.div>

            {/* Metrics bar */}
            <motion.div
              {...rise(0.32)}
              className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-xl border border-border bg-border overflow-hidden"
            >
              {[
                { n: '$3B+',    d: 'Exposure governed'        },
                { n: '20 bps',  d: 'KS lift via FFT'          },
                { n: '340 bps', d: 'Gini improvement'          },
                { n: '5+ yrs',  d: 'In production risk systems' },
              ].map(m => (
                <div key={m.d} className="bg-surface px-5 py-4">
                  <div className="text-[1.4rem] font-semibold text-accent tracking-tight leading-none mb-1">{m.n}</div>
                  <div className="text-[0.63rem] font-medium tracking-[0.14em] uppercase text-ink3">{m.d}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: ROC/KS visual */}
          <motion.div {...rise(0.2)} className="hidden lg:block">
            <RocCurve />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────
function About() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="about" aria-label="About" className="py-28 md:py-36 bg-bgalt border-y border-border">
      <div className="max-w-site mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-14 md:gap-20 items-start">

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="pt-2 md:pt-4"
          >
            <p className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-accent mb-5">About</p>

            <h2 className="text-[clamp(1.7rem,2.6vw,2.4rem)] font-semibold leading-[1.18] tracking-[-0.025em] text-ink mb-7 max-w-[520px]">
              I build the models that decide who gets credit — and defend them in the room.
            </h2>

            <div className="space-y-5 text-[0.93rem] font-light leading-[1.9] text-ink3">
              <p>
                I started in fintech when credit risk was still largely a bureau-score exercise.
                Three companies, five years, and a $3B+ portfolio later, my view is simple:
                most credit decisions are limited by the quality of the features, not the model.
              </p>
              <p>
                My contribution has been applying signal processing — specifically FFT — to transaction data
                to extract cyclicality that rolling averages destroy. The result is features with a
                first-principles explanation that survive both MRM review and a credit committee challenge.
              </p>
              <p>
                Outside the model, I write governance documents, present to Credit Risk Strategy Committees,
                and hire. I treat policy architecture as seriously as feature engineering.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-border flex flex-wrap gap-2">
              {[
                'PD Modelling', 'FFT Feature Engineering', 'Open Banking / PSD2',
                'XGBoost · LightGBM', 'SHAP · MRM', 'PSI / KS Monitoring',
                'Scorecard WoE/IV', 'Champion-Challenger', 'Policy Architecture',
              ].map(t => (
                <span
                  key={t}
                  className="text-[0.68rem] font-medium tracking-wide px-3 py-1.5 rounded border border-border text-ink3 bg-surface"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Role badge card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div className="rounded-xl border border-border bg-surface shadow-sm p-7">
              <p className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-ink3 mb-1">Currently</p>
              <p className="text-[1.15rem] font-semibold text-ink leading-tight mb-0.5">PayPal</p>
              <p className="font-mono text-[0.72rem] text-accent font-medium mb-5">Credit Risk · Data Scientist</p>
              <div className="space-y-3 text-[0.82rem] text-ink3 leading-[1.7]">
                <p>PD model governance across US &amp; UK commercial portfolios ($3B+ AUM).</p>
                <p>FFT-based feature engineering from merchant transaction data.</p>
                <p>Open Banking PSD2 integration for thin-file credit assessment.</p>
                <p>CRSC presentations and MRM documentation.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Outcomes ────────────────────────────────────────────────────────────────
const outcomes = [
  {
    co:     'PayPal · Feature Engineering',
    metric: '20 bps',
    title:  'KS lift via FFT-based periodicity extraction',
    body:   'Standard aggregation of merchant transaction data masks cashflow volatility. Applying Fast Fourier Transforms to daily deposit sequences extracts dominant business cycle frequency — normalising RFM metrics by that cycle rather than an arbitrary calendar window improved signal-to-noise in production PD models.',
  },
  {
    co:     'PayPal · US/UK Portfolio',
    metric: '18%',
    title:  'Reduction in early-stage delinquency',
    body:   'The prescribed 30-DPD at 3-month single-horizon indicator failed to capture adverse selection in specific merchant segments. A multi-horizon framework (3–12m) was proposed, challenged, and ultimately adopted as a production policy layer — not just model input.',
  },
  {
    co:     'PayPal · UK Open Banking',
    metric: 'PSD2',
    title:  'Transaction stability features from Open Banking APIs',
    body:   'Engineered recurring obligation detection and income stability metrics from Open Banking data. These supplement bureau signals for thin-file commercial segments where traditional credit history is structurally insufficient as a liquidity proxy.',
  },
  {
    co:     'Liquiloans · Full-Stack Decisioning',
    metric: '340 bps',
    title:  'Scorecard Gini improvement',
    body:   'End-to-end ownership of the scorecard suite — WoE/IV architecture, SHAP-driven explainability for MRM compliance, champion-challenger deployment, PSI/CSI monitoring. Led a 9-month development cycle including team formation.',
  },
  {
    co:     'Jodo · 0 → 1 Credit Architecture',
    metric: '$500M',
    title:  'Origination book built from zero infrastructure',
    body:   'Built the initial credit decisioning architecture for education lending with no historical bad labels. Structural proxies from transaction data formed the base policy; interest-split reconciliation logic handled multi-lender syndication.',
  },
];

function Outcomes() {
  return (
    <section id="work" aria-label="Strategic outcomes" className="py-28 md:py-36 bg-bg">
      <div className="max-w-site mx-auto px-6 md:px-10">

        <motion.p {...rise(0)} className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-accent mb-4">
          Strategic Outcomes
        </motion.p>
        <motion.h2 {...rise(0.06)} className="text-[clamp(1.7rem,2.6vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink mb-3 max-w-[600px]">
          Impact validated in governance, not just backtesting.
        </motion.h2>
        <motion.p {...rise(0.12)} className="text-[0.93rem] font-light text-ink3 max-w-[480px] mb-14 leading-[1.8]">
          Every number below represents a portfolio-level shift adopted post Credit Risk Strategy Committee review.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {outcomes.map((o, i) => (
            <motion.article
              key={o.metric + i}
              {...rise(i * 0.06)}
              className="card-accent relative rounded-xl p-7 bg-surface border border-border hover:border-accent/30 hover:shadow-sm transition-all duration-300 overflow-hidden"
            >
              <p className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-ink3 mb-4">{o.co}</p>
              <p className="text-[2rem] font-semibold text-accent leading-none tracking-tight mb-2">{o.metric}</p>
              <p className="text-[0.83rem] font-medium text-ink mb-4 leading-[1.45]">{o.title}</p>
              <p className="text-[0.78rem] text-ink3 leading-[1.75] border-t border-border pt-4">{o.body}</p>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Governance ───────────────────────────────────────────────────────────────
const decisions = [
  {
    id:    CASE_STUDY_IDS.REJECTED_DEFAULT_INDICATOR,
    n:     '01',
    title: 'Rejecting the prescribed 30-DPD default indicator',
    tags:  ['Model Risk', 'Governance'],
    body:  'The standard 30-DPD at 3 months was statistically insufficient for the portfolio\'s long-tail commercial exposure. I built the case for a multi-window definition — acknowledging the added complexity, but demonstrating that the resulting risk segments were stable enough to operate as the primary policy rule engine. Early-life delinquency fell 18%.',
    line:  'Trade-off: Granularity vs. Stability — resolved in favour of policy, not model.',
  },
  {
    id:    CASE_STUDY_IDS.FFT_RFM_FEATURES,
    n:     '02',
    title: 'Signal processing as a feature engineering discipline',
    tags:  ['Feature Engineering', 'Scipy'],
    body:  'Standard deposit count and sum features treat a business with $10k weekly and $40k monthly as identical credit profiles. Applying FFT to transaction series surfaces the dominant business cycle — normalising all downstream RFM metrics to that cycle rather than an arbitrary 30-day window. The periodicity stability score became a top-5 SHAP feature in production.',
    line:  '20 bps KS increment. Survived three rounds of MRM challenge.',
  },
  {
    id:    CASE_STUDY_IDS.MULTI_SCORE_GUARDRAILS,
    n:     '03',
    title: 'Rebuilding PSI monitoring for non-uniform joint distributions',
    tags:  ['Portfolio Monitoring', 'PSI/CSI'],
    body:  'Blanket PSI thresholds fail when the underlying score distribution is non-uniform across segments — which is the norm, not the exception, in a commercial lending portfolio. I developed segment-specific breach thresholds calibrated to historical variance, plus Chi-square weighted composites that reduced noise-driven false positive alerts substantially.',
    line:  'Automated drift detection across high-dimensional risk segments.',
  },
];

function Governance() {
  return (
    <section id="decisions" aria-label="Governance decisions" className="py-28 md:py-36 bg-bgalt border-y border-border">
      <div className="max-w-site mx-auto px-6 md:px-10">

        <motion.p {...rise(0)} className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-accent mb-4">
          Governance &amp; Decisions
        </motion.p>
        <motion.h2 {...rise(0.06)} className="text-[clamp(1.7rem,2.6vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink mb-3 max-w-[600px]">
          Positions defended in Risk Committees.
        </motion.h2>
        <motion.p {...rise(0.12)} className="text-[0.93rem] font-light text-ink3 max-w-[480px] mb-14 leading-[1.8]">
          Technical trade-offs, rejected prescriptions, second-order thinking about model risk.
        </motion.p>

        <div className="space-y-3">
          {decisions.map((d, i) => (
            <motion.article
              key={d.id}
              {...rise(i * 0.08)}
              onClick={() => trackCaseStudyClicked(d.id, d.title)}
              className="group grid grid-cols-[52px_1fr] md:grid-cols-[72px_1fr] gap-6 md:gap-10 p-7 md:p-9 rounded-xl bg-surface border border-border hover:border-accent/30 hover:shadow-sm cursor-pointer transition-all duration-300"
            >
              <span className="font-mono text-[0.65rem] tracking-[0.14em] text-ink3 pt-1 group-hover:text-accent transition-colors">{d.n}</span>
              <div>
                <h3 className="text-[1.02rem] font-semibold text-ink2 mb-3 leading-[1.4] group-hover:text-ink transition-colors duration-200">
                  {d.title}
                </h3>
                <div className="flex gap-2 flex-wrap mb-4">
                  {d.tags.map(t => (
                    <span key={t} className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-accent px-2.5 py-1 bg-[rgba(79,70,229,0.07)] rounded border border-[rgba(79,70,229,0.15)]">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-[0.83rem] text-ink3 leading-[1.82] max-w-[640px]">{d.body}</p>
                <p className="mt-4 font-mono text-[0.72rem] text-ink3">
                  → <span className="text-accent">{d.line}</span>
                </p>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Philosophy ───────────────────────────────────────────────────────────────
const beliefs = [
  {
    title: 'Aggregation is a lossy transformation.',
    body:  'A sum of monthly deposits destroys the temporal signal. Credit risk is a liquidity timing problem. The difference between a borrower who will default and one who won\'t often lives in the cashflow rhythm, not the total.',
  },
  {
    title: 'Bureau data is a floor, not a ceiling.',
    body:  'A credit score identifies who has already failed. Transaction data identifies who is approaching failure. The first is retrospective risk measurement; the second is prospective risk management. They are not interchangeable.',
  },
  {
    title: 'Model risk is usually an infrastructure problem.',
    body:  'A technically correct PD model sitting on a flawed interest-accrual architecture will fail on reconciliation. Every risk system is only as good as its last mile — the policy rule engine, the decisioning API, the monitoring pipeline.',
  },
  {
    title: 'Explainability is a governance requirement, not a technical nicety.',
    body:  'In a $3B+ portfolio, the ability to defend a single adverse decision to a regulator is as operationally critical as the model\'s Gini coefficient. SHAP values are a compliance tool before they are an analytical one.',
  },
];

function Philosophy() {
  return (
    <section id="philosophy" aria-label="Risk philosophy" className="py-28 md:py-36 bg-bg">
      <div className="max-w-site mx-auto px-6 md:px-10">

        <motion.p {...rise(0)} className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-accent mb-4">
          Thinking
        </motion.p>
        <motion.h2 {...rise(0.06)} className="text-[clamp(1.7rem,2.6vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink mb-3 max-w-[560px]">
          Views formed in production, not textbooks.
        </motion.h2>
        <motion.p {...rise(0.12)} className="text-[0.93rem] font-light text-ink3 max-w-[440px] mb-14 leading-[1.8]">
          Positions held through five years of building, shipping, and defending.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {beliefs.map((b, i) => (
            <motion.article
              key={b.title}
              {...rise(i * 0.08)}
              className="card-accent relative rounded-xl p-8 bg-surface border border-border hover:border-accent/30 hover:shadow-sm transition-all duration-300 overflow-hidden"
            >
              <p className="font-mono text-[0.62rem] tracking-[0.2em] uppercase text-accent mb-4">0{i + 1}</p>
              <h3 className="text-[1rem] font-semibold text-ink leading-[1.45] mb-3">{b.title}</h3>
              <p className="text-[0.82rem] text-ink3 leading-[1.8]">{b.body}</p>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Career ───────────────────────────────────────────────────────────────────
const roles = [
  {
    period:  'Nov 2024 — Present',
    title:   'Data Scientist — Global Credit Risk',
    company: 'PayPal',
    badge:   '$2B+ AUM · US & UK',
    body:    'PD model execution and portfolio risk analysis for US/UK commercial lending. Feature engineering using Open Banking data. Presenting risk metrics and guardrail performance to CRSC. Collaborating with ML, fraud, and seller risk teams on cross-functional initiatives.',
  },
  {
    period:  'Feb 2024 — Oct 2024',
    title:   'Senior Manager Analytics — Risk & Data Science',
    company: 'Liquiloans',
    badge:   '340 bps Gini · Team Lead (5)',
    body:    'Owned scorecard suite development (application, risk, propensity). Built fraud detection model (GNN). Led team of 5 across model development and early warning systems. Developed credit strategies using PD/EAD/LGD framework.',
  },
  {
    period:  'Oct 2022 — Dec 2023',
    title:   'Business Analyst — Strategy, Growth & Risk',
    company: 'Jodo',
    badge:   '$500M education lending',
    body:    'Developed credit risk ML model for education lending book. Built ETL pipelines (AWS Glue, PySpark) and automated reporting. Led product analytics and cross-functional delivery.',
  },
  {
    period:  'Jan 2021 — Oct 2022',
    title:   'Data Analyst — Data Science Consulting',
    company: 'Accelera Eloquent',
    badge:   'Segmentation · NLP · A/B',
    body:    'ML models for customer segmentation and NLP-based review analysis. A/B testing, dashboard development, and analytics consulting across retail and eCommerce clients.',
  },
];

function Career() {
  return (
    <section id="career" aria-label="Career" className="py-28 md:py-36 bg-bgalt border-y border-border">
      <div className="max-w-site mx-auto px-6 md:px-10">

        <motion.p {...rise(0)} className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-accent mb-4">
          Career
        </motion.p>
        <motion.h2 {...rise(0.06)} className="text-[clamp(1.7rem,2.6vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink mb-14 max-w-[480px]">
          Ownership across three fintech cycles.
        </motion.h2>

        <div className="relative timeline-line pl-8 md:pl-10 space-y-10">
          {roles.map((r, i) => (
            <motion.div
              key={r.company + i}
              {...rise(i * 0.1)}
              className="relative group"
            >
              <div className="absolute -left-[2.1rem] md:-left-[2.6rem] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-border bg-surface group-hover:border-accent transition-colors duration-300" />

              <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-ink3 mb-1">{r.period}</p>
              <p className="text-[1.05rem] font-semibold text-ink leading-tight">{r.title}</p>
              <div className="flex items-center gap-3 mt-1.5 mb-3">
                <span className="text-[0.83rem] font-medium text-accent">{r.company}</span>
                <span className="font-mono text-[0.62rem] px-2.5 py-0.5 rounded border border-border text-ink3 bg-surface">{r.badge}</span>
              </div>
              <p className="text-[0.82rem] text-ink3 leading-[1.82] max-w-[560px]">{r.body}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="py-28 md:py-40 bg-bg relative overflow-hidden">
      {/* Subtle indigo ambient — anchored bottom-left, mirroring the screenshot's glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -bottom-40"
      >
        <div
          className="w-[680px] h-[680px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #4F46E5 0%, transparent 65%)' }}
        />
      </div>

      <div className="relative z-10 max-w-site mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-x-20 gap-y-14 lg:items-start">

          {/* Left — headline, blurb, CTAs */}
          <motion.div {...rise(0)}>
            <p className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-ink3 mb-7">
              Open to Senior Risk Roles
            </p>

            <h2 className="text-[clamp(2.6rem,5.4vw,4.6rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-ink mb-8">
              Ready to talk<br />
              <span className="text-accent">credit risk.</span>
            </h2>

            <p className="text-[0.98rem] font-light text-ink2 leading-[1.85] mb-11 max-w-[500px]">
              Interested in roles where model development connects directly to portfolio-level
              decisions and governance. Open to relocation: UK, EU, Singapore, Canada.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackCalendlyClicked}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-[0.78rem] font-semibold tracking-[0.08em] uppercase bg-accent text-white hover:bg-[#4338CA] transition-colors duration-200 shadow-sm"
              >
                Schedule a Call
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                onClick={trackEmailClicked}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-[0.78rem] font-semibold tracking-[0.08em] uppercase text-ink2 border border-border hover:border-ink3 hover:text-ink transition-all duration-200"
              >
                Send Email
              </a>
            </div>
          </motion.div>

          {/* Right — divided channel list */}
          <motion.div {...rise(0.1)} className="lg:pt-2">

            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackCalendlyClicked}
              className="group flex items-start justify-between gap-4 py-5 border-b border-border hover:border-ink3 transition-colors duration-200"
            >
              <div>
                <div className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-ink3 mb-2">Calendly</div>
                <div className="text-[1.05rem] text-ink group-hover:text-accent transition-colors duration-200">Book a 30-min technical call</div>
              </div>
              <svg className="w-4 h-4 mt-1 text-ink3 group-hover:text-accent transition-colors duration-200 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>

            <a
              href={`mailto:${EMAIL}`}
              onClick={trackEmailClicked}
              className="group flex items-start justify-between gap-4 py-5 border-b border-border hover:border-ink3 transition-colors duration-200"
            >
              <div>
                <div className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-ink3 mb-2">Email</div>
                <div className="text-[1.05rem] text-ink group-hover:text-accent transition-colors duration-200">{EMAIL}</div>
              </div>
              <svg className="w-4 h-4 mt-1 text-ink3 group-hover:text-accent transition-colors duration-200 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/>
              </svg>
            </a>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLinkedInClicked('cta')}
              className="group flex items-start justify-between gap-4 py-5 border-b border-border hover:border-ink3 transition-colors duration-200"
            >
              <div>
                <div className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-ink3 mb-2">LinkedIn</div>
                <div className="text-[1.05rem] text-ink group-hover:text-accent transition-colors duration-200">Connect professionally</div>
              </div>
              <svg className="w-4 h-4 mt-1 text-ink3 group-hover:text-accent transition-colors duration-200 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
            </a>

            <div className="mt-8 px-5 py-5 rounded-lg bg-bgalt border border-border">
              <p className="font-mono text-[0.62rem] tracking-[0.16em] uppercase text-ink3 mb-1.5">Open to relocation</p>
              <p className="text-[0.9rem] text-ink2">UK · EU · Singapore · Canada</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Shashi Shekhar',
  jobTitle: 'Credit Risk Data Scientist',
  worksFor: { '@type': 'Organization', name: 'PayPal', url: 'https://paypal.com' },
  description: 'Credit Risk Data Scientist at PayPal. Specialises in PD model governance, FFT-based feature engineering, and Open Banking integration for commercial lending portfolios exceeding $3B.',
  knowsAbout: [
    'Credit Risk', 'Probability of Default Models', 'FFT Feature Engineering',
    'Open Banking PSD2', 'Risk Governance', 'Model Risk Management',
    'XGBoost LightGBM', 'SHAP Explainability', 'PSI KS Gini Monitoring',
    'Scorecard WoE IV', 'Credit Risk Data Science', 'Fintech',
  ],
  url: SITE_URL,
  sameAs: [LINKEDIN_URL],
  email: EMAIL,
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      <title>Shashi Shekhar — Credit Risk Data Scientist | PD Models · FFT · Open Banking · PayPal</title>
      <meta name="description" content="Credit Risk Data Scientist at PayPal governing a $3B+ commercial lending portfolio. Specialist in PD model lifecycle, FFT-based feature engineering, Open Banking integration, and risk governance." />
      <meta name="keywords" content="Shashi Shekhar, Shashi Shekhar PayPal, Credit Risk Data Scientist, PD Models, FFT Feature Engineering, Open Banking, Risk Governance, Probability of Default, Scorecard, SHAP, LightGBM, XGBoost" />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:type"         content="website" />
      <meta property="og:url"          content={SITE_URL} />
      <meta property="og:title"        content="Shashi Shekhar — Credit Risk Data Scientist" />
      <meta property="og:description"  content="$3B+ portfolio governance at PayPal. PD models, FFT feature engineering, Open Banking." />
      <meta property="og:image"        content={`${SITE_URL}/og-image.png`} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content="Shashi Shekhar — Credit Risk Data Scientist" />
      <meta name="twitter:description" content="$3B+ portfolio governance at PayPal. PD models, FFT feature engineering, Open Banking." />
      <meta name="twitter:image"       content={`${SITE_URL}/og-image.png`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded">
        Skip to main content
      </a>

      <Nav />
      <main id="main-content">
        <Hero />
        <About />
        <Outcomes />
        <Governance />
        <Philosophy />
        <Career />
        <Contact />
      </main>

      <footer className="py-7 border-t border-border bg-bgalt">
        <div className="max-w-site mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-[0.65rem] tracking-[0.1em] text-ink3">© 2026 Shashi Shekhar</p>
          <p className="font-mono text-[0.65rem] tracking-[0.1em] text-ink3">Credit Risk &amp; Decision Architecture</p>
        </div>
      </footer>
    </>
  );
}
