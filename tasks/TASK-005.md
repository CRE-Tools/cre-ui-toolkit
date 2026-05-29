---
id: TASK-005
title: Rename border-radius tokens to numeric system (design glossary alignment)
status: pending
model: medium
model-name: GPT-5.2
context:
  - docs/context/design-system-decisions.md
  - docs/context/ui-kit-package.md
doc-impact:
  - docs/context/ui-kit-package.md
  - docs/architecture.md
export-impact: []
---

## Description

The design team V1 glossary defines a numeric naming system for border-radius tokens (see `docs/context/design-system-decisions.md`). The current Tailwind config uses semantic names (`null`, `xxsmall`, `xsmall`, `small`, `medium`, `large`, `xlarge`, `full`, `pill`) which do not match.

This task renames the tokens in `packages/ui-kit/tailwind.config.ts` and updates every component file that uses the old Tailwind class names.

**Before starting:** The current token set has values that do not exist in the design team's list (12px, 20px, 24px, 50%). These must be resolved — see the blocker section below.

## Blockers — resolve before implementing

The mapping is not 1:1. The following current values have no equivalent in the design glossary:

| Current name | px value | Design system equivalent |
|---|---|---|
| `small` | 12px | **None defined** |
| `large` | 20px | **None defined** |
| `xlarge` | 24px | **None defined** |
| `full` | 50% | Different from `radius-full` (9999px) |

Raise these with the architect/design team and get one of:
- A confirmed mapping (e.g., `small = 8px` and 12px is dropped)
- New tokens added to the glossary for the missing values
- Confirmation that affected components should switch to the nearest existing token

**Do not guess.** Do not implement until the architect provides the resolution.

## Acceptance Criteria

- [ ] Architect has resolved the gap in the token mapping (see Blockers) — resolution is documented inline or in `docs/context/design-system-decisions.md`
- [ ] `packages/ui-kit/tailwind.config.ts` `borderRadius` section is updated to:
  ```ts
  borderRadius: {
    'radius-0':    '0px',
    'radius-4':    '4px',
    'radius-8':    '8px',
    'radius-16':   '16px',
    'radius-32':   '32px',
    'radius-full': '9999px',
    // any additional values confirmed by design team
  }
  ```
- [ ] All component source files updated — old Tailwind radius classes replaced with new names:

  | Old class | New class |
  |---|---|
  | `rounded-null` | `rounded-radius-0` |
  | `rounded-xxsmall` | `rounded-radius-4` |
  | `rounded-xsmall` | `rounded-radius-8` |
  | `rounded-small` | TBD (see Blockers) |
  | `rounded-medium` | `rounded-radius-16` |
  | `rounded-large` | TBD (see Blockers) |
  | `rounded-xlarge` | TBD (see Blockers) |
  | `rounded-full` | TBD (50% vs 9999px, see Blockers) |
  | `rounded-pill` | `rounded-radius-full` |

- [ ] `pnpm build` succeeds
- [ ] Storybook builds and components render correctly (spot-check Border Radius story if it exists, otherwise spot-check Button and Surface which use radius tokens heavily)
- [ ] TypeScript compiles without errors

## Relevant Data

### Files that use radius tokens (grep: `rounded-` with a named token)

`packages/ui-kit/src/primitives/Button/Button.tsx`:
- `rounded-xsmall` (all sizes)

`packages/ui-kit/src/primitives/Surface/Surface.tsx`:
- `rounded-small` (default, raised, sunken, interactive)
- `rounded-medium` (overlay)

`packages/ui-kit/src/primitives/Modal/Modal.tsx`:
- `rounded-medium` (panel)
- `rounded-xsmall` (close button, focus ring)

`packages/ui-kit/src/primitives/ActionButton/ActionButton.tsx`:
- `rounded-xxsmall`

`packages/ui-kit/src/primitives/Input/Input.tsx`:
- `rounded-xsmall` (input field)

`packages/ui-kit/src/primitives/Badge/Badge.tsx`:
- `rounded-pill`

`packages/ui-kit/src/primitives/Alert/Alert.tsx`:
- `rounded-xsmall`

### Current tailwind.config.ts borderRadius section
```ts
borderRadius: {
  'null':    '0px',
  'xxsmall': '4px',
  'xsmall':  '8px',
  'small':   '12px',
  'medium':  '16px',
  'large':   '20px',
  'xlarge':  '24px',
  'full':    '50%',
  'pill':    '9999px',
},
```

**Note:** If completing TASK-003 before this task, the file paths above will have changed. Grep for `rounded-` in `src/` to find all usages.
