---
id: TASK-010
title: Create Foundation token stories in Storybook
status: done
model: medium
model-name: GPT-5.2
context:
  - docs/context/design-system-decisions.md
  - docs/context/storybook.md
  - docs/context/ui-kit-package.md
doc-impact:
  - docs/context/storybook.md
export-impact: []
---

## Description

Create the `Foundation/` section in Storybook — a visual catalog of every token category used in the design system. These are documentation-only stories: no interactive component, no props panel (`autodocs` tag must NOT be present).

**Depends on TASK-009** — `TokenUsage` must be built first.

Each Foundation story file catalogs one token category, using `TokenUsage` from `@cre/storybook-utils` (omit the `component` prop). Each entry must accurately reflect the current implementation state: tokens confirmed by the design team are `'confirmed'`; tokens added by the dev team without explicit design sign-off are `'pending-design'`.

## Acceptance Criteria

- [ ] New folder `apps/storybook/src/stories/foundation/` created
- [ ] Six story files created (see list below), each with `title: 'Foundation/<Name>'`
- [ ] No `tags: ['autodocs']` on any Foundation story meta — these are pure documentation
- [ ] All story files use `parameters: { layout: 'padded' }`
- [ ] `TokenUsage` is imported from `@cre/storybook-utils`
- [ ] Every token entry in every story accurately reflects its status (`confirmed` or `pending-design`) per the token status table below
- [ ] Story file structure updated in `docs/context/storybook.md` to include the `foundation/` folder

## Relevant Data

### Files to create

| File | Story title | Story export name |
|---|---|---|
| `foundation/Colors.stories.tsx` | `Foundation/Colors` | `AllColors` |
| `foundation/Typography.stories.tsx` | `Foundation/Typography` | `AllTypeStyles` |
| `foundation/Spacing.stories.tsx` | `Foundation/Spacing` | `AllSpacing` |
| `foundation/BorderRadius.stories.tsx` | `Foundation/Border Radius` | `AllRadii` |
| `foundation/Shadows.stories.tsx` | `Foundation/Shadows` | `AllShadows` |
| `foundation/Focus.stories.tsx` | `Foundation/Focus` | `AllFocusPatterns` |

### Token status by category

**Colors** (`category: 'color'`)
| name | value | role | status |
|---|---|---|---|
| `brand` | `#7B1234` | Primary brand color | `confirmed` |
| `neutral-400` | `#B5A8AD` | Neutral / muted | `confirmed` |
| `surface/background` | TBD | Page/canvas background | `pending-design` |
| `surface/element` | TBD | Card/panel background | `pending-design` |
| `text/main` | TBD | Primary body text | `pending-design` |
| `text/muted` | TBD | Secondary/muted text | `pending-design` |
| `action/primary/default` | TBD | Primary interactive | `pending-design` |
| `action/primary/hover` | TBD | Primary interactive hover | `pending-design` |
| `border/divider` | TBD | Separators and borders | `pending-design` |
| `feedback/success` | TBD | Success state | `pending-design` |
| `feedback/error` | TBD | Error state | `pending-design` |
| `feedback/warning` | TBD | Warning state | `pending-design` |
| `feedback/info` | TBD | Info state | `pending-design` |

Use `'#cccccc'` as the preview `value` for all `pending-design` color tokens (placeholder gray swatch).

**Border Radius** (`category: 'radius'`)
| name | value | status |
|---|---|---|
| `radius-0` | `0px` | `confirmed` |
| `radius-4` | `4px` | `confirmed` |
| `radius-8` | `8px` | `confirmed` |
| `radius-12` | `12px` | `pending-design` |
| `radius-16` | `16px` | `confirmed` |
| `radius-32` | `32px` | `confirmed` |
| `radius-full` | `9999px` | `confirmed` |

Set `role` to the Tailwind class: `rounded-radius-0`, `rounded-radius-4`, etc.

**Spacing** (`category: 'spacing'`)
All confirmed per DS decisions. Values: 4, 8, 16, 24, 32, 40, 48, 64 (all in px). Token names: `spacing-4` through `spacing-64`. Role: numeric pixel value.

**Shadows** (`category: 'shadow'`)
Use whatever `shadow-level-1/2/3` values exist in `tailwind.config.ts` — read the file to extract the actual `boxShadow` CSS values. Mark all three as `pending-design` since their design-team status is not recorded in the DS decisions doc.

**Typography** (`category: 'typography'`)
Mark all as `confirmed` per DS decisions. Named styles to include:
`Heading/H1`, `Heading/H2`, `Heading/H3`, `Heading/H4`, `Heading/H5`, `Heading/H6`, `Body/Main`, `Action/Button`, `Caption`

Set `value` to the font size (e.g. `32px` for H1) — read from `tailwind.config.ts` to get exact values.

**Focus** (`category: 'focus'`)
Three patterns defined in code, all `pending-design` (dev-defined, not yet in DS glossary):
| name | value | role |
|---|---|---|
| `focus-standard` | `ring` | Standard interactive elements |
| `focus-on-brand` | `ring white/60` | Elements on brand-colored backgrounds |
| `focus-compact` | `ring-2` | Compact elements |

### Meta shape to use (no autodocs)

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { TokenUsage } from '@cre/storybook-utils'

const meta: Meta = {
  title: 'Foundation/Colors',
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj

export const AllColors: Story = {
  name: 'All Colors',
  render: () => (
    <TokenUsage
      tokens={[ /* ... */ ]}
    />
  ),
}
```
