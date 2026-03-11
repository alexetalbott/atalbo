# Personal Productivity System with Claude Code

**Role:** Designer and builder
**Timeline:** Ongoing personal project
**Stack:** Claude Code (CLI), Markdown, YAML, Notion API, shell scripts, MCP servers

---

## Context

I manage a lot of context across meetings, projects, tasks, and ongoing analytical work. Traditional productivity tools solve pieces of the problem — Notion for project tracking, Obsidian for notes, Jira for tickets — but none of them talk to each other, and keeping everything in sync is a tax on attention.

I built a workflow automation system using Claude Code as the orchestration layer. The idea: natural language commands that trigger multi-step workflows across all my tools, with the LLM handling the messy integration work.

---

## System Design

### Architecture

```
Natural language trigger ("sync shadow meetings")
        ↓
  Claude Code session
        ↓
  Reads workflow instructions (claude-instructions.md)
        ↓
  Executes multi-step workflow
        ↓
  Updates local files, Notion, task systems
```

The system is built around a central configuration file that maps trigger phrases to workflow instruction files. Each workflow is self-contained — a fresh Claude session can execute it by reading only the trigger mapping and the workflow's instruction file.

### Workflow Examples

| Trigger | What It Does |
|---------|-------------|
| `sync shadow meetings` | Pulls meeting notes, synthesizes key insights into a persistent context document |
| `extract tasks from [meeting]` | Parses meeting notes, creates individual task files with YAML frontmatter |
| `daily sync` | Composite workflow: meetings → projects → tasks, with approval checkpoints |
| `jira accomplishments` | Generates formatted Slack posts from completed Jira tickets |

### Key Design Decisions

**File-based state.** All state lives in markdown files with YAML frontmatter — no database, no custom API. This means everything is human-readable, version-controllable, and debuggable.

**Obsidian-compatible.** Task and project files are designed to render correctly in Obsidian's database views (Bases plugin), giving me structured views over plain markdown files.

**Progressive disclosure.** A thin root config file points to detailed workflow instructions. Claude loads only what it needs for the current task, keeping context windows efficient.

**Approval checkpoints.** Destructive or ambiguous operations pause for human approval. The system proposes, I confirm.

---

## Technical Highlights

### MCP Server Integration

The system uses Model Context Protocol (MCP) servers for external integrations:

- **Notion MCP** for reading/writing project data
- Scoped per directory so different projects get different capabilities

### Semantic File Design

Every task and project file follows a consistent YAML schema:

```yaml
---
title: "Build pipeline forecast model"
project: pipeline-forecast
priority: P1
status: in-progress
source: meeting/2026-01-21-forecasting-brainstorm
---
```

This enables Obsidian's database views to query across files without any custom tooling.

### Workflow Composability

Complex workflows compose from simpler ones. The `daily sync` workflow chains meeting sync → project sync → task sync, with each stage producing outputs the next stage consumes.

---

## Lessons Learned

- **LLMs are surprisingly good orchestrators.** The messy, context-dependent work of "read this meeting note, figure out the action items, create structured files" is exactly what LLMs excel at.
- **Design for the cold start.** Every workflow instruction file should be executable by a fresh session with no prior context. This constraint forces clear documentation.
- **File-based state is underrated.** Markdown + YAML gives you structured data, human readability, git history, and Obsidian compatibility for free.
- **Approval gates build trust.** I'm more willing to automate aggressively because I know the system will pause before doing anything irreversible.

---

[[Projects|Back to Projects]]
