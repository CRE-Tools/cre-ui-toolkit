# Architecture

> A quick map of the system as it is today. Rationale goes in [decisions.md](decisions.md), open problems in [known-issues.md](known-issues.md), and domain detail in [context/](context/).

## Overview

`cre-ui-toolkit` is a centralized UI toolkit monorepo for the CRE design system, based on **DS PUCPR Core Web**. The design and development teams collaborate here to define, document, and ship a shared React component library published as `@cre/cre-web-ui`.

Current phase: foundational. Teams are actively locking design tokens, grid rules, and the first set of components. Storybook is the main review surface where design and dev meet to align before anything ships.

## Tech Stack

| Layer | Tool | Version |
|---|---|---|
| Package manager | pnpm (workspaces) | — |
| Language | TypeScript | ~6.0 |
| UI library | React | >=18 (peer) |
| Styling | Tailwind CSS v3 + custom tokens | 3.4 |
| Component utilities | clsx + tailwind-merge (`cn`) | — |
| Package bundler | tsup (ESM + CJS dual output) | 8.x |
| Storybook | @storybook/react-vite | 10.x |
| Sandbox | Next.js | 15.x |

## Project Structure

```
cre-ui-toolkit/
├── apps/
│   ├── storybook/              # @cre/storybook — Storybook host app
│   │   └── src/stories/        # all story files: layout/, components/, blocks/, foundation/
│   └── sandbox/                # @cre/sandbox — Next.js consumer simulation app
├── packages/
│   ├── cre-web-ui/             # @cre/cre-web-ui — the published library
│   │   ├── tailwind.config.ts  # design tokens
│   │   └── src/
│   │       ├── layout/         # Box, Container, Grid+GridItem, Stack, Surface
│   │       ├── components/     # Button, ActionButton+ActionGroup, Badge, Alert, Input+Textarea
│   │       ├── blocks/         # Modal+ConfirmModal, Sidebar, Table+DataTable, HierarchicalTable
│   │       ├── styles/         # globals.css (fonts + Tailwind base)
│   │       └── utils/          # cn.ts (clsx + tailwind-merge)
│   └── storybook-utils/        # @cre/storybook-utils — private, dev-only storybook helpers
│       └── src/                # PendingReview, TokenUsage, token-registry
├── docs/
│   ├── architecture.md         # this file
│   ├── decisions.md            # why it is built this way (ADRs)
│   ├── known-issues.md         # what is currently wrong (KIs)
│   ├── context/                # topic-scoped context files
│   ├── migrations/             # changes propagating to consumer repos
│   └── sync-queue.md           # executor-to-architect doc updates
├── pipeline/skills/            # AI pipeline protocol files (canonical)
├── .claude/commands/           # Claude Code wrappers for pipeline skills
├── .agents/skills/             # Codex wrappers for pipeline skills
├── skills/exports/             # generated consumer skills
└── tasks/                      # pending tasks (done/ for completed)
```

Pre-monorepo files also remain at the repo root; they are not part of this structure ([KI-009](known-issues.md)).

## Modules & Domains

Component APIs and review status: [context/cre-web-ui-package.md](context/cre-web-ui-package.md). Naming and glossary: [context/design-system-decisions.md](context/design-system-decisions.md).

### Layout (`packages/cre-web-ui/src/layout/`)
Spatial and structural primitives: **Box**, **Container**, **Grid + GridItem**, **Stack**, **Surface**.

### Components (`packages/cre-web-ui/src/components/`)
Interactive and display units: **Button**, **ActionButton + ActionGroup**, **Badge**, **Alert**, **Input + Textarea**.

### Blocks (`packages/cre-web-ui/src/blocks/`)
Multi-component assemblies: **Modal + ConfirmModal**, **Sidebar**, **Table + DataTable**, **HierarchicalTable**.

### Design tokens (`packages/cre-web-ui/tailwind.config.ts`)
Breakpoints, radius, shadows, border width, colors, typography, and ring width. Conventions and current state: [context/design-system-decisions.md](context/design-system-decisions.md). Per-token review status lives in `packages/storybook-utils/src/token-registry.ts`.

### Storybook (`apps/storybook/`, `packages/storybook-utils/`)
Review surface for design and dev. Conventions: [context/storybook.md](context/storybook.md).

### Sandbox (`apps/sandbox/`)
Next.js app that imports `@cre/cre-web-ui` through a workspace symlink to simulate a consumer.

## External Dependencies

| Dependency | Purpose |
|---|---|
| DS PUCPR Core Web (Figma) | Source of truth for all design tokens |
| Chromatic | Visual regression / review for Storybook |

## Constraints

- **Library source stays free of Storybook code.** Stories live in `apps/storybook/src/stories/`, helpers in `packages/storybook-utils/`.
- **`packages/cre-web-ui/src/index.ts` defines the public API.** Everything it exports is public.
- **`packages/cre-web-ui/tailwind.config.ts` is the single source of truth for design tokens.** Consumer apps must either adopt the same config or import the resulting CSS.
- **Design system rules apply to all code.** Names are in English and semantic, and tokens replace raw values. See [context/design-system-decisions.md](context/design-system-decisions.md).
- **React peer dependency is >=18.** Sandbox and Storybook both run React 19.
