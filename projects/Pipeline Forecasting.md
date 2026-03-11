# Marketing Pipeline Forecasting Model

**Role:** Sole builder and owner
**Timeline:** Ongoing (initial model delivered in ~3 weeks)
**Stack:** Snowflake, dbt, SQL, spreadsheet modeling for stakeholder review

---

## Context

Marketing leadership needed a reliable way to forecast pipeline generation for quarterly and annual planning. Existing forecasts were either gut-feel estimates or simple linear extrapolations that didn't account for the nuances of a B2B SaaS funnel.

I was asked to build a model from scratch that could inform real planning decisions — not just a dashboard, but a methodology leadership could trust and defend.

---

## Approach

### 1. Funnel Decomposition

The first step was mapping the full marketing funnel with clear stage definitions and transition criteria:

```
Leads → MQLs → SALs → SQOs → Pipeline ($)
```

Each transition has its own conversion rate, time lag, and seasonality pattern. Rather than modeling pipeline directly, I decomposed it into these stages and modeled each transition independently.

### 2. Cohort-Based Conversion Rates

Instead of using a single blended conversion rate, I built cohort-based rates segmented by:

- **Source type** (inbound, outbound, event, partner)
- **Region** (Americas, EMEA, APAC)
- **Time period** (rolling windows to capture trend shifts)

This approach captures the reality that not all leads are equal — an enterprise demo request converts very differently than a content download.

### 3. Time-Lag Modeling

B2B deals don't convert instantly. I modeled the time lag between each funnel stage using historical distributions:

- What percentage of MQLs from month M convert to SALs in month M+1, M+2, M+3?
- How does this vary by segment?

This time-lag component was the key differentiator — it allowed the model to project pipeline for future quarters based on leads already in the funnel, not just hoped-for new volume.

### 4. Scenario Analysis

The final model supports multiple scenarios:

- **Base case:** Historical conversion rates carry forward
- **Upside:** Improved conversion from planned program changes
- **Downside:** Conservative assumptions for planning buffer

---

## Results

- Model adopted by marketing leadership for quarterly planning
- Forecast accuracy within reasonable bounds of actual pipeline generation
- Enabled data-driven conversations about program investment and lead volume targets
- Replaced gut-feel estimates with a transparent, auditable methodology

---

## Technical Notes

The model lives in two layers:

1. **dbt models** in Snowflake for historical funnel metrics, conversion rates, and time-lag distributions
2. **Spreadsheet layer** for scenario inputs and presentation to stakeholders (leadership prefers to manipulate assumptions directly)

This hybrid approach balances analytical rigor with stakeholder accessibility. The dbt layer ensures the inputs are always fresh and correct; the spreadsheet layer makes the model interactive for planning sessions.

---

## Lessons Learned

- **Decompose the problem.** Forecasting "pipeline" directly is too abstract. Break it into conversion stages, model each one, and reassemble.
- **Time lag is everything in B2B.** Without it, your forecast is just a conversion rate applied to last month's leads. With it, you can actually predict.
- **Meet stakeholders where they are.** A perfect model nobody trusts is worthless. The spreadsheet layer wasn't ideal technically, but it got leadership to engage with the methodology.

---

[[Projects|Back to Projects]]
