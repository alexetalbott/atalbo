# Multi-Touch Attribution & Campaign Analytics

**Role:** Analytics lead
**Timeline:** Iterative development over several months
**Stack:** Snowflake, dbt, CRM data, marketing automation platform

---

## Context

Marketing needed to understand which campaigns actually influence pipeline — not just which campaign a lead touched first, but the full journey from anonymous visitor to closed deal. The existing attribution was single-touch (first-touch or last-touch), which dramatically undervalued mid-funnel programs like nurture campaigns and events.

---

## Approach

### 1. Define the Attribution Framework

Before writing any SQL, I worked with stakeholders to define what "credit" means:

- **Sourced attribution:** Which campaign created the lead? (first-touch)
- **Influenced attribution:** Which campaigns touched the opportunity before it was created? (multi-touch)
- **Pipeline credit allocation:** How to split credit across multiple touches

The key insight: sourced and influenced are complementary views, not competing ones. We report both, and stakeholders use whichever lens fits their question.

### 2. Touchpoint Data Model

Built a dbt model that unifies touchpoints across sources:

- CRM campaign membership records
- Marketing automation engagement events
- Web analytics sessions (matched to known contacts)
- Event attendance and content engagement

Each touchpoint is standardized with a timestamp, contact identifier, campaign reference, and engagement type. This creates a single timeline of every interaction a contact has before pipeline is created.

### 3. Credit Allocation Logic

For influenced attribution, I implemented a time-decay model:

- Touchpoints closer to opportunity creation receive more credit
- A configurable lookback window defines which touches count
- Credit sums to 100% of the opportunity value across all contributing touches

The model is parameterized so stakeholders can adjust the decay rate and lookback window during planning cycles without requiring code changes.

### 4. Campaign Performance Layer

On top of the attribution model, I built a campaign analytics layer that answers:

- What is the cost-per-MQL by campaign type?
- Which programs have the highest pipeline influence per dollar spent?
- How do conversion rates vary by campaign category and region?

---

## Results

- Gave marketing leadership a defensible view of campaign ROI
- Shifted budget conversations from "we think events work" to "here's the pipeline influence data"
- Enabled campaign managers to self-serve performance data without analyst bottlenecks
- Surfaced undervalued mid-funnel programs that were previously invisible in first-touch reporting

---

## Lessons Learned

- **Attribution is a political problem as much as a technical one.** Getting agreement on the methodology matters more than the model's sophistication.
- **Report multiple views.** No single attribution model is "correct." Showing sourced AND influenced gives stakeholders the flexibility to pick the right lens.
- **Data quality is the bottleneck.** The hardest part wasn't the attribution logic — it was reconciling touchpoint data across CRM, marketing automation, and web analytics.

---

[[Projects|Back to Projects]]
