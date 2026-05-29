---
id: TASK-001
title: Fix Storybook story categories — replace Admin/ with Blocks/
status: pending
model: cheap
model-name: SWE-1.6
context:
  - docs/context/storybook.md
  - docs/context/design-system-decisions.md
doc-impact: []
export-impact: []
---

## Description

Four story files currently use `title: 'Admin/...'` in their meta object. `Admin/` is not a valid Storybook category — it names components by use context (admin panel) rather than by structural role, which conflicts with the design team's semantic naming decision (see `docs/context/design-system-decisions.md`).

Modal, Sidebar, Table, and HierarchicalTable are `Blocks` in the design glossary — complex multi-component blocks. Rename their story category to `Blocks/`.

## Acceptance Criteria

- [ ] `Modal.stories.tsx` — `title` changed from `'Admin/Modal'` to `'Blocks/Modal'`
- [ ] `Sidebar.stories.tsx` — `title` changed from `'Admin/Sidebar'` to `'Blocks/Sidebar'`
- [ ] `Table.stories.tsx` — `title` changed from `'Admin/Table'` to `'Blocks/Table'`
- [ ] `HierarchicalTable.stories.tsx` — `title` changed from `'Admin/HierarchicalTable'` to `'Blocks/HierarchicalTable'`
- [ ] Storybook builds without errors
- [ ] No other files changed

## Relevant Data

Files to edit (all in `packages/ui-kit/src/primitives/`):

```
Modal/Modal.stories.tsx
Sidebar/Sidebar.stories.tsx
Table/Table.stories.tsx
HierarchicalTable/HierarchicalTable.stories.tsx
```

Change in each file — the `title` field in the `meta` object:
```ts
// Before
title: 'Admin/Modal'

// After
title: 'Blocks/Modal'
```

Valid categories per `docs/context/storybook.md`:
- `Layout/<Name>` — spatial primitives
- `Components/<Name>` — interactive/display components
- `Blocks/<Name>` — complex multi-component blocks
- `Foundation/<Name>` — token demos only
