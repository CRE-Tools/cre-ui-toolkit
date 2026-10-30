# Bootstrap

This skill sets up a new repo with the pipeline, migrates an existing repo that has a monolithic CLAUDE.md/AGENTS.md into the skills-based structure, or upgrades a repo already on an older version of the pipeline.

The pipeline targets two tools:
- **Claude Code** — the architect (`CLAUDE.md` + `.claude/commands/`), and an optional executor through `/execute`
- **Codex** — the executor (`AGENTS.md`, which Codex reads natively, plus `.agents/skills/` — the open Agent Skills standard)

---

## How the pipeline files relate to each other

Before executing, understand the structure so you create the right thing:

```
CLAUDE.md / AGENTS.md          ← thin stubs, auto-loaded by each tool, never grow
      │
      └── references pipeline/skills/*.md   ← full protocol content, edit here to update
                                                (this is the single source of truth)

.claude/commands/*.md          ← one-liner slash commands for Claude Code
.agents/skills/*/SKILL.md      ← Codex skill wrappers (frontmatter + one-liner, Agent Skills standard)
      │
      └── both reference pipeline/skills/*.md as well
```

**Critical**: `.claude/commands/` and `.agents/skills/` are thin wrappers that point at `pipeline/skills/`. They do NOT contain the full protocol. Only `pipeline/skills/` contains the full content. When you update the protocol, you edit `pipeline/skills/` only.

---

## Mode 1 — New repo

### Step 1: Create folder structure

Create these directories:
```
pipeline/skills/
docs/context/
docs/migrations/
tasks/done/
skills/exports/
```

Copy the entire `pipeline/skills/` directory from the pipeline template repo into this repo. These files are the full protocol content — copy them as-is, preserving all content.

Copy `tasks/_template.md` from the pipeline template repo into `tasks/_template.md`.

Create these files, using the content in the steps below:
- `docs/sync-queue.md` — see Step 4
- `docs/architecture.md`, `docs/decisions.md`, `docs/known-issues.md` — see Step 5

If this repo was cloned from the pipeline template, overwrite those three docs: the copies from the template describe the pipeline itself, not this project.

### Step 2: Create bootstrap files

**`CLAUDE.md`:**
```
# Claude — Architect

Your role is **architect** in this pipeline. Your full protocol is in `pipeline/skills/architect.md`.

Read it now before starting any session.

> **Session started with `/execute`?** You are the executor instead. Skip the architect protocol and follow that command.
```

**`AGENTS.md`:**
```
# Codex — Executor

Your role is **executor** in this pipeline. Your full protocol is in `pipeline/skills/executor.md`.

Read it now before starting any task.

---

> **Switching to architect mode?** Change your role to **architect** and read `pipeline/skills/architect.md` instead.
```

### Step 3: Create Claude Code slash commands

Create `.claude/commands/` with these exact files:

`.claude/commands/bootstrap.md`:
```
Read `pipeline/skills/bootstrap.md` for the full protocol, then execute it now. Ask whether this is a new repo setup, a migration of an existing repo, or an upgrade of a repo already on this pipeline.
```

`.claude/commands/execute.md`:
```
You are the **executor** for this session, not the architect — this overrides the role in `CLAUDE.md`. Do not read `pipeline/skills/architect.md`. Read `pipeline/skills/executor.md` for the full protocol, then execute this task: $ARGUMENTS
```

`.claude/commands/generate-consumer-skill.md`:
```
Read `pipeline/skills/generate-consumer-skill.md` for the full protocol, then execute it now against this repo.
```

`.claude/commands/create-migration.md`:
```
Read `pipeline/skills/create-migration.md` for the full protocol, then execute it now to create a migration file for the change we discussed.
```

### Step 3b: Create Codex skills

Create `.agents/skills/` (the open Agent Skills standard) with these exact files:

`.agents/skills/architect/SKILL.md`:
```
---
name: architect
description: Architect protocol for this pipeline. Load when acting as the architect — session start, doc sync, task creation, context management, and skills maintenance.
---

Read `pipeline/skills/architect.md` for the full protocol. Load it now before doing anything else.
```

`.agents/skills/executor/SKILL.md`:
```
---
name: executor
description: Executor protocol for this pipeline. Defines how to pick up, execute, and complete tasks created by the architect.
---

Read `pipeline/skills/executor.md` for the full protocol. Load it now before picking up any task.
```

`.agents/skills/bootstrap/SKILL.md`:
```
---
name: bootstrap
description: Sets up a new repo with this pipeline, migrates an existing repo from a monolithic CLAUDE.md/AGENTS.md, or upgrades a repo already on an older version of this pipeline.
---

Read `pipeline/skills/bootstrap.md` for the full protocol, then execute it. Ask whether this is a new repo setup, a migration of an existing repo, or an upgrade of a repo already on this pipeline.
```

`.agents/skills/generate-consumer-skill/SKILL.md`:
```
---
name: generate-consumer-skill
description: Generates a lean, self-contained skill file for consuming repos. Invoke when another repo needs to understand this repo's public API, usage patterns, or constraints.
---

Read `pipeline/skills/generate-consumer-skill.md` for the full protocol, then execute it against this repo.
```

`.agents/skills/create-migration/SKILL.md`:
```
---
name: create-migration
description: Creates a structured migration file when a change in this repo needs to propagate to another repo.
---

Read `pipeline/skills/create-migration.md` for the full protocol, then execute it for the change we just discussed.
```

### Step 4: Initialize docs/sync-queue.md

Create `docs/sync-queue.md` with this content:
```
# Sync Queue

The architect reads this file at the start of every session. If there are pending entries, update the listed files and remove the entries before creating new tasks.

**Executor writes here. Architect reads and clears.**

---

## Pending Updates

<!-- Format: - `path/to/file.md` — what changed and why (from TASK-XXX) -->
```

### Step 5: Initialize the architecture docs

Ask the user for:
- What does this repo do? (one paragraph)
- What is the tech stack?
- Any known constraints or non-negotiables?

Populate `docs/architecture.md` with that information using these sections: Overview, Tech Stack, Project Structure, Modules & Domains, External Dependencies, Constraints. Start it with this note:
```
> A quick map of the system as it is today. Rationale goes in [decisions.md](decisions.md), open problems in [known-issues.md](known-issues.md), and domain detail in [context/](context/).
```

Create `docs/decisions.md` with this content, and add an entry for any decision the user has already described, using the format in `pipeline/skills/architect.md`:
```
# Architecture Decisions

> Why the system is built the way it is. Don't read this file in full: list the headings with a search for `^## `, then read only the entries you need. Format and rules are in `pipeline/skills/architect.md`.

---
```

Create `docs/known-issues.md` with this content, and add an entry for any issue the user has already described:
```
# Known Issues

> Open bugs, limitations, and tech debt only — delete an entry once its fix is verified. Don't read this file in full: list the headings with a search for `^## `, then read only the entries you need. Format and rules are in `pipeline/skills/architect.md`.

---

<!-- No open issues. -->
```

### Step 6: Confirm

List all created files. Ask if anything needs adjustment before the first architect session.

---

## Mode 2 — Migrate existing repo

Use this when a repo already has a pipeline with a monolithic CLAUDE.md or AGENTS.md that has grown to mix pipeline protocol with project-specific content — including repos still on the old Windsurf-era layout (a `.windsurf/skills/` folder, Windsurf-named stubs, or an outdated model-tier table).

### Step 1: Read existing files
Read `CLAUDE.md` and `AGENTS.md` in full. If a `.windsurf/` folder exists, note it for deletion in Step 5 — its skill wrappers are obsolete.

### Step 2: Separate concerns
Identify two categories of content:

**Pipeline protocol** — generic rules about how architect/executor behave (session order, task creation rules, model tiers, doc sync). Discard this from CLAUDE.md — the new pipeline/skills/ files replace it.

**Project-specific content** — architecture decisions, domain rules, module descriptions, constraints unique to this project. This must be preserved under `docs/`.

### Step 3: Preserve project-specific content
For each project-specific topic:
- Create `docs/context/[topic].md` with the extracted content
- Move structural content (tech stack, structure, modules) into `docs/architecture.md`
- Move decisions into `docs/decisions.md` and open problems into `docs/known-issues.md`

### Step 4: Create pipeline structure
Follow Mode 1 Steps 1–3b exactly — create `pipeline/skills/`, the `.claude/commands/` wrappers, the `.agents/skills/` wrappers, and the docs structure.

### Step 5: Replace bootstrap files
Replace CLAUDE.md and AGENTS.md with the thin stubs from Mode 1 Step 2. Delete any `.windsurf/` folder and `.cursorrules` file left over from earlier pipeline versions — `.agents/skills/` replaces them.

### Step 6: Verify nothing was lost
Before finishing:
- Every piece of project-specific content from the old CLAUDE.md exists in `docs/`
- CLAUDE.md and AGENTS.md are now thin stubs (under 10 lines each)
- `pipeline/skills/` contains all five protocol files with their full content
- `docs/architecture.md`, `docs/decisions.md`, `docs/known-issues.md`, and `docs/context/` contain the migrated knowledge

### Step 7: First sync
Run the normal session protocol (doc sync → orient → act) to verify the migrated docs are coherent.

---

## Mode 3 — Upgrade a repo already on this pipeline

Use this when a repo already has `pipeline/skills/` but on an older version — for example Devin or Windsurf stubs, old model tiers, tasks with no `effort` field, or a `docs/architecture.md` that has grown to carry decisions and issues.

### Step 1: Refresh the protocol
Compare the repo's `pipeline/skills/` with the pipeline template repo. If the repo's copies have project-specific edits, ask the user how to handle them before overwriting anything. Then:
- Replace `pipeline/skills/*.md` and `tasks/_template.md` with the template repo's versions
- Create or update the wrappers from Mode 1 Steps 3 and 3b, including `.claude/commands/execute.md`
- Update the role stubs and notes in `CLAUDE.md` and `AGENTS.md` to match Mode 1 Step 2, keeping any project-specific content they contain
- Delete any `.windsurf/` folder and `.cursorrules` file

### Step 2: Split docs/architecture.md
Sort every part of the current file by the question it answers, and move it to that home. Move content; do not summarize it away.

| Content | Goes to |
|---------|---------|
| What the system is: overview, stack, structure, modules, dependencies, hard constraints | Stays in `docs/architecture.md` |
| Detailed explanation of one domain | `docs/context/[topic].md`, with a link from the module's entry |
| Choices and their rationale, including "Key Architectural Decisions" sections and history notes | `docs/decisions.md`, one ADR per decision |
| Bugs, limitations, workarounds, tech debt | `docs/known-issues.md`, one KI per issue |
| Task notes or changelogs that nothing depends on | Remove them, and list what you removed in Step 5 |

For a decision whose date you can't establish, write `migrated from architecture.md on YYYY-MM-DD` as its date. If you can't tell why a decision was made, write "not recorded" rather than inventing a reason.

Give `docs/architecture.md` the opening note and sections from Mode 1 Step 5.

### Step 3: Update pending tasks
For each task still in `tasks/`:
- Set `model-name` from the tier table in `pipeline/skills/architect.md`
- Add `effort`, following the effort table there
- Remove `docs/architecture.md` from `context` unless the task really needs it

Leave `tasks/done/` untouched.

### Step 4: Check the remaining docs
Search `docs/`, `tasks/`, and the root stubs for leftover references to Devin, Windsurf, and old model names, and update the ones that describe the current setup. Leave `docs/sync-queue.md` entries in place for the normal doc sync.

### Step 5: Verify and report
Compare against the previous version with `git show HEAD:docs/architecture.md`, and confirm every fact you kept now has one home. Then report to the user:
- The line count of `docs/architecture.md` before and after
- The number of ADR and KI entries created
- Anything removed, and any decision marked "not recorded"

Do not commit unless the user asks.
