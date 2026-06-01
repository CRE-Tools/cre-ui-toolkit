---
id: TASK-019
title: Migrate Foundation stories to use token registry
status: pending
model: cheap
model-name: SWE-1.6
context:
  - docs/context/storybook.md
doc-impact: []
export-impact: []
---

## Description

**Depends on TASK-018 being merged first.**

After the token registry exists and `TokenUsage` can resolve entries from it, all Foundation stories must be migrated to the simplified `{ name, role }` entry format. Foundation stories currently duplicate `category`, `value`, and `status` inline — those fields now live in the registry.

This is a mechanical replacement: remove `category`, `value`, and `status` from every token entry in every Foundation story file. Keep `name` and `role` as-is.

## Acceptance Criteria

- [ ] All six Foundation story files pass only `{ name, role }` to `TokenUsage` — no `category`, `value`, or `status` inline:
  - `apps/storybook/src/stories/foundation/Colors.stories.tsx`
  - `apps/storybook/src/stories/foundation/Typography.stories.tsx`
  - `apps/storybook/src/stories/foundation/Spacing.stories.tsx`
  - `apps/storybook/src/stories/foundation/BorderRadius.stories.tsx`
  - `apps/storybook/src/stories/foundation/Shadows.stories.tsx`
  - `apps/storybook/src/stories/foundation/Focus.stories.tsx`
- [ ] Every `name` in the migrated entries exists as a key in `tokenRegistry` — no missing lookups
- [ ] Storybook builds without TypeScript errors and Foundation pages render the same visual output as before (preview, status badge, etc.)

## Relevant Data

### Example transformation

Before (current form):
```tsx
{ name: 'radius-8', category: 'radius', value: '8px', role: 'rounded-radius-8', status: 'confirmed' },
```

After (registry form):
```tsx
{ name: 'radius-8', role: 'rounded-radius-8' },
```

The `TokenUsage` component resolves `category`, `value`, and `status` from the registry. The visual output is identical.

### Full list of current Foundation story token names

Verify each name matches a key in `tokenRegistry` before submitting. If any name is missing from the registry, add it there first rather than leaving `value`/`category`/`status` inline.

**Colors:** `brand`, `neutral-400`, `surface/background`, `surface/element`, `text/main`, `text/muted`, `action/primary/default`, `action/primary/hover`, `border/divider`, `feedback/success`, `feedback/error`, `feedback/warning`, `feedback/info`

**Typography:** `Heading/H1`, `Heading/H2`, `Heading/H3`, `Heading/H4`, `Heading/H5`, `Heading/H6`, `Body/Main`, `Action/Button`, `Caption`

**Spacing:** `spacing-4`, `spacing-8`, `spacing-16`, `spacing-24`, `spacing-32`, `spacing-40`, `spacing-48`, `spacing-64`

**BorderRadius:** `radius-0`, `radius-4`, `radius-8`, `radius-12`, `radius-16`, `radius-32`, `radius-full`

**Shadows:** `shadow-level-1`, `shadow-level-2`, `shadow-level-3`

**Focus:** `focus-standard`, `focus-on-brand`, `focus-compact`

All of these are populated in the registry by TASK-018. No additions needed unless a name mismatch is found.
