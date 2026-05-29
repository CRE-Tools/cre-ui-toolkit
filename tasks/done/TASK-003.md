---
id: TASK-003
title: Rename src/primitives/ — restructure into layout/, components/, blocks/
status: done
model: medium
model-name: GPT-5.2
context:
  - docs/context/design-system-decisions.md
  - docs/context/ui-kit-package.md
doc-impact:
  - docs/context/ui-kit-package.md
export-impact: []
---

## Description

The `packages/ui-kit/src/primitives/` folder name is wrong. The design team replaced the old "Atomic Design" naming (atoms/molecules/primitives) with a direct hierarchy: **Tokens → Elements → Components → Blocks** (see `docs/context/design-system-decisions.md`).

The current folder mixes three different levels of the hierarchy. It needs to be split into three folders matching the DS glossary:

| New folder | Components | DS role |
|---|---|---|
| `src/layout/` | Box, Container, Grid, GridItem, Stack, Surface | Spatial/structural primitives (sit outside the Tokens→Elements→Components→Blocks hierarchy) |
| `src/components/` | Button, ActionButton, ActionGroup, Badge, Alert, Input, Textarea | Level 3 — interactive/display units |
| `src/blocks/` | Modal, ConfirmModal, Sidebar, Table, HierarchicalTable | Level 4 — complex multi-component blocks |

This is a pure rename/move — no component logic, props, or behavior should change. Only file locations and imports change.

**Important:** Complete TASK-001 before this task (story titles must already say `Blocks/` not `Admin/`). This task does not change story titles.

## Acceptance Criteria

- [ ] `src/primitives/` folder is deleted
- [ ] `src/layout/` exists and contains: Box, Container, Grid, GridItem, Stack, Surface (each in their own subfolder matching the previous structure)
- [ ] `src/components/` exists and contains: Button, ActionButton, Badge, Alert, Input (each in their own subfolder)
- [ ] `src/blocks/` exists and contains: Modal, Sidebar, Table, HierarchicalTable (each in their own subfolder)
- [ ] `src/primitives/index.ts` is replaced by `src/layout/index.ts`, `src/components/index.ts`, `src/blocks/index.ts` — each re-exporting everything from that layer
- [ ] `src/index.ts` (package entry point) is updated to import from the three new barrel files instead of `./primitives`
- [ ] All cross-component imports are updated (e.g., `Modal` imports `Button` from `../Button/Button` — this relative path changes)
- [ ] All story files import from correct relative paths matching the new folder locations
- [ ] `@cre/ui-kit` public API is unchanged — same exports, same names, same types
- [ ] `pnpm build` in `packages/ui-kit/` succeeds
- [ ] TypeScript compiles without errors
- [ ] Storybook builds without errors

## Relevant Data

### Current structure
```
src/primitives/
├── index.ts
├── ActionButton/
├── Alert/
├── Badge/
├── Box/
├── Button/
├── Container/
├── Grid/           (contains Grid.tsx, GridItem.tsx, index.ts)
├── HierarchicalTable/
├── Input/          (exports Input and Textarea)
├── Modal/          (exports Modal and ConfirmModal)
├── Sidebar/
├── Stack/
├── Surface/
└── Table/
```

### Target structure
```
src/
├── layout/
│   ├── index.ts
│   ├── Box/
│   ├── Container/
│   ├── Grid/
│   ├── Stack/
│   └── Surface/
├── components/
│   ├── index.ts
│   ├── ActionButton/
│   ├── Alert/
│   ├── Badge/
│   ├── Button/
│   └── Input/
└── blocks/
    ├── index.ts
    ├── HierarchicalTable/
    ├── Modal/
    ├── Sidebar/
    └── Table/
```

### Current src/index.ts
```ts
export * from './primitives'
export * from './utils/cn'
```

### Target src/index.ts
```ts
export * from './layout'
export * from './components'
export * from './blocks'
export * from './utils/cn'
```

### Known cross-component imports that will need updating
- `Modal.tsx` imports `Button` from `../Button/Button` — after move, will be `../../components/Button/Button`
- `Grid.stories.tsx` imports `Container` from `../Container` — after move, will be `../../layout/Container`

Grep for `from '../` in all files under `src/primitives/` to find all cross-imports before starting.

### Current src/primitives/index.ts
```ts
export * from './ActionButton'
export * from './Alert'
export * from './Badge'
export * from './Box'
export * from './Button'
export * from './Container'
export * from './Grid'
export * from './HierarchicalTable'
export * from './Input'
export * from './Modal'
export * from './Sidebar'
export * from './Stack'
export * from './Surface'
export * from './Table'
```
