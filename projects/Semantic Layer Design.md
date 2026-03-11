# Semantic Layer & Metrics Architecture

**Role:** Primary architect
**Timeline:** Ongoing, evolved alongside BI migration
**Stack:** dbt (semantic layer / MetricFlow), Snowflake, modern BI platform

---

## Context

The marketing organization had a classic "multiple sources of truth" problem. The same metric — say, MQLs — could have three different definitions depending on which dashboard you looked at, who built it, and when. Pipeline numbers in the weekly email didn't match the quarterly report, and nobody could explain why.

This wasn't a tooling problem. It was a governance problem. The solution was a semantic layer that codifies metric definitions once and serves them everywhere.

---

## Approach

### 1. Metric Inventory

Started by cataloging every metric in active use across marketing dashboards and reports:

- What is it called?
- How is it calculated?
- Where does the source data come from?
- Who owns the definition?

This inventory immediately surfaced conflicts — cases where "pipeline" meant different things to different teams, or where filters were applied inconsistently.

### 2. Canonical Definitions

Worked with stakeholders to agree on a single definition for each metric. This was the hardest part. It required facilitated conversations between teams that had been calculating things differently for years.

The output: a documented set of metric definitions with clear ownership, calculation logic, and grain.

### 3. dbt Semantic Layer Implementation

Translated the agreed definitions into dbt's semantic layer:

```yaml
metrics:
  - name: mqls
    description: "Marketing Qualified Leads - contacts meeting qualification criteria"
    type: count
    type_params:
      measure: mql_count
    filter: |
      {{ Dimension('lead__is_qualified') }} = true
```

Each metric is:
- **Version-controlled** — changes are reviewed via PR
- **Tested** — dbt tests validate business logic invariants
- **Documented** — descriptions live with the code, not in a wiki that goes stale

### 4. BI Integration

The semantic layer feeds directly into the BI platform, so dashboard builders query metrics by name rather than writing custom SQL. This ensures:

- The number in a dashboard matches the number in a report
- Filters are applied consistently
- New dashboards automatically use the correct definitions

---

## Results

- Eliminated conflicting metric definitions across marketing reporting
- Reduced time-to-dashboard for new reporting requests (no more "how do I calculate this?" questions)
- Enabled non-technical stakeholders to build their own reports with confidence
- Made metric changes auditable — every definition change goes through version control

---

## Architecture Pattern

```
Source systems (CRM, MAP, Web)
        ↓
  dbt staging models
        ↓
  dbt intermediate models (business logic)
        ↓
  dbt semantic layer (metrics + dimensions)
        ↓
  BI platform (dashboards, ad-hoc queries)
```

The key principle: **business logic lives in dbt, not in the BI tool.** Dashboards are thin presentation layers that query the semantic layer. If a metric definition changes, you update it in one place and every downstream consumer gets the update.

---

## Lessons Learned

- **The semantic layer is a social contract, not just code.** Technical implementation is straightforward. Getting humans to agree on definitions is the real work.
- **Start with the metrics that hurt.** Don't try to define everything at once. Start with the metrics that cause the most confusion and build outward.
- **Governance needs a lightweight process.** We use PR reviews for metric changes. Heavy-handed governance processes get ignored; lightweight ones get adopted.

---

[[Projects|Back to Projects]]
