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
  url: 'https://risk-portfolio.vercel.app',
  resumePdf: '/resume-shashi-shekhar.pdf',
  calendly: 'https://calendly.com/shashi__shekhar',
  linkedin: 'https://www.linkedin.com/in/shashi--shekhar',
  email: 's.shashi24@outlook.com',
  title: 'Shashi Shekhar | Credit Risk Strategy and Decision Science',
  description:
    'Credit risk strategist and data scientist in business lending. Designs underwriting rules, default definitions and loan-level profitability models, including Open Banking underwriting launched in the UK and US. Open to relocation; requires visa sponsorship.',
};

export const hero = {
  status: 'Open to senior credit risk and decision science roles. Open to relocation.',
  headline:
    'I design underwriting rules and default models for a $2B+ business lending book, including Open Banking underwriting launched in the UK and US.',
  sub: 'My work decides which businesses are eligible for a loan, at what price and credit line, and what each loan earns over its life.',
  proof: [
    { n: '2 markets', d: 'Open Banking underwriting launched in the UK and US' },
    { n: '$2B+', d: 'Business lending book' },
    { n: '3%', d: 'Eligibility uplift from redesigned rules' },
    { n: '2.5%', d: 'Lower vintage loss rate, with a realised profit uplift' },
  ],
};

/** Facts a recruiter or hiring manager abroad needs before a first call. */
export const hiring = [
  { k: 'Based in', v: 'Bengaluru, India (UTC+5:30)' },
  { k: 'Relocation', v: 'Open to relocation' },
  { k: 'Work authorisation', v: 'Needs employer visa sponsorship' },
  { k: 'Experience', v: 'Data Science and Credit Risk Strategy' },
  {
    k: 'Roles',
    v: 'Senior Credit Risk Analyst, Senior Decision Scientist, Senior Data Scientist (Credit Risk), Credit Strategy Manager',
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
    id: 'open-banking-underwriting',
    context: 'Business lending · UK and US',
    title: 'Open Banking underwriting rules',
    outcome: 'Rules adopted into production unchanged and launched. Data failures eliminated within weeks of going live.',
    flowLabel: 'From design to production',
    flow: ['Rules designed', 'Adopted unchanged into the rule engine', 'Launched'],
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
        text: 'For the UK product, I designed the approve/decline underwriting rules. For the US product, I launched Open Banking underwriting and monitored it after launch, tracing each data-extraction failure to its root cause.',
      },
      {
        label: 'Outcome',
        text: 'The UK rules went into the production rule engine as I drafted them and launched. In the US, extraction failures were eliminated within weeks of launch.',
      },
    ],
  },
  {
    id: 'multi-horizon-default',
    context: 'Business lending · Portfolio risk',
    title: 'Multi-horizon default definition',
    outcome: 'Vintage loss rate down 2.5% against the prior policy, with a realised profit uplift.',
    flowLabel: 'Loan performance read at several points, not one',
    flow: ['Early read', 'Mid-term reads', 'Twelve-month read'],
    rows: [
      {
        label: 'Context',
        text: 'A lender has to judge whether a loan is good long before it is repaid. The usual shortcut is one early delinquency indicator a few months in.',
      },
      {
        label: 'Diagnosis',
        text: 'I showed that a single early indicator was statistically insufficient to separate good loans from bad in a portfolio with long-tail risk.',
      },
      {
        label: 'Intervention',
        text: 'Designed a default definition that reads delinquency at several horizons across the first year, and tested it against the existing approach in a champion-challenger setup with population stability monitoring.',
      },
      {
        label: 'Outcome',
        text: 'Adopted as the production rule layer. Vintage loss rate fell 2.5% relative to the prior policy, and the profit uplift was realised, not only projected.',
      },
    ],
  },
  {
    id: 'cltv-framework',
    context: 'Business lending · Portfolio economics',
    title: 'What is a borrower actually worth?',
    outcome: 'A multi-year lifetime-value model showing which segments earn back their acquisition cost, and which do not.',
    flowLabel: 'From loan history to a decision',
    flow: [
      'Cohort triangles by origination month',
      'Chain-ladder forecast of each curve',
      'Every analyst override logged',
      'Profit and loss per account',
      'Decision table by segment',
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
        text: 'I built a multi-year profit and loss per acquired account, segmented by customer type and credit-score band. Each risk and behaviour curve is forecast by chain-ladder over origination-month triangles, using volume-weighted development factors: segment trends where the data is deep, portfolio trends where it is thin. Every analyst override goes through a pipeline that logs it. The model then walks balances, fee revenue, credit loss, reserves, funding and acquisition costs through to discounted return, with a delinquency stress test.',
      },
      {
        label: 'Outcome',
        text: 'A decision table of renewals, revenue, loss, cost and return by score band and customer type over short and long horizons. It is used to set score-band cut-offs and to guide pricing and acquisition decisions.',
      },
    ],
  },
  {
    id: 'underwriting-decision-engine',
    context: 'Business lending · Underwriting',
    title: 'Underwriting decision engine',
    outcome: 'One engine in place of overlapping legacy rules. Eligibility up 3%.',
    flowLabel: 'What the engine combines',
    flow: ['Internal default models and bureau scores', 'Bureau, Open Banking and no-document paths', 'Price and credit line'],
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
        text: 'Designed one engine that consolidates the legacy rules and combines several internal default models with external bureau scores. It has three paths: bureau-based, Open Banking with documents, and no-document automation.',
      },
      {
        label: 'Outcome',
        text: 'Every path resolves to pricing and line assignment. Separately, my redesign of eligibility rules raised post-bureau eligibility by 3%.',
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
      'Underwriting rules, default calibration and loan-level profitability for US and UK business lending. Report early-delinquency and guardrail metrics to the credit risk committee.',
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
      'Built application, behaviour and propensity scorecards: 10% uplift in approval rate and 0.5% reduction in non-performing assets.',
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
