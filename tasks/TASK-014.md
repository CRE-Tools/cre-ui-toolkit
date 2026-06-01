---
id: TASK-014
title: Translate Foundation stories to PT-BR
status: pending
model: cheap
model-name: SWE-1.6
context:
  - docs/context/storybook.md
doc-impact: []
export-impact: []
---

## Description

The new language rule requires all Storybook documentation text to be in PT-BR (see `docs/context/storybook.md` — Language section). Foundation stories in `apps/storybook/src/stories/foundation/` have two kinds of English text that need to be translated:

1. Story `name` fields — currently in English ("All Colors", "All Type Styles", etc.)
2. Token `role` fields inside `TokenUsage` — currently descriptive English text

Apply all translations listed below. Do not change: export identifiers, token `name` fields, token `category` fields, token `status` fields, token `value` fields, or any TypeScript/code logic.

## Acceptance Criteria

- [ ] All story `name` fields are in PT-BR
- [ ] All token `role` fields that contain English descriptive text are in PT-BR
- [ ] Token `role` fields that are token/class names (e.g., `'rounded-radius-0'`) or pure numbers (e.g., `'4'`, `'8'`) are left unchanged — they are naming, not description
- [ ] TypeScript compiles without errors

## Relevant Data

### `Colors.stories.tsx`

Story name: `'All Colors'` → `'Todas as Cores'`

Token role translations:
| Current | PT-BR |
|---|---|
| `'Primary brand color'` | `'Cor principal da marca'` |
| `'Neutral / muted'` | `'Neutro / discreto'` |
| `'Page/canvas background'` | `'Fundo da página/canvas'` |
| `'Card/panel background'` | `'Fundo de card/painel'` |
| `'Primary body text'` | `'Texto principal do corpo'` |
| `'Secondary/muted text'` | `'Texto secundário/discreto'` |
| `'Primary interactive'` | `'Elemento interativo principal'` |
| `'Primary interactive hover'` | `'Hover do elemento interativo principal'` |
| `'Separators and borders'` | `'Separadores e bordas'` |
| `'Success state'` | `'Estado de sucesso'` |
| `'Error state'` | `'Estado de erro'` |
| `'Warning state'` | `'Estado de alerta'` |
| `'Info state'` | `'Estado informativo'` |

---

### `Typography.stories.tsx`

Story name: `'All Type Styles'` → `'Todos os Estilos Tipográficos'`

Token role translations:
| Current | PT-BR |
|---|---|
| `'Heading level 1'` | `'Título nível 1'` |
| `'Heading level 2'` | `'Título nível 2'` |
| `'Heading level 3'` | `'Título nível 3'` |
| `'Heading level 4'` | `'Título nível 4'` |
| `'Heading level 5'` | `'Título nível 5'` |
| `'Heading level 6'` | `'Título nível 6'` |
| `'Primary body text'` | `'Texto principal do corpo'` |
| `'Button text'` | `'Texto de botão'` |
| `'Caption text'` | `'Legenda'` |

---

### `Spacing.stories.tsx`

Story name: `'All Spacing'` → `'Todos os Espaçamentos'`

Token `role` fields here are just numeric values (`'4'`, `'8'`, etc.) — leave unchanged.

---

### `BorderRadius.stories.tsx`

Story name: `'All Radii'` → `'Todos os Border Radii'`

Token `role` fields here are token class names (`'rounded-radius-0'`, etc.) — leave unchanged.

---

### `Shadows.stories.tsx`

Story name: `'All Shadows'` → `'Todas as Sombras'`

Token role translations:
| Current | PT-BR |
|---|---|
| `'Subtle elevation'` | `'Elevação sutil'` |
| `'Medium elevation'` | `'Elevação média'` |
| `'High elevation'` | `'Elevação alta'` |

---

### `Focus.stories.tsx`

Story name: `'All Focus Patterns'` → `'Todos os Padrões de Foco'`

Token role translations:
| Current | PT-BR |
|---|---|
| `'Standard interactive elements'` | `'Elementos interativos padrão'` |
| `'Elements on brand-colored backgrounds'` | `'Elementos sobre fundos na cor da marca'` |
| `'Compact elements'` | `'Elementos compactos'` |
