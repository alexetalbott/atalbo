# BI Migration Is a Governance Opportunity, Not a Lift-and-Shift

When someone tells you "we're migrating BI platforms," the instinct is to replicate. Take what exists in the old tool, rebuild it in the new tool, and declare victory. This is the fastest path to migrating all of your existing problems to a shiny new platform.

A BI migration is one of the rare moments when you have organizational permission — and a hard deadline — to rethink how your analytics layer works. Use it.

---

## The Replication Trap

Lift-and-shift feels safe because it's scoped. You know what exists. You can measure progress (X of Y dashboards migrated). Stakeholders see continuity.

But it preserves everything that was wrong with the old environment:

- **Redundant dashboards.** Most BI environments have 3-5x more dashboards than are actively used. Migrating them all means maintaining them all.
- **Inconsistent logic.** Dashboard-level calculations that conflict with each other get faithfully reproduced in the new tool.
- **Missing documentation.** Nobody knows what half the dashboards do or who uses them. Migrating them doesn't fix this.
- **Technical debt.** Custom workarounds for the old tool's limitations get carried over, even when the new tool handles things natively.

You've spent all that effort and budget to end up exactly where you started, just on a different platform.

---

## Migration as a Forcing Function

A deadline changes behavior. When everyone knows the old tool is going away, you have leverage you don't normally have:

**Permission to audit.** "We need to catalog everything before we migrate" is inarguable. This is your chance to understand what actually exists.

**Permission to deprecate.** "This dashboard hasn't been viewed in 6 months — do we need to migrate it?" is a conversation you can only have during a migration.

**Permission to standardize.** "We're going to define metrics once in the data layer so they're consistent in the new tool" is easier to sell when the alternative is rebuilding the same mess.

**Permission to simplify.** "The new tool handles this natively, so we don't need this workaround" lets you remove complexity that would otherwise persist forever.

---

## A Better Migration Framework

### Phase 1: Audit and Prioritize

Before migrating anything, answer three questions for every existing dashboard:

1. **Is it used?** Check view counts. If nobody's looked at it in 90 days, flag it for deprecation.
2. **Is it correct?** Compare the dashboard's metric calculations against the source of truth. Document discrepancies.
3. **Who owns it?** If nobody can claim ownership, it's a candidate for consolidation.

**Output:** A prioritized migration backlog, a deprecation list, and a map of logic discrepancies.

### Phase 2: Rebuild the Foundation

Don't start with dashboards. Start with the data model:

- Move all metric logic from dashboard-level calculations into dbt models or a semantic layer
- Consolidate redundant views and measures
- Document every metric definition with business context

This is the investment that pays dividends. Every dashboard you build after this step will be correct by construction.

### Phase 3: Build in Priority Order

Migrate dashboards in order of stakeholder impact, not alphabetical order:

- **Sprint 1:** The dashboards leadership looks at weekly
- **Sprint 2:** Operational dashboards used by team leads
- **Sprint 3:** Self-serve exploration views
- **Intentionally skip:** Dashboards flagged for deprecation

### Phase 4: Train and Adopt

A technically perfect migration fails if people go back to exporting CSVs because they can't find what they need. Invest in:

- Hands-on training for power users
- Written guides for common workflows
- Office hours during the transition period

---

## The Counter-Argument (And Why It's Wrong)

"We don't have time to redesign. We just need to get off the old platform."

This framing assumes that replication is faster than redesign. In practice, it's often not — because replication means migrating dashboards you'll immediately need to fix, supporting dashboards nobody uses, and answering the same "why don't these numbers match?" questions you've been answering for years.

A migration that takes 20% longer but produces a clean, governed analytics environment is a better investment than one that ships fast and perpetuates the status quo.

---

## Key Takeaway

You will likely get one, maybe two BI migrations in your tenure at a company. Don't waste them on replication. Use the deadline as a forcing function to build the analytics environment you actually want.

---

[[Talks & Thoughts|Back to Writing]]
