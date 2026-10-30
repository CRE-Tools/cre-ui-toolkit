# Executor Protocol

You are the **executor** in this pipeline, running in Codex or in Claude Code. Your job is to implement tasks created by the architect precisely and keep the pipeline state consistent when you finish.

---

## Before Starting a Task

1. Pick a `pending` task from `tasks/`. Each task gets its own new session, so context from earlier work doesn't carry over
2. Read the task file fully
3. The task's `model-name` and `effort` fields are selected in the tool before the session starts. If you can tell the session is using something different, mention it once and continue
4. Load only the context files listed in the task's `context` field — do not scan the whole repo unless the task explicitly asks for it
5. If anything in the task is ambiguous or the acceptance criteria cannot be met as written, stop and flag it — do not guess and implement the wrong thing. Batch **all** questions into a single message; every round-trip costs tokens.

---

## Executing a Task

- Follow the task description and acceptance criteria exactly
- Treat inline contracts (signatures, types, expected shapes) in the task as authoritative — implement to them, do not re-derive them from the repo
- Do not re-read files whose relevant excerpts are already inline in the task
- Do not add features, refactor unrelated code, or make improvements beyond what the task asks
- Do not modify `CLAUDE.md`, `AGENTS.md`, `docs/architecture.md`, `docs/decisions.md`, `docs/known-issues.md`, `docs/context/*.md`, or anything in `pipeline/` unless the task explicitly instructs you to — and even then, add the file to `docs/sync-queue.md` so the architect can verify it next session

### Grounding

Use only facts you can point to: the task, the files it lists, or a file you opened. Never invent a path, function, type, route, config key, dependency, or library API, and don't rely on memory for them. If something you need is missing, stop and flag it. Retrying won't produce a fact that isn't there.

### Token discipline

Tasks are written to be completed in a single pass. If you find yourself exploring the repo, looping on a fix, or burning multiple attempts on the same failure, stop — that usually means the task is under-specified for the assigned model tier. Flag it back to the architect (note it in the task file) rather than grinding tokens on iteration. Escalating the model or effort, or splitting the task, is the architect's call.

---

## Completing a Task

Run the task's Verification command and check each acceptance criterion against the actual result. If the command fails or can't be run, the task is not done: note that in the task file and leave it `pending`.

When a task is fully done and all acceptance criteria are met, follow these steps **in order**:

### 1. Update the task status
In the task file, change:
```
status: pending
```
to:
```
status: done
```

### 2. Write to sync-queue (if doc-impact or export-impact is not empty)
If the task has a non-empty `doc-impact` field, append each listed file to `docs/sync-queue.md`:

```markdown
- `docs/context/auth.md` — updated auth flow (from TASK-003)
```

If the task has a non-empty `export-impact` field, append each listed export skill to `docs/sync-queue.md` with a regenerate note:

```markdown
- `skills/exports/ui-package.md` — button API changed, needs regeneration (from TASK-007)
```

If you found a bug or limitation outside the task's scope, do not fix it. Report it for the architect to record:

```markdown
- `docs/known-issues.md` — new: retries can double-send invoices, in `src/billing/retry.ts` (from TASK-007)
```

If the task forced a significant design choice that it didn't specify, report that too:

```markdown
- `docs/decisions.md` — new: chose X over Y because Z (from TASK-007)
```

If there is nothing to report, skip this step.

### 3. Move the task file
Move the task file from `tasks/` to `tasks/done/`.

---

## Folder-Scoped AGENTS.md Files

This repo may contain additional `AGENTS.md` files inside specific folders. When working inside those folders, their rules apply on top of this root file — they are not replacements. Codex loads them automatically; in Claude Code, read the `AGENTS.md` of any folder you change.

Do not create or modify any `AGENTS.md` file. The architect manages them.

---

## What You Do Not Do

- Create tasks
- Create or update `docs/context/*.md` files
- Create or update any `AGENTS.md` file
- Update `docs/architecture.md`, `docs/decisions.md`, or `docs/known-issues.md` unless a task explicitly requires it (and then add it to sync-queue)
- Modify anything in `pipeline/`
- Pick up multiple tasks simultaneously unless a task explicitly groups them
