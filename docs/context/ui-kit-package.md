# Context: @cre/ui-kit — Current Package State

This file describes what is currently built, exported, and in what state. Update it whenever a component is added, promoted out of Pending Review, or has its API changed.

**Last updated:** 2026-05-29

---

## Source folder structure

```
src/
├── layout/         ← Box, Container, Grid+GridItem, Stack, Surface
├── components/     ← Button, ActionButton+ActionGroup, Badge, Alert, Input+Textarea
├── blocks/         ← Modal+ConfirmModal, Sidebar, Table, HierarchicalTable
├── styles/         ← globals.css
├── utils/          ← cn.ts
└── index.ts
```

Storybook dev utilities (`PendingReview`) live in `packages/storybook-utils/` (private workspace package, not published). Story files live in `apps/storybook/src/stories/`, not in this package.

## Public exports

Everything exported from `packages/ui-kit/src/index.ts` is public API. The entry point re-exports all three layers and the `cn` utility.

```
@cre/ui-kit
├── Layout
│   ├── Box
│   ├── Container
│   ├── Grid + GridItem
│   ├── Stack
│   └── Surface
├── Components
│   ├── Button
│   ├── ActionButton + ActionGroup
│   ├── Badge
│   ├── Alert
│   └── Input + Textarea
└── Blocks
    ├── Modal + ConfirmModal
    ├── Sidebar
    ├── Table
    └── HierarchicalTable
```

The `cn(clsx + tailwind-merge)` utility is also exported for consumers who want to use the same merging logic.

---

## Component inventory

All components below are in **Pending Review** status — they have been built by the dev team but have not yet been formally approved by the design team. Each carries a `Pending Review` story in Storybook that lists the open questions.

### Layout primitives

#### `Box`
Generic structural wrapper. No visual appearance (no color, shadow, or border). Use when you need padding, display, or overflow control on a container without semantics.

Props: `as` (any HTML tag, default `div`), `padding` (0–12 in 4px steps), `display`, `overflow`, `fullWidth`, `fullHeight`.

When to use vs. others:
- `Box` → structure without appearance
- `Surface` → appearance without structure (color/shadow/border)
- `Stack` → flexbox direction and gap between children
- `Grid` → column-based layout

#### `Container`
Responsive page wrapper applying DS PUCPR horizontal margins. Margins: 24px (xs) / 32px (sm) / 40px (md+).

Props: `variant` — `'fluid'` (100% width + margins, default) or `'fixed'` (adds max-width cap at xl/wide breakpoints: 1440px / 1920px).

#### `Grid` + `GridItem`
Column grid following DS PUCPR breakpoints: **4 cols (xs) → 8 cols (sm) → 12 cols (md+)**. Gutters: 8px / 16px / 24px (responsive).

`Grid` props: `cols`, `colsSm`, `colsMd`, `colsLg` — each accepts `1 | 2 | 3 | 4 | 6 | 8 | 12`.

`GridItem` props: `span`, `spanSm`, `spanMd`, `spanLg` — number of columns to span, or `'full'` for full width.

Open design questions: gutter values per breakpoint need Figma confirmation; default span behavior.

#### `Stack`
Flexbox wrapper for one-dimensional layouts (lists, button groups, form fields).

Props: `direction` (`'vertical'` default / `'horizontal'`), `gap` (0–12, default 4 = 16px), `align`, `justify`, `wrap`.

---

### Surface primitive

#### `Surface`
Visual container with background, border, and shadow — no structural layout. Pair with `Box` or `Stack` for structure.

---

### UI components

#### `Button`
Primary call-to-action. 7 variants, 3 sizes, loading state, icon slots.

Variants: `primary` | `secondary` | `tertiary` | `on-brand-primary` | `on-brand-secondary` | `on-brand-tertiary` | `destructive`

Sizes: `sm` (32px) | `md` (40px, default) | `lg` (48px)

Props: `variant`, `size`, `loading` (shows spinner, disables), `leftIcon`, `rightIcon`, `fullWidth`, `disabled`.

**Note:** `destructive` variant was added by the dev team for admin panel needs — it is not in DS PUCPR. Requires explicit design team approval.

#### `ActionButton` + `ActionGroup`
Compact button for use inside table cells and action bars. Not a replacement for `Button`.

`ActionButton` variants: `default` (neutral gray) | `destructive` (red) | `brand` (bordô).
Props: `variant`, `icon` (left icon slot).

`ActionGroup` wraps multiple `ActionButton` with consistent `gap-1` spacing.

#### `Badge`
Pill-shaped status label. 7 variants, 2 sizes.

Variants: `default` | `success` | `warning` | `danger` | `info` | `draft` | `brand`

Sizes: `sm` | `md` (default)

Props: `variant`, `size`, `icon` (left icon slot).

#### `Alert`
Feedback banner with built-in icons per variant. 4 variants.

Variants: `success` | `warning` | `danger` | `info` (default)

Props: `variant`, `title` (bold heading), `children` (body text), `hideIcon`, `action` (slot for a button or link).

Renders with `role="alert"` for accessibility.

#### `Input`
Text input field. (Details to be filled in after design review.)

---

### Admin panel components (experimental)

These were built to fill Storybook and explore the admin panel use case. They are more exploratory than the core primitives and carry more uncertainty.

#### `Modal`
Dialog overlay component.

#### `Sidebar`
Navigation sidebar panel.

#### `Table`
Flat data table.

#### `HierarchicalTable`
Tree-structured table with expandable rows. Built for the admin panel.

---

## Status summary

| Component | DS Category | Review status |
|---|---|---|
| Box | Layout | Pending Review |
| Container | Layout | Pending Review |
| Grid / GridItem | Layout | Pending Review |
| Stack | Layout | Pending Review |
| Surface | Layout | Pending Review |
| Button | Components | Pending Review — `destructive` needs explicit design approval |
| ActionButton / ActionGroup | Components | Pending Review |
| Badge | Components | Pending Review |
| Alert | Components | Pending Review |
| Input / Textarea | Components | Pending Review — `Textarea` exists in source but not yet exported |
| Modal / ConfirmModal | Blocks | Pending Review |
| Sidebar | Blocks | Pending Review |
| Table | Blocks | Pending Review |
| HierarchicalTable | Blocks | Pending Review |

---

## What does NOT exist yet

- `Textarea` — referenced in git history but not currently exported
- Any form primitives beyond `Input` (Select, Checkbox, Radio, etc.)
- Typography components (Heading, Text, Label)
- Icon system / icon library
- Theme provider / token injection mechanism for consumers
- Any navigation components (Tabs, Breadcrumb, etc.)
- Feedback components beyond Alert (Toast, Tooltip, Popover)
