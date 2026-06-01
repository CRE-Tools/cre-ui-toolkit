---
id: TASK-018
title: Create token registry + update TokenUsage to resolve from it
status: done
model: medium
model-name: GPT-5.2
context:
  - docs/context/storybook.md
doc-impact: []
export-impact: []
---

## Description

Currently every story entry duplicates `value`, `category`, and `status` inline. This means a token approval requires updating that status in every Foundation story and every component story that references it — there is no single place to make the change.

**Decision (architect):** Create a central token registry (`packages/storybook-utils/src/token-registry.ts`) as the single source of truth for token metadata. Update `TokenUsage` to accept a simplified entry shape — `{ name, role }` — and resolve `value`, `category`, and `status` from the registry by name. Foundation and component stories then become thin reference lists.

### What the registry contains

Every design-relevant value used in this DS goes in the registry:
1. **Confirmed DS tokens** — custom Tailwind extensions in `packages/ui-kit/tailwind.config.ts` (brand, neutral-400, radius-*, font-body/heading, border-width-*, ring, shadow-level-*)
2. **DS tokens pending design sign-off** — semantic color names like `feedback/success` that have a DS name but no confirmed hex value yet (currently `#cccccc` placeholder in the Colors Foundation story)
3. **Tailwind primitives in active use** — Tailwind default colors used directly in component variants (green-50, red-600, etc.) — these are `pending-design` and represent values the design team needs to either adopt as DS tokens or replace

### Backward compat

After this task, existing full-form story entries (`{ name, category, value, role, status }`) should still render correctly. The migration to `{ name, role }` form happens in TASK-019 and TASK-020 — do not change any story files in this task.

## Acceptance Criteria

- [x] `packages/storybook-utils/src/token-registry.ts` exists and is exported from `packages/storybook-utils/src/index.ts`
- [x] Registry contains all tokens listed in "Relevant Data" below, with correct `category`, `value`, and `status`
- [x] `TokenEntry` in `TokenUsage.tsx` has `value`, `category`, and `status` all marked optional
- [x] When `value` / `category` / `status` are absent from a story entry, `TokenUsage` resolves them from the registry using `name` as the lookup key
- [x] When a `name` is not found in the registry, `TokenUsage` renders a visible warning for that entry (e.g., red border, "token não encontrado no registry") rather than silently breaking
- [x] Existing full-form entries (`{ name, category, value, role, status }`) still render correctly — backward compat preserved
- [x] TypeScript compiles without errors
- [x] `tokenRegistry` and `RegistryToken` are exported from `@cre/storybook-utils`

## Relevant Data

### Registry contents to populate

**Confirmed DS color tokens** (from `tailwind.config.ts`):
```ts
'brand':       { category: 'color', value: '#7B1234', status: 'confirmed' },
'neutral-400': { category: 'color', value: '#B5A8AD', status: 'confirmed' },
```

**Pending DS color tokens** (from Colors Foundation story — placeholders, hex TBD by design):
```ts
'surface/background':      { category: 'color', value: '#cccccc', status: 'pending-design' },
'surface/element':         { category: 'color', value: '#cccccc', status: 'pending-design' },
'text/main':               { category: 'color', value: '#cccccc', status: 'pending-design' },
'text/muted':              { category: 'color', value: '#cccccc', status: 'pending-design' },
'action/primary/default':  { category: 'color', value: '#cccccc', status: 'pending-design' },
'action/primary/hover':    { category: 'color', value: '#cccccc', status: 'pending-design' },
'border/divider':          { category: 'color', value: '#cccccc', status: 'pending-design' },
'feedback/success':        { category: 'color', value: '#cccccc', status: 'pending-design' },
'feedback/error':          { category: 'color', value: '#cccccc', status: 'pending-design' },
'feedback/warning':        { category: 'color', value: '#cccccc', status: 'pending-design' },
'feedback/info':           { category: 'color', value: '#cccccc', status: 'pending-design' },
```

**Tailwind primitive colors in active use** (all `pending-design`):
```ts
// Used in Alert / Badge success variant
'green-50':  { category: 'color', value: '#F0FDF4', status: 'pending-design' },
'green-200': { category: 'color', value: '#BBF7D0', status: 'pending-design' },
'green-700': { category: 'color', value: '#15803D', status: 'pending-design' },
'green-800': { category: 'color', value: '#166534', status: 'pending-design' },
'green-500': { category: 'color', value: '#22C55E', status: 'pending-design' }, // Input success border

// Warning
'yellow-50':  { category: 'color', value: '#FEFCE8', status: 'pending-design' },
'yellow-200': { category: 'color', value: '#FEF08A', status: 'pending-design' },
'yellow-700': { category: 'color', value: '#A16207', status: 'pending-design' },
'yellow-800': { category: 'color', value: '#854D0E', status: 'pending-design' },

// Danger / error
'red-50':  { category: 'color', value: '#FFF1F2', status: 'pending-design' },
'red-200': { category: 'color', value: '#FECDD3', status: 'pending-design' },
'red-500': { category: 'color', value: '#EF4444', status: 'pending-design' }, // Input error border
'red-600': { category: 'color', value: '#DC2626', status: 'pending-design' }, // Button/ActionButton destructive bg
'red-700': { category: 'color', value: '#B91C1C', status: 'pending-design' },
'red-800': { category: 'color', value: '#991B1B', status: 'pending-design' },

// Info
'blue-50':  { category: 'color', value: '#EFF6FF', status: 'pending-design' },
'blue-200': { category: 'color', value: '#BFDBFE', status: 'pending-design' },
'blue-700': { category: 'color', value: '#1D4ED8', status: 'pending-design' },
'blue-800': { category: 'color', value: '#1E40AF', status: 'pending-design' },

// Neutral / gray
'gray-100': { category: 'color', value: '#F3F4F6', status: 'pending-design' },
'gray-200': { category: 'color', value: '#E5E7EB', status: 'pending-design' },
'gray-300': { category: 'color', value: '#D1D5DB', status: 'pending-design' },
'gray-500': { category: 'color', value: '#6B7280', status: 'pending-design' },
'gray-600': { category: 'color', value: '#4B5563', status: 'pending-design' },

// On-brand variants (Button)
'white': { category: 'color', value: '#FFFFFF', status: 'pending-design' },
```

**Spacing** (from Spacing Foundation story — all confirmed):
```ts
'spacing-4':  { category: 'spacing', value: '4px',  status: 'confirmed' },
'spacing-8':  { category: 'spacing', value: '8px',  status: 'confirmed' },
'spacing-16': { category: 'spacing', value: '16px', status: 'confirmed' },
'spacing-24': { category: 'spacing', value: '24px', status: 'confirmed' },
'spacing-32': { category: 'spacing', value: '32px', status: 'confirmed' },
'spacing-40': { category: 'spacing', value: '40px', status: 'confirmed' },
'spacing-48': { category: 'spacing', value: '48px', status: 'confirmed' },
'spacing-64': { category: 'spacing', value: '64px', status: 'confirmed' },
```

**Border Radius** (from BorderRadius Foundation story):
```ts
'radius-0':    { category: 'radius', value: '0px',    status: 'confirmed' },
'radius-4':    { category: 'radius', value: '4px',    status: 'confirmed' },
'radius-8':    { category: 'radius', value: '8px',    status: 'confirmed' },
'radius-12':   { category: 'radius', value: '12px',   status: 'pending-design' },
'radius-16':   { category: 'radius', value: '16px',   status: 'confirmed' },
'radius-32':   { category: 'radius', value: '32px',   status: 'confirmed' },
'radius-full': { category: 'radius', value: '9999px', status: 'confirmed' },
```

**Typography** (from Typography Foundation story):
```ts
'Heading/H1':    { category: 'typography', value: '32px', status: 'confirmed' },
'Heading/H2':    { category: 'typography', value: '28px', status: 'confirmed' },
'Heading/H3':    { category: 'typography', value: '24px', status: 'confirmed' },
'Heading/H4':    { category: 'typography', value: '20px', status: 'confirmed' },
'Heading/H5':    { category: 'typography', value: '18px', status: 'confirmed' },
'Heading/H6':    { category: 'typography', value: '16px', status: 'confirmed' },
'Body/Main':     { category: 'typography', value: '16px', status: 'confirmed' },
'Action/Button': { category: 'typography', value: '14px', status: 'confirmed' },
'Caption':       { category: 'typography', value: '12px', status: 'confirmed' },
// Tailwind font-family tokens (from tailwind.config.ts):
'font-body':    { category: 'typography', value: 'Source Sans 3', status: 'confirmed' },
'font-heading': { category: 'typography', value: 'Poppins',       status: 'confirmed' },
```

**Shadows** (from Shadows Foundation story):
```ts
'shadow-level-1': { category: 'shadow', value: '0px 1px 4px 0px rgba(0,0,0,0.08), 0px 1px 2px 0px rgba(0,0,0,0.06)', status: 'pending-design' },
'shadow-level-2': { category: 'shadow', value: '0px 4px 12px 0px rgba(0,0,0,0.10), 0px 2px 6px 0px rgba(0,0,0,0.06)', status: 'pending-design' },
'shadow-level-3': { category: 'shadow', value: '0px 12px 32px 0px rgba(0,0,0,0.12), 0px 4px 12px 0px rgba(0,0,0,0.08)', status: 'pending-design' },
```

**Focus** (from Focus Foundation story):
```ts
'focus-standard':  { category: 'focus', value: 'ring',          status: 'pending-design' },
'focus-on-brand':  { category: 'focus', value: 'ring white/60', status: 'pending-design' },
'focus-compact':   { category: 'focus', value: 'ring-2',        status: 'pending-design' },
```

### TokenUsage lookup logic

```ts
// Inside TokenUsage, for each token entry:
const resolved = {
  category: entry.category ?? tokenRegistry[entry.name]?.category,
  value:    entry.value    ?? tokenRegistry[entry.name]?.value,
  status:   entry.status   ?? tokenRegistry[entry.name]?.status,
}

if (!resolved.category || !resolved.value) {
  // render warning: "token '{name}' não encontrado no registry"
}
```
