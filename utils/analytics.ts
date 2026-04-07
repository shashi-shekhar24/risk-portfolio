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
 */

import { track } from '@vercel/analytics';

// Single source of truth for event names — prevents typos across callers
export const ANALYTICS_EVENTS = {
  RESUME_DOWNLOADED:   'Resume Downloaded',
  CASE_STUDY_CLICKED:  'Case Study Clicked',
  LINKEDIN_CLICKED:    'LinkedIn Clicked',
  GITHUB_CLICKED:      'GitHub Clicked',
  CALENDLY_CLICKED:    'Calendly Clicked',
  EMAIL_CLICKED:       'Email Clicked',
} as const;

// Case study IDs — must match the id prop on each DecisionItem
export const CASE_STUDY_IDS = {
  REJECTED_DEFAULT_INDICATOR: 'rejected-default-indicator',
  FFT_RFM_FEATURES:           'fft-rfm-features',
  MULTI_SCORE_GUARDRAILS:     'multi-score-guardrails',
} as const;

/**
 * Fire when the visitor clicks any "Download Resume / Portfolio PDF" link.
 * Attach to onClick on the <a href="/resume-shashi-shekhar.pdf"> element.
 */
export function trackResumeDownload(source: 'hero' | 'nav' | 'cta' = 'hero') {
  track(ANALYTICS_EVENTS.RESUME_DOWNLOADED, {
    format: 'PDF',
    source,
  });
}

/**
 * Fire when a visitor clicks into a specific case study.
 * @param id - One of CASE_STUDY_IDS values, identifies which study was clicked.
 * @param title - Human-readable title for easy reading in the dashboard.
 */
export function trackCaseStudyClicked(
  id: (typeof CASE_STUDY_IDS)[keyof typeof CASE_STUDY_IDS],
  title: string,
) {
  track(ANALYTICS_EVENTS.CASE_STUDY_CLICKED, {
    caseStudyId: id,
    caseStudyTitle: title,
  });
}

/** Fire when the visitor clicks the LinkedIn profile link. */
export function trackLinkedInClicked(source: 'cta' | 'nav' = 'cta') {
  track(ANALYTICS_EVENTS.LINKEDIN_CLICKED, { source });
}

/** Fire when the visitor clicks the GitHub profile link. */
export function trackGitHubClicked() {
  track(ANALYTICS_EVENTS.GITHUB_CLICKED);
}

/** Fire when the visitor clicks the Calendly booking link. */
export function trackCalendlyClicked() {
  track(ANALYTICS_EVENTS.CALENDLY_CLICKED);
}

/** Fire when the visitor clicks the email mailto link. */
export function trackEmailClicked() {
  track(ANALYTICS_EVENTS.EMAIL_CLICKED);
}
