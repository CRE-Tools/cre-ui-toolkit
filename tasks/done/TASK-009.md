---
id: TASK-009
title: Build TokenUsage component in storybook-utils
status: done
model: medium
model-name: GPT-5.2
context:
  - docs/context/design-system-decisions.md
  - docs/context/storybook.md
doc-impact:
  - docs/context/storybook.md
export-impact: []
---

## Description

Add a `TokenUsage` component to `packages/storybook-utils/src/` alongside the existing `PendingReview` component.

`TokenUsage` is a reusable Storybook documentation block that lists the design tokens consumed by a component (or showcases a full token category). It mirrors the visual style of `PendingReview` (inline React styles, `system-ui` font, no external dependencies) and uses the same `confirmed` / `pending-design` status pattern.

It has two uses:
1. **Component stories** — pass a `component` name and list the tokens that component uses, with the role each token plays. Designer reads it and sees exactly which tokens a component consumes.
2. **Foundation stories** — omit `component`, pass all tokens of a category. Acts as a visual token catalog/palette.

## Acceptance Criteria

- [ ] File created at `packages/storybook-utils/src/TokenUsage.tsx`
- [ ] `TokenUsage` exported from `packages/storybook-utils/src/index.ts`
- [ ] Props match the interface below
- [ ] Each `TokenCategory` renders a meaningful visual preview inline (see Previews section)
- [ ] `pending-design` tokens are visually flagged with an orange `⚠ pending design` indicator (same orange/amber palette used in `PendingReview`)
- [ ] `confirmed` tokens show no extra indicator (default state)
- [ ] A `notes` prop renders a blue info box (same style as `PendingReview` notes)
- [ ] No external dependencies — inline React styles only, same as `PendingReview`
- [ ] Renders correctly when `component` is omitted (Foundation use case)

## Relevant Data

### Props interface

```typescript
type TokenStatus = 'confirmed' | 'pending-design'
type TokenCategory = 'color' | 'spacing' | 'radius' | 'shadow' | 'typography' | 'focus'

interface TokenEntry {
  name: string        // Tailwind token name shown to the designer, e.g. 'brand', 'rounded-radius-8'
  category: TokenCategory
  value: string       // Raw CSS value used for the visual preview, e.g. '#7B1234', '8px', '32px', 'ring'
  role: string        // How this component uses the token, e.g. 'background — primary variant'
  status: TokenStatus
}

interface TokenUsageProps {
  component?: string   // Component name shown in the header. Omit for Foundation showcase stories.
  tokens: TokenEntry[]
  notes?: string
}
```

### Visual preview per category

Render a small preview element inline, to the left of the token name:

| category | Preview element |
|---|---|
| `color` | 20×20px filled circle using the `value` as `backgroundColor` |
| `spacing` | Horizontal bar: height 8px, width equal to `value` (e.g. `16px`), filled with a muted blue |
| `radius` | 20×20px square using `value` as `borderRadius`, `border: 1px solid #D1D5DB`, `background: #F3F4F6` |
| `shadow` | 20×20px square using `value` as `boxShadow`, `background: white` |
| `typography` | "Aa" rendered with the value as the inline `fontFamily` or `fontSize` |
| `focus` | 20×20px square with a visible ring: `outline: 3px solid #7B1234`, `outlineOffset: 2px` |

### Header text (when `component` is provided)
```
Token Usage — <ComponentName>
These are the design tokens this component consumes.
```

### Header text (when `component` is omitted)
```
Token Reference
Design tokens in this category.
```

### Existing component to reference

`packages/storybook-utils/src/PendingReview.tsx` — use as the style and structure reference. The `TokenUsage` component should feel like it belongs to the same family.

### Color palette to reuse from PendingReview
- Warning/pending: `#FFF8E1` bg, `#F59E0B` border, `#92400E` text, `#B45309` subtext
- Info/notes: `#EFF6FF` bg, `#BFDBFE` border, `#1E40AF` text
- Card bg: `#F9FAFB`, card border: `#E5E7EB`
- Body text: `#374151`
