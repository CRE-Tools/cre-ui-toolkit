---
id: TASK-015
title: Translate Component stories to PT-BR
status: pending
model: cheap
model-name: SWE-1.6
context:
  - docs/context/storybook.md
doc-impact: []
export-impact: []
---

## Description

The new language rule requires all Storybook documentation text to be in PT-BR (see `docs/context/storybook.md` — Language section). Component stories in `apps/storybook/src/stories/components/` have English text in three places:

1. Token `role` fields inside `TokenUsage`
2. `PendingReview` `items` arrays
3. `PendingReview` `notes` strings

Apply all translations listed below. Do not change: export identifiers, component/prop names, token names, token categories/values/status, TypeScript types, or code logic.

## Acceptance Criteria

- [ ] All token `role` fields in all 5 component stories are in PT-BR
- [ ] All `PendingReview` `items` in all 5 component stories are in PT-BR
- [ ] All `PendingReview` `notes` in all 5 component stories are in PT-BR
- [ ] TypeScript compiles without errors

## Relevant Data

---

### `Button.stories.tsx`

**Token roles:**
| Current | PT-BR |
|---|---|
| `'background (primary variant)'` | `'fundo (variante primary)'` |
| `'border-radius (all sizes)'` | `'raio de borda (todos os tamanhos)'` |
| `'horizontal padding (sm size)'` | `'padding horizontal (tamanho sm)'` |
| `'horizontal padding (md size)'` | `'padding horizontal (tamanho md)'` |
| `'horizontal padding (lg size)'` | `'padding horizontal (tamanho lg)'` |
| `'font family'` | `'família tipográfica'` |
| `'focus ring (all variants)'` | `'anel de foco (todas as variantes)'` |

**PendingReview notes:**
`'Destructive variant was added for admin panel needs — not in PUCPR DS. Needs explicit approval.'`
→ `'A variante destructive foi adicionada para necessidades do painel admin — não está no DS PUCPR. Requer aprovação explícita.'`

**PendingReview items:**
| Current | PT-BR |
|---|---|
| `'Confirm all 6 variants (primary/secondary/tertiary/on-brand x3) match DS PUCPR Storybook'` | `'Confirmar se todas as 6 variantes (primary/secondary/tertiary/on-brand x3) correspondem ao Storybook DS PUCPR'` |
| `'Validate hover, focus, active, and disabled states with design team'` | `'Validar estados hover, focus, active e disabled com a equipe de design'` |
| `'Review loading spinner animation and sizing'` | `'Revisar animação e tamanho do spinner de loading'` |
| `'Confirm border-radius token for each size (sm/md/lg)'` | `'Confirmar token de border-radius para cada tamanho (sm/md/lg)'` |
| `'Check on-brand variants on dark background — need real brand background to test'` | `'Verificar variantes on-brand sobre fundo escuro — necessário fundo real da marca para testar'` |
| `'Validate font-size and weight per size'` | `'Validar font-size e peso tipográfico por tamanho'` |

---

### `ActionButton.stories.tsx`

**Token roles:**
| Current | PT-BR |
|---|---|
| `'border-radius'` | `'raio de borda'` |
| `'border color (default variant)'` | `'cor da borda (variante default)'` |
| `'background (brand variant)'` | `'fundo (variante brand)'` |
| `'horizontal padding'` | `'padding horizontal'` |
| `'font family'` | `'família tipográfica'` |
| `'focus ring'` | `'anel de foco'` |

**PendingReview notes:**
`'ActionButton was derived from the PUCPR analytics UI screenshot, not from official DS tokens.'`
→ `'ActionButton foi derivado do screenshot da UI de analytics da PUCPR, não de tokens oficiais do DS.'`

**PendingReview items:**
| Current | PT-BR |
|---|---|
| `'Confirm button sizing matches DS PUCPR spec (height, padding, font-size)'` | `'Confirmar se o tamanho do botão corresponde à especificação DS PUCPR (altura, padding, font-size)'` |
| `'Validate destructive variant color against brand palette'` | `'Validar cor da variante destructive em relação à paleta da marca'` |
| `'Check disabled state opacity and cursor'` | `'Verificar opacidade e cursor no estado disabled'` |
| `'Review ActionGroup spacing with design team'` | `'Revisar espaçamento do ActionGroup com a equipe de design'` |
| `'Confirm border-radius token (xxsmall = 4px) is correct for this context'` | `'Confirmar se o token de border-radius (xxsmall = 4px) é correto para este contexto'` |

---

### `Badge.stories.tsx`

**Token roles:**
| Current | PT-BR |
|---|---|
| `'border-radius (pill shape)'` | `'raio de borda (formato pill)'` |
| `'font family'` | `'família tipográfica'` |
| `'text/background (brand variant)'` | `'texto/fundo (variante brand)'` |
| `'horizontal padding (sm size)'` | `'padding horizontal (tamanho sm)'` |
| `'horizontal padding (md size)'` | `'padding horizontal (tamanho md)'` |

**PendingReview items:**
| Current | PT-BR |
|---|---|
| `'Confirm all variant colors against DS PUCPR official palette'` | `'Confirmar todas as cores de variante em relação à paleta oficial DS PUCPR'` |
| `'Validate border-radius-pill usage (9999px) — check if DS uses a smaller radius'` | `'Validar uso do border-radius-pill (9999px) — verificar se o DS usa um raio menor'` |
| `'Review icon sizing and alignment within badge'` | `'Revisar tamanho e alinhamento do ícone dentro do badge'` |
| `'Check font-size and weight (currently xs/semibold)'` | `'Verificar font-size e peso tipográfico (atualmente xs/semibold)'` |

---

### `Alert.stories.tsx`

**Token roles:**
| Current | PT-BR |
|---|---|
| `'border-radius'` | `'raio de borda'` |
| `'font family'` | `'família tipográfica'` |
| `'horizontal padding'` | `'padding horizontal'` |
| `'vertical padding'` | `'padding vertical'` |
| `'variant backgrounds'` | `'fundos de variante'` |

**PendingReview notes:**
`'Colors are approximated from PUCPR Storybook visual. Confirm exact hex values with design.'`
→ `'As cores foram aproximadas a partir do visual do Storybook PUCPR. Confirmar valores hex exatos com o design.'`

**PendingReview items:**
| Current | PT-BR |
|---|---|
| `'Confirm semantic colors (success/warning/danger/info) match DS PUCPR palette'` | `'Confirmar se as cores semânticas (success/warning/danger/info) correspondem à paleta DS PUCPR'` |
| `'Validate icon set — may need to switch to Font Awesome once token is available'` | `'Validar conjunto de ícones — pode ser necessário migrar para Font Awesome quando o token estiver disponível'` |
| `'Review with-action layout for different screen sizes'` | `'Revisar o layout com ação em diferentes tamanhos de tela'` |
| `'Check color contrast ratios (WCAG AA)'` | `'Verificar taxas de contraste de cor (WCAG AA)'` |

---

### `Input.stories.tsx`

**Token roles:**
| Current | PT-BR |
|---|---|
| `'border-radius'` | `'raio de borda'` |
| `'placeholder and border idle'` | `'placeholder e borda em repouso'` |
| `'focus ring'` | `'anel de foco'` |
| `'font family'` | `'família tipográfica'` |
| `'horizontal padding'` | `'padding horizontal'` |
| `'vertical padding'` | `'padding vertical'` |
| `'focus ring'` (second entry) | `'anel de foco'` |

**PendingReview items:**
| Current | PT-BR |
|---|---|
| `'Confirm focus ring color and width (currently brand/3px) match DS spec'` | `'Confirmar cor e largura do anel de foco (atualmente brand/3px) em relação à especificação DS'` |
| `'Validate error/success border colors against DS semantic palette'` | `'Validar cores de borda de erro/sucesso em relação à paleta semântica DS'` |
| `'Review label font-weight (semibold) and size (sm)'` | `'Revisar font-weight do label (semibold) e tamanho (sm)'` |
| `'Check textarea resize behavior and min-height'` | `'Verificar comportamento de redimensionamento e min-height do textarea'` |
| `'Confirm character counter styling and positioning'` | `'Confirmar estilo e posicionamento do contador de caracteres'` |
| `'Validate icon sizing and spacing inside field'` | `'Validar tamanho e espaçamento do ícone dentro do campo'` |
