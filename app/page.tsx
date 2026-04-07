'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
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
// CONSTANTS — fill before deploy
// ---------------------------------------------------------------------------
const SITE_URL     = 'https://risk-portfolio.vercel.app';
const RESUME_PDF   = '/resume-shashi-shekhar.pdf';
const CALENDLY_URL = 'YOUR_CALENDLY_LINK';
const LINKEDIN_URL = 'https://linkedin.com/in/YOUR_LINKEDIN_SLUG';
const GITHUB_URL   = 'https://github.com/YOUR_GITHUB_USERNAME';
const EMAIL        = 'shashishekhar.ds@gmail.com';
// Set to '/photo.jpg' once you drop your photo in /public/
const PHOTO_URL    = null as string | null;

// ---------------------------------------------------------------------------
// STRIPE-STYLE ANIMATED GRADIENT HERO — the centrepiece
// Renders a WebGL-like smooth flowing gradient using Canvas2D + requestAnimationFrame.
// The gradient colours sweep across the headline text via CSS mix-blend-mode,
// exactly replicating the Stripe "colour-shifting text" effect.
// ---------------------------------------------------------------------------
function GradientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let rafId: number;
    let w = 0, h = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.parentElement!.clientWidth;
      h = canvas!.parentElement!.clientHeight;
      canvas!.width  = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width  = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Flowing orb state — each orb is a large radial gradient blob that drifts
    const orbs = [
      { x: 0.15, y: 0.3,  r: 0.55, speed: 0.00018, phase: 0,    col: [99,  102, 241] },  // indigo
      { x: 0.75, y: 0.2,  r: 0.50, speed: 0.00023, phase: 1.6,  col: [168, 85,  247] },  // purple
      { x: 0.85, y: 0.75, r: 0.45, speed: 0.00019, phase: 3.1,  col: [236, 72,  153] },  // pink
      { x: 0.35, y: 0.8,  r: 0.42, speed: 0.00021, phase: 4.7,  col: [59,  130, 246] },  // blue
      { x: 0.6,  y: 0.5,  r: 0.38, speed: 0.00025, phase: 2.3,  col: [16,  185, 129] },  // emerald
    ];

    function draw(ts: number) {
      ctx!.clearRect(0, 0, w, h);

      // Dark background
      ctx!.fillStyle = '#05080f';
      ctx!.fillRect(0, 0, w, h);

      // Draw each orb
      orbs.forEach(orb => {
        const t = ts * orb.speed + orb.phase;
        // Drift in a lemniscate-like path
        const cx = (orb.x + Math.sin(t) * 0.22) * w;
        const cy = (orb.y + Math.cos(t * 1.3) * 0.18) * h;
        const radius = orb.r * Math.max(w, h);

        const grad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0,   `rgba(${orb.col[0]},${orb.col[1]},${orb.col[2]},0.55)`);
        grad.addColorStop(0.4, `rgba(${orb.col[0]},${orb.col[1]},${orb.col[2]},0.18)`);
        grad.addColorStop(1,   `rgba(${orb.col[0]},${orb.col[1]},${orb.col[2]},0)`);

        ctx!.globalCompositeOperation = 'screen';
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx!.fill();
      });

      // Noise grain overlay for depth — very subtle
      ctx!.globalCompositeOperation = 'source-over';

      rafId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
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
// ANIMATED GRADIENT TEXT — headline words cycle through gradient colours
// Uses SVG linearGradient + CSS animation for the colour-shift effect.
// ---------------------------------------------------------------------------
function GradientText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`gradient-text ${className}`}>
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// CURSOR SPOTLIGHT — subtle glow that follows the mouse
// ---------------------------------------------------------------------------
function CursorSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mx, my]);

  return (
    <motion.div
      ref={spotRef}
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      style={{
        background: 'none',
      }}
    >
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          x: sx,
          y: sy,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// NAV
// ---------------------------------------------------------------------------
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  }, []);

  const links = [
    { label: 'Work',       href: '#work' },
    { label: 'Governance', href: '#decisions' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Career',     href: '#career' },
    { label: 'Contact',    href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'py-3 bg-[rgba(5,8,15,0.85)] backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.04)]'
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <div className="font-mono text-sm font-medium text-white/90 tracking-widest uppercase">
          SS<span className="text-violet-400">.</span>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.href}>
              <button
                onClick={() => scrollTo(l.href)}
                className="text-[0.72rem] font-medium tracking-[0.12em] uppercase text-white/45 hover:text-white/90 transition-colors duration-300"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={RESUME_PDF}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackResumeDownload('nav')}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.72rem] font-semibold tracking-[0.08em] uppercase
            bg-white/[0.08] text-white/80 border border-white/[0.12]
            hover:bg-white/[0.14] hover:text-white hover:border-white/25
            transition-all duration-300"
        >
          Resume ↓
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-white/70"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {menuOpen ? (
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            ) : (
              <>
                <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-[#05080f]/95 backdrop-blur-2xl border-b border-white/[0.06] px-6 py-6 flex flex-col gap-5"
        >
          {links.map(l => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-left text-sm font-medium tracking-[0.12em] uppercase text-white/60 hover:text-white"
            >
              {l.label}
            </button>
          ))}
        </motion.div>
      )}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// HERO
// ---------------------------------------------------------------------------
const heroVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const heroItem = {
  hidden:  { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#05080f]">
      {/* Full-bleed gradient canvas */}
      <div className="absolute inset-0 z-0">
        <GradientCanvas />
      </div>

      {/* Soft vignette at bottom so content reads cleanly */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#05080f] to-transparent z-[1]" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10 pt-32 pb-24">
        <motion.div initial="hidden" animate="visible" variants={heroVariants}>

          {/* Eyebrow badge */}
          <motion.div variants={heroItem} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.12] bg-white/[0.05] backdrop-blur-sm text-[0.68rem] font-mono font-medium tracking-[0.18em] uppercase text-white/55">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to Senior Risk Roles · UK · EU · Singapore · Canada
            </span>
          </motion.div>

          {/* Main headline with gradient colour-shift */}
          <motion.h1
            variants={heroItem}
            className="text-[clamp(2.8rem,6vw,5.2rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white max-w-[900px] mb-7"
          >
            Where{' '}
            <GradientText>signal processing</GradientText>
            {' '}meets<br className="hidden sm:block" />{' '}
            <GradientText>credit risk</GradientText>{' '}architecture.
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            variants={heroItem}
            className="text-[1.05rem] font-light text-white/50 leading-[1.9] max-w-[520px] mb-10"
          >
            PD model governance for a{' '}
            <span className="text-white/80 font-normal">$3B+ commercial lending portfolio</span>{' '}
            at PayPal. FFT-based feature engineering. Open Banking integration.
            Risk decisions that survive a governance forum.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={heroItem} className="flex flex-wrap gap-3 mb-20">
            <a
              href={RESUME_PDF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackResumeDownload('hero')}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-[0.82rem] tracking-wide
                bg-white text-[#05080f]
                hover:bg-white/90 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]
                transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Case Studies
            </a>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[0.82rem] tracking-wide
                bg-white/[0.07] text-white/80 border border-white/[0.12]
                hover:bg-white/[0.12] hover:text-white hover:scale-[1.02]
                transition-all duration-300"
            >
              Let&apos;s talk →
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={heroItem}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]"
          >
            {[
              { value: '$3B+',   label: 'Exposure Governed' },
              { value: '20 bps', label: 'KS Lift via FFT' },
              { value: '340 bps',label: 'Gini Improvement' },
              { value: '5+ yrs', label: 'Risk Systems' },
            ].map(s => (
              <div key={s.label} className="bg-[#05080f]/60 backdrop-blur-sm px-7 py-6">
                <div className="text-[1.7rem] font-bold text-white tracking-tight leading-none mb-1">{s.value}</div>
                <div className="text-[0.68rem] text-white/35 font-medium tracking-[0.12em] uppercase">{s.label}</div>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// PHOTO + ABOUT — split layout
// ---------------------------------------------------------------------------
function AboutSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      id="about"
      className="py-28 bg-[#07090f]"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-16 md:gap-24 items-center">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] max-w-[320px] mx-auto md:mx-0 rounded-2xl overflow-hidden">
              {PHOTO_URL ? (
                <img
                  src={PHOTO_URL}
                  alt="Shashi Shekhar"
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Placeholder — replace PHOTO_URL with '/photo.jpg' */
                <div className="w-full h-full bg-gradient-to-br from-violet-900/40 via-[#0f1220] to-indigo-900/30 flex items-end p-6">
                  <div>
                    <div className="text-[0.65rem] font-mono tracking-[0.2em] uppercase text-white/25 mb-1">Add your photo</div>
                    <div className="text-[0.75rem] text-white/40">Drop <code className="text-violet-400">photo.jpg</code> in <code className="text-violet-400">/public/</code> and set PHOTO_URL</div>
                  </div>
                </div>
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090f]/60 via-transparent to-transparent" />
            </div>

            {/* Floating credential badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -right-4 bottom-8 md:right-[-2rem] bg-[#0d1017] border border-white/[0.1] rounded-xl px-4 py-3 shadow-2xl"
            >
              <div className="text-[0.65rem] text-white/35 font-mono tracking-widest uppercase mb-0.5">Currently at</div>
              <div className="text-sm font-semibold text-white">PayPal</div>
              <div className="text-[0.7rem] text-violet-400 font-mono mt-0.5">Credit Risk · DS</div>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 text-[0.68rem] font-mono tracking-[0.2em] uppercase text-violet-400 mb-5">
              <span className="w-4 h-px bg-violet-400" /> About
            </div>
            <h2 className="text-[clamp(1.8rem,2.8vw,2.5rem)] font-bold leading-[1.2] tracking-[-0.025em] text-white mb-6">
              I build the systems that<br />decide who gets credit.
            </h2>
            <div className="space-y-4 text-[0.93rem] font-light leading-[1.85] text-white/50">
              <p>
                Five years across three fintech cycles — from building a $500M loan book from scratch at Jodo,
                to owning PD model governance across US and UK commercial portfolios at PayPal.
              </p>
              <p>
                My edge: I treat credit risk as an applied signal processing problem.
                Where others aggregate, I decompose. Where others use rolling means, I use FFT.
                The result is features that survive governance review because they have a
                first-principles explanation.
              </p>
              <p>
                I present directly to Credit Risk Strategy Committees. I defend positions in
                Model Risk Management forums. I ship to production.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {['PD Models', 'FFT Feature Eng.', 'Open Banking', 'SHAP / MRM', 'XGBoost / LightGBM', 'PSI / KS Monitoring', 'Scorecard WoE/IV', 'Policy Architecture'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-[0.68rem] font-medium tracking-wide border border-white/[0.08] text-white/45 bg-white/[0.03]">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}

// ---------------------------------------------------------------------------
// REUSABLE SECTION COMPONENTS
// ---------------------------------------------------------------------------
function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref} id={id}
      className={`py-28 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-[0.68rem] font-mono tracking-[0.2em] uppercase text-violet-400 mb-4">
      <span className="w-4 h-px bg-violet-400" />{children}
    </div>
  );
}

function H2({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 className={`text-[clamp(1.8rem,2.8vw,2.6rem)] font-bold leading-[1.15] tracking-[-0.025em] max-w-[640px] ${light ? 'text-white' : 'text-white'}`}>
      {children}
    </h2>
  );
}

// ---------------------------------------------------------------------------
// OUTCOMES SECTION
// ---------------------------------------------------------------------------
const outcomes = [
  { context: 'PayPal · Feature Engineering', metric: '20 bps',  label: 'KS lift via FFT-based periodicity extraction',      desc: 'Implemented Fast Fourier Transforms to extract dominant cashflow cyclicality in daily deposits. RFM metrics normalized by business cycle rather than arbitrary calendar windows — improved signal-to-noise in production PD models.' },
  { context: 'PayPal · US/UK Portfolio',     metric: '18%',     label: 'Reduction in early-stage delinquency',              desc: 'Replaced 3-month single-horizon default indicator with a multi-horizon (3–12m) framework. Demonstrated adverse selection failure in specific merchant segments. Adopted as production policy layer.' },
  { context: 'PayPal · UK Open Banking',     metric: 'PSD2',    label: 'Transaction stability via Open Banking',            desc: 'Engineered recurring obligation detection and income stability metrics from Open Banking APIs — supplementing bureau signals for thin-file segments where traditional credit history is insufficient.' },
  { context: 'Liquiloans · Decisioning',     metric: '340 bps', label: 'Scorecard Gini improvement',                        desc: 'Full scorecard ownership with SHAP-driven explainability for MRM compliance. Led 9-month development cycle including hiring and sprint planning. PSI/CSI stability monitoring throughout.' },
  { context: 'Jodo · 0 → 1 Risk',            metric: '$500M',   label: 'Origination book from zero infrastructure',         desc: 'Built initial credit architecture for education lending with no historical bad labels. Structural proxies from transaction data; interest-split reconciliation for multi-lender syndication.' },
];

function OutcomesSection() {
  return (
    <Section id="work" className="bg-[#05080f]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <Label>Strategic Outcomes</Label>
        <H2>Impact that survived<br />the governance forum.</H2>
        <p className="text-[0.93rem] font-light text-white/40 max-w-[500px] mt-3 mb-12 leading-[1.8]">
          Not backtest results. Portfolio-level shifts adopted post-governance review.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {outcomes.map((o, i) => (
            <motion.div
              key={o.metric + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-2xl p-7 bg-white/[0.03] border border-white/[0.07]
                hover:bg-white/[0.055] hover:border-white/[0.13]
                transition-all duration-400 overflow-hidden"
            >
              {/* Top glow line on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-violet-500/0 via-violet-500/60 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="text-[0.65rem] font-mono tracking-[0.16em] uppercase text-white/30 mb-3">{o.context}</div>
              <div className="text-[2.2rem] font-bold text-white leading-none mb-1 tracking-tight">{o.metric}</div>
              <div className="text-[0.82rem] font-medium text-white/60 mb-4">{o.label}</div>
              <div className="text-[0.8rem] text-white/30 leading-[1.75] border-t border-white/[0.06] pt-4">{o.desc}</div>
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
    id:     CASE_STUDY_IDS.REJECTED_DEFAULT_INDICATOR,
    num:    '01',
    title:  'Rejecting the prescribed default indicator',
    tags:   ['Strategic Trade-off', 'Model Risk'],
    body:   'The standard 30-DPD at 3 months was statistically insufficient for the portfolio\'s long-tail exposure. I argued for a multi-window definition. While complexity was flagged by MRM, the resulting risk segments were robust enough to become the primary policy rule engine — reducing early-life delinquency by 18%.',
    result: 'Trade-off: Granularity vs. Stability. Decision: Policy layer, not model score.',
  },
  {
    id:     CASE_STUDY_IDS.FFT_RFM_FEATURES,
    num:    '02',
    title:  'FFT-based RFM: Signal Processing in Credit Risk',
    tags:   ['Scipy', 'Feature Engineering'],
    body:   'Standard deposit counts fail to distinguish a business receiving $10k weekly vs $40k monthly — fundamentally different credit profiles. By applying FFT to transaction series I extracted the dominant period, normalising risk metrics by business cycle rather than calendar window.',
    result: 'Top 5 SHAP feature. 20 bps KS increment in production.',
  },
  {
    id:     CASE_STUDY_IDS.MULTI_SCORE_GUARDRAILS,
    num:    '03',
    title:  'Multi-Score Production Guardrails',
    tags:   ['Portfolio Monitoring', 'PSI/CSI'],
    body:   'Blanket PSI thresholds fail on non-uniform joint score distributions. I developed segment-specific breach alerts and Chi-square weighted composites — reducing noise-driven false positives in automated monitoring across the $3B+ portfolio.',
    result: 'Automated drift detection across high-dimensional risk segments.',
  },
];

function GovernanceSection() {
  return (
    <Section id="decisions" className="bg-[#07090f]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <Label>Governance &amp; Decisions</Label>
        <H2>Positions defended in<br />Risk Committees.</H2>
        <p className="text-[0.93rem] font-light text-white/40 max-w-[500px] mt-3 mb-12 leading-[1.8]">
          Technical trade-offs, rejection of prescribed metrics, second-order thinking.
        </p>

        <div className="space-y-px">
          {decisions.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => trackCaseStudyClicked(d.id, d.title)}
              className="group grid grid-cols-[48px_1fr] md:grid-cols-[80px_1fr] gap-6 md:gap-10 p-7 md:p-9
                rounded-2xl bg-white/[0.02] border border-white/[0.05]
                hover:bg-white/[0.045] hover:border-white/[0.1] cursor-pointer
                transition-all duration-300"
            >
              <div className="font-mono text-[2rem] md:text-[3rem] text-white/[0.04] leading-none pt-1 group-hover:text-white/[0.08] transition-colors">{d.num}</div>
              <div>
                <h3 className="text-[1.1rem] md:text-[1.2rem] font-semibold text-white/80 mb-3 leading-[1.35] group-hover:text-white transition-colors duration-300">
                  {d.title}
                </h3>
                <div className="flex gap-2 flex-wrap mb-4">
                  {d.tags.map(t => (
                    <span key={t} className="text-[0.62rem] font-medium tracking-[0.1em] uppercase text-violet-400/70 px-2.5 py-1 bg-violet-400/[0.07] rounded-full border border-violet-400/[0.15]">{t}</span>
                  ))}
                </div>
                <p className="text-[0.85rem] text-white/35 leading-[1.8] max-w-[620px]">{d.body}</p>
                <div className="mt-4 text-[0.78rem] font-mono text-white/25">
                  → <span className="text-violet-400/80">{d.result}</span>
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
  { title: 'Aggregation is a lossy transformation',  body: 'A simple sum of bank statement data destroys the temporal signal. Credit risk is a liquidity timing problem. FFT preserves what rolling averages mask.' },
  { title: 'Bureau data is a floor, not a ceiling',  body: 'Traditional scores identify who defaulted in the past. Transaction data identifies who is approaching a cashflow crunch now.' },
  { title: 'Model risk is often an execution gap',   body: 'A perfect PD model with flawed interest-accrual architecture will fail on reconciliation. Infrastructure is part of the risk model.' },
  { title: 'Explainability (SHAP) is for governance',body: 'Feature importance doesn\'t guarantee fairness, but ensures auditability. The ability to defend a single decline to a regulator is as critical as the model Gini.' },
];

function PhilosophySection() {
  return (
    <Section id="philosophy" className="bg-[#05080f]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <Label>Risk Philosophy</Label>
        <H2>Views formed in<br />production, not textbooks.</H2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          {philosophies.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="p-8 rounded-2xl border border-white/[0.07] bg-white/[0.02]
                hover:border-violet-500/30 hover:bg-violet-500/[0.03]
                transition-all duration-400 group"
            >
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-5 group-hover:bg-violet-500/20 transition-colors">
                <span className="text-violet-400 text-sm font-bold">{i + 1}</span>
              </div>
              <h4 className="text-[1rem] font-semibold text-white/80 mb-3 leading-[1.4]">{p.title}</h4>
              <p className="text-[0.82rem] text-white/35 leading-[1.8]">{p.body}</p>
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
  { period: '2022 — Present', role: 'Data Scientist — Credit Risk', company: 'PayPal',      badge: '$3B+ · US & UK', desc: 'PD model governance for commercial portfolios. FFT feature engineering. Open Banking PSD2 integration. CRSC presentations.' },
  { period: '2020 — 2022',    role: 'Data Scientist — Risk',        company: 'Liquiloans',  badge: '340 bps Gini',   desc: 'Full scorecard suite. Champion-challenger frameworks. 9-month dev cycle ownership.' },
  { period: '2019 — 2020',    role: 'Data Scientist',               company: 'Jodo',        badge: '$500M book',     desc: '0→1 credit decisioning. Transaction data pipeline. Multi-lender syndication logic.' },
];

function CareerSection() {
  return (
    <Section id="career" className="bg-[#07090f]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <Label>Career</Label>
        <H2>Ownership across<br />three fintech cycles.</H2>

        <div className="relative mt-14 pl-6 border-l border-white/[0.07]">
          {career.map((c, i) => (
            <motion.div
              key={c.company}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-12 last:mb-0 pl-8 group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[1.85rem] top-1.5 w-3 h-3 rounded-full bg-[#07090f] border-2 border-violet-500/50 group-hover:border-violet-400 group-hover:shadow-[0_0_12px_rgba(167,139,250,0.4)] transition-all duration-300" />

              <div className="font-mono text-[0.68rem] tracking-[0.16em] uppercase text-white/25 mb-1">{c.period}</div>
              <div className="text-[1.05rem] font-semibold text-white/80 leading-tight">{c.role}</div>
              <div className="flex items-center gap-3 mt-1 mb-3">
                <span className="text-[0.82rem] font-medium text-violet-400">{c.company}</span>
                <span className="text-[0.65rem] font-mono text-white/20 px-2 py-0.5 bg-white/[0.04] rounded-full border border-white/[0.07]">{c.badge}</span>
              </div>
              <p className="text-[0.82rem] text-white/35 leading-[1.8] max-w-[520px]">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ---------------------------------------------------------------------------
// CTA / CONTACT
// ---------------------------------------------------------------------------
function CTASection() {
  return (
    <section id="contact" className="relative py-32 bg-[#05080f] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-violet-600/[0.06] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[700px] mx-auto px-6 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 text-[0.68rem] font-mono tracking-[0.2em] uppercase text-violet-400 mb-6">
            <span className="w-4 h-px bg-violet-400" /> Connect
          </div>

          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.12] tracking-[-0.025em] text-white mb-5">
            Let&apos;s build something<br />
            <GradientText>worth defending.</GradientText>
          </h2>

          <p className="text-[0.95rem] font-light text-white/40 leading-[1.85] mb-10">
            Senior risk roles at global fintech and banking firms.
            Relocation-ready for UK, EU, Singapore, or Canada.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <a
              href={`mailto:${EMAIL}`}
              onClick={trackEmailClicked}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-[0.82rem] tracking-wide
                bg-white text-[#05080f]
                hover:bg-white/90 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.12)]
                transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/>
              </svg>
              Email me
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackCalendlyClicked}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[0.82rem] tracking-wide
                bg-white/[0.07] text-white/80 border border-white/[0.12]
                hover:bg-white/[0.12] hover:text-white
                transition-all duration-300"
            >
              Book a call →
            </a>
          </div>

          <div className="flex items-center justify-center gap-8">
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackLinkedInClicked('cta')}
              className="text-[0.72rem] font-medium tracking-[0.12em] uppercase text-white/25 hover:text-violet-400 transition-colors duration-300">
              LinkedIn
            </a>
            <span className="w-px h-4 bg-white/[0.1]" />
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" onClick={trackGitHubClicked}
              className="text-[0.72rem] font-medium tracking-[0.12em] uppercase text-white/25 hover:text-violet-400 transition-colors duration-300">
              GitHub
            </a>
            <span className="w-px h-4 bg-white/[0.1]" />
            <a href={RESUME_PDF} target="_blank" rel="noopener noreferrer" onClick={() => trackResumeDownload('cta')}
              className="text-[0.72rem] font-medium tracking-[0.12em] uppercase text-white/25 hover:text-violet-400 transition-colors duration-300">
              Resume PDF
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// JSON-LD — Person schema
// ---------------------------------------------------------------------------
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Shashi Shekhar',
  jobTitle: 'Data Scientist — Credit Risk',
  worksFor: { '@type': 'Organization', name: 'PayPal', url: 'https://paypal.com' },
  description: 'Credit Risk Data Scientist specializing in PD model governance, FFT-based feature engineering, and Open Banking integration for commercial lending portfolios.',
  knowsAbout: ['Probability of Default Models', 'FFT Feature Engineering', 'Open Banking PSD2', 'Credit Risk Governance', 'XGBoost LightGBM', 'SHAP Explainability', 'PSI KS Monitoring', 'Scorecard WoE IV Architecture', 'Credit Risk Data Science', 'Fintech Risk Systems'],
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
      {/* Gradient text animation — injected once globally */}
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50% }
          50%  { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        .gradient-text {
          background: linear-gradient(
            270deg,
            #a78bfa, #818cf8, #38bdf8, #34d399, #f472b6, #a78bfa
          );
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 6s ease infinite;
        }
      `}</style>

      {/* SEO meta */}
      <title>Shashi Shekhar — Credit Risk Data Scientist | PD Models · FFT · Open Banking</title>
      <meta name="description" content="Credit Risk Data Scientist at PayPal. PD model governance, FFT-based feature engineering, Open Banking integration. $3B+ commercial lending portfolio." />
      <meta name="keywords" content="Shashi Shekhar, Credit Risk Data Scientist, PD Models, FFT Feature Engineering, Open Banking, PayPal Risk, Scorecard, SHAP, Probability of Default, Shashi Shekhar PayPal" />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content="Shashi Shekhar — Credit Risk Data Scientist" />
      <meta property="og:description" content="PD model governance, FFT feature engineering, Open Banking. $3B+ portfolio at PayPal." />
      <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Shashi Shekhar — Credit Risk Data Scientist" />
      <meta name="twitter:description" content="PD model governance, FFT feature engineering, Open Banking. $3B+ portfolio at PayPal." />
      <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <CursorSpotlight />
      <Nav />
      <main>
        <HeroSection />
        <AboutSection />
        <OutcomesSection />
        <GovernanceSection />
        <PhilosophySection />
        <CareerSection />
        <CTASection />
      </main>
      <footer className="py-8 border-t border-white/[0.05] bg-[#05080f]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[0.7rem] text-white/20 font-mono tracking-[0.08em]">© 2026 Shashi Shekhar</p>
          <p className="text-[0.7rem] text-white/15 font-mono tracking-[0.08em]">Risk Architecture & Decision Systems</p>
        </div>
      </footer>
    </>
  );
}
