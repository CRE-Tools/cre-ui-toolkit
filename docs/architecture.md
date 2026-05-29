# Architecture

## Overview

`cre-ui-toolkit` is a centralized UI toolkit monorepo for the CRE design system, based on **DS PUCPR Core Web**. The design and development teams collaborate here to define, document, and ship a shared React component library. The library is published as an npm package (`@cre/ui-kit`) and consumed by web applications built by the CRE team.

The current phase is foundational: the teams are actively establishing design tokens, grid rules, and primitive components. Storybook is the main surface where design and dev teams meet to review and agree on what ships.

## Tech Stack

| Layer | Tool | Version |
|---|---|---|
| Package manager | pnpm (workspaces) | — |
| Language | TypeScript | ~6.0 |
| UI library | React | 18/19 (peer) |
| Styling | Tailwind CSS v3 + custom tokens | 3.4 |
| Component utilities | clsx + tailwind-merge (`cn`) | — |
| Package bundler | tsup (ESM + CJS dual output) | 8.x |
| Storybook | @storybook/react-vite | 10.x |
| Sandbox | Next.js | 15.x |

## Project Structure

```
cre-ui-toolkit/
├── apps/
│   ├── storybook/         # @cre/storybook — Storybook app, reads stories from packages/ui-kit
│   └── sandbox/           # @cre/sandbox — Next.js app simulating a real consumer of @cre/ui-kit
├── packages/
│   └── ui-kit/            # @cre/ui-kit — the published package
│       └── src/
│           ├── primitives/    # one folder per component (Component.tsx, Component.stories.tsx, index.ts)
│           ├── storybook/     # internal storybook helpers (PendingReview, etc.)
│           ├── styles/        # global CSS (globals.css)
│           └── utils/         # shared utils (cn.ts)
├── docs/
│   ├── architecture.md    # this file
│   ├── context/           # topic-scoped context files for AI and team
│   ├── migrations/        # migration files for changes propagating to consumer repos
│   └── sync-queue.md      # executor writes, architect reads and clears
├── pipeline/skills/       # AI pipeline protocol files
└── tasks/                 # task files created by the architect
```

## Key Architectural Decisions

**Stories live inside the package, not in the storybook app.**
`apps/storybook` is a thin host — its `main.ts` points at `packages/ui-kit/src/**/*.stories.*`. This keeps component and story colocated and makes the package self-documenting.

**Sandbox simulates a real consumer.**
`apps/sandbox` (Next.js) imports `@cre/ui-kit` via the workspace symlink (`workspace:*`) with the same constraints a real app would have. It is used to validate real-world integration before publishing.

**Dual CJS/ESM output.**
`tsup` produces both `dist/index.js` (ESM) and `dist/index.cjs` (CJS) so the package can be consumed in any bundler.

**Tailwind tokens are scoped to the package.**
The custom Tailwind config in `packages/ui-kit/tailwind.config.ts` defines all design tokens. Consumer apps are expected to adopt the same config or import the resulting CSS.

## Modules & Domains

### Foundation / Layout primitives
Grid, GridItem, Container, Box, Stack, Surface — establish the spatial rules of the design system. The grid follows DS PUCPR breakpoints: **4 cols (xs ≥320px) → 8 cols (sm ≥600px) → 12 cols (md ≥840px)**. Gutters: 8px / 16px / 24px. These breakpoints override Tailwind defaults.

### UI primitives
Button, ActionButton, Alert, Badge, Input, Textarea — first-pass components to populate storybook and test the design token pipeline. All carry a **Pending Review** story flagging open questions for the design team.

### Admin panel components (early)
Modal, Sidebar, Table, HierarchicalTable — exploratory components for an internal admin panel use case. Considered more experimental than the core primitives.

### Storybook utilities (`src/storybook/`)
Internal helpers not exported from the package. Currently: `PendingReview` — a standardized story block used to communicate open design questions.

## External Dependencies

| Dependency | Purpose |
|---|---|
| DS PUCPR Core Web (Figma) | Source of truth for all design tokens (grid, breakpoints, radius, shadow, color, typography) |
| Chromatic | Visual regression / review for Storybook |

## Known Constraints

- **Token values may be provisional.** Shadow CSS values and some color tokens are marked `⚠️` in code pending extraction from Figma effect panels.
- **Naming alignment is ongoing.** Design and development teams are actively resolving naming conflicts. Until a token or component name is confirmed with both teams, treat it as subject to change.
- **`destructive` button variant is non-DS.** Added for admin panel needs; requires explicit design team approval before being considered part of DS PUCPR.
- **React peer dependency is 18+.** The sandbox and storybook both run React 19 but the package supports ≥18.
