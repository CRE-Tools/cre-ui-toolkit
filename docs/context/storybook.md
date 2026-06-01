# Context: Storybook Conventions

This file captures the rules for how components are documented in this repo's Storybook so that all stories stay cohesive as the design system grows.

Storybook lives in `apps/storybook`. Story files live in `apps/storybook/src/stories/`, organized by DS category folder. Component source code lives in `packages/ui-kit/src/` — stories are **not** colocated with source.

---

## Story file location

Stories live in `apps/storybook/src/stories/<category>/`:

```
apps/storybook/src/stories/
├── layout/
│   ├── Box.stories.tsx
│   ├── Container.stories.tsx
│   ├── Grid.stories.tsx
│   ├── Stack.stories.tsx
│   └── Surface.stories.tsx
├── components/
│   ├── Button.stories.tsx
│   ├── ActionButton.stories.tsx
│   ├── Badge.stories.tsx
│   ├── Alert.stories.tsx
│   └── Input.stories.tsx
├── blocks/
│   ├── Modal.stories.tsx
│   ├── Sidebar.stories.tsx
│   ├── Table.stories.tsx
│   └── HierarchicalTable.stories.tsx
└── foundation/
    ├── Colors.stories.tsx
    ├── Typography.stories.tsx
    ├── Spacing.stories.tsx
    ├── BorderRadius.stories.tsx
    ├── Shadows.stories.tsx
    └── Focus.stories.tsx
```

The stories file is always named `<ComponentName>.stories.tsx`.

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

**`Forms/`, `Feedback/`, and `Surfaces/` are not valid categories.** Form inputs and feedback components are `Components`. Surface is `Layout`. Never group by use context.

---

## Foundation stories

Foundation stories live in `stories/foundation/` and document token categories (Colors, Typography, Spacing, etc.). They are different from component stories in two ways:

1. **No `tags: ['autodocs']`** — there is no component to generate a props table for.
2. **No `PendingReview` story** — token review state is tracked via the `status` field on each `TokenEntry` in `TokenUsage`.

Foundation meta shape:
```tsx
const meta: Meta = {
  title: 'Foundation/Colors',
  parameters: { layout: 'padded' },
}
export default meta
```

---

## Token Usage stories

Every component story file must include a `TokenUsageStory` export — placed second-to-last, immediately before `PendingReviewStory`. This gives the design team a token reference inside each component's Storybook documentation.

Use `TokenUsage` from `@cre/storybook-utils`. Pass `component` and the list of `TokenEntry` objects for every token that component consumes.

```tsx
import { TokenUsage } from '@cre/storybook-utils'

// ─── Token Usage ──────────────────────────────────────────────────────────────

export const TokenUsageStory: Story = {
  name: 'Token Usage',
  parameters: { layout: 'padded' },
  render: () => (
    <TokenUsage
      component="Button"
      tokens={[
        { name: 'brand', category: 'color', value: '#7B1234', role: 'fundo — variante primary', status: 'confirmed' },
        { name: 'rounded-radius-8', category: 'radius', value: '8px', role: 'raio de borda', status: 'confirmed' },
      ]}
    />
  ),
}
```

Token `status` values:
- `'confirmed'` — approved by the design team and documented in `docs/context/design-system-decisions.md`
- `'pending-design'` — added by the dev team, needs explicit design sign-off

Story ordering in component files:
1. Individual variant stories
2. Group/combination stories
3. **Token Usage** story
4. **Pending Review** story — always last

---

## Meta object

Every component story file exports a `meta` object as the default export. The minimum required shape:

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
3. **Token Usage** story (see Token Usage stories section above)
4. **Pending Review** story — always last

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
        'Pergunta aberta 1',
        'Pergunta aberta 2',
      ]}
      notes="Nota livre sobre uma decisão não óbvia."
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

**Code is always in English:** TypeScript identifiers, export names, component names, token names, Storybook `title` strings, and code comments.

**All Storybook documentation text must be in PT-BR (Brazilian Portuguese).** This is mandatory. It applies to:

- Story `name` fields — use PT-BR for any human-readable description
- `PendingReview` `items` and `notes`
- `TokenUsage` token `role` fields and `notes`
- `argTypes` `description` fields
- Any other user-visible text in the Storybook UI

Exception: variant story names that mirror the DS code name exactly (e.g., a story named `'Primary'` or `'Default'`) may stay in English, because they are the design system's canonical name, not a description. Any story name that is a description or section label must be PT-BR.
