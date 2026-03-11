# Building Forecasting Models That Stakeholders Actually Trust

The best forecasting model I ever built was technically mediocre. It used straightforward conversion rates, simple time-lag assumptions, and lived partially in a spreadsheet. Leadership loved it. They used it in every planning meeting. They trusted the numbers enough to make real budget decisions.

The worst forecasting model I ever built was technically elegant. Multiple regression, automated retraining, probabilistic confidence intervals. Nobody used it. They couldn't explain it to their boss, so they didn't trust it, so they went back to gut feel.

The difference wasn't accuracy. It was legibility.

---

## The Trust Problem

Stakeholders don't distrust your model because they think you're bad at math. They distrust it because:

1. **They can't see the assumptions.** If the model is a black box, every output feels like a guess.
2. **They can't adjust the inputs.** Planning is iterative. Leaders want to ask "what if we increase spend by 20%?" and see the answer change in real time.
3. **They can't explain it upstream.** Your VP needs to present the forecast to the CFO. If they can't explain the methodology in two sentences, they won't use your model.
4. **They've been burned before.** Most organizations have a graveyard of "sophisticated" models that were abandoned because they produced surprising results nobody could diagnose.

---

## Designing for Trust

### Make Assumptions Visible

Every forecast is a function of assumptions. Make them explicit:

| Assumption | Value | Source |
|------------|-------|--------|
| MQL → SAL conversion rate | 35% | Trailing 6-month average |
| SAL → SQO conversion rate | 28% | Trailing 6-month average |
| Average time from MQL to SQO | 45 days | Median of last 4 quarters |
| Expected MQL volume (Q1) | 1,200 | Based on current program plan |

When stakeholders can see the inputs, they can challenge the ones they disagree with — which is exactly what you want. A forecast that's been pressure-tested by the people who have to act on it is worth more than one that's technically optimal.

### Decompose the Problem

Don't forecast the end result directly. Break it into stages that map to how the business thinks:

```
Leads → MQLs → SALs → SQOs → Pipeline ($)
```

Each stage has its own conversion rate and time lag. This decomposition has two benefits:

1. **Stakeholders can sanity-check each step.** "35% MQL-to-SAL sounds right" is easier to evaluate than "we'll generate $4.2M in pipeline."
2. **When the forecast is wrong, you can diagnose why.** Was it a volume problem (fewer leads than expected) or a conversion problem (leads aren't converting)?

### Build a Stakeholder-Accessible Layer

This is where analytics engineers get uncomfortable: put part of your model in a spreadsheet.

Not the data pipeline. Not the historical calculations. Those stay in dbt where they belong. But the scenario modeling layer — where leadership adjusts assumptions and sees projected outcomes — should live where they can touch it.

**Why this works:**

- Leaders already know how spreadsheets work
- They can clone the sheet and model their own scenarios
- The interactive experience builds intuition about the model's behavior
- They feel ownership over the output because they contributed to the inputs

**The architecture:**

```
dbt models (Snowflake)          Spreadsheet layer
├── Historical conversion rates  ├── Scenario inputs
├── Time-lag distributions       ├── Assumption overrides
├── Cohort analysis              ├── Projected outputs
└── Refreshed automatically      └── Charts for presentation
```

dbt provides the trusted, refreshed inputs. The spreadsheet provides the interactive, presentable outputs. Neither works well alone. Together, they give you rigor and accessibility.

### Offer Multiple Scenarios

Never present a single number. Always present at least three scenarios:

- **Base case:** Historical rates carry forward
- **Upside:** Improved conversion from planned initiatives
- **Downside:** Conservative assumptions for risk planning

This does two things:

1. It communicates uncertainty honestly. A forecast is not a prediction — it's a range of likely outcomes.
2. It gives leadership options. "If we invest in the upside scenario's programs, we could close the gap" is a more useful conversation than "here's the number."

---

## Common Anti-Patterns

**Over-fitting to history.** If your model perfectly explains the past, it's probably too complex to predict the future. Simple models with clear assumptions outperform complex models with hidden assumptions.

**Precision theater.** Reporting pipeline forecasts to the dollar ($4,237,891) implies false precision. Round to meaningful increments ($4.2M). The extra digits don't add information — they add false confidence.

**Updating without communicating.** If the forecast changes, tell people why before they notice. "MQL-to-SAL conversion dropped 5 points in February, so the Q1 forecast is down $300K" builds trust. Silently updating the number erodes it.

**Automating too early.** Build the model manually first. Run it by hand for a few cycles. Understand its failure modes. Then automate. Automating a model you don't deeply understand is how you get "surprising" results that destroy trust.

---

## The Scorecard

After each period, publish a simple scorecard:

| Metric | Forecast | Actual | Variance |
|--------|----------|--------|----------|
| MQLs | 1,200 | 1,150 | -4% |
| Pipeline | $4.2M | $3.9M | -7% |

This builds credibility over time. If your forecasts are consistently within a reasonable range, stakeholders learn to trust them. If they're off, the scorecard forces you to improve the model — which is the point.

---

## Key Takeaway

Your job isn't to build the most accurate model. It's to build the most useful one. A model stakeholders trust and act on — even if it's simpler than what you'd prefer — creates more business value than a sophisticated model that sits unused.

Meet them where they are. Make assumptions visible. Let them touch the inputs. And track your accuracy honestly.

---

[[Writing|Back to Writing]]
