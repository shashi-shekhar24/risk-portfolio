import TrackedLink from '@/app/components/TrackedLink';
import { ANALYTICS_EVENTS as EV } from '@/utils/analytics';
import {
  site,
  hero,
  hiring,
  caseStudies,
  principles,
  experience,
  education,
  type CaseStudy,
} from '@/content/site';

// ─── Shared pieces ───────────────────────────────────────────────────────────
const wrap = 'max-w-site mx-auto px-5 md:px-10';
const eyebrow = 'font-mono text-[0.7rem] tracking-[0.18em] uppercase text-accent';
const h2 = 'text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-ink';
const btnPrimary =
  'inline-flex items-center justify-center px-5 py-3 rounded text-[0.8rem] font-semibold tracking-[0.04em] bg-accent text-white hover:bg-[#4338CA] transition-colors';
const btnGhost =
  'inline-flex items-center justify-center px-5 py-3 rounded text-[0.8rem] font-semibold tracking-[0.04em] text-ink2 border border-border bg-surface hover:border-ink3 hover:text-ink transition-colors';

function Nav() {
  const links = [
    ['Work', '#work'],
    ['Approach', '#approach'],
    ['Experience', '#experience'],
    ['Contact', '#contact'],
  ] as const;
  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur border-b border-border">
      <div className={`${wrap} flex items-center justify-between h-14`}>
        <a href="#top" className="font-mono text-[0.75rem] font-medium tracking-[0.18em] uppercase text-ink">
          {site.name}
        </a>
        <nav aria-label="Primary" className="flex items-center gap-6">
          <ul className="hidden md:flex items-center gap-7" role="list">
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="text-[0.8rem] font-medium text-ink2 hover:text-ink">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <TrackedLink
            href={site.resumePdf}
            event={EV.RESUME_DOWNLOADED}
            data={{ source: 'nav' }}
            external
            className="text-[0.78rem] font-semibold text-white bg-accent px-3.5 py-2 rounded hover:bg-[#4338CA] transition-colors"
          >
            Resume (PDF)
          </TrackedLink>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="bg-bg">
      <div className={`${wrap} pt-9 pb-12 md:pt-20 md:pb-20`}>
        <p className="flex items-start gap-2.5 text-[0.8rem] text-ink2 mb-5 md:mb-7">
          <span aria-hidden="true" className="mt-[0.4rem] h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
          {hero.status}
        </p>

        <h1 className="text-[clamp(1.55rem,4.3vw,3.1rem)] font-semibold leading-[1.14] tracking-[-0.025em] text-ink max-w-[900px] mb-5">
          {hero.headline}
        </h1>

        <p className="text-[0.98rem] md:text-[1.05rem] leading-[1.7] text-ink2 max-w-[680px] mb-7">{hero.sub}</p>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-lg border border-border bg-border overflow-hidden mb-7">
          {hero.proof.map(p => (
            <div key={p.n} className="bg-surface px-4 py-4 md:px-5 md:py-5 flex flex-col-reverse justify-end">
              <dt className="text-[0.78rem] leading-[1.45] text-ink2 mt-1.5">{p.d}</dt>
              <dd className="text-[1.3rem] md:text-[1.6rem] font-semibold text-accent tracking-tight leading-none">{p.n}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap gap-3">
          <TrackedLink href={site.calendly} event={EV.CALENDLY_CLICKED} external className={btnPrimary}>
            Book a call
          </TrackedLink>
          <TrackedLink
            href={site.resumePdf}
            event={EV.RESUME_DOWNLOADED}
            data={{ source: 'hero' }}
            external
            className={btnGhost}
          >
            Download resume
          </TrackedLink>
          <a href="#work" className={btnGhost}>
            See the work
          </a>
        </div>
      </div>
    </section>
  );
}

function Hiring() {
  return (
    <section aria-labelledby="hiring-h" className="bg-bgalt border-y border-border">
      <div className={`${wrap} py-10 md:py-12`}>
        <h2 id="hiring-h" className={`${eyebrow} mb-5`}>
          If you are hiring from abroad
        </h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5">
          {hiring.map(h => (
            <div key={h.k} className={h.k === 'Roles' ? 'md:col-span-2 lg:col-span-1' : ''}>
              <dt className="text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-ink3 mb-1">{h.k}</dt>
              <dd className="text-[0.92rem] leading-[1.55] text-ink">{h.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Flow({ label, steps }: { label: string; steps: string[] }) {
  return (
    <figure className="rounded-lg bg-bgalt border border-border p-4 md:p-5">
      <figcaption className="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-ink3 mb-3">{label}</figcaption>
      <ol className="flex flex-col gap-1.5" role="list">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-col gap-1.5">
            <span
              className={`rounded border px-3.5 py-2.5 text-[0.85rem] leading-[1.4] font-medium ${
                i === steps.length - 1 ? 'border-accent bg-accent text-white' : 'border-border bg-surface text-ink'
              }`}
            >
              {s}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="text-ink3 text-center text-[0.9rem] leading-none">
                ↓
              </span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}

function Study({ cs, n }: { cs: CaseStudy; n: number }) {
  return (
    <article id={cs.id} className="rounded-xl bg-surface border border-border p-5 md:p-9 scroll-mt-20">
      <p className="font-mono text-[0.68rem] tracking-[0.14em] uppercase text-ink3 mb-2">
        {String(n).padStart(2, '0')} · {cs.context}
      </p>
      <h3 className="text-[1.2rem] md:text-[1.45rem] font-semibold leading-[1.25] tracking-[-0.015em] text-ink mb-2">
        {cs.title}
      </h3>
      <p className="text-[1rem] md:text-[1.08rem] leading-[1.5] font-medium text-accent mb-6 max-w-[720px]">{cs.outcome}</p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 lg:gap-10 items-start">
        <dl className="space-y-4">
          {cs.rows.map(r => (
            <div key={r.label} className="grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-1 sm:gap-4">
              <dt className="text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-ink3 sm:pt-[0.2rem]">{r.label}</dt>
              <dd className="text-[0.93rem] leading-[1.7] text-ink2">{r.text}</dd>
            </div>
          ))}
        </dl>
        <Flow label={cs.flowLabel} steps={cs.flow} />
      </div>
    </article>
  );
}

function Work() {
  return (
    <section id="work" aria-labelledby="work-h" className="bg-bg scroll-mt-14">
      <div className={`${wrap} py-14 md:py-24`}>
        <p className={`${eyebrow} mb-3`}>Selected work</p>
        <h2 id="work-h" className={`${h2} mb-3 max-w-[640px]`}>
          Five pieces of work, each with the decision it changed.
        </h2>
        <p className="text-[0.95rem] leading-[1.7] text-ink2 max-w-[620px] mb-9">
          Each one starts with the context, so you do not need to know the product to follow it. Figures are shown without baselines, and details covered by confidentiality are left out.
        </p>
        <div className="space-y-5">
          {caseStudies.map((cs, i) => (
            <Study key={cs.id} cs={cs} n={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-h" className="bg-bgalt border-y border-border scroll-mt-14">
      <div className={`${wrap} py-14 md:py-24`}>
        <p className={`${eyebrow} mb-3`}>Approach</p>
        <h2 id="approach-h" className={`${h2} mb-9 max-w-[560px]`}>
          Three things the work has taught me.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {principles.map(p => (
            <article key={p.title} className="rounded-xl bg-surface border border-border p-6">
              <h3 className="text-[1rem] font-semibold leading-[1.4] text-ink mb-3">{p.title}</h3>
              <p className="text-[0.9rem] leading-[1.7] text-ink2">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-h" className="bg-bg scroll-mt-14">
      <div className={`${wrap} py-14 md:py-24`}>
        <p className={`${eyebrow} mb-3`}>Experience</p>
        <h2 id="exp-h" className={`${h2} mb-9`}>
          Where I have worked.
        </h2>
        <ol className="divide-y divide-border border-y border-border" role="list">
          {experience.map(r => (
            <li key={r.company} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-10 py-6">
              <p className="font-mono text-[0.72rem] tracking-[0.08em] uppercase text-ink3 md:pt-1">{r.period}</p>
              <div>
                <h3 className="text-[1.02rem] font-semibold text-ink leading-[1.35]">{r.title}</h3>
                <p className="text-[0.88rem] font-medium text-accent mb-2.5">
                  {r.company}, {r.place}
                </p>
                <ul className="space-y-1.5 max-w-[680px]" role="list">
                  {r.lines.map(l => (
                    <li key={l} className="text-[0.9rem] leading-[1.65] text-ink2">
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
          <li className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-10 py-6">
            <p className="font-mono text-[0.72rem] tracking-[0.08em] uppercase text-ink3 md:pt-1">{education.year}</p>
            <div>
              <h3 className="text-[1.02rem] font-semibold text-ink leading-[1.35]">{education.degree}</h3>
              <p className="text-[0.88rem] font-medium text-accent">{education.school}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}

function Contact() {
  const rows = [
    { k: 'Call', v: 'Book a 30-minute call', href: site.calendly, ev: EV.CALENDLY_CLICKED, ext: true },
    { k: 'Email', v: site.email, href: `mailto:${site.email}`, ev: EV.EMAIL_CLICKED, ext: false },
    { k: 'LinkedIn', v: 'linkedin.com/in/shashi--shekhar', href: site.linkedin, ev: EV.LINKEDIN_CLICKED, ext: true },
    { k: 'Resume', v: 'Download the one-page PDF', href: site.resumePdf, ev: EV.RESUME_DOWNLOADED, ext: true },
  ];
  return (
    <section id="contact" aria-labelledby="contact-h" className="bg-bgalt border-t border-border scroll-mt-14">
      <div className={`${wrap} py-14 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20`}>
        <div>
          <p className={`${eyebrow} mb-3`}>Contact</p>
          <h2 id="contact-h" className={`${h2} mb-4`}>
            Hiring for credit risk?
          </h2>
          <p className="text-[0.95rem] leading-[1.7] text-ink2 max-w-[460px]">
            I am based in Bengaluru and open to relocation. I need visa sponsorship, and I am glad to talk through
            timing on a first call.
          </p>
        </div>
        <ul className="border-t border-border" role="list">
          {rows.map(r => (
            <li key={r.k} className="border-b border-border">
              <TrackedLink
                href={r.href}
                event={r.ev}
                data={{ source: 'contact' }}
                external={r.ext}
                className="group flex items-baseline justify-between gap-4 py-4"
              >
                <span className="text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-ink3 w-20 shrink-0">
                  {r.k}
                </span>
                <span className="flex-1 text-[0.98rem] text-ink group-hover:text-accent break-all sm:break-normal">
                  {r.v}
                </span>
                <span aria-hidden="true" className="text-ink3 group-hover:text-accent">
                  →
                </span>
              </TrackedLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded"
      >
        Skip to main content
      </a>
      <Nav />
      <main id="main-content">
        <Hero />
        <Hiring />
        <Work />
        <Approach />
        <Experience />
        <Contact />
      </main>
      <footer className="py-6 border-t border-border bg-bgalt">
        <div className={`${wrap} flex flex-col sm:flex-row items-center justify-between gap-2`}>
          <p className="font-mono text-[0.68rem] tracking-[0.08em] text-ink3">© 2026 {site.name}</p>
          <p className="font-mono text-[0.68rem] tracking-[0.08em] text-ink3">{site.role}</p>
        </div>
      </footer>
    </>
  );
}
