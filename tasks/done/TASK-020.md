---
id: TASK-020
title: Migrate component stories to token registry + fix token content
status: done
model: cheap
model-name: SWE-1.6
context:
  - docs/context/storybook.md
doc-impact: []
export-impact: []
---

## Description

**Depends on TASK-018 being merged first.**

All five component story `TokenUsageStory` entries must be migrated from the full form (`{ name, category, value, role, status }`) to the simplified registry form (`{ name, role }`). At the same time, the token content itself needs fixing: some stories have vague grouped entries or are missing per-variant color tokens.

This task combines two jobs:
1. **Format migration** — drop `category`, `value`, `status` from every component story entry
2. **Content fix** — replace vague entries and add missing per-variant color tokens

## Acceptance Criteria

- [ ] All five component story files pass only `{ name, role }` to `TokenUsage` — no `category`, `value`, or `status` inline
- [ ] Every `name` used exists as a key in `tokenRegistry`
- [ ] Alert — the single "semantic colors" entry is replaced with four per-variant entries (one per success/warning/danger/info)
- [ ] Badge — all seven variant colors are documented (default, success, warning, danger, info, draft, brand)
- [ ] Button — entries exist for `brand` (primary/secondary/tertiary), `red-600` (destructive), and `white` (on-brand variants)
- [ ] Input — entries exist for `neutral-400` (idle border/placeholder), `brand` (focus), `red-500` (error state), `green-500` (success state)
- [ ] ActionButton — `neutral-400` entry updated to note 60% opacity; entries added for `red-600` and `red-200` (destructive variant)
- [ ] All `role` text is in PT-BR
- [ ] TypeScript compiles without errors

## Relevant Data

### Files to update

```
apps/storybook/src/stories/components/Alert.stories.tsx
apps/storybook/src/stories/components/Badge.stories.tsx
apps/storybook/src/stories/components/Button.stories.tsx
apps/storybook/src/stories/components/Input.stories.tsx
apps/storybook/src/stories/components/ActionButton.stories.tsx
```

### Expected token entries per component

**Alert** — replace the existing "semantic colors" entry:
```ts
{ name: 'radius-8',    role: 'raio de borda' },
{ name: 'font-body',   role: 'família tipográfica' },
{ name: 'spacing-16',  role: 'padding horizontal' },
{ name: 'spacing-12',  role: 'padding vertical' },
{ name: 'green-50',    role: 'fundo — variante success (borda: green-200, texto: green-800)' },
{ name: 'yellow-50',   role: 'fundo — variante warning (borda: yellow-200, texto: yellow-800)' },
{ name: 'red-50',      role: 'fundo — variante danger (borda: red-200, texto: red-800)' },
{ name: 'blue-50',     role: 'fundo — variante info (borda: blue-200, texto: blue-800)' },
```

**Badge** — expand from 5 entries to cover all 7 variants:
```ts
{ name: 'radius-full', role: 'raio de borda — formato pílula' },
{ name: 'font-body',   role: 'família tipográfica' },
{ name: 'spacing-8',   role: 'padding horizontal — tamanho sm' },
{ name: 'spacing-10',  role: 'padding horizontal — tamanho md' },
{ name: 'gray-100',    role: 'fundo — variante default (borda: gray-200, texto: gray-600)' },
{ name: 'green-50',    role: 'fundo — variante success (borda: green-200, texto: green-700)' },
{ name: 'yellow-50',   role: 'fundo — variante warning (borda: yellow-200, texto: yellow-700)' },
{ name: 'red-50',      role: 'fundo — variante danger (borda: red-200, texto: red-700)' },
{ name: 'blue-50',     role: 'fundo — variante info (borda: blue-200, texto: blue-700)' },
{ name: 'gray-100',    role: 'fundo — variante draft (borda: gray-300 tracejado, texto: gray-500)' },
{ name: 'brand',       role: 'fundo/borda/texto — variante brand (bg: brand/10, borda: brand/20)' },
```
Note: `gray-100` appears twice (default and draft share the same background — that is correct).

**Button:**
```ts
{ name: 'brand',      role: 'fundo (primary) / borda+texto (secondary) / texto (tertiary)' },
{ name: 'red-600',    role: 'fundo — variante destructive' },
{ name: 'white',      role: 'fundo (on-brand-primary) / borda+texto (on-brand-secondary/tertiary)' },
{ name: 'radius-8',   role: 'raio de borda — todos os tamanhos' },
{ name: 'spacing-12', role: 'padding horizontal — tamanho sm' },
{ name: 'spacing-16', role: 'padding horizontal — tamanho md' },
{ name: 'spacing-24', role: 'padding horizontal — tamanho lg' },
{ name: 'font-body',  role: 'família tipográfica' },
{ name: 'focus-standard', role: 'anel de foco — variantes padrão' },
{ name: 'focus-on-brand', role: 'anel de foco — variantes on-brand' },
```

**Input:**
```ts
{ name: 'radius-8',      role: 'raio de borda' },
{ name: 'neutral-400',   role: 'borda em repouso e placeholder' },
{ name: 'brand',         role: 'borda e ring de foco' },
{ name: 'red-500',       role: 'borda e ring de foco — estado error' },
{ name: 'green-500',     role: 'borda e ring de foco — estado success' },
{ name: 'font-body',     role: 'família tipográfica' },
{ name: 'spacing-12',    role: 'padding horizontal' },
{ name: 'spacing-8',     role: 'padding vertical' },
```

**ActionButton:**
```ts
{ name: 'radius-4',    role: 'raio de borda' },
{ name: 'neutral-400', role: 'borda — variante default (60% de opacidade)' },
{ name: 'brand',       role: 'fundo e borda — variante brand' },
{ name: 'red-600',     role: 'texto — variante destructive' },
{ name: 'red-200',     role: 'borda — variante destructive' },
{ name: 'spacing-8',   role: 'padding horizontal' },
{ name: 'font-body',   role: 'família tipográfica' },
{ name: 'focus-compact', role: 'anel de foco' },
```

### Note on spacing-10

`spacing-10` (10px) used in Badge is not in the Spacing Foundation story (which only has spacing-4/8/16/24/32/40/48/64). Check if `spacing-10` exists in `tokenRegistry` — if it does not, add it as `pending-design` before using it in the story. If there is a better fit (like `spacing-8` with a note), use that instead and leave a comment in the PendingReview story.
