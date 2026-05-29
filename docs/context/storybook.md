# Context: Storybook Conventions

This file captures the rules for how components are documented in this repo's Storybook so that all stories stay cohesive as the design system grows.

Storybook lives in `apps/storybook` but all story files live colocated with their components in `packages/ui-kit/src/`. The storybook app just points at them.

---

## Story file location

Each component lives in its own folder under `src/primitives/<ComponentName>/`:

```
src/primitives/Button/
├── Button.tsx
├── Button.stories.tsx
└── index.ts
```

The stories file is always named `<ComponentName>.stories.tsx` and lives in the same folder as the component.

---

## Category (title) conventions

The `title` in the meta object determines the sidebar category in Storybook. Use exactly these categories, which map 1:1 to the design system glossary (see `docs/context/design-system-decisions.md`):

| Category | What goes here |
|---|---|
| `Layout/<Name>` | Spatial/structural primitives: Grid, Container, Box, Stack, Surface |
| `Components/<Name>` | Interactive and display components: Button, Badge, Alert, Input, ActionButton |
| `Blocks/<Name>` | Complex multi-component blocks: Modal, Sidebar, Table, HierarchicalTable |
| `Foundation/<Name>` | Token demonstrations only — no interactive component |

**`Admin/` is not a valid category.** It names things by use context (admin panel) rather than by structural role, which conflicts with the design team's semantic naming decision. Modal, Sidebar, and Table are `Blocks` regardless of which app they appear in.

When in doubt between `Components` and `Blocks`: if the thing is made of multiple sub-components and wraps a complete interaction, it's a `Block`. If it's a single interactive or display unit, it's a `Component`.

Never nest deeper than one level (`Components/Button`, not `Components/Forms/Button`).

---

## Meta object

Every story file exports a `meta` object as the default export. The minimum required shape:

```tsx
const meta: Meta<typeof MyComponent> = {
  title: 'Category/ComponentName',
  component: MyComponent,
  tags: ['autodocs'],
}
export default meta
```

- `tags: ['autodocs']` is required on all components — it generates the Props table automatically.
- Add `parameters: { layout: 'fullscreen' }` only for layout primitives that need to demonstrate full-width behavior.
- Add `parameters: { layout: 'padded' }` for stories that need some breathing room without being fullscreen.
- Default layout (centered) is fine for most component stories.

---

## argTypes

Use `argTypes` to control how props appear in the Controls panel:

- Props with a fixed set of values → `control: 'select'` or `control: 'radio'`
- Boolean props → `control: 'boolean'`
- Props that accept ReactNode (icons, children) → `control: false` (hide them from controls)
- Props that should be excluded from docs entirely → `table: { disable: true }`

Define default `args` in meta when the component has required props or when a sensible default makes the story more useful from the start.

---

## Story naming

Exported story names should be PascalCase identifiers that match the `name` field when overriding. Use the `name` field to write a human-friendly display name with special characters or Portuguese text:

```tsx
export const GridPUCPR: Story = {
  name: 'Grid PUCPR — 4 / 8 / 12 colunas',
  render: () => (...)
}
```

Stories should be ordered in the file from simple → complex:
1. Individual variant stories (Primary, Secondary, etc.)
2. Group/combination stories (AllVariants, Sizes, WithIcons)
3. **Pending Review** story — always last

---

## The Pending Review story

Every component in active development must include a **Pending Review** story as the final export. This is the communication surface between dev and design — it lists open questions that need design approval before the component is considered stable.

```tsx
import { PendingReview } from '../../storybook/PendingReview'

export const PendingReviewStory: Story = {
  name: 'Pending Review',
  tags: ['pending-review'],
  parameters: { layout: 'padded' },
  render: () => (
    <PendingReview
      component="ComponentName"
      items={[
        'Open question 1',
        'Open question 2',
      ]}
      notes="Optional free-form note about a non-obvious decision."
    />
  ),
}
```

Rules:
- The export name must always be `PendingReviewStory`, display name always `'Pending Review'`.
- Tags must include `'pending-review'` (used for filtering).
- `items` should list concrete, actionable questions — not vague ones. Each item is something the design team can check against Figma and mark as resolved.
- Use `notes` for decisions the dev team made unilaterally that need explicit sign-off (e.g., the `destructive` variant).
- Remove the Pending Review story only when the design team has reviewed all items and the component is considered stable.

---

## Section dividers in story files

Use ASCII section comments to visually separate groups of stories within a file. This matches the existing code style:

```tsx
// ─── Variantes ──────────────────────────────────────────────────────────────

export const Primary: Story = { ... }

// ─── Tamanhos ───────────────────────────────────────────────────────────────

export const Sizes: Story = { ... }

// ─── Pending Review ──────────────────────────────────────────────────────────

export const PendingReviewStory: Story = { ... }
```

---

## Language

Story display names and `PendingReview` items may be in Portuguese or English. Dev code (variable names, TypeScript, comments) is in English. Story-facing text (labels, descriptions that appear in the UI) may be in Portuguese when targeting Portuguese-speaking users.
