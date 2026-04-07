# NDA-Safe Case Study Strategy for Credit Risk Professionals

## The Core Dilemma

You built production-grade risk systems on proprietary data at a regulated financial institution.
Everything interesting—the model coefficients, the cutoff thresholds, the exact portfolio metrics,
the merchant category distributions—sits behind an NDA. Yet your value to a future employer
is precisely that experience.

The solution: **publish the intellectual contribution, not the proprietary artifact**.

Recruiters and senior hiring managers in credit risk are not buying your employer's model.
They are buying your *reasoning process*. That is what case studies should demonstrate.

---

## The Four Principles

### 1. Methodology-Over-Metrics
Never publish exact model scores, final cutoffs, or raw validation statistics.
Publish the *decision* behind the methodology: why you chose multi-horizon over single-horizon,
why FFT over rolling aggregation, why segment-specific PSI over blanket thresholds.
The thinking is yours. The numbers belong to the portfolio.

**Safe:**   "The multi-window definition produced more stable risk segments than single-horizon."
**Unsafe:** "The 90-day window produced a Gini of 62 on a 40,000-account validation set."

### 2. Problem Class, Not Portfolio
Replace institution-specific context with the structural problem category.

| What you know | What you publish |
|---|---|
| PayPal UK SMB commercial | High-volume, thin-bureau commercial lending context |
| 30,000 merchant accounts | High-cardinality seller population |
| $3B exposure | >$1B exposure concentration |
| Specific merchant categories | Non-standardized revenue segments |

The *business problem* (thin bureau, cashflow volatility, adverse selection) is not confidential.
Your employer did not invent the thin-bureau problem. You solved it in their context.

### 3. Relative, Not Absolute Quantities
Regulators and legal teams care about absolute numbers. Recruiters care about direction and magnitude.

**Safe:**   "20 bps KS improvement" (reveals no baseline)
**Safe:**   "18% reduction in early-stage delinquency" (relative to prior policy)
**Unsafe:** "KS moved from 42 to 62 on segment X"
**Unsafe:** "Delinquency rate dropped from 4.4% to 3.6%"

The existing portfolio numbers on this site already follow this principle correctly.

### 4. Attribution via Process, Not Output
Structure every case study using this sequence:

1. **Context** — What structural property of the environment created this problem?
2. **Diagnosis** — What did the data/analysis reveal that wasn't obvious?
3. **Intervention** — What did you build, change, or argue for?
4. **Outcome** — What directional result occurred, and why it mattered to the business?

This is the STAR method adapted for quantitative risk work. At no stage does it require
you to publish a model weight, a population statistic, or a proprietary feature value.

---

## Fully Written Example Case Study

### "Extracting Business Cycle Signals from Transaction Data Using FFT"

**Context**

In a commercial lending context where applicants lack standardized payroll documentation,
transaction deposit sequences serve as the primary liquidity proxy. The standard analytical
approach—rolling monthly aggregations (sum, mean, median of deposits)—reduces a time series
to a scalar. This is a lossy transformation.

Consider two businesses with identical total monthly deposits of $30,000:
- Business A receives $7,500 every Friday (weekly cycle, predictable)
- Business B receives $25,000 on day 1 of each month and $5,000 irregularly thereafter (lumpy, concentration risk)

A rolling-sum feature treats them identically. Their actual credit risk profiles are substantially different.

**Diagnosis**

Exploratory analysis of deposit sequences across the portfolio revealed that a meaningful
proportion of accounts exhibited dominant periodicities in the 7–30 day range that were
invisible to rolling-window features. Cross-correlation plots of individual deposit time series
showed clear spectral peaks—structure that was simply not captured by standard RFM approaches.

More importantly, when accounts were segmented by deposit periodicity, default rates varied
significantly *within* monthly-sum deciles—meaning the aggregation was actively masking a
predictive signal.

**Intervention**

Applied `scipy.fft.rfft` to individual transaction deposit sequences after normalizing for
account age and standardizing series length. For each account, extracted three derived features:
- **Dominant frequency** — the primary business cycle in days
- **Spectral amplitude** — the strength/confidence of the dominant cycle
- **Periodicity stability score** — how consistent the cycle is over time (measured via
  spectral entropy of the top-3 frequencies)

These features were then used to normalize existing RFM metrics: rather than "deposits in last
30 days," we computed "deposits relative to business cycle," which is dimensionally coherent
across businesses with different operating rhythms.

No proprietary data was used in deriving this methodology. The FFT approach draws on
well-established signal processing literature applied to financial time series (see: Cao et al.,
*Using financial time series analysis to predict credit risk*, 2019).

**Outcome**

The periodicity stability score ranked consistently in the top features by SHAP importance
in out-of-time validation. The feature set incorporating FFT-derived normalizations produced
a statistically significant KS improvement versus the baseline RFM feature set.

The approach was adopted as a production feature layer following Model Risk Management
review. The key governance argument: the feature is *interpretable*—a low periodicity
stability score corresponds to irregular, unpredictable cashflow, which has a clear business
rationale as a credit risk signal. This satisfied MRM's explainability requirement.

**What is safe to omit**

- The exact KS delta (20 bps is fine as a relative metric; the baseline is not published)
- The number of accounts in the validation set
- The specific merchant categories with the highest signal
- The exact FFT window parameters or sampling frequency used in production
- The model architecture the features fed into

---

## Case Study 2 Outline: Multi-Horizon Default Definition

**Context:** Single-horizon default indicators are a convention, not a universal truth.
In portfolios with long-tail risk (commercial lending, education finance), early-life performance
indicators systematically understate lifetime default risk for specific risk segments.

**Diagnosis:** 3-month DPD performance was a poor predictor of 12-month outcomes for a
subset of accounts characterized by delayed revenue recognition (seasonal businesses,
project-based income). This created a false positive problem in early risk scoring—
accounts were scoring as "good" at 3 months based on payment behavior, then deteriorating
by month 9–12 due to structural cashflow mismatches.

**Intervention:** Proposed a multi-window default definition (3m, 6m, 9m, 12m) to the
Credit Risk Strategy Committee. Built a simulation framework demonstrating that single-horizon
indicators introduced adverse selection bias in segments where revenue realization was delayed.
MRM flagged the increased model complexity; the resolution was to deploy the multi-horizon
framework as a *policy layer* (not as a model score) to avoid the MRM complexity threshold.

**Outcome:** The resulting risk segmentation reduced early-stage delinquency in the flagged
segments. The key lesson: in governance-heavy environments, the correct answer to "your model
is too complex" is often to embed the logic at the policy layer instead.

---

## Case Study 3 Outline: Multi-Score Monitoring Guardrails

**Context:** Production PD models covering diverse risk segments (geography, product type,
vintage) were monitored using a single blanket PSI threshold. Population Stability Index is
designed for univariate score distributions; it behaves poorly on portfolios where joint
score distributions are non-uniform.

**Diagnosis:** Alert fatigue from false-positive drift signals on stable segments, combined
with missed genuine drift in segments where the joint distribution shifted without triggering
the scalar PSI threshold. Root cause: PSI compresses a joint distribution into a single number,
losing the structural information needed to distinguish benign from meaningful drift.

**Intervention:** Developed segment-specific PSI breach thresholds calibrated against each
segment's historical variance. Added Chi-square weighted composite scores that preserved
more distributional information than scalar PSI. Automated the segment-level alert matrix
in the monitoring pipeline.

**Outcome:** Reduced noise-driven false positive alerts while maintaining sensitivity to
genuine population shift. The monitoring framework became part of the standard model
performance reporting to the risk committee.

---

## What to Include in Your Portfolio vs. What to Keep Private

| Include | Keep Private |
|---|---|
| Methodology and feature engineering approach | Exact model coefficients or weights |
| Business problem framing | Raw portfolio statistics or distributions |
| Governance decisions and trade-offs | Specific cutoff values in production |
| Directional outcomes (%, bps) | Absolute counts or rates |
| Tools and libraries (scipy, XGBoost, SHAP) | Proprietary internal systems or data sources |
| The reasoning behind a governance decision | The specific risk appetite positions discussed |
| Published academic methods you applied | Internally developed proprietary techniques |

---

## Final Checklist Before Publishing Any Case Study

- [ ] Would a competitor learn anything about the portfolio they couldn't learn from public filings?
- [ ] Does this reveal any absolute risk metric (count, rate, loss) that wasn't in public reports?
- [ ] Would Legal recognize any specific proprietary technique or model output?
- [ ] Does the narrative stand on its own as a *methodology demonstration* without requiring the sensitive data?

If all four answers are "no, no, no, yes" — it is safe to publish.
