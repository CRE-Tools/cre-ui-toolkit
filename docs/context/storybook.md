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

## Token Registry

All design tokens — DS-confirmed, pending-design, and Tailwind primitives actively used in components — live in a single registry file:

```
packages/storybook-utils/src/token-registry.ts
```

This is the **single source of truth for token status**. When design approves a token, update `status` from `'pending-design'` to `'confirmed'` in this one file. Every story that references the token automatically reflects the new status.

```ts
// packages/storybook-utils/src/token-registry.ts
export const tokenRegistry = {
  'brand':       { category: 'color',      value: '#7B1234',       status: 'confirmed'     },
  'green-50':    { category: 'color',      value: '#F0FDF4',       status: 'pending-design' },
  'radius-8':    { category: 'radius',     value: '8px',           status: 'confirmed'     },
  'font-body':   { category: 'typography', value: 'Source Sans 3', status: 'confirmed'     },
  // ...
} satisfies Record<string, RegistryToken>
```

**When using a new design value in a component:** add it to the registry first (as `pending-design`), then reference it in the story. Never put `value`, `category`, or `status` directly in a story entry.

---

## Token Usage stories

Every component story file must include a `TokenUsageStory` export — placed second-to-last, immediately before `PendingReviewStory`. This gives the design team a token reference inside each component's Storybook documentation.

Use `TokenUsage` from `@cre/storybook-utils`. Pass `component` and `tokens` as `{ name, role }` pairs — nothing more. The `TokenUsage` component resolves `value`, `category`, and `status` from the registry automatically.

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
        { name: 'brand',    role: 'fundo — variante primary' },
        { name: 'radius-8', role: 'raio de borda' },
        { name: 'red-600',  role: 'fundo — variante destructive' },
      ]}
    />
  ),
}
```

- `name` must be a key in `tokenRegistry`. If it isn't there yet, add it.
- `role` is the PT-BR label that explains how this component uses the token.
- Do not include `value`, `category`, or `status` — those come from the registry.

### How to document multi-variant color tokens

When a component has multiple variants that each use different colors, **list each variant as its own entry** — never group them into a single vague entry.

Use the background color's registry name. The `role` field can note associated border and text colors:

```tsx
// WRONG — can't render a preview, gives the designer nothing actionable
{ name: 'semantic colors', role: 'fundos de variante' },

// CORRECT — one entry per variant, preview renders, role is specific
{ name: 'green-50',  role: 'fundo — variante success (borda: green-200, texto: green-800)' },
{ name: 'yellow-50', role: 'fundo — variante warning (borda: yellow-200, texto: yellow-800)' },
{ name: 'red-50',    role: 'fundo — variante danger (borda: red-200, texto: red-800)' },
{ name: 'blue-50',   role: 'fundo — variante info (borda: blue-200, texto: blue-800)' },
```

### Story ordering in component files

1. Individual variant stories
2. Group/combination stories
3. **Token Usage** story
4. **Pending Review** story — always last

---

## Foundation stories

Foundation stories also use `{ name, role }` pairs, sourced from the registry. The `role` in Foundation context describes the token's semantic purpose or Tailwind class name:

```tsx
<TokenUsage tokens={[
  { name: 'radius-8',   role: 'rounded-radius-8' },
  { name: 'radius-16',  role: 'rounded-radius-16' },
  { name: 'radius-full', role: 'rounded-radius-full — formato pílula' },
]} />
```

Foundation stories (no `component` prop) group tokens by category and act as the canonical catalog view. They do not define status or values — those are in the registry.

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
