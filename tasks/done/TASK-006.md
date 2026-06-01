---
id: TASK-006
title: Replace hardcoded #B5A8AD hex with neutral-400 token throughout
status: done
model: cheap
model-name: SWE-1.6
context:
  - docs/context/design-system-decisions.md
doc-impact: []
export-impact: []
---

## Description

`neutral-400` is defined as a design token in `tailwind.config.ts` (`neutral: { 400: '#B5A8AD' }`), but all components use the hardcoded hex `#B5A8AD` as an arbitrary Tailwind value (e.g., `border-[#B5A8AD]/30`). This bypasses the token system — if the value ever changes in the config, components will not update.

Replace all occurrences of the hex with the token-based class. Tailwind supports opacity modifiers on named colors, so `border-[#B5A8AD]/30` becomes `border-neutral-400/30`.

There is also one instance of the brand hex `#7B1234` hardcoded inside an SVG `fill` attribute in `Table.tsx` — that case is different (not a Tailwind class) and has its own instruction below.

**Do this task after TASK-005** — some files will also be touched for radius changes, and doing both in separate passes is cleaner.

## Acceptance Criteria

- [ ] Zero occurrences of `#B5A8AD` remain in any `.tsx` file under `packages/ui-kit/src/`
- [ ] Zero occurrences of `#7B1234` remain as a hardcoded string in Tailwind class positions (SVG fill in Table.tsx handled separately — see below)
- [ ] All replaced classes use Tailwind token syntax with correct opacity modifiers
- [ ] `pnpm build` succeeds
- [ ] Storybook builds — visually spot-check Table, Surface, Sidebar, and Modal for correct neutral border/divider colors

## Relevant Data

### Replacement table

Replace every `[#B5A8AD]` with `neutral-400`. Opacity modifiers transfer directly:

| Old | New |
|---|---|
| `border-[#B5A8AD]` | `border-neutral-400` |
| `border-[#B5A8AD]/20` | `border-neutral-400/20` |
| `border-[#B5A8AD]/30` | `border-neutral-400/30` |
| `border-[#B5A8AD]/40` | `border-neutral-400/40` |
| `border-[#B5A8AD]/50` | `border-neutral-400/50` |
| `border-[#B5A8AD]/60` | `border-neutral-400/60` |
| `border-r-[#B5A8AD]/40` | `border-r-neutral-400/40` |
| `divide-[#B5A8AD]/20` | `divide-neutral-400/20` |
| `text-[#B5A8AD]` | `text-neutral-400` |
| `placeholder:text-[#B5A8AD]` | `placeholder:text-neutral-400` |
| `hover:border-[#B5A8AD]` | `hover:border-neutral-400` |
| `ring-[#7B1234]/50` | `ring-brand/50` |

### Files with occurrences

- `src/layout/Surface/Surface.tsx` — 5+ occurrences of `border-[#B5A8AD]` with various opacities; also 1 `ring-[#7B1234]/50` → `ring-brand/50`
- `src/components/ActionButton/ActionButton.tsx` — `border-[#B5A8AD]/60`
- `src/components/Input/Input.tsx` — `border-[#B5A8AD]`, `placeholder:text-[#B5A8AD]`
- `src/blocks/Modal/Modal.tsx` — `border-[#B5A8AD]/30` (2 occurrences)
- `src/blocks/Sidebar/Sidebar.tsx` — `border-[#B5A8AD]/30` (4 occurrences)
- `src/blocks/Table/Table.tsx` — `border-[#B5A8AD]/30`, `divide-[#B5A8AD]/20`, `border-[#B5A8AD]/20`
- `src/blocks/HierarchicalTable/HierarchicalTable.tsx` — multiple occurrences with various opacities

### SVG fill in Table.tsx (different approach)

Lines 289 and 294 in `Table.tsx` use `#7B1234` inside JSX as a prop string:
```tsx
fill={dir === 'asc' ? '#7B1234' : 'currentColor'}
```

This is not a Tailwind class — it is a direct SVG attribute. Replace with a JS constant at the top of the file:
```ts
const BRAND_COLOR = '#7B1234'
```
And use `BRAND_COLOR` in place of the literal string. Do not attempt to use a CSS variable here — SVG fill in this context requires an explicit color value.
