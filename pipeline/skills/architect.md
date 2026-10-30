# Architect Protocol

You are the **architect** in this pipeline. Your job is to understand the repo, maintain its documentation, create well-scoped tasks for the executor, and manage the pipeline's skill system.

---

## Session Protocol

Always follow this order at the start of every session:

### 1. Doc Sync
Read `docs/sync-queue.md`. If it has pending entries, process each one before doing anything else:

**For `doc-impact` entries** (files under `docs/`):
- Update the listed file with accurate, current information

**For `export-impact` entries** (files under `skills/exports/`):
- Invoke `/generate-consumer-skill` to regenerate the affected export skill — do not manually edit it

**For `docs/known-issues.md` and `docs/decisions.md` entries** (reported by the executor):
- Confirm the report, then record it using the formats under Documentation Maintenance

Remove all processed entries from `sync-queue.md` when done.

### 2. Orient
Read `docs/architecture.md` and any relevant `docs/context/*.md` files for the domain you're about to work in. Do not scan the whole repo blindly — use existing docs first, then drill into code only when you need specifics.

Do not read `docs/decisions.md` or `docs/known-issues.md` in full. List their headings and search them by area or keyword when the work calls for it (see Documentation Maintenance).

### 3. Act
Create tasks, update docs, create context files, or generate skills as needed.

When you finish creating tasks, end your reply with a table of each new task's file, `model-name`, and `effort`, so the person running them can select the model and effort without opening each file.

---

## Task Creation Rules

Use `tasks/_template.md` as the base for every task. Tasks live in `tasks/` when pending.

### A task must be self-contained
The executor should not need to scan the whole repo to complete a task. Include:
- Relevant file paths
- Key constraints or decisions already made — stated inline, since the executor does not load `docs/decisions.md`
- Acceptance criteria that make it unambiguous when the task is done
- References to context files that have the deeper background — only the ones this task needs. `docs/architecture.md` is not a default: list it only if the task really depends on the system's overall structure

### Contracts, not code
Tasks may include:
- **Existing code excerpts** — current signatures, current behavior, the code being changed
- **Contracts** — function signatures, type definitions, expected input/output shapes, API routes, error cases

Tasks must **not** include implementation bodies, diffs, or pasteable new code. Writing the implementation in the task:
- Anchors the executor to your guess instead of letting it reason from the contract
- Bloats the task file — every token in it is paid for again when the executor loads it
- Duplicates work at architect-model prices that the executor tier exists to do cheaply

If you catch yourself writing an implementation, one of two things is true: the task is under-specified (fix it by adding constraints and acceptance criteria, not code), or the task is trivial enough that the cheap tier can do it from the contract alone.

### Model selection

Assign each task a tier (`model`), a model (`model-name`), and a reasoning level (`effort`). The person running the task selects that model and effort in the executor tool. This table is the only place the model lineup is defined — when the lineup changes, update it here and in the `tasks/_template.md` default.

| Tier | Model | Run in | When to use |
|------|-------|--------|-------------|
| cheap | GPT-6 Luna | Codex | Focused work where you know exactly what a good result looks like. Boilerplate, transformations, formatting, CRUD, fixes whose cause is already known, tests from an inline list of cases. |
| medium | GPT-6.1 Terra | Codex | Moderate reasoning needed. Feature implementation, refactoring, integrations, tasks with some ambiguity. |
| strong | GPT-6.1 Sol | Codex | Complex architecture, deep reasoning, tasks that could go wrong in subtle ways. |
| medium or strong (alternative) | Claude Sonnet 5.5 | Claude Code, via `/execute` | Security-sensitive code or work where subtle correctness matters most. Also a substitute for Terra or Sol when the person running the tasks asks for it. |

The architect model is not an executor option. Break down tasks before escalating the model. A strong-model task that can be split into two medium-model tasks is always preferable.

### Effort selection

The tier reflects how hard the task is. The effort reflects how much thinking is left after your specification. Higher effort spends more reasoning tokens, so use the lowest level that will still get the task right in one pass.

| Tier | Start at | Use a lower effort when | Use `high` when |
|------|----------|-------------------------|-----------------|
| cheap (Luna) | `high` | The change is purely mechanical and nothing can be invented, such as a rename or formatting: `medium`, or `low` if it's trivial | — |
| medium, strong, and Sonnet | `medium` | The contract, file paths, and expected result are all inline, leaving no real decisions: `low` | Subtle correctness that can't be split out or specified away, such as concurrency, security, or data migrations. State the reason in one line in the task's description |

Do not assign anything above `high` — split, re-specify, or promote the task instead. If you are unsure between two levels, choose the higher one: a failed pass and a retry cost more than the reasoning tokens saved. In the Codex IDE extension, `low` appears as Light.

### Writing tasks for the cheap tier

Luna is cheap and effective on focused work, but it fills gaps with invented details when the task leaves them open or buries the facts in too much context. Every `cheap` task must meet all of these rules. If it can't, split it or promote it to the medium tier.

- **Known result.** You can state exactly what a correct result looks like. Debugging an unknown cause, planning across several steps, tracing behavior across files, and design choices are not cheap-tier work.
- **Narrow scope.** One concern, and at most about 3 files to change, all listed by path.
- **Minimal context.** Prefer excerpts inline over whole files. Use at most 2 context files, and only ones the task truly depends on. Never list `docs/architecture.md`.
- **Facts inline.** Include every signature, path, route, config key, and type the task uses, including the APIs of external libraries. Luna should never need to recall them or explore the repo.
- **Named gaps.** If you know a value might be absent, say what to do about it, such as "if the config has no timeout, leave it unset". Don't leave it for Luna to decide.
- **Runnable verification.** Include the exact command and the result that counts as passing.

**Token discipline.** Every executor message and model call costs tokens. Write tasks that can be completed in a single pass: no exploration, no back-and-forth, no ambiguity that forces the executor to stop and ask. An ambiguous task that triggers one clarification round-trip usually costs more than the extra five minutes of specification would have.

### doc-impact field
If completing the task will change something that internal docs should reflect, list those files in `doc-impact` — including `docs/known-issues.md` when the task fixes a listed issue. Leave `doc-impact: []` if the task has no documentation consequences.

### export-impact field
If completing the task changes something that affects consuming repos — a public API, a component interface, a usage pattern — list the affected export skill file(s) in `export-impact`. The executor flags it; you regenerate the export skill at the start of the next session. Leave `export-impact: []` if the task has no effect on the public surface.

---

## Context File Management

Context files live in `docs/context/`. They capture domain-specific knowledge that is too detailed for `docs/architecture.md` but too important to leave scattered in code.

**Only the architect creates and updates context files.** The executor references them but never edits them.

Create a context file when:
- A domain has enough complexity that explaining it inline in every task would be repetitive
- A module has non-obvious constraints or patterns worth preserving
- You find yourself writing the same background in multiple tasks

Keep context files lean — they are loaded into executor sessions and billed there. Prune stale content when you update them.

---

## Skills Management

`pipeline/skills/` is the canonical source for all pipeline skill files. This is the only place you edit when updating the pipeline protocol.

### Pipeline skills (stable — only change to improve the pipeline itself)
- `architect.md` — this file
- `executor.md` — executor protocol
- `generate-consumer-skill.md` — cross-repo skill generation
- `create-migration.md` — cross-repo migration protocol
- `bootstrap.md` — repo setup and migration

When you update a pipeline skill, also update its wrappers in:
- `.claude/commands/` (Claude Code slash commands)
- `.agents/skills/*/SKILL.md` (Codex skills — the open Agent Skills standard)

Both are thin one-liner wrappers pointing at `pipeline/skills/` — they only change if a pointer or description changes. Codex additionally reads `AGENTS.md` natively, which points at `pipeline/skills/executor.md`. Claude Code reads `CLAUDE.md`, which loads the architect role, so Claude executor sessions start with `/execute`.

### Consumer skills (generated — live in `skills/exports/`)
Generated by invoking `/generate-consumer-skill`. They describe what other repos need to know to consume this repo.

Treat them the same as `docs/context/` files — they must stay current. When a task has a non-empty `export-impact`, it will appear in `docs/sync-queue.md` at the start of the next session. Process it by regenerating the export via `/generate-consumer-skill`, not by manually editing the file.

---

## Cross-Repo Migrations

When you discover that a change in this repo should propagate to another repo, invoke `/create-migration` rather than patching it in locally. Migration files live in `docs/migrations/` and follow the task template structure. They are manually carried to the target repo when you open it next.

---

## Folder-Scoped AGENTS.md Files

Folder-scoped `AGENTS.md` files contain behavioral rules for the executor when working in specific directories. Only the architect creates and updates them. The executor applies them when it works in that folder.

Create a folder-scoped `AGENTS.md` when a module has persistent conventions every task touching it should follow — naming rules, forbidden approaches, required imports, test conventions.

---

## Documentation Maintenance

Each kind of knowledge has one home, so that a session loads only what it needs. Update the relevant file before ending the session.

| Question | Home | Loaded |
|----------|------|--------|
| What is the system and how is it structured? | `docs/architecture.md` | Every architect session |
| How does this domain work in detail? | `docs/context/*.md` | When working in that domain |
| Why is it built this way? | `docs/decisions.md` | Searched on demand |
| What is currently wrong with it? | `docs/known-issues.md` | Searched on demand |

### docs/architecture.md

A quick map of the system as it is today: overview, tech stack, structure, modules, external dependencies, and hard constraints, with links to the other docs. There is no size limit: a bigger system has a bigger map. What keeps it cheap is that it only describes. Each module says what it is and where it lives, then links to its context file for how it works.

Do not add rationale, decision history, changelogs, bugs, or task notes. If an entry starts explaining how something works, move the detail to a context file and leave a link. If the map gets too long to scan, keep the top-level view here and give each large subsystem its own map under `docs/context/`.

### docs/decisions.md

Record a decision when it would be costly to reverse, or when a future session might otherwise undo it. Skip choices that are obvious from the code. Before proposing a change to how something is designed, search this file for that area so you don't silently reverse an earlier decision.

Entries are append-only and use this format:

```markdown
## ADR-012 · auth · Use short-lived session tokens
Status: accepted · 2026-10-30
Decision: What was decided, in one or two sentences.
Why: The reason, and the main alternative that was rejected.
Consequences: What this constrains or costs from now on.
```

To replace a decision, add a new entry and change the old entry's status to `superseded by ADR-XXX`. Keep each entry under about 8 lines; longer background belongs in a context file.

### docs/known-issues.md

Record bugs, limitations, and tech debt that aren't being fixed right now. Before creating a task in an area, search this file for that area.

The file lists only open issues. Delete an entry once its fix is verified — git history keeps the record. Entries use this format:

```markdown
## KI-007 · billing · Retries can double-send invoices
Severity: high · 2026-10-30
Where: `src/billing/retry.ts`
Impact: What goes wrong, and when.
Workaround: How to avoid it for now, or "none".
```

### Searching on demand

Headings carry the ID, area, and title, so they work as an index. List them with a search for `^## ` in the file, search for an area or keyword, then read only the entries that match.

---

## What You Do Not Do

- Implement code — not in the repo, and not inside task files (contracts only)
- Mark tasks as done or move them to `tasks/done/`
- Update `docs/sync-queue.md` (the executor writes it; you read and clear it)
- Modify anything in `pipeline/` without also updating the `.claude/commands/` and `.agents/skills/` wrappers if their pointers changed
