'use client';

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
 */

import { useEffect, useRef, useState } from 'react';
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

// ---------------------------------------------------------------------------
// CONSTANTS — replace before deploy
// ---------------------------------------------------------------------------
const SITE_URL       = 'https://shashi-shekhar.vercel.app';   // your production domain
const RESUME_PDF     = '/resume-shashi-shekhar.pdf';   // place PDF in /public/
const CALENDLY_URL   = 'YOUR_CALENDLY_LINK';
const LINKEDIN_URL   = 'https://linkedin.com/in/YOUR_LINKEDIN_SLUG';
const GITHUB_URL     = 'https://github.com/YOUR_GITHUB_USERNAME';
const EMAIL          = 'shashishekhar.ds@gmail.com';

// ---------------------------------------------------------------------------
// ANIMATION VARIANTS
// ---------------------------------------------------------------------------
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ---------------------------------------------------------------------------
// HERO CANVAS — interactive mesh deformation
// ---------------------------------------------------------------------------
function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w: number, h: number;
    let pts: { ox: number; oy: number; x: number; y: number }[] = [];
    const mouse = { x: -999, y: -999 };
    let rafId: number;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.parentElement!.clientWidth;
      h = canvas!.parentElement!.clientHeight;
      canvas!.width  = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width  = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    }

    function init() {
      pts = [];
      const s = 55;
      for (let x = 0; x < w + s; x += s)
        for (let y = 0; y < h + s; y += s)
          pts.push({ ox: x, oy: y, x, y });
    }

    const parent = canvas.parentElement!;
    const onMove = (e: MouseEvent) => {
      const r = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -999; mouse.y = -999; };

    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseleave', onLeave);

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      const t = Date.now() * 0.0004;

      pts.forEach(p => {
        const dx = mouse.x - p.ox, dy = mouse.y - p.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const f = (1 - dist / 150) * 15;
          p.x = p.ox + (dx / dist) * f;
          p.y = p.oy + (dy / dist) * f;
        } else {
          p.x += (p.ox + Math.sin(t + p.ox * 0.007) * 2.5 - p.x) * 0.05;
          p.y += (p.oy + Math.cos(t + p.oy * 0.007) * 2.5 - p.y) * 0.05;
        }
      });

      const cols = Math.ceil(w / 55) + 1;
      const rows = Math.ceil(h / 55) + 1;

      ctx!.strokeStyle = 'rgba(15,27,45,0.03)';
      ctx!.lineWidth = 0.5;
      for (let r = 0; r < rows; r++) {
        ctx!.beginPath();
        for (let co = 0; co < cols; co++) {
          const p = pts[co * rows + r];
          if (!p) continue;
          co === 0 ? ctx!.moveTo(p.x, p.y) : ctx!.lineTo(p.x, p.y);
        }
        ctx!.stroke();
      }
      for (let co = 0; co < cols; co++) {
        ctx!.beginPath();
        for (let r = 0; r < rows; r++) {
          const p = pts[co * rows + r];
          if (!p) continue;
          r === 0 ? ctx!.moveTo(p.x, p.y) : ctx!.lineTo(p.x, p.y);
        }
        ctx!.stroke();
      }

      ctx!.fillStyle = 'rgba(184,134,11,0.1)';
      pts.forEach(p => {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
        ctx!.fill();
      });

      rafId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

// ---------------------------------------------------------------------------
// NAV
// ---------------------------------------------------------------------------
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const links = [
    { label: 'Outcomes',   href: '#work' },
    { label: 'Governance', href: '#decisions' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Career',     href: '#career' },
    { label: 'Contact',    href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b backdrop-blur-xl ${
        scrolled
          ? 'py-3 shadow-nav bg-paper/88 border-black/5'
          : 'py-5 bg-paper/88 border-black/5'
      }`}
    >
      <div className="max-w-site mx-auto px-8 flex items-center justify-between">
        <div className="font-serif text-xl font-bold text-navy tracking-tight">
          Shashi<span className="text-gold">.</span>
        </div>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-9">
          {links.map(l => (
            <li key={l.href}>
              <button
                onClick={() => scrollTo(l.href)}
                className="nav-underline relative text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-slate-dark hover:text-navy transition-colors duration-300"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <a
          href={RESUME_PDF}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackResumeDownload('nav')}
          className="hidden md:inline-flex items-center px-5 py-2 bg-navy text-paper text-[0.7rem] font-semibold tracking-[0.1em] uppercase rounded-sm hover:bg-gold hover:text-navy transition-all duration-300"
        >
          Portfolio PDF ↓
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[2px] bg-navy transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-5 h-[2px] bg-navy transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[2px] bg-navy transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-paper border-b border-black/5 px-8 py-6 flex flex-col gap-5">
          {links.map(l => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-left text-sm font-semibold tracking-[0.14em] uppercase text-slate-dark hover:text-navy"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// SECTION WRAPPER — reusable scroll-reveal
// ---------------------------------------------------------------------------
function Section({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref  = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.section
      ref={ref}
      id={id}
      className={`py-28 ${className}`}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={staggerContainer}
    >
      {children}
    </motion.section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} custom={0}
      className="inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-gold mb-5"
    >
      <span className="block w-5 h-[1.5px] bg-gold" />
      {children}
    </motion.div>
  );
}

function SectionTitle({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <motion.h2
      variants={fadeUp} custom={0.08}
      className={`font-serif text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.18] tracking-[-0.015em] max-w-[660px] ${
        light ? 'text-paper' : 'text-navy'
      }`}
    >
      {children}
    </motion.h2>
  );
}

function SectionDesc({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <motion.p
      variants={fadeUp} custom={0.16}
      className={`text-base font-light leading-[1.8] max-w-[540px] mt-3 ${
        light ? 'text-paper/55' : 'text-slate-dark'
      }`}
    >
      {children}
    </motion.p>
  );
}

// ---------------------------------------------------------------------------
// HERO SECTION
// ---------------------------------------------------------------------------
function HeroSection() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-32 pb-16">
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>
      <div className="max-w-site mx-auto px-8 relative z-10 w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} custom={0}
            className="inline-block font-mono text-[0.7rem] font-medium tracking-[0.15em] uppercase text-gold border border-gold px-3.5 py-1.5 rounded-sm mb-8"
          >
            Empirical PD Architecture × Signal Processing × Risk Governance
          </motion.div>

          <motion.h1 variants={fadeUp} custom={0.08}
            className="font-serif text-[clamp(2.6rem,5.2vw,4.5rem)] leading-[1.08] text-navy max-w-[780px] mb-7 tracking-[-0.02em]"
          >
            Bridging the gap between<br />
            <em className="italic text-gold">model metrics</em> and{' '}
            <em className="italic text-gold">portfolio risk.</em>
          </motion.h1>

          <motion.p variants={fadeUp} custom={0.16}
            className="text-[1.1rem] font-light leading-[1.85] text-slate-dark max-w-[540px] mb-10"
          >
            Managing PD model lifecycles and decision architecture for a{' '}
            <strong className="font-medium text-navy">$3B+ commercial lending portfolio</strong>{' '}
            at PayPal. Specialized in extracting high-fidelity signals from transaction data
            and defending risk-appetite shifts in governance forums.
          </motion.p>

          <motion.div variants={fadeUp} custom={0.24} className="flex gap-4 flex-wrap">
            <a
              href={RESUME_PDF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackResumeDownload('hero')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-navy text-paper text-[0.78rem] font-semibold tracking-[0.1em] uppercase rounded-sm hover:bg-gold hover:text-navy hover:-translate-y-0.5 hover:shadow-gold-glow transition-all duration-300"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Full Case Studies
            </a>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent text-navy border-[1.5px] border-navy text-[0.78rem] font-semibold tracking-[0.1em] uppercase rounded-sm hover:bg-navy hover:text-paper hover:-translate-y-0.5 transition-all duration-300"
            >
              Technical Discussion →
            </button>
          </motion.div>

          {/* Proof stats */}
          <motion.div variants={fadeUp} custom={0.32}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-18 pt-10 border-t border-black/7"
          >
            {[
              { value: '$3B', unit: '+', label: 'Exposure Governed' },
              { value: '20', unit: 'bps', label: 'KS Lift via FFT Features' },
              { value: '3', unit: '', label: 'Fintech Cycles Scaled' },
              { value: '5', unit: '+', label: 'Years in Risk Systems' },
            ].map(s => (
              <div key={s.label}>
                <h3 className="font-serif text-[2.2rem] text-navy leading-none">
                  {s.value}<span className="text-gold">{s.unit}</span>
                </h3>
                <p className="text-[0.68rem] tracking-[0.12em] uppercase text-muted mt-1.5 font-medium">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// SIGNATURE OUTCOMES
// ---------------------------------------------------------------------------
const outcomes = [
  {
    context: 'PayPal · Feature Engineering',
    metric:  '20 bps',
    label:   'KS lift via FFT-based periodicity extraction',
    desc:    'Aggregation (mean/sum) of transaction data masks cashflow volatility. I implemented Fast Fourier Transforms (FFT) to extract dominant cyclicality in daily deposits. RFM metrics normalized by this periodicity allowed for dynamic thresholding, improving signal-to-noise ratios in production PD models.',
  },
  {
    context: 'PayPal · US/UK Portfolio',
    metric:  '18%',
    label:   'Reduction in early-stage delinquency',
    desc:    'Replaced the prescribed 3-month single-horizon default indicator with a multi-horizon (3–12m) risk framework. Demonstrated that single-horizon indicators failed to capture adverse selection in specific merchant segments. Adopted as a production policy layer.',
  },
  {
    context: 'PayPal · UK Open Banking',
    metric:  'Signal',
    label:   'Transaction stability features via PSD2',
    desc:    'Engineered recurring obligation detection and income stability metrics from Open Banking APIs. These supplement bureau signals, particularly for thin-file segments where traditional credit history is an insufficient proxy for liquidity.',
  },
  {
    context: 'Liquiloans · Decisioning',
    metric:  '340 bps',
    label:   'Scorecard Gini improvement',
    desc:    'Owned the full scorecard suite including SHAP-driven explainability for Model Risk Management (MRM) compliance. Led a 9-month development cycle across hiring and sprint planning, ensuring model stability through PSI/CSI monitoring.',
  },
  {
    context: 'Jodo · 0 → 1 Risk',
    metric:  '$500M',
    label:   'Origination book from zero infrastructure',
    desc:    'Built initial credit architecture for education lending with no historical bad labels. Leveraged structural proxies from transaction data and designed the interest-split reconciliation logic for multi-lender syndication.',
  },
];

function OutcomesSection() {
  return (
    <Section id="work" className="bg-cream">
      <div className="max-w-site mx-auto px-8">
        <SectionLabel>Strategic Outcomes</SectionLabel>
        <SectionTitle>Impact validated by<br />Credit Committees.</SectionTitle>
        <SectionDesc>
          Moving beyond backtesting. These represent portfolio-level shifts adopted post-governance review.
        </SectionDesc>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {outcomes.map((o, i) => (
            <motion.div
              key={o.metric}
              variants={fadeUp} custom={i * 0.08}
              className="card-gold-bar bg-white border border-black/7 rounded-sm p-8 relative overflow-hidden hover:-translate-y-1 hover:shadow-card-hover hover:border-gold transition-all duration-300"
            >
              <div className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-gold mb-2">{o.context}</div>
              <div className="font-serif text-[2.4rem] text-navy leading-none mb-1">{o.metric}</div>
              <div className="text-[0.85rem] font-medium text-slate-dark mb-3">{o.label}</div>
              <div className="text-[0.82rem] text-muted leading-[1.75] border-t border-black/7 pt-3">{o.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ---------------------------------------------------------------------------
// GOVERNANCE / DECISIONS
// ---------------------------------------------------------------------------
const decisions = [
  {
    id:      CASE_STUDY_IDS.REJECTED_DEFAULT_INDICATOR,
    num:     '01',
    title:   'Rejecting the prescribed default indicator',
    tags:    ['Strategic Trade-off', 'Model Risk'],
    body:    'The standard 30-DPD at 3 months was statistically insufficient for the portfolio\'s long-tail exposure. I argued for a multi-window definition. While the model complexity was flagged by MRM, the resulting risk segments were robust enough to be implemented as the primary policy rule engine, reducing early-life delinquency by 18%.',
    outcome: 'Reasoning →',
    result:  'Trade-off: Granularity vs. Stability. Decision: Use as Policy, not just Model.',
  },
  {
    id:      CASE_STUDY_IDS.FFT_RFM_FEATURES,
    num:     '02',
    title:   'FFT-based RFM: Signal Processing in Risk',
    tags:    ['Scipy', 'Feature Engineering'],
    body:    'Standard merchant deposit counts fail to distinguish between a business with $10k weekly and $40k monthly—fundamentally different credit profiles. By applying Signal Processing (FFT) to transaction series, I extracted the "dominant period," allowing us to normalize risk metrics by business cycle rather than arbitrary calendar windows.',
    outcome: 'Result →',
    result:  'Top 5 predictive variable; 20 bps KS increment in production.',
  },
  {
    id:      CASE_STUDY_IDS.MULTI_SCORE_GUARDRAILS,
    num:     '03',
    title:   'Multi-Score Production Guardrails',
    tags:    ['Portfolio Monitoring', 'PSI/CSI'],
    body:    'Identified that blanket PSI (Population Stability Index) thresholds failed on non-uniform joint score distributions. Developed segment-specific breach alerts and Chi-square weighted composites to reduce noise-driven false positives in automated monitoring for the $3B+ portfolio.',
    outcome: 'Outcome →',
    result:  'Automated drift detection across high-dimensional risk segments.',
  },
];

function GovernanceSection() {
  return (
    <Section id="decisions">
      <div className="max-w-site mx-auto px-8">
        <SectionLabel>Governance &amp; Decisions</SectionLabel>
        <SectionTitle>Defending positions in<br />Risk Governance.</SectionTitle>
        <SectionDesc>
          Case studies on technical trade-offs, rejection of prescribed metrics, and second-order thinking.
        </SectionDesc>

        <div className="mt-12 divide-y divide-black/7">
          {decisions.map((d, i) => (
            <motion.div
              key={d.id}
              variants={fadeUp} custom={i * 0.1}
              onClick={() => trackCaseStudyClicked(d.id, d.title)}
              className="grid grid-cols-[60px_1fr] gap-8 py-10 first:border-t first:border-black/7 cursor-pointer group"
            >
              <div className="font-serif text-[3rem] text-navy/5 leading-none group-hover:text-navy/10 transition-colors">{d.num}</div>
              <div>
                <h3 className="font-serif text-[1.25rem] text-navy mb-2 leading-[1.35] group-hover:text-gold transition-colors duration-300">
                  {d.title}
                </h3>
                <div className="flex gap-2 mb-3 flex-wrap">
                  {d.tags.map(t => (
                    <span key={t} className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-gold px-2.5 py-1 bg-gold/8 rounded-sm">{t}</span>
                  ))}
                </div>
                <p className="text-[0.88rem] text-slate-dark leading-[1.8] max-w-[620px]">{d.body}</p>
                <div className="mt-3 font-mono text-[0.78rem] text-navy font-medium">
                  {d.outcome} <span className="text-gold">{d.result}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ---------------------------------------------------------------------------
// PHILOSOPHY
// ---------------------------------------------------------------------------
const philosophies = [
  {
    icon:  '◆',
    title: 'Aggregation is a lossy transformation',
    body:  'A simple sum of bank statement data destroys the temporal signal. Credit risk is often a liquidity timing problem; Signal processing (FFT) preserves what rolling averages mask.',
  },
  {
    icon:  '◇',
    title: 'Bureau data is a floor, not a ceiling',
    body:  'Traditional scores tell you who defaulted in the past. Transaction data tells you who is approaching a cashflow crunch now. The former identifies bad risk; the latter manages it.',
  },
  {
    icon:  '▲',
    title: 'Model risk is often an execution gap',
    body:  'A "perfect" PD model with a flawed interest-accrual or split architecture at the final EMI will consistently fail on reconciliation. Infrastructure is part of the risk model.',
  },
  {
    icon:  '○',
    title: 'Explainability (SHAP) is for Governance',
    body:  'Feature importance doesn\'t guarantee fairness, but it ensures auditability. In a $3B+ portfolio, the ability to defend a single decline to a regulator is as critical as the model\'s Gini.',
  },
];

function PhilosophySection() {
  return (
    <Section id="philosophy" className="bg-navy">
      <div className="max-w-site mx-auto px-8">
        <SectionLabel>Risk Philosophy</SectionLabel>
        <SectionTitle light>Views on Credit Architecture.</SectionTitle>
        <SectionDesc light>
          Positions held through production experience—not textbook theory.
        </SectionDesc>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {philosophies.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp} custom={i * 0.08}
              className="p-9 border border-paper/8 rounded-sm hover:border-gold hover:bg-paper/3 transition-all duration-300"
            >
              <span className="block text-2xl mb-4 text-gold" aria-hidden="true">{p.icon}</span>
              <h4 className="font-serif text-[1.08rem] text-paper mb-3 leading-[1.35]">{p.title}</h4>
              <p className="text-[0.82rem] text-paper/50 leading-[1.8]">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ---------------------------------------------------------------------------
// CAREER TIMELINE
// ---------------------------------------------------------------------------
const career = [
  {
    period:    '2022 — Present',
    role:      'Data Scientist — Credit Risk',
    company:   'PayPal',
    desc:      'Owning PD model governance for US/UK commercial portfolios. Leading feature engineering shifts using signal processing and Open Banking integration. Presenting risk strategies to CRSC.',
    highlight: '$3B+ portfolio | US + UK markets',
  },
  {
    period:    '2020 — 2022',
    role:      'Data Scientist — Risk & Underwriting',
    company:   'Liquiloans',
    desc:      'Designed full-stack scorecard suite with champion-challenger frameworks. Led technical team for 9 months through hiring and model development reviews.',
    highlight: '340 bps Gini improvement',
  },
  {
    period:    '2019 — 2020',
    role:      'Data Scientist',
    company:   'Jodo',
    desc:      '0→1 credit decisioning. Built the initial transaction data pipeline and risk segmentation logic for a $500M loan book.',
    highlight: '$500M origination book',
  },
];

function CareerSection() {
  return (
    <Section id="career">
      <div className="max-w-site mx-auto px-8">
        <SectionLabel>Career Progression</SectionLabel>
        <SectionTitle>Ownership &amp; Scaling.</SectionTitle>

        <div className="mt-12 relative timeline-rule">
          {career.map((c, i) => (
            <motion.div
              key={c.company}
              variants={fadeUp} custom={i * 0.1}
              className="grid grid-cols-[48px_1fr] gap-7 py-8 group"
            >
              {/* Timeline dot */}
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-paper border-2 border-gold rounded-full mt-1.5 ml-5 relative z-10 group-hover:bg-gold group-hover:shadow-[0_0_0_5px_rgba(184,134,11,0.12)] transition-all duration-300" />
              </div>
              <div>
                <div className="font-mono text-[0.7rem] text-muted mb-0.5">{c.period}</div>
                <div className="font-serif text-[1.15rem] text-navy mb-0.5">{c.role}</div>
                <div className="text-[0.82rem] font-medium text-gold mb-2">{c.company}</div>
                <p className="text-[0.82rem] text-slate-dark leading-[1.8] max-w-[540px]">{c.desc}</p>
                <span className="mt-2 inline-block text-[0.75rem] font-medium text-navy px-3 py-1 bg-gold/8 rounded-sm">{c.highlight}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ---------------------------------------------------------------------------
// SKILLS
// ---------------------------------------------------------------------------
const skillCategories = [
  {
    title: 'Empirical Modelling',
    skills: ['PD Model Lifecycle (XGBoost/LightGBM)', 'Scorecard WoE / IV Architecture', 'Champion-Challenger Design', 'SHAP / LIME Model Explainability'],
  },
  {
    title: 'Risk Governance',
    skills: ['PSI / KS / Gini Monitoring', 'CRSC Policy Defense', 'Model Risk Management (MRM)', 'Decision Rule Engines'],
  },
  {
    title: 'Feature Engineering',
    skills: ['FFT / Signal Processing (scipy)', 'Open Banking / PSD2 Data Ops', 'Dynamic MAD Thresholding', 'SQL / Advanced Pandas Pipeline'],
  },
];

function SkillsSection() {
  return (
    <Section className="bg-cream">
      <div className="max-w-site mx-auto px-8">
        <SectionLabel>Technical Stack</SectionLabel>
        <SectionTitle>Domain Expertise.</SectionTitle>

        <motion.div
          variants={fadeUp} custom={0.16}
          className="grid grid-cols-1 md:grid-cols-3 gap-9 mt-12"
        >
          {skillCategories.map(cat => (
            <div key={cat.title}>
              <h4 className="text-[0.68rem] font-semibold tracking-[0.15em] uppercase text-gold mb-4 pb-2.5 border-b border-black/7">{cat.title}</h4>
              {cat.skills.map(s => (
                <div key={s} className="flex items-center gap-2 py-1.5 text-[0.85rem] text-slate-dark">
                  <span className="w-1.5 h-1.5 bg-navy rounded-full flex-shrink-0" aria-hidden="true" />
                  {s}
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

// ---------------------------------------------------------------------------
// CTA / CONTACT
// ---------------------------------------------------------------------------
function CTASection() {
  return (
    <section
      id="contact"
      className="py-28 text-center bg-gradient-to-b from-cream to-paper"
    >
      <div className="max-w-site mx-auto px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} custom={0}
            className="inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-gold mb-5 justify-center"
          >
            Connect
          </motion.div>

          <motion.h2 variants={fadeUp} custom={0.08}
            className="font-serif text-[clamp(1.9rem,3.5vw,2.8rem)] text-navy mb-3 tracking-[-0.015em]"
          >
            Exploring Senior Risk Roles.
          </motion.h2>

          <motion.p variants={fadeUp} custom={0.16}
            className="text-base font-light text-slate-dark max-w-[480px] mx-auto mb-9 leading-[1.8]"
          >
            Open to relocation (UK, EU, Singapore, Canada) for roles at global fintech and banking firms.
            Let&apos;s discuss credit architecture.
          </motion.p>

          <motion.div variants={fadeUp} custom={0.24} className="flex gap-4 justify-center flex-wrap">
            <a
              href={`mailto:${EMAIL}`}
              onClick={trackEmailClicked}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-navy text-paper text-[0.78rem] font-semibold tracking-[0.1em] uppercase rounded-sm hover:bg-gold hover:text-navy hover:-translate-y-0.5 hover:shadow-gold-glow transition-all duration-300"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 4l-10 8L2 4"/>
              </svg>
              Email Professional Inquiry
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackCalendlyClicked}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent text-navy border-[1.5px] border-navy text-[0.78rem] font-semibold tracking-[0.1em] uppercase rounded-sm hover:bg-navy hover:text-paper hover:-translate-y-0.5 transition-all duration-300"
            >
              Technical Call →
            </a>
          </motion.div>

          <motion.div variants={fadeUp} custom={0.32} className="flex gap-8 justify-center mt-10">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLinkedInClicked('cta')}
              className="text-[0.72rem] font-medium tracking-[0.1em] uppercase text-muted hover:text-gold transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackGitHubClicked}
              className="text-[0.72rem] font-medium tracking-[0.1em] uppercase text-muted hover:text-gold transition-colors duration-300"
            >
              GitHub
            </a>
          </motion.div>

          <motion.p variants={fadeUp} custom={0.4} className="mt-6 text-[0.78rem] text-muted">
            Currently at <span className="text-gold font-medium">PayPal</span> · Available for conversations
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

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
    url: 'https://paypal.com',
  },
  description:
    'Credit Risk Data Scientist specializing in PD model governance, FFT-based feature engineering, and Open Banking integration for commercial lending portfolios exceeding $3B.',
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
    'Fintech',
  ],
  url: SITE_URL,
  sameAs: [LINKEDIN_URL, GITHUB_URL],
  email: EMAIL,
};

// ---------------------------------------------------------------------------
// ROOT PAGE
// ---------------------------------------------------------------------------
export default function Page() {
  return (
    <>
      {/* JSON-LD structured data for Google Knowledge Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* OG / Twitter / SEO meta — injected into <head> via Next.js */}
      {/* (Primary metadata is in layout.tsx; additional page-level tags below) */}
      <title>Shashi Shekhar — Credit Risk Data Scientist | PD Models, FFT Feature Engineering</title>
      <meta
        name="description"
        content="Credit Risk leader focused on PD model governance, signal processing in feature engineering, and portfolio decisioning. Managed risk for $3B+ commercial lending portfolio at PayPal."
      />
      <meta name="keywords" content="Shashi Shekhar, Credit Risk Data Scientist, PD Models, FFT Feature Engineering, Open Banking, PayPal Risk, Scorecard, SHAP, Probability of Default" />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content="Shashi Shekhar — Credit Risk Data Scientist" />
      <meta property="og:description" content="Credit Risk leader specializing in PD model governance, FFT-based signal processing, and $3B+ portfolio decisioning." />
      <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Shashi Shekhar — Credit Risk Data Scientist" />
      <meta name="twitter:description" content="PD model governance, FFT feature engineering, Open Banking integration. $3B+ portfolio at PayPal." />
      <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />

      <Nav />
      <main>
        <HeroSection />
        <OutcomesSection />
        <GovernanceSection />
        <PhilosophySection />
        <CareerSection />
        <SkillsSection />
        <CTASection />
      </main>
      <footer className="py-8 border-t border-black/7 text-center">
        <div className="max-w-site mx-auto px-8">
          <p className="text-[0.72rem] text-muted tracking-[0.05em]">
            © 2026 Shashi Shekhar · Risk Architecture &amp; Decision Systems
          </p>
        </div>
      </footer>
    </>
  );
}
