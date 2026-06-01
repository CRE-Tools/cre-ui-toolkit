---
id: TASK-011
title: Add TokenUsage stories to all existing component stories
status: pending
model: medium
model-name: GPT-5.2
context:
  - docs/context/design-system-decisions.md
  - docs/context/storybook.md
  - docs/context/ui-kit-package.md
doc-impact: []
export-impact: []
---

## Description

Add a `TokenUsage` story to every existing component story file. This gives the design team a token reference directly inside each component's Storybook documentation — they can see at a glance which tokens that component consumes, and whether any of them are pending design sign-off.

**Depends on TASK-009** — `TokenUsage` must be built first.

For each component, read the source file in `packages/ui-kit/src/` and identify the actual Tailwind token classes used. Map each to a `TokenEntry`. The story should be the **second-to-last** export in each file (before `PendingReviewStory`).

## Acceptance Criteria

- [ ] A `TokenUsageStory` export added to every story file listed below
- [ ] `TokenUsage` imported from `@cre/storybook-utils`
- [ ] Each story placed immediately before `PendingReviewStory` (second-to-last in the file)
- [ ] `TokenUsage` `component` prop matches the component name (e.g. `component="Button"`)
- [ ] Token list accurately reflects tokens found in the component source — do not invent or guess tokens
- [ ] Status for each token: use `'confirmed'` only for tokens confirmed in `docs/context/design-system-decisions.md`; mark everything else `'pending-design'`
- [ ] Section divider comment added above the story (same ASCII style as the rest of the file)

## Relevant Data

### Story export to add

```tsx
// ─── Token Usage ──────────────────────────────────────────────────────────────

export const TokenUsageStory: Story = {
  name: 'Token Usage',
  parameters: { layout: 'padded' },
  render: () => (
    <TokenUsage
      component="ComponentName"
      tokens={[
        { name: 'brand', category: 'color', value: '#7B1234', role: 'background — primary variant', status: 'confirmed' },
        // ...
      ]}
    />
  ),
}
```

### Component source locations

| Story file | Source file to read |
|---|---|
| `stories/layout/Box.stories.tsx` | `packages/ui-kit/src/layout/Box.tsx` |
| `stories/layout/Container.stories.tsx` | `packages/ui-kit/src/layout/Container.tsx` |
| `stories/layout/Grid.stories.tsx` | `packages/ui-kit/src/layout/Grid.tsx` |
| `stories/layout/Stack.stories.tsx` | `packages/ui-kit/src/layout/Stack.tsx` |
| `stories/layout/Surface.stories.tsx` | `packages/ui-kit/src/layout/Surface.tsx` |
| `stories/components/Button.stories.tsx` | `packages/ui-kit/src/components/Button.tsx` |
| `stories/components/ActionButton.stories.tsx` | `packages/ui-kit/src/components/ActionButton.tsx` |
| `stories/components/Badge.stories.tsx` | `packages/ui-kit/src/components/Badge.tsx` |
| `stories/components/Alert.stories.tsx` | `packages/ui-kit/src/components/Alert.tsx` |
| `stories/components/Input.stories.tsx` | `packages/ui-kit/src/components/Input.tsx` |
| `stories/blocks/Modal.stories.tsx` | `packages/ui-kit/src/blocks/Modal.tsx` |
| `stories/blocks/Sidebar.stories.tsx` | `packages/ui-kit/src/blocks/Sidebar.tsx` |
| `stories/blocks/Table.stories.tsx` | `packages/ui-kit/src/blocks/Table.tsx` |
| `stories/blocks/HierarchicalTable.stories.tsx` | `packages/ui-kit/src/blocks/HierarchicalTable.tsx` |

### Confirmed tokens (status: 'confirmed')
Only these are `confirmed` — everything else is `pending-design`:
- Colors: `brand` (#7B1234), `neutral-400` (#B5A8AD)
- Border radius: `radius-0`, `radius-4`, `radius-8`, `radius-16`, `radius-32`, `radius-full` (via `rounded-radius-*` classes)
- Spacing: `spacing-4` through `spacing-64`
- Focus rings: always `pending-design` (dev-defined pattern, not yet in DS glossary)
- Shadows: always `pending-design` (design-team status not recorded)
- Typography: `font-heading`, `font-body` are `confirmed`

`radius-12` / `rounded-radius-12` is `pending-design` — dev addition, design sign-off pending.

### Layout primitives note
`Box`, `Container`, `Grid`, `Stack` are structural utilities — they may use very few or no visual tokens (no color, no shadow). If a component truly has no visual tokens, still add the story but render a note:

```tsx
<TokenUsage
  component="Box"
  tokens={[]}
  notes="Box is a structural utility — it applies no visual tokens. Token usage is determined entirely by the consumer."
/>
```
