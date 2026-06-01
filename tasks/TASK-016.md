---
id: TASK-016
title: Translate Layout stories to PT-BR
status: pending
model: cheap
model-name: SWE-1.6
context:
  - docs/context/storybook.md
doc-impact: []
export-impact: []
---

## Description

The new language rule requires all Storybook documentation text to be in PT-BR (see `docs/context/storybook.md` — Language section). Layout stories in `apps/storybook/src/stories/layout/` have English text in token `role` fields, `PendingReview` items/notes, and `TokenUsage` notes.

Apply all translations listed below. Do not change: export identifiers, component/prop names, token names, categories, values, status, TypeScript types, or code logic.

## Acceptance Criteria

- [ ] All token `role` fields in all 5 layout stories are in PT-BR
- [ ] All `PendingReview` `items` in all 5 layout stories are in PT-BR
- [ ] All `PendingReview` `notes` in all 5 layout stories are in PT-BR
- [ ] All `TokenUsage` `notes` in all 5 layout stories are in PT-BR
- [ ] TypeScript compiles without errors

## Relevant Data

---

### `Box.stories.tsx`

**TokenUsage notes:**
`'Box is a structural utility — it applies no visual tokens. Token usage is determined entirely by the consumer.'`
→ `'Box é um utilitário estrutural — não aplica tokens visuais. O uso de tokens é determinado inteiramente pelo consumidor.'`

**PendingReview items:**
| Current | PT-BR |
|---|---|
| `'Validate padding scale tokens against DS PUCPR spacing system'` | `'Validar tokens da escala de padding em relação ao sistema de espaçamento DS PUCPR'` |
| `'Confirm \'as\' prop polymorphism covers all expected HTML elements'` | `'Confirmar se o polimorfismo da prop \'as\' cobre todos os elementos HTML esperados'` |
| `'Review if display/overflow props cover all use cases needed'` | `'Verificar se as props display/overflow cobrem todos os casos de uso necessários'` |

---

### `Container.stories.tsx`

**Token roles:**
| Current | PT-BR |
|---|---|
| `'horizontal padding (xs breakpoint)'` | `'padding horizontal (breakpoint xs)'` |
| `'horizontal padding (sm breakpoint)'` | `'padding horizontal (breakpoint sm)'` |
| `'horizontal padding (md+ breakpoint)'` | `'padding horizontal (breakpoint md+)'` |
| `'max-width at xl breakpoint (fixed variant)'` | `'largura máxima no breakpoint xl (variante fixed)'` |
| `'max-width at wide breakpoint (fixed variant)'` | `'largura máxima no breakpoint wide (variante fixed)'` |

**PendingReview items:**
| Current | PT-BR |
|---|---|
| `'Confirm max-width values for xl (1440px) and wide (1920px) breakpoints'` | `'Confirmar valores de largura máxima para os breakpoints xl (1440px) e wide (1920px)'` |
| `'Validate responsive padding scale (px-6/8/10) against DS grid margins'` | `'Validar escala de padding responsivo (px-6/8/10) em relação às margens do grid DS'` |
| `'Review fixed vs fluid behavior at each breakpoint with design team'` | `'Revisar o comportamento fixed vs fluid em cada breakpoint com a equipe de design'` |

---

### `Grid.stories.tsx`

**Token roles:**
| Current | PT-BR |
|---|---|
| `'gutter (xs breakpoint)'` | `'gutter (breakpoint xs)'` |
| `'gutter (sm breakpoint)'` | `'gutter (breakpoint sm)'` |
| `'gutter (md+ breakpoint)'` | `'gutter (breakpoint md+)'` |

**PendingReview items:**
| Current | PT-BR |
|---|---|
| `'Confirm gutter values (gap-2/4/6) match DS grid spec for each breakpoint'` | `'Confirmar se os valores de gutter (gap-2/4/6) correspondem à especificação do grid DS em cada breakpoint'` |
| `'Validate 4→8→12 column progression'` | `'Validar a progressão de 4→8→12 colunas'` |
| `'Check GridItem default span behavior (full) is correct'` | `'Verificar se o comportamento padrão de span do GridItem (full) está correto'` |

---

### `Stack.stories.tsx`

**Token roles:**
| Current | PT-BR |
|---|---|
| `'gap-1'` | `'gap-1'` *(keep as is — it's a code name)* |
| `'gap-2 (gutter xs)'` | `'gap-2 (gutter xs)'` *(keep as is)* |
| `'gap-3'` | `'gap-3'` *(keep as is)* |
| `'gap-4 (gutter sm)'` | `'gap-4 (gutter sm)'` *(keep as is)* |
| `'gap-5'` | `'gap-5'` *(keep as is)* |
| `'gap-6 (gutter md/lg/xl)'` | `'gap-6 (gutter md/lg/xl)'` *(keep as is)* |
| `'gap-8'` | `'gap-8'` *(keep as is)* |
| `'gap-10'` | `'gap-10'` *(keep as is)* |
| `'gap-12'` | `'gap-12'` *(keep as is)* |

All Stack token `role` fields are Tailwind class names — leave them unchanged.

**PendingReview items:**
| Current | PT-BR |
|---|---|
| `'Validate gap scale tokens against DS spacing system'` | `'Validar tokens da escala de gap em relação ao sistema de espaçamento DS'` |
| `'Confirm wrap behavior in horizontal Stack'` | `'Confirmar comportamento de wrap no Stack horizontal'` |
| `'Review align and justify prop coverage'` | `'Revisar a cobertura das props align e justify'` |

---

### `Surface.stories.tsx`

**Token roles:**
| Current | PT-BR |
|---|---|
| `'border color (all variants)'` | `'cor da borda (todas as variantes)'` |
| `'border-radius (default, raised, sunken, interactive)'` | `'raio de borda (default, raised, sunken, interactive)'` |
| `'border-radius (overlay variant)'` | `'raio de borda (variante overlay)'` |
| `'shadow (raised, interactive hover)'` | `'sombra (raised, hover interactive)'` |
| `'shadow (overlay variant)'` | `'sombra (variante overlay)'` |
| `'focus ring (interactive variant)'` | `'anel de foco (variante interactive)'` |
| `'padding (when padded=true)'` | `'padding (quando padded=true)'` |

**PendingReview notes:**
`'Shadow CSS values are provisional — actual X/Y/Blur/Spread/Color values must be confirmed from Figma Effects panel.'`
→ `'Os valores CSS de sombra são provisórios — os valores reais de X/Y/Blur/Spread/Color devem ser confirmados no painel de Efeitos do Figma.'`

**PendingReview items:**
| Current | PT-BR |
|---|---|
| `'Confirm border-radius per variant (small=12px, medium=16px) against DS tokens'` | `'Confirmar border-radius por variante (small=12px, medium=16px) em relação aos tokens DS'` |
| `'Validate shadow values (level-1/2/3) — currently provisional CSS values'` | `'Validar valores de sombra (level-1/2/3) — atualmente são valores CSS provisórios'` |
| `'Review sunken background color (gray-50) against DS neutral palette'` | `'Revisar cor de fundo da variante sunken (gray-50) em relação à paleta neutra DS'` |
| `'Confirm interactive variant hover/focus border widths (medium=2px/large=3px)'` | `'Confirmar larguras de borda de hover/focus da variante interactive (medium=2px/large=3px)'` |
| `'Check border color (#B5A8AD = neutral/400) usage across variants'` | `'Verificar uso da cor de borda (#B5A8AD = neutral/400) em todas as variantes'` |
