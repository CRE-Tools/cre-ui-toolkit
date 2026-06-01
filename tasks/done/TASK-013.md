---
id: TASK-013
title: Translate storybook-utils UI strings to PT-BR
status: done
model: cheap
model-name: SWE-1.6
context:
  - docs/context/storybook.md
doc-impact: []
export-impact: []
---

## Description

The new language rule (see `docs/context/storybook.md` — Language section) requires all Storybook documentation text to be in PT-BR. The two utility components in `packages/storybook-utils/src/` render user-visible strings that are currently in English. Translate every hardcoded UI string inside these components to PT-BR. Do NOT change prop names, TypeScript types, JSDoc comments, or code logic.

## Acceptance Criteria

- [ ] All user-visible strings in `PendingReview.tsx` are in PT-BR
- [ ] All user-visible strings in `TokenUsage.tsx` are in PT-BR
- [ ] No prop API changes — only the hardcoded text literals inside JSX are modified
- [ ] TypeScript compiles without errors

## Relevant Data

### `packages/storybook-utils/src/PendingReview.tsx` — strings to translate

| Current (English) | PT-BR replacement |
|---|---|
| `Pending Design Review — ` | `Aguardando Revisão do Design — ` |
| `This component has not been approved by the design team yet.` | `Este componente ainda não foi aprovado pela equipe de design.` |
| `Review checklist` | `Checklist de revisão` |
| `Note:` | `Nota:` |
| `Current implementation` | `Implementação atual` |

### `packages/storybook-utils/src/TokenUsage.tsx` — strings to translate

| Current (English) | PT-BR replacement |
|---|---|
| `Token Usage — ${component}` (header title) | `Tokens — ${component}` |
| `Token Reference` (when no component prop) | `Referência de Tokens` |
| `These are the design tokens this component consumes.` | `Estes são os design tokens utilizados por este componente.` |
| `Design tokens in this category.` | `Design tokens desta categoria.` |
| `⚠ pending design` (badge label) | `⚠ aguardando aprovação` |
| `Note:` | `Nota:` |
