---
id: TASK-021
title: Add missing spacing tokens to registry and Foundation/Spacing
status: done
model: cheap
model-name: SWE-1.6
context:
  - docs/context/storybook.md
doc-impact: []
export-impact: []
---

## Description

`spacing-12` (12px) is referenced in component stories (Button sm padding, Alert vertical padding, Input padding) but is not in the token registry — it renders as "token não encontrado no registry". `spacing-10` (10px, used by Badge md horizontal padding) may also be missing.

Neither value is part of the current DS spacing scale (`spacing-4/8/16/24/32/40/48/64` — all multiples of 8). They are Tailwind defaults being used as off-scale values, which means design needs to explicitly decide whether to adopt them.

This task adds the missing tokens to the registry as `pending-design` and adds them to the Foundation/Spacing story so the design team can see them alongside the approved scale.

## Acceptance Criteria

- [ ] `spacing-12` exists in `tokenRegistry` with `status: 'pending-design'`
- [ ] `spacing-10` exists in `tokenRegistry` with `status: 'pending-design'` (if it wasn't already added by TASK-020)
- [ ] Both tokens appear in `apps/storybook/src/stories/foundation/Spacing.stories.tsx` with a role that makes their off-scale nature clear
- [ ] No component story shows "token não encontrado" for any spacing token
- [ ] Storybook builds without errors

## Relevant Data

### Tokens to add to registry

```ts
'spacing-10': { category: 'spacing', value: '10px', status: 'pending-design' },
'spacing-12': { category: 'spacing', value: '12px', status: 'pending-design' },
```

### Foundation/Spacing story update

Add the new tokens to the existing `AllSpacing` story, after the confirmed scale, with roles that signal they're off-scale:

```tsx
{ name: 'spacing-10', role: '10 — fora da escala DS, aguardando decisão' },
{ name: 'spacing-12', role: '12 — fora da escala DS, aguardando decisão' },
```

The `pending-design` status from the registry will render the "⚠ aguardando aprovação" badge automatically.

### Where these tokens are used

- `spacing-12` — Button (px-3 = 12px, tamanho sm), Alert (py-3 = 12px, vertical), Input (py-2 = 8px vertical + `h-10` gives effective 12px — verify against source)
- `spacing-10` — Badge (px-2.5 = 10px, tamanho md horizontal padding)

Verify against actual component source before finalising, in case values changed after TASK-020.
