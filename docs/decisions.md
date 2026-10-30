# Architecture Decisions

> Why the system is built the way it is. Don't read this file in full: list the headings with a search for `^## `, then read only the entries you need. Format and rules are in `pipeline/skills/architect.md`.

---

## ADR-001 · pipeline · Skills are the unit of protocol
Status: accepted · migrated from architecture.md on 2026-10-30
Decision: Pipeline rules and cross-repo knowledge are stored as skill files, not embedded in `CLAUDE.md` or `AGENTS.md`.
Why: Keeps bootstrap files permanently thin, makes the protocol independently updatable, and makes knowledge portable across repos and tools.

## ADR-002 · pipeline · Single canonical source for protocol content
Status: accepted · migrated from architecture.md on 2026-10-30
Decision: `pipeline/skills/` is the only place to edit protocol content. `.claude/commands/` and `.agents/skills/` are thin wrappers that load the canonical files.
Why: Prevents the protocol from drifting between tools.

## ADR-003 · tasks · Tasks explicitly assign their context
Status: accepted · migrated from architecture.md on 2026-10-30
Decision: Tasks list the context files they need. The executor reads only those and does not scan the repo.
Why: Keeps execution predictable and context windows lean, which is what makes cheap-tier execution viable.
Consequences: Cheap-tier tasks are capped at 2 context files with all contracts inline.

## ADR-004 · tasks · Contracts, not code
Status: accepted · migrated from architecture.md on 2026-10-30
Decision: The architect specifies interfaces (signatures, types, shapes) and acceptance criteria in tasks, never implementation bodies.
Why: Avoids anchoring the executor, keeps task files small, and avoids paying architect-model prices for work the executor tier does cheaply.

## ADR-005 · cross-repo · Knowledge travels as files
Status: accepted · migrated from architecture.md on 2026-10-30
Decision: Knowledge for other repos is packaged as consumer skills in `skills/exports/`. Changes for dependency repos are packaged as migration files in `docs/migrations/`.
Why: Neither mechanism requires live access to another repo.

## ADR-006 · docs · Split architecture, decisions, and known issues
Status: accepted · 2026-10-30
Decision: `docs/architecture.md` only describes the system, with no size limit. Rationale moves to `docs/decisions.md` and open problems to `docs/known-issues.md`, both searched on demand.
Why: Consuming repos kept growing `architecture.md`, which is read every architect session, so history was paid for even when it wasn't needed. Separate files were chosen over one folder per decision because a single file is simpler to search and carry.
A line limit was rejected because a larger system legitimately needs a larger map; a content rule targets the actual cause of the bloat.
Consequences: `docs/architecture.md` is no longer a default task context.

## ADR-007 · executors · Codex and Claude Code replace Devin, with per-task effort
Status: accepted · 2026-10-30
Decision: The executor runs in Codex, or in Claude Code through `/execute` for Sonnet. Tasks assign a reasoning `effort` as well as a model. The model lineup is defined only in `pipeline/skills/architect.md`.
Why: Matches the tools now in use. Effort is a second way to save tokens on well-specified tasks, and one lineup table limits the edits needed when models change.
Consequences: `CLAUDE.md` loads the architect role, so Claude executor sessions must start with `/execute`.

## ADR-008 · tasks · Luna starts at high effort with strict task rules
Status: accepted · 2026-10-30
Decision: Cheap-tier tasks start at `high` effort and must have a known result, narrow scope, minimal context, inline facts, named gaps, and a runnable verification. Each task runs in a new session.
Why: OpenAI's Codex docs say to start Luna at High and use it when you know what a good result looks like. Luna hallucinated in practice on context-heavy tasks at `medium`. Luna's low price makes the extra reasoning affordable, and a failed pass costs more.
Consequences: The context cap is a working rule from experience, not a documented Luna limit. Revisit it if results change.

## ADR-009 · storybook · Stories live in the Storybook app, not in the package
Status: accepted · migrated from architecture.md on 2026-10-30
Decision: `apps/storybook/src/stories/` owns all story files, organized by DS category. The Storybook `main.ts` points at `src/stories/**/*.stories.*`.
Why: Keeps the library package free of Storybook types and eliminates editor lint errors from missing `@storybook/react-vite` types in the package's TypeScript context.

## ADR-010 · package · Package source is pure library code
Status: accepted · migrated from architecture.md on 2026-10-30
Decision: `packages/cre-web-ui/src/` contains only component implementations, styles, and utilities, with no Storybook-specific code or test utilities.
Why: Not recorded.
Consequences: Storybook helpers such as `PendingReview` live in `packages/storybook-utils/`.

## ADR-011 · package · Source is organized by DS hierarchy
Status: accepted · migrated from architecture.md on 2026-10-30
Decision: Source folders are `src/layout/`, `src/components/`, and `src/blocks/`.
Why: The folders match the design system glossary in `docs/context/design-system-decisions.md`.

## ADR-012 · sandbox · Sandbox simulates a real consumer
Status: accepted · migrated from architecture.md on 2026-10-30
Decision: `apps/sandbox` (Next.js 15) imports the library through a workspace symlink, with the same constraints a real consumer app has.
Why: Validates integration before publishing.

## ADR-013 · package · Dual CJS/ESM output
Status: accepted · migrated from architecture.md on 2026-10-30
Decision: `tsup` produces `dist/index.js` (ESM) and `dist/index.cjs` (CJS), and `files: ["dist"]` limits what ships to npm to the build output.
Why: Not recorded.

## ADR-014 · tokens · Tailwind tokens are scoped to the package
Status: accepted · migrated from architecture.md on 2026-10-30
Decision: `packages/cre-web-ui/tailwind.config.ts` is the single source of truth for all design tokens.
Why: Not recorded.
Consequences: Consumer apps must either adopt the same config or import the resulting CSS. See KI-001 for what the published package currently lacks.

## ADR-015 · package · Library is named @cre/cre-web-ui
Status: accepted · 2026-06-10
Decision: The package was renamed from `@cre/ui-kit` to `@cre/cre-web-ui`, and its directory from `packages/ui-kit/` to `packages/cre-web-ui/` (TASK-023).
Why: Not recorded.
