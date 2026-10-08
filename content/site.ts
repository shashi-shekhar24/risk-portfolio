/**
 * site.ts: every word and number on the site lives here.
 *
 * PUBLIC-SAFE RULES (from content/nda-safe-case-study-guide.md):
 *  1. Methodology over metrics: publish the decision and the reasoning.
 *  2. Problem class, not portfolio: no internal project, system or vendor names.
 *  3. Relative, not absolute: percentages are fine; no dollar amounts, counts,
 *     rates, dates of launch, or model and rule parameters.
 *  4. Process: Context, Diagnosis, Intervention, Outcome.
 * Anything added here must pass the checklist at the end of that guide.
 */

export const site = {
  name: 'Shashi Shekhar',
  role: 'Credit Risk Strategy and Decision Science',
  url: 'https://www.shash-shekhar.com',
  resumePdf: '/resume-shashi-shekhar.pdf',
  calendly: 'https://calendly.com/shashi__shekhar',
  linkedin: 'https://www.linkedin.com/in/shashi--shekhar',
  email: 's.shashi24@outlook.com',
  title: 'Shashi Shekhar | Credit Risk Strategy and Decision Science',
  description:
    'Credit risk strategist in US and UK small-business lending. Designs credit policy, default definitions and account-level economics, including Open Banking underwriting, taken through second-line, model risk, legal and compliance review to production. Open to relocation; requires visa sponsorship outside India.',
};

export const hero = {
  status: 'Open to senior credit risk and decision science roles. Open to relocation.',
  headline:
    'I design credit policy, default definitions and PD models for a multi-billion-dollar US and UK small-business lending book.',
  sub: 'My work decides which businesses are approved, at what price and credit line, and what each loan returns over its life. Every strategy I have taken to production cleared second-line risk, model risk management, legal and compliance review. I report early-delinquency and guardrail metrics to the credit risk committee.',
  proof: [
    { n: '+3 pp', d: 'Post-bureau eligibility from a redesigned credit policy' },
    { n: '−200 bps', d: 'Vintage loss rate across the portfolio, from the same redesign' },
    { n: '−250 bps', d: 'Vintage loss rate in bank-based underwriting, from a new default definition' },
    { n: '82%', d: 'Straight-through rate on US Open Banking underwriting' },
  ],
};

/** Facts a recruiter or hiring manager abroad needs before a first call. */
export const hiring = [
  { k: 'Based in', v: 'Bengaluru, India (UTC+5:30)' },
  { k: 'Relocation', v: 'Open to relocation' },
  { k: 'Work authorisation', v: 'Needs employer visa sponsorship outside India' },
  { k: 'Experience', v: 'Over 5 years in data science and credit risk strategy' },
  {
    k: 'Roles',
    v: 'Senior Credit Risk Analyst, Senior Decision Scientist, Senior Data Scientist (Credit Risk), Credit Strategy Manager, Underwriting and Credit Policy Manager (SME lending)',
  },
];

export type CaseStudy = {
  id: string;
  context: string;
  title: string;
  outcome: string;
  flowLabel: string;
  flow: string[];
  rows: { label: string; text: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'credit-policy-redesign',
    context: 'US small-business lending · Credit policy',
    title: 'More approvals, lower losses',
    outcome: 'Post-bureau eligibility up 3 pp and more loans booked, while the portfolio’s vintage loss rate fell 200 bps.',
    flowLabel: 'How the new strategy was tested',
    flow: ['Swap-set analysis against the incumbent strategy', 'Gross credit loss under balance control', 'Risk grades assigned'],
    rows: [
      {
        label: 'Context',
        text: 'Every change to credit policy trades approvals against losses. Approving more is only worth it if the loans swapped in perform at least as well as the loans swapped out.',
      },
      {
        label: 'Diagnosis',
        text: 'Eligibility after the bureau check was set by the previous rule strategy. Raising it safely needed a view of exactly which applicants a new strategy would add and remove, and how each group would perform.',
      },
      {
        label: 'Intervention',
        text: 'I redesigned the post-bureau eligibility rules on commercial bureau data, and built and calibrated the PD models behind them. Swap-set analysis compared the applicants the new strategy would swap in and swap out against the incumbent, with gross credit loss (GCL) measured under balance control. I then assigned risk grades.',
      },
      {
        label: 'Outcome',
        text: 'Post-bureau eligibility rose 3 percentage points and more loans were booked, while the vintage loss rate across the portfolio fell 200 bps against the previous rule strategy.',
      },
    ],
  },
  {
    id: 'open-banking-underwriting',
    context: 'Business lending · UK and US',
    title: 'Open Banking underwriting',
    outcome: 'Launched in the UK and US. US applications are decisioned at an 82% straight-through rate.',
    flowLabel: 'From design to production',
    flow: ['Rules designed on bank-transaction data', 'Second-line, model risk, legal and compliance review', 'Launched in the UK and US'],
    rows: [
      {
        label: 'Context',
        text: 'Many small businesses have a thin credit bureau file. Open Banking lets a lender read their bank transactions directly, with consent, and underwrite on actual cash flow.',
      },
      {
        label: 'Diagnosis',
        text: 'For thin-file applicants, bureau-based rules have too little to work with. Approve and decline rules had to be built on bank data, and a new data source brings new ways for a decision to fail.',
      },
      {
        label: 'Intervention',
        text: 'For the UK product, I designed the approve/decline underwriting rules. For the US product, I launched Open Banking underwriting and monitored it after launch, tracing each data-extraction failure to its root cause: a decision made on a broken feed is a credit error, not only a data one.',
      },
      {
        label: 'Outcome',
        text: 'Both launched. In the US, data-extraction failures were eliminated within weeks of launch, and applications are decisioned at an 82% straight-through rate.',
      },
    ],
  },
  {
    id: 'multi-horizon-default',
    context: 'Bank-based underwriting · Portfolio risk',
    title: 'Multi-horizon default definition',
    outcome: 'Vintage loss rate in bank-based underwriting down 250 bps against the prior definition.',
    flowLabel: 'Loan performance read at several points, not one',
    flow: ['Early read', 'Mid-term reads', 'Twelve-month read'],
    rows: [
      {
        label: 'Context',
        text: 'A lender has to judge whether a loan is good long before it is repaid. The usual shortcut is one early delinquency indicator a few months in.',
      },
      {
        label: 'Diagnosis',
        text: 'I showed that a single early indicator mislabelled loans in both directions. Many accounts delinquent at the early read later cured, so good borrowers were counted as bad. Others looked current early and deteriorated later, so real defaulters were missed.',
      },
      {
        label: 'Intervention',
        text: 'Designed a default definition that reads delinquency at several horizons across the first year, and tested it against the incumbent in a champion-challenger setup with population stability monitoring.',
      },
      {
        label: 'Outcome',
        text: 'Deployed as the production rule layer for bank-based underwriting. The segment’s vintage loss rate fell 250 bps.',
      },
    ],
  },
  {
    id: 'cltv-framework',
    context: 'Business lending · Portfolio economics',
    title: 'What each account is worth over its life',
    outcome: 'NPV and return per account by score band and customer type, used to set cut-offs and guide pricing.',
    flowLabel: 'From loan history to a decision',
    flow: [
      'Cohort triangles by origination month',
      'Chain-ladder forecast of each curve',
      'Every analyst override logged',
      'NPV and ROI per account',
      'Score-band cut-offs and pricing',
    ],
    rows: [
      {
        label: 'Context',
        text: 'In fixed-fee lending, the first loan is rarely where the money is made. Most customers borrow again, so the value of an account sits in its renewals.',
      },
      {
        label: 'Diagnosis',
        text: 'Loan-level profit misleads when most value comes from renewals. Decisions on price, credit limits and acquisition spend needed a per-account, multi-year view of value, by segment.',
      },
      {
        label: 'Intervention',
        text: 'I built a multi-year P&L for every acquired account, by customer type and credit-score band. It carries balances, fee revenue, credit losses, reserves, funding and acquisition cost through to NPV and return on investment, with a delinquency stress test. Loss and behaviour curves are forecast by chain-ladder on origination-month cohorts, and every analyst override is logged.',
      },
      {
        label: 'Outcome',
        text: 'NPV and ROI by score band and customer type, over short and long horizons. It sets the score-band cut-offs and guides risk-based pricing and acquisition spend.',
      },
    ],
  },
  {
    id: 'underwriting-decision-engine',
    context: 'Bank-based underwriting · Decision engine',
    title: 'Underwriting decision engine',
    outcome: 'One engine in place of overlapping legacy rules, with every path resolving to price and credit line.',
    flowLabel: 'What the engine combines',
    flow: ['Internal PD models and bureau scores', 'Bureau, Open Banking and no-document paths', 'Price and credit line'],
    rows: [
      {
        label: 'Context',
        text: 'A decision engine is the set of rules that turns risk scores and applicant data into an approval, a price and a credit line.',
      },
      {
        label: 'Diagnosis',
        text: 'Underwriting ran on legacy rules that had become redundant and overlapping, which made outcomes hard to explain and to change.',
      },
      {
        label: 'Intervention',
        text: 'Designed one engine that consolidates the legacy rules and combines several internal PD models with external bureau scores. It has three paths: bureau-based, Open Banking with documents, and no-document automation.',
      },
      {
        label: 'Outcome',
        text: 'Every path resolves to pricing and line assignment, so one policy governs approval, price and credit line.',
      },
    ],
  },
];

export const principles = [
  {
    title: 'Model risk is usually an infrastructure problem.',
    body: 'After an Open Banking launch, the failures I had to chase were in data extraction, not in a model. A sound model on a broken feed still makes bad decisions, so I check the pipes before I tune the score.',
  },
  {
    title: 'Bureau data is a floor, not a ceiling.',
    body: 'A bureau file says how a business paid in the past. Bank-transaction data shows the cash coming in now. That is why I have built underwriting rules on Open Banking data for two markets.',
  },
  {
    title: 'Cut-offs belong to the P&L, not the scorecard.',
    body: 'A low probability of default does not make a loan worth booking. In repeat lending most of the value sits in renewals, so I set score-band cut-offs and guide pricing from each segment’s lifetime profit and loss, not from default risk alone.',
  },
];

export const experience = [
  {
    period: 'Nov 2024 – Present',
    title: 'Data Scientist, Global Credit Risk',
    company: 'PayPal',
    place: 'Bengaluru',
    lines: [
      'Credit policy, default definitions, PD calibration and account-level economics for a multi-billion-dollar US and UK small-business lending book.',
      'Every strategy cleared second-line risk, model risk management, legal and compliance review before production. Report early-delinquency and guardrail metrics to the credit risk committee.',
      'Direct 2 external consultant data scientists.',
    ],
  },
  {
    period: 'Feb 2024 – Oct 2024',
    title: 'Senior Manager, Analytics, Risk & Data Science',
    company: 'Liquiloans',
    place: 'Mumbai',
    lines: [
      'Led a team of 5 (3 full-time, 2 interns).',
      'Built application, behaviour and propensity scorecards: approval rate up 10 pp and non-performing assets down 50 bps.',
      'Built the early-warning system for collections, raising collection efficiency 30%.',
    ],
  },
  {
    period: 'Oct 2022 – Dec 2023',
    title: 'Business Analyst, Strategy, Growth & Risk',
    company: 'Jodo',
    place: 'Bengaluru',
    lines: [
      'Built the company’s first in-house credit risk model, from zero, cutting underwriting turnaround 40%. Built the data warehouse pipeline that automated 80% of ad-hoc reporting. Managed 2 interns.',
    ],
  },
  {
    period: 'Jan 2021 – Oct 2022',
    title: 'Data Analyst, Data Science Consulting',
    company: 'Accelera Eloquent',
    place: 'New Delhi',
    lines: [
      'Segmentation and language models for retail and eCommerce clients. A Bayesian A/B testing framework lifted new-product sales 10%.',
    ],
  },
];

export const education = {
  degree: 'B.Tech, Electronics & Communication Engineering',
  school: 'IIIT Guwahati, India',
  year: '2019',
};
