---
id: TASK-005
title: Rename border-radius tokens to numeric system + fix broken Surface focus ring
status: completed
model: medium
model-name: GPT-5.2
context:
  - docs/context/design-system-decisions.md
  - docs/context/ui-kit-package.md
doc-impact:
  - docs/context/design-system-decisions.md
export-impact: []
---

## Description

Two changes in one task — both touch `tailwind.config.ts` and the same component files, so combining avoids double-touching them.

### 1. Rename border-radius tokens to numeric system

The design team V1 glossary defines a numeric naming system for border-radius tokens (see `docs/context/design-system-decisions.md`). The current Tailwind config uses semantic names (`null`, `xxsmall`, `xsmall`, `small`, `medium`, `large`, `xlarge`, `full`, `pill`).

**Resolved mapping** (blocker from previous version of this task is now resolved):

| Old token | Old value | New token | Action |
|---|---|---|---|
| `null` | 0px | `radius-0` | rename |
| `xxsmall` | 4px | `radius-4` | rename |
| `xsmall` | 8px | `radius-8` | rename |
| `small` | 12px | `radius-12` | rename — dev addition, flag for design sign-off |
| `medium` | 16px | `radius-16` | rename |
| `large` | 20px | — | **drop** — nothing uses it |
| `xlarge` | 24px | — | **drop** — nothing uses it |
| `full` | 50% | — | **drop** — nothing uses it (semantically different from radius-full) |
| `pill` | 9999px | `radius-full` | rename |

`radius-12` is proposed as a dev addition because Surface uses 12px for all card-like variants. It is a multiple of 4 and fits the numeric naming convention. The design team needs to confirm it in the glossary, but the rename can proceed — if design rejects 12px later, Surface switches to `radius-8` or `radius-16`.

### 2. Fix broken focus ring on Surface `interactive` variant

`Surface.tsx` line 75 uses `focus-visible:ring-large`. This is invalid — `borderWidth` extensions generate `border-*` classes, not `ring-*` classes. The `interactive` variant of Surface currently has NO focus ring, which is an accessibility bug.

Fix: also add a `ringWidth` extension to `tailwind.config.ts` with a `DEFAULT` of `3px` (matches the design intent of `border-large = 3px` for focus). This gives components a clean `ring` token for 3px rings instead of relying on `ring-[3px]` arbitrary values. The Surface fix uses `ring` (defaults to 3px via the new token).

**Note:** Do NOT update other components' `ring-[3px]` usages in this task — that is TASK-007. Just fix the Surface bug and add the `ringWidth` config.

## Acceptance Criteria

- [x] `tailwind.config.ts` `borderRadius` section updated to the new token names (see Relevant Data)
- [x] `tailwind.config.ts` `ringWidth` section added with `DEFAULT: '3px'`
- [x] All 5 component files updated — old radius class names replaced with new ones (see per-file table below)
- [x] `Surface.tsx` `interactive` variant: `ring-large` replaced with `ring` (uses new 3px default)
- [x] `Surface.tsx` comment updated to remove reference to `border-radius-small/medium/xlarge` old names
- [x] `docs/context/design-system-decisions.md` radius table updated to include `radius-12`
- [x] `pnpm build` in `packages/ui-kit/` succeeds
- [x] Storybook builds — visually spot-check Button, Surface, Badge, and Modal to confirm border-radius renders correctly
- [x] Interactive Surface has a visible focus ring (accessibility fix)

## Relevant Data

### New tailwind.config.ts borderRadius section
```ts
borderRadius: {
  'radius-0':    '0px',
  'radius-4':    '4px',
  'radius-8':    '8px',
  'radius-12':   '12px',  // dev addition — pending design sign-off
  'radius-16':   '16px',
  'radius-full': '9999px',
},
```

### New tailwind.config.ts ringWidth section (add to extend)
```ts
ringWidth: {
  DEFAULT: '3px',
},
```

### Per-file class replacements

**`src/components/Button/Button.tsx`**
- `rounded-xsmall` → `rounded-radius-8` (3 occurrences — sm, md, lg sizes)

**`src/components/ActionButton/ActionButton.tsx`**
- `rounded-xxsmall` → `rounded-radius-4`

**`src/components/Badge/Badge.tsx`**
- `rounded-pill` → `rounded-radius-full`

**`src/components/Alert/Alert.tsx`**
- `rounded-xsmall` → `rounded-radius-8`

**`src/components/Input/Input.tsx`**
- `rounded-xsmall` → `rounded-radius-8`

**`src/blocks/Modal/Modal.tsx`**
- `rounded-medium` → `rounded-radius-16` (panel container)
- `rounded-xsmall` → `rounded-radius-8` (close button)

**`src/blocks/Table/Table.tsx`**
- `rounded-xsmall` → `rounded-radius-8`

**`src/blocks/HierarchicalTable/HierarchicalTable.tsx`**
- `rounded-xsmall` → `rounded-radius-8` (2 occurrences)

**`src/blocks/Sidebar/Sidebar.tsx`**
- `rounded-xsmall` → `rounded-radius-8` (nav item)
- `rounded-pill` → `rounded-radius-full` (badge counter)

**`src/layout/Surface/Surface.tsx`**
- `rounded-small` → `rounded-radius-12` (5 occurrences — default, raised, sunken, interactive variants)
- `rounded-medium` → `rounded-radius-16` (overlay variant)
- `ring-large` → `ring` (interactive variant focus — BUG FIX)
