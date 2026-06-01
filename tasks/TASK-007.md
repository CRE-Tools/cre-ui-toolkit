---
id: TASK-007
title: Standardize focus ring pattern across all components
status: pending
model: cheap
model-name: SWE-1.6
context:
  - docs/context/design-system-decisions.md
doc-impact: []
export-impact: []
---

## Description

Focus rings are inconsistent across the component library. There are currently three different patterns in use:

- `ring-[3px]` — arbitrary value, used by Button (all 7 variants), Input, Modal close button, Sidebar item, HierarchicalTable button
- `ring-[2px]` — arbitrary value, used by ActionButton
- `ring-large` — **invalid class** (bug fixed by TASK-005 for Surface, but the class name is wrong conceptually)

**Do this task after TASK-005**, which adds `ringWidth: { DEFAULT: '3px' }` to `tailwind.config.ts`. Once that config exists, `ring` (no suffix) produces a 3px ring — eliminating all arbitrary `ring-[3px]` values.

The correct pattern for all focusable interactive components is:
- Standard focus ring: `ring` (3px, via `ringWidth.DEFAULT`)
- Reduced focus ring (compact components): `ring-2` (Tailwind built-in 2px)

This makes it clear that 3px is the DS default for interactive focus and 2px is an intentional exception for compact components.

## Acceptance Criteria

- [ ] TASK-005 is done first (adds `ringWidth: { DEFAULT: '3px' }` to config)
- [ ] All `ring-[3px]` arbitrary values replaced with `ring` across all component files
- [ ] All `ring-[2px]` arbitrary values replaced with `ring-2` (Tailwind built-in) — ActionButton
- [ ] No `ring-large` or other invalid ring class names remain (Surface was fixed in TASK-005)
- [ ] `pnpm build` succeeds
- [ ] Storybook: tab through Button, Input, ActionButton, Modal, Sidebar item — verify visible focus rings on all

## Relevant Data

### Files and replacements

**`src/components/Button/Button.tsx`** — 7 variant classes, each has a `focus-visible:ring-[3px]`
- Replace all `focus-visible:ring-[3px]` → `focus-visible:ring`

**`src/components/Input/Input.tsx`**
- `focus:ring-[3px]` → `focus:ring`

**`src/components/ActionButton/ActionButton.tsx`**
- `focus-visible:ring-[2px]` → `focus-visible:ring-2`

**`src/blocks/Modal/Modal.tsx`** — close button
- `focus-visible:ring-[3px]` → `focus-visible:ring`

**`src/blocks/Sidebar/Sidebar.tsx`** — nav item
- `focus-visible:ring-[3px]` → `focus-visible:ring`

**`src/blocks/HierarchicalTable/HierarchicalTable.tsx`** — expand button
- `focus-visible:ring-[3px]` → `focus-visible:ring`

### Ring offset and color (do not change)
The ring color and offset classes paired with these rings are correct and should not change:
- `focus-visible:ring-brand/40 focus-visible:ring-offset-2` — standard on-light pattern
- `focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand` — on-brand (dark bg) pattern
- `focus-visible:ring-brand/30` — compact components (Modal close, Sidebar item)
- `focus:ring-brand/20` — Input (uses `focus:` not `focus-visible:` — preserve this)
