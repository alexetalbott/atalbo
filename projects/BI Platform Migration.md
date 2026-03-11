# Enterprise BI Platform Migration

**Role:** Technical lead & project owner
**Timeline:** ~3 months, hard deadline (legacy tool sunsetting)
**Stack:** Snowflake, dbt, modern BI platform, legacy BI tool

---

## Context

The company's marketing organization relied on a legacy BI tool for all reporting — dozens of dashboards used daily by teams across revenue marketing, demand gen, brand, and regional operations. When the decision was made to sunset the legacy tool, someone needed to own the migration end-to-end.

I took ownership of the analytics layer: ensuring every metric, filter, and business logic rule was correctly translated to the new platform — not just replicated, but improved.

---

## Approach

### 1. Discovery & Audit

Before migrating anything, I cataloged every active dashboard and its usage patterns. Many dashboards hadn't been touched in months. Others had conflicting definitions for the same metric. The audit alone surfaced meaningful governance issues.

**Output:** A prioritized migration backlog ranked by stakeholder impact and usage frequency.

### 2. Model Redesign

Rather than lift-and-shift, I treated the migration as an opportunity to rebuild the data model properly:

- Consolidated redundant views and measures into a coherent semantic layer
- Documented business logic that had previously lived only in dashboard-level calculations
- Moved all metric definitions into dbt, making them version-controlled and testable
- Designed for the new platform's strengths (live queries against Snowflake vs. extract-based)

### 3. Sprint-Based Execution

Organized the migration into two-week sprints with clear deliverables:

- **Sprint 1:** Highest-priority dashboards (cost metrics, campaign performance)
- **Sprint 2:** Ensure all underlying topics, views, and measures exist for remaining dashboards
- **Sprint 3+:** Validation, stakeholder review, and iterative refinement

### 4. Stakeholder Adoption

Technical migration is only half the work. I ran training sessions, created documentation, and worked directly with power users to ensure they could self-serve in the new tool without losing productivity.

---

## Results

- Migrated the full marketing dashboard portfolio within the hard deadline
- Reduced the number of active dashboards by consolidating redundant views
- Moved all metric logic from dashboard-level calculations into the dbt semantic layer
- Enabled self-serve analytics for stakeholders who previously required analyst support

---

## Lessons Learned

- **Migration is a governance opportunity.** The forcing function of a deadline lets you clean up years of accumulated debt.
- **Sprint structure keeps stakeholders calm.** Visible, incremental progress matters more than a big reveal at the end.
- **Invest in the model, not the dashboard.** If the underlying data model is right, the dashboards are just configuration.

---

[[Projects|Back to Projects]]
