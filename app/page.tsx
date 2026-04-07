'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  trackResumeDownload,
  trackCaseStudyClicked,
  trackLinkedInClicked,
  trackGitHubClicked,
  trackCalendlyClicked,
  trackEmailClicked,
  CASE_STUDY_IDS,
} from '@/utils/analytics';

// ─── Replace these before deploying ────────────────────────────────────────
const SITE_URL     = 'https://risk-portfolio.vercel.app';
const RESUME_PDF   = '/resume-shashi-shekhar.pdf';
const CALENDLY_URL = 'YOUR_CALENDLY_LINK';
const LINKEDIN_URL = 'https://linkedin.com/in/YOUR_LINKEDIN_SLUG';
const GITHUB_URL   = 'https://github.com/YOUR_GITHUB_USERNAME';
const EMAIL        = 'shashishekhar.ds@gmail.com';
// Drop photo.jpg in /public/ and change null → '/photo.jpg'
const PHOTO_URL: string | null = null;

// ─── Motion preset ──────────────────────────────────────────────────────────
// One animation used consistently across the entire page.
// Opacity + 14px vertical rise, spring easing, 0.7s.
// Nothing else moves.
const rise = (delay = 0) => ({
  initial:   { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport:  { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

// ─── Subtle noise texture overlay on the hero ───────────────────────────────
// A very faint animated grain. Visible only on close inspection.
// No colours, no distracting patterns — just surface texture.
function NoiseCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;
    const SIZE = 200;
    canvas.width  = SIZE;
    canvas.height = SIZE;

    function drawNoise() {
      const img = ctx!.createImageData(SIZE, SIZE);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255;
        img.data[i]     = v;
        img.data[i + 1] = v;
        img.data[i + 2] = v;
        img.data[i + 3] = 12; // very transparent — barely visible
      }
      ctx!.putImageData(img, 0, 0);
      rafId = requestAnimationFrame(drawNoise);
    }

    drawNoise();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full opacity-40"
      style={{ imageRendering: 'pixelated' }}
    />
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
          ? 'py-3.5 bg-[rgba(11,15,26,0.92)] backdrop-blur-xl border-b border-white/[0.05]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-site mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Wordmark */}
        <span className="font-mono text-[0.72rem] font-medium tracking-[0.22em] uppercase text-white/70 select-none">
          Shashi Shekhar
        </span>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-10" role="list">
          {links.map(([label, href]) => (
            <li key={href}>
              <button
                onClick={() => go(href)}
                className="text-[0.72rem] font-medium tracking-[0.1em] uppercase text-white/38 hover:text-white/80 transition-colors duration-300"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={RESUME_PDF}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackResumeDownload('nav')}
            className="text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-gold border border-gold/40 px-4 py-2 rounded hover:bg-gold/8 transition-colors duration-300"
          >
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="md:hidden text-white/55 hover:text-white/90 transition-colors p-1"
          onClick={() => setOpen(o => !o)}
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
            <rect x="0" y="0"  width={open ? '22' : '22'} height="1.5" rx="1" fill="currentColor"
              className={`transition-all duration-300 origin-center ${open ? 'translate-y-[7px] rotate-45' : ''}`}
              style={{ transformBox: 'fill-box' }}
            />
            <rect x="0" y="7"  width="16" height="1.5" rx="1" fill="currentColor"
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
          transition={{ duration: 0.25 }}
          className="md:hidden absolute inset-x-0 top-full bg-[#0d1120] border-b border-white/[0.06] px-6 py-7 flex flex-col gap-6"
        >
          {links.map(([label, href]) => (
            <button
              key={href}
              onClick={() => go(href)}
              className="text-left text-[0.8rem] font-medium tracking-[0.1em] uppercase text-white/50 hover:text-white"
            >
              {label}
            </button>
          ))}
          <a href={RESUME_PDF} target="_blank" rel="noopener noreferrer"
            onClick={() => trackResumeDownload('nav')}
            className="self-start text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-gold border border-gold/40 px-4 py-2 rounded">
            Resume
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
      {/* Grain */}
      <NoiseCanvas />

      {/* Very subtle radial glow — not a disco orb, just ambient warmth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-48 w-[700px] h-[700px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-site mx-auto w-full px-6 md:px-10 pt-36 pb-24 md:pb-32">

        {/* Status line */}
        <motion.div {...rise(0)} className="flex items-center gap-3 mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-white/35">
            Open to Senior Risk &amp; Director roles — UK · EU · Singapore · Canada
          </span>
        </motion.div>

        {/* Main headline — typography carries the premium feel */}
        <motion.h1
          {...rise(0.08)}
          className="text-[clamp(2.6rem,5.5vw,5rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-white max-w-[860px] mb-7"
        >
          Credit risk is a signal<br className="hidden sm:block" /> processing problem.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p {...rise(0.16)} className="text-[1.05rem] font-light leading-[1.85] text-white/48 max-w-[540px] mb-12">
          Five years governing PD models across a{' '}
          <span className="text-white/75 font-normal">$3B+ commercial lending portfolio</span>{' '}
          at PayPal. I extract signals others aggregate away —
          then defend the architecture in governance forums.
        </motion.p>

        {/* CTAs — restrained */}
        <motion.div {...rise(0.24)} className="flex flex-wrap items-center gap-4 mb-24">
          <a
            href="#work"
            onClick={e => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded text-[0.8rem] font-semibold tracking-[0.06em] uppercase bg-white text-bg hover:bg-white/90 transition-colors duration-300"
          >
            View Work
          </a>
          <a
            href={`mailto:${EMAIL}`}
            onClick={trackEmailClicked}
            className="inline-flex items-center gap-2 px-6 py-3 rounded text-[0.8rem] font-semibold tracking-[0.06em] uppercase text-white/60 border border-white/[0.12] hover:text-white hover:border-white/25 transition-all duration-300"
          >
            Get in touch
          </a>
        </motion.div>

        {/* Metrics bar — flush bottom of hero */}
        <motion.div
          {...rise(0.32)}
          className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.07]"
        >
          {[
            { n: '$3B+',    d: 'Exposure governed'       },
            { n: '20 bps',  d: 'KS lift via FFT'          },
            { n: '340 bps', d: 'Gini improvement'          },
            { n: '5+ yrs',  d: 'In production risk systems' },
          ].map(m => (
            <div key={m.d} className="bg-bg px-6 py-5">
              <div className="text-[1.55rem] font-semibold text-white tracking-tight leading-none mb-1.5">{m.n}</div>
              <div className="text-[0.67rem] font-medium tracking-[0.14em] uppercase text-white/30">{m.d}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

// ─── About + Photo ──────────────────────────────────────────────────────────
function About() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="about" aria-label="About" className="py-28 md:py-36 bg-s1 border-y border-white/[0.06]">
      <div className="max-w-site mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-14 md:gap-20 items-start">

          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-s2 border border-white/[0.07]">
              {PHOTO_URL ? (
                <img
                  src={PHOTO_URL}
                  alt="Shashi Shekhar — Credit Risk Data Scientist"
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="flex flex-col items-start justify-end w-full h-full p-6">
                  <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-white/20 mb-1">Your photo here</p>
                  <p className="text-[0.75rem] text-white/30">
                    Drop <code className="text-gold/70">photo.jpg</code> in <code className="text-gold/70">/public/</code> and set PHOTO_URL
                  </p>
                </div>
              )}
              {/* Subtle gradient overlay at base */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-s2/70 to-transparent pointer-events-none" />
            </div>

            {/* Role badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="absolute -bottom-5 -right-3 md:right-[-1.5rem] bg-s2 border border-white/[0.09] rounded-lg px-4 py-3 shadow-xl"
            >
              <p className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-white/28 mb-0.5">Currently</p>
              <p className="text-[0.88rem] font-semibold text-white leading-tight">PayPal</p>
              <p className="font-mono text-[0.68rem] text-gold/80 mt-0.5">Credit Risk · DS</p>
            </motion.div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="pt-2 md:pt-4"
          >
            <p className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-gold mb-5">About</p>

            <h2 className="text-[clamp(1.7rem,2.6vw,2.4rem)] font-semibold leading-[1.18] tracking-[-0.025em] text-white mb-7 max-w-[520px]">
              I build the models that decide who gets credit — and defend them in the room.
            </h2>

            <div className="space-y-5 text-[0.93rem] font-light leading-[1.9] text-white/50">
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

            <div className="mt-8 pt-8 border-t border-white/[0.07] flex flex-wrap gap-2">
              {[
                'PD Modelling', 'FFT Feature Engineering', 'Open Banking / PSD2',
                'XGBoost · LightGBM', 'SHAP · MRM', 'PSI / KS Monitoring',
                'Scorecard WoE/IV', 'Champion-Challenger', 'Policy Architecture',
              ].map(t => (
                <span
                  key={t}
                  className="text-[0.68rem] font-medium tracking-wide px-3 py-1.5 rounded border border-white/[0.08] text-white/38 bg-white/[0.02]"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Outcomes ───────────────────────────────────────────────────────────────
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

        <motion.p {...rise(0)} className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-gold mb-4">
          Strategic Outcomes
        </motion.p>
        <motion.h2 {...rise(0.06)} className="text-[clamp(1.7rem,2.6vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-white mb-3 max-w-[600px]">
          Impact validated in governance, not just backtesting.
        </motion.h2>
        <motion.p {...rise(0.12)} className="text-[0.93rem] font-light text-white/40 max-w-[480px] mb-14 leading-[1.8]">
          Every number below represents a portfolio-level shift adopted post Credit Risk Strategy Committee review.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {outcomes.map((o, i) => (
            <motion.article
              key={o.metric + i}
              {...rise(i * 0.06)}
              className="card-accent relative rounded-xl p-7 bg-s1 border border-white/[0.07] hover:border-white/[0.13] transition-colors duration-300 overflow-hidden"
            >
              <p className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-white/28 mb-4">{o.co}</p>
              <p className="text-[2rem] font-semibold text-white leading-none tracking-tight mb-2">{o.metric}</p>
              <p className="text-[0.83rem] font-medium text-white/60 mb-4 leading-[1.45]">{o.title}</p>
              <p className="text-[0.78rem] text-white/30 leading-[1.75] border-t border-white/[0.06] pt-4">{o.body}</p>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Governance / Decisions ──────────────────────────────────────────────────
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
    <section id="decisions" aria-label="Governance decisions" className="py-28 md:py-36 bg-s1 border-y border-white/[0.06]">
      <div className="max-w-site mx-auto px-6 md:px-10">

        <motion.p {...rise(0)} className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-gold mb-4">
          Governance &amp; Decisions
        </motion.p>
        <motion.h2 {...rise(0.06)} className="text-[clamp(1.7rem,2.6vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-white mb-3 max-w-[600px]">
          Positions defended in Risk Committees.
        </motion.h2>
        <motion.p {...rise(0.12)} className="text-[0.93rem] font-light text-white/40 max-w-[480px] mb-14 leading-[1.8]">
          Technical trade-offs, rejected prescriptions, second-order thinking about model risk.
        </motion.p>

        <div className="space-y-3">
          {decisions.map((d, i) => (
            <motion.article
              key={d.id}
              {...rise(i * 0.08)}
              onClick={() => trackCaseStudyClicked(d.id, d.title)}
              className="group grid grid-cols-[52px_1fr] md:grid-cols-[72px_1fr] gap-6 md:gap-10 p-7 md:p-9 rounded-xl bg-bg border border-white/[0.07] hover:border-white/[0.14] cursor-pointer transition-colors duration-300"
            >
              <span className="font-mono text-[0.65rem] tracking-[0.14em] text-white/18 pt-1 group-hover:text-white/30 transition-colors">{d.n}</span>
              <div>
                <h3 className="text-[1.02rem] font-semibold text-white/75 mb-3 leading-[1.4] group-hover:text-white transition-colors duration-300">
                  {d.title}
                </h3>
                <div className="flex gap-2 flex-wrap mb-4">
                  {d.tags.map(t => (
                    <span key={t} className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-gold/55 px-2.5 py-1 bg-gold/[0.06] rounded border border-gold/[0.14]">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-[0.83rem] text-white/35 leading-[1.82] max-w-[640px]">{d.body}</p>
                <p className="mt-4 font-mono text-[0.72rem] text-white/22">
                  → <span className="text-gold/70">{d.line}</span>
                </p>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Philosophy ──────────────────────────────────────────────────────────────
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

        <motion.p {...rise(0)} className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-gold mb-4">
          Thinking
        </motion.p>
        <motion.h2 {...rise(0.06)} className="text-[clamp(1.7rem,2.6vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-white mb-3 max-w-[560px]">
          Views formed in production, not textbooks.
        </motion.h2>
        <motion.p {...rise(0.12)} className="text-[0.93rem] font-light text-white/40 max-w-[440px] mb-14 leading-[1.8]">
          Positions held through five years of building, shipping, and defending.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {beliefs.map((b, i) => (
            <motion.article
              key={b.title}
              {...rise(i * 0.08)}
              className="card-accent relative rounded-xl p-8 bg-s1 border border-white/[0.07] hover:border-white/[0.12] transition-colors duration-300 overflow-hidden"
            >
              <p className="font-mono text-[0.62rem] tracking-[0.2em] uppercase text-gold/55 mb-4">0{i + 1}</p>
              <h3 className="text-[1rem] font-semibold text-white/78 leading-[1.45] mb-3">{b.title}</h3>
              <p className="text-[0.82rem] text-white/32 leading-[1.8]">{b.body}</p>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Career ──────────────────────────────────────────────────────────────────
const roles = [
  {
    period:  '2022 — Present',
    title:   'Data Scientist — Credit Risk',
    company: 'PayPal',
    badge:   '$3B+ · US & UK',
    body:    'PD model governance across US and UK commercial lending portfolios. FFT-based feature engineering. Open Banking PSD2 integration. Presentations to Credit Risk Strategy Committee.',
  },
  {
    period:  '2020 — 2022',
    title:   'Data Scientist — Risk & Underwriting',
    company: 'Liquiloans',
    badge:   '340 bps Gini',
    body:    'Full scorecard suite: WoE/IV architecture, champion-challenger deployment, SHAP explainability for MRM. Led a 9-month development cycle including technical hiring.',
  },
  {
    period:  '2019 — 2020',
    title:   'Data Scientist',
    company: 'Jodo',
    badge:   '$500M book',
    body:    '0→1 credit decisioning for education lending. Transaction data pipeline, risk segmentation logic, multi-lender syndication reconciliation.',
  },
];

function Career() {
  return (
    <section id="career" aria-label="Career" className="py-28 md:py-36 bg-s1 border-y border-white/[0.06]">
      <div className="max-w-site mx-auto px-6 md:px-10">

        <motion.p {...rise(0)} className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-gold mb-4">
          Career
        </motion.p>
        <motion.h2 {...rise(0.06)} className="text-[clamp(1.7rem,2.6vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-white mb-14 max-w-[480px]">
          Ownership across three fintech cycles.
        </motion.h2>

        {/* Timeline */}
        <div className="relative timeline-line pl-8 md:pl-10 space-y-10">
          {roles.map((r, i) => (
            <motion.div
              key={r.company}
              {...rise(i * 0.1)}
              className="relative group"
            >
              {/* Dot */}
              <div className="absolute -left-[2.1rem] md:-left-[2.6rem] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white/20 bg-bg group-hover:border-gold/60 transition-colors duration-300" />

              <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-white/25 mb-1">{r.period}</p>
              <p className="text-[1.05rem] font-semibold text-white/80 leading-tight">{r.title}</p>
              <div className="flex items-center gap-3 mt-1.5 mb-3">
                <span className="text-[0.83rem] font-medium text-gold/80">{r.company}</span>
                <span className="font-mono text-[0.62rem] px-2.5 py-0.5 rounded border border-white/[0.08] text-white/28 bg-white/[0.03]">{r.badge}</span>
              </div>
              <p className="text-[0.82rem] text-white/35 leading-[1.82] max-w-[560px]">{r.body}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="py-28 md:py-40 bg-bg">
      {/* Ambient glow — single, centred, very low opacity */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 flex justify-center"
        style={{ transform: 'translateY(-30%)' }}
      >
        <div
          className="w-[500px] h-[500px] rounded-full opacity-[0.035]"
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 65%)' }}
        />
      </div>

      <div className="relative z-10 max-w-[640px] mx-auto px-6 md:px-10 text-center">
        <motion.div {...rise(0)}>
          <p className="font-mono text-[0.68rem] tracking-[0.22em] uppercase text-gold mb-6 inline-block">
            Let&apos;s talk
          </p>

          <h2 className="text-[clamp(2rem,3.8vw,3.2rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white mb-5">
            Exploring Director-level risk roles.
          </h2>

          <p className="text-[0.95rem] font-light text-white/42 leading-[1.85] mb-10">
            I&apos;m looking for roles where credit architecture, governance, and quantitative depth
            are all valued at once. Open to relocation — UK, EU, Singapore, or Canada.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <a
              href={`mailto:${EMAIL}`}
              onClick={trackEmailClicked}
              className="inline-flex items-center gap-2 px-6 py-3 rounded text-[0.8rem] font-semibold tracking-[0.06em] uppercase bg-white text-bg hover:bg-white/90 transition-colors duration-300"
            >
              Email me
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackCalendlyClicked}
              className="inline-flex items-center gap-2 px-6 py-3 rounded text-[0.8rem] font-semibold tracking-[0.06em] uppercase text-white/60 border border-white/[0.12] hover:text-white hover:border-white/25 transition-all duration-300"
            >
              Schedule a call
            </a>
          </div>

          <div className="flex items-center justify-center gap-8 text-[0.7rem] font-medium tracking-[0.14em] uppercase">
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackLinkedInClicked('cta')}
              className="text-white/28 hover:text-gold/80 transition-colors duration-300">LinkedIn</a>
            <span className="w-px h-3.5 bg-white/[0.1]" aria-hidden="true" />
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
              onClick={trackGitHubClicked}
              className="text-white/28 hover:text-gold/80 transition-colors duration-300">GitHub</a>
            <span className="w-px h-3.5 bg-white/[0.1]" aria-hidden="true" />
            <a href={RESUME_PDF} target="_blank" rel="noopener noreferrer"
              onClick={() => trackResumeDownload('cta')}
              className="text-white/28 hover:text-gold/80 transition-colors duration-300">Resume</a>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

// ─── JSON-LD ─────────────────────────────────────────────────────────────────
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
  sameAs: [LINKEDIN_URL, GITHUB_URL],
  email: EMAIL,
};

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      <title>Shashi Shekhar — Credit Risk Data Scientist | PD Models · FFT · Open Banking · PayPal</title>
      <meta name="description" content="Credit Risk Data Scientist at PayPal governing a $3B+ commercial lending portfolio. Specialist in PD model lifecycle, FFT-based feature engineering, Open Banking integration, and risk governance." />
      <meta name="keywords" content="Shashi Shekhar, Shashi Shekhar PayPal, Credit Risk Data Scientist, PD Models, FFT Feature Engineering, Open Banking, Risk Governance, Probability of Default, Scorecard, SHAP, LightGBM, XGBoost" />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:type"        content="website" />
      <meta property="og:url"         content={SITE_URL} />
      <meta property="og:title"       content="Shashi Shekhar — Credit Risk Data Scientist" />
      <meta property="og:description" content="$3B+ portfolio governance at PayPal. PD models, FFT feature engineering, Open Banking." />
      <meta property="og:image"       content={`${SITE_URL}/og-image.png`} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content="Shashi Shekhar — Credit Risk Data Scientist" />
      <meta name="twitter:description" content="$3B+ portfolio governance at PayPal. PD models, FFT feature engineering, Open Banking." />
      <meta name="twitter:image"       content={`${SITE_URL}/og-image.png`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Nav />
      <main>
        <Hero />
        <About />
        <Outcomes />
        <Governance />
        <Philosophy />
        <Career />
        <Contact />
      </main>

      <footer className="py-7 border-t border-white/[0.05] bg-bg">
        <div className="max-w-site mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-[0.65rem] tracking-[0.1em] text-white/18">© 2026 Shashi Shekhar</p>
          <p className="font-mono text-[0.65rem] tracking-[0.1em] text-white/12">Credit Risk &amp; Decision Architecture</p>
        </div>
      </footer>
    </>
  );
}
