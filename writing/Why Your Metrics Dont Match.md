# Why Your Metrics Don't Match (And How a Semantic Layer Fixes It)

You've been there. You're in a pipeline review and someone pulls up a dashboard showing 450 MQLs last quarter. Then someone else opens a different report: 412 MQLs. Same quarter. Same metric name. Different numbers. The next 20 minutes are spent debating which one is right instead of making decisions.

This isn't a bug. It's an inevitability when metric definitions live in dashboards instead of in code.

---

## How It Happens

The root cause is almost never malice or incompetence. It's the natural entropy of a growing analytics environment:

1. **Analyst A** builds a dashboard and defines MQL as "leads with status = 'Qualified' created this quarter."
2. **Analyst B** builds a different dashboard six months later. By now, the business has added a qualification score threshold. They define MQL as "leads with status = 'Qualified' AND score >= 50."
3. **Analyst A's dashboard** is still running the old definition. Nobody updated it because nobody remembers it exists.

Now multiply this by every metric, every dashboard, every team that builds reports. You get a landscape where "MQL" means slightly different things in 15 different places, and the discrepancies are small enough that nobody notices until they're in a room together.

---

## The Dashboard-Level Logic Trap

The underlying problem is that business logic lives in the BI tool. Each dashboard embeds its own calculation — its own SQL, its own filters, its own interpretation of what a metric means.

This creates several failure modes:

- **Copy-paste drift.** Someone copies a working dashboard and modifies it slightly. The original definition is now forked.
- **Filter inconsistency.** One dashboard excludes test records. Another doesn't. Both look correct in isolation.
- **Temporal mismatch.** "This quarter" means fiscal quarter in one dashboard and calendar quarter in another.
- **Silent breakage.** An upstream table changes a column name. Some dashboards break visibly. Others silently return wrong numbers.

---

## The Semantic Layer Solution

A semantic layer solves this by defining each metric exactly once, in code, and serving that definition to every downstream consumer.

```yaml
metrics:
  - name: mqls
    description: "Marketing Qualified Leads"
    type: count
    type_params:
      measure: mql_count
    filter: |
      {{ Dimension('lead__is_qualified') }} = true
      AND {{ Dimension('lead__qualification_score') }} >= 50
```

This definition lives in version control. It's tested. It's documented. When a dashboard asks for "MQLs," it gets this definition — not a dashboard-specific copy.

**What changes:**

| Before | After |
|--------|-------|
| Metric defined in each dashboard | Metric defined once in dbt |
| Changes require updating N dashboards | Changes require one PR |
| "Which number is right?" | There's only one number |
| Logic buried in BI tool SQL | Logic is version-controlled and reviewable |

---

## The Hard Part Isn't Technical

The semantic layer tooling — dbt's MetricFlow, Looker's LookML, etc. — is mature and well-documented. The hard part is organizational:

**Getting agreement on definitions.** When marketing says "MQL" and sales says "MQL," they often mean subtly different things. A semantic layer forces you to reconcile these, which means facilitating conversations between teams that have been operating with different assumptions.

**Maintaining governance without bureaucracy.** The definitions need to evolve as the business changes, but changes need review. A PR-based workflow (same as code review) strikes the right balance — lightweight enough to use, structured enough to catch mistakes.

**Convincing people to give up control.** Dashboard builders are used to defining their own metrics. Moving to a semantic layer means they consume definitions instead of creating them. This feels like a loss of autonomy, and you need to sell the benefit: you no longer have to debug why your numbers don't match someone else's.

---

## Getting Started

If you're dealing with metric inconsistency, here's a practical starting point:

1. **Pick the three metrics that cause the most confusion.** Don't try to define everything at once.
2. **Document the current definitions.** Find every dashboard that calculates these metrics and write down the actual logic.
3. **Facilitate a definition session.** Get stakeholders in a room and agree on a single definition for each metric.
4. **Implement in dbt.** Codify the agreed definitions in your semantic layer.
5. **Migrate the top dashboards.** Update the highest-traffic dashboards to use the semantic layer definitions.
6. **Expand outward.** Once the pattern is proven, add more metrics and migrate more dashboards.

The goal isn't perfection on day one. It's establishing the pattern: metrics are defined in code, once, and consumed everywhere.

---

[[Talks & Thoughts|Back to Writing]]
