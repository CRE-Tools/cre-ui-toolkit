# Architecture

## Overview

`cre-ui-toolkit` is a centralized UI toolkit monorepo for the CRE design system, based on **DS PUCPR Core Web**. The design and development teams collaborate here to define, document, and ship a shared React component library published as `@cre/cre-web-ui`.

Current phase: foundational. Teams are actively locking design tokens, grid rules, and the first set of components. Storybook is the main review surface where design and dev meet to align before anything ships.

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
│   ├── storybook/              # @cre/storybook — Storybook host app
│   │   └── src/
│   │       └── stories/        # all story files, organized by DS category
│   │           ├── layout/
│   │           ├── components/
│   │           └── blocks/
│   └── sandbox/                # @cre/sandbox — Next.js consumer simulation app
├── packages/
│   ├── cre-web-ui/             # @cre/cre-web-ui — the published library
│   │   └── src/
│   │       ├── layout/         # Box, Container, Grid+GridItem, Stack, Surface
│   │       ├── components/     # Button, ActionButton+ActionGroup, Badge, Alert, Input+Textarea
│   │       ├── blocks/         # Modal+ConfirmModal, Sidebar, Table, HierarchicalTable
│   │       ├── styles/         # globals.css (fonts + Tailwind base)
│   │       └── utils/          # cn.ts (clsx + tailwind-merge)
│   └── storybook-utils/        # @cre/storybook-utils — private, dev-only storybook helpers
│       └── src/
│           └── PendingReview.tsx
├── docs/
│   ├── architecture.md         # this file
│   ├── context/                # topic-scoped context files
│   ├── migrations/             # changes propagating to consumer repos
│   └── sync-queue.md
├── pipeline/skills/            # AI pipeline protocol files
└── tasks/                      # pending tasks (done/ for completed)
```

## Key Architectural Decisions

**Stories live in the storybook app, not in the package.**
`apps/storybook/src/stories/` owns all story files, organized by DS category (`layout/`, `components/`, `blocks/`). The storybook `main.ts` points at `src/stories/**/*.stories.*`. This keeps the library package free of storybook types and eliminates editor lint errors from missing `@storybook/react-vite` types in the package's TypeScript context.

**Package source is pure library code.**
`packages/cre-web-ui/src/` contains only component implementations, styles, and utilities. No storybook-specific code, no test utilities. Storybook helpers (`PendingReview`) live in `packages/storybook-utils/`.

**Source organized by DS hierarchy.**
`src/layout/`, `src/components/`, `src/blocks/` match the design system glossary: Layout → structural primitives, Components → interactive units, Blocks → complex multi-component assemblies. See `docs/context/design-system-decisions.md` for the full glossary.

**Sandbox simulates a real consumer.**
`apps/sandbox` (Next.js 15) imports `@cre/ui-kit` via workspace symlink with the same constraints a real consumer app has. Use it to validate integration before publishing.

**Dual CJS/ESM output.**
`tsup` produces `dist/index.js` (ESM) and `dist/index.cjs` (CJS). The `files: ["dist"]` field in `package.json` ensures only the build output ships to npm.

**Tailwind tokens are scoped to the package.**
`packages/cre-web-ui/tailwind.config.ts` is the single source of truth for all design tokens. Consumer apps must either adopt the same config or import the resulting CSS.

## Modules & Domains

### Layout (`src/layout/`)
Spatial and structural primitives — they establish how content is positioned, not how it looks.

- **Grid + GridItem** — DS PUCPR column grid: 4 cols (xs ≥320px) → 8 cols (sm ≥600px) → 12 cols (md ≥840px). Gutters: 8px / 16px / 24px.
- **Container** — responsive horizontal margins (24/32/40px). `fluid` and `fixed` variants.
- **Box** — generic structural wrapper. Polymorphic (`as` prop). No visual appearance.
- **Stack** — flexbox layout (direction, gap, align, justify). No visual appearance.
- **Surface** — visual background layer. Variants: `default`, `raised`, `overlay`, `sunken`, `interactive`. ⚠️ variant names are appearance-based and may need renaming to semantic names per DS decisions.

### Components (`src/components/`)
Interactive and display units — smallest pieces that have an isolated function.

- **Button** — 7 variants (primary/secondary/tertiary/on-brand×3/destructive), 3 sizes. `destructive` is a dev addition pending design approval.
- **ActionButton + ActionGroup** — compact button for table cells and action bars.
- **Badge** — status/category pill label. 7 variants, 2 sizes.
- **Alert** — feedback banner with built-in icons. 4 variants.
- **Input + Textarea** — text input with label, helper text, validation states, icon slots.

### Blocks (`src/blocks/`)
Complex multi-component assemblies that contain one or more complete interactions.

- **Modal + ConfirmModal** — dialog overlay. Portal-rendered, manages focus and scroll lock.
- **Sidebar** — navigation panel with sections, items, badges, and footer slot.
- **Table** — flat data table with sortable columns, pagination, and empty state.
- **HierarchicalTable** — tree-structured table with expandable rows. Admin panel use case.

## Design Token System

All tokens are defined in `packages/cre-web-ui/tailwind.config.ts`. See `docs/context/design-system-decisions.md` for naming conventions.

| Category | Current state |
|---|---|
| Breakpoints | Confirmed — xs/sm/md/lg/xl/wide override Tailwind defaults |
| Border radius | Numeric system `radius-*` — see TASK-005 |
| Shadows | Names confirmed (`level-1/2/3`), CSS values provisional |
| Border width | `small/medium/large/xlarge` — naming not yet in DS glossary |
| Colors | `brand.DEFAULT` and `neutral.400` confirmed; full color token migration pending design+dev session |
| Typography | `font-heading` (Poppins) and `font-body` (Source Sans 3) confirmed |
| Ring width | `DEFAULT: 3px` for focus rings — see TASK-005 |

## External Dependencies

| Dependency | Purpose |
|---|---|
| DS PUCPR Core Web (Figma) | Source of truth for all design tokens |
| Chromatic | Visual regression / review for Storybook |

## Known Constraints

- **Shadow CSS values are provisional.** Values in `tailwind.config.ts` are approximate — replace with exact X/Y/Blur/Spread/Color values from Figma's effect panels.
- **`destructive` Button variant is non-DS.** Needs explicit design team approval.
- **Surface variant names are appearance-based.** `raised`, `sunken`, `overlay` etc. conflict with the DS semantic naming rule. Flagged for renaming in a future task after design alignment.
- **Color token migration is deferred.** `brand` and `neutral-400` are confirmed. Full migration to the `surface/text/action/border/feedback` tier system needs a design+dev alignment session.
- **React peer dependency is ≥18.** Sandbox and Storybook both run React 19.
