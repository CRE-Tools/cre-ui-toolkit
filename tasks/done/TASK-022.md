---
id: TASK-022
title: Surface Tailwind primitive colors in Foundation/Colors story
status: done
model: cheap
model-name: SWE-1.6
context:
  - docs/context/storybook.md
doc-impact: []
export-impact: []
---

## Description

Tailwind primitive colors (`green-50`, `red-600`, etc.) are referenced in component stories via the token registry, but they are **not visible anywhere in Foundation**. The Foundation/Colors story only shows DS semantic color names (`feedback/success`, `surface/background`, etc.) — all with `#cccccc` placeholder values pending design decision.

This means a designer reviewing Foundation sees a list of abstract slots with no values, while the components are already using real colors that aren't on the Foundation page at all. The gap makes it impossible to audit what's actually in use.

**Decision:** Add a second story export to Foundation/Colors that shows every Tailwind color primitive currently in the registry, grouped by semantic role (success, warning, danger, info, neutral). These are all `pending-design` — the status badge will reflect that automatically. This gives design the complete picture: "here are the semantic color slots we defined, and here are the raw colors we're already using."

This is **not** a design decision about whether green-50 becomes `feedback/success` — that happens after design reviews. This task only surfaces the information.

## Acceptance Criteria

- [ ] `Colors.stories.tsx` has a second story export (e.g. `TailwindColorsEmUso`) that renders all Tailwind color primitives from the registry
- [ ] The story is clearly titled in PT-BR to signal its purpose (e.g., `'Cores Tailwind em uso — pendente tokenização DS'`)
- [ ] Colors are grouped semantically (success family together, warning together, etc.) using separate `TokenUsage` blocks or a `notes` field that explains the grouping
- [ ] All entries resolve from the registry — no inline `value`/`category`/`status`
- [ ] The existing `AllColors` story is unchanged
- [ ] Storybook builds without errors

## Relevant Data

### Tailwind color primitives currently in the registry (from TASK-018)

Group them as follows in the story:

**Success (verde):** `green-50`, `green-200`, `green-700`, `green-800`, `green-500`

**Warning (amarelo):** `yellow-50`, `yellow-200`, `yellow-700`, `yellow-800`

**Danger / Error (vermelho):** `red-50`, `red-200`, `red-500`, `red-600`, `red-700`, `red-800`

**Info (azul):** `blue-50`, `blue-200`, `blue-700`, `blue-800`

**Neutro (cinza):** `gray-100`, `gray-200`, `gray-300`, `gray-500`, `gray-600`

**Outro:** `white`

### Suggested story structure

Since `TokenUsage` renders a flat list, use multiple `TokenUsage` blocks with a wrapper that adds section labels, or pass a `notes` prop to each block to explain the group. Example:

```tsx
export const TailwindColorsEmUso: Story = {
  name: 'Cores Tailwind em uso — pendente tokenização DS',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <TokenUsage
        notes="Cores success (verde) — usadas nas variantes success de Alert, Badge e Input"
        tokens={[
          { name: 'green-50',  role: 'fundo — variante success' },
          { name: 'green-200', role: 'borda — variante success' },
          { name: 'green-700', role: 'texto — variante success (Badge)' },
          { name: 'green-800', role: 'texto — variante success (Alert)' },
          { name: 'green-500', role: 'borda de foco — estado success (Input)' },
        ]}
      />
      <TokenUsage
        notes="Cores warning (amarelo) — usadas nas variantes warning de Alert e Badge"
        tokens={[
          { name: 'yellow-50',  role: 'fundo — variante warning' },
          { name: 'yellow-200', role: 'borda — variante warning' },
          { name: 'yellow-700', role: 'texto — variante warning (Badge)' },
          { name: 'yellow-800', role: 'texto — variante warning (Alert)' },
        ]}
      />
      <TokenUsage
        notes="Cores danger/error (vermelho) — usadas nas variantes danger, destructive e error"
        tokens={[
          { name: 'red-50',  role: 'fundo — variante danger (Alert, Badge)' },
          { name: 'red-200', role: 'borda — variante danger / destructive (ActionButton)' },
          { name: 'red-500', role: 'borda de foco — estado error (Input)' },
          { name: 'red-600', role: 'fundo — variante destructive (Button, ActionButton texto)' },
          { name: 'red-700', role: 'texto — variante danger (Badge)' },
          { name: 'red-800', role: 'texto — variante danger (Alert)' },
        ]}
      />
      <TokenUsage
        notes="Cores info (azul) — usadas nas variantes info de Alert e Badge"
        tokens={[
          { name: 'blue-50',  role: 'fundo — variante info' },
          { name: 'blue-200', role: 'borda — variante info' },
          { name: 'blue-700', role: 'texto — variante info (Badge)' },
          { name: 'blue-800', role: 'texto — variante info (Alert)' },
        ]}
      />
      <TokenUsage
        notes="Cores neutras (cinza) — usadas nas variantes default e disabled"
        tokens={[
          { name: 'gray-100', role: 'fundo — variantes default e draft (Badge)' },
          { name: 'gray-200', role: 'borda — variante default (Badge)' },
          { name: 'gray-300', role: 'borda — variante draft (Badge, tracejado)' },
          { name: 'gray-500', role: 'texto — variante draft (Badge)' },
          { name: 'gray-600', role: 'texto — variante default (Badge, ActionButton)' },
        ]}
      />
      <TokenUsage
        notes="Branco — usado nas variantes on-brand (Button)"
        tokens={[
          { name: 'white', role: 'fundo/borda/texto — variantes on-brand (Button)' },
        ]}
      />
    </div>
  ),
}
```

### Note on TokenUsage without a `component` prop

`TokenUsage` with no `component` prop renders in "Foundation mode" (heading: "Referência de Tokens"). Multiple blocks without `component` is fine for Foundation stories. If a header per group would help readability, the `notes` prop acts as a section subtitle.
