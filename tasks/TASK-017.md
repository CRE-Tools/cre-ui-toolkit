---
id: TASK-017
title: Translate Blocks stories to PT-BR
status: pending
model: cheap
model-name: SWE-1.6
context:
  - docs/context/storybook.md
doc-impact: []
export-impact: []
---

## Description

The new language rule requires all Storybook documentation text to be in PT-BR (see `docs/context/storybook.md` — Language section). Block stories in `apps/storybook/src/stories/blocks/` have English text in token `role` fields, `PendingReview` items, and `PendingReview` notes.

Apply all translations listed below. Do not change: export identifiers, component/prop names, token names, categories, values, status, TypeScript types, or code logic.

## Acceptance Criteria

- [ ] All token `role` fields in all 4 block stories are in PT-BR
- [ ] All `PendingReview` `items` in all 4 block stories are in PT-BR
- [ ] All `PendingReview` `notes` in all 4 block stories are in PT-BR
- [ ] TypeScript compiles without errors

## Relevant Data

---

### `Modal.stories.tsx`

**Token roles:**
| Current | PT-BR |
|---|---|
| `'border-radius (modal panel)'` | `'raio de borda (painel do modal)'` |
| `'shadow (modal panel)'` | `'sombra (painel do modal)'` |
| `'focus ring (close button)'` | `'anel de foco (botão fechar)'` |
| `'border color (header/footer)'` | `'cor da borda (header/footer)'` |
| `'horizontal padding (header/footer)'` | `'padding horizontal (header/footer)'` |
| `'vertical padding (header/footer)'` | `'padding vertical (header/footer)'` |
| `'title font family'` | `'família tipográfica do título'` |
| `'body font family'` | `'família tipográfica do corpo'` |

**PendingReview items:**
| Current | PT-BR |
|---|---|
| `'Confirm border-radius-medium (16px) for modal panel'` | `'Confirmar border-radius-medium (16px) para o painel do modal'` |
| `'Validate backdrop blur and opacity with design team'` | `'Validar blur e opacidade do backdrop com a equipe de design'` |
| `'Review close button placement and sizing'` | `'Revisar posicionamento e tamanho do botão fechar'` |
| `'Confirm shadow-level-3 is appropriate for overlay elevation'` | `'Confirmar se shadow-level-3 é adequado para a elevação do overlay'` |
| `'Check danger variant header color against destructive palette'` | `'Verificar cor do header da variante danger em relação à paleta destructive'` |
| `'Validate footer button layout (right-aligned, gap-3)'` | `'Validar layout dos botões do footer (alinhados à direita, gap-3)'` |

---

### `Sidebar.stories.tsx`

**Token roles:**
| Current | PT-BR |
|---|---|
| `'active item background/text'` | `'fundo/texto do item ativo'` |
| `'item hover border-radius'` | `'raio de borda do hover do item'` |
| `'border color (header/footer/divider)'` | `'cor da borda (header/footer/divider)'` |
| `'font family'` | `'família tipográfica'` |
| `'sidebar width (expanded)'` | `'largura da sidebar (expandida)'` |
| `'sidebar width (collapsed)'` | `'largura da sidebar (recolhida)'` |
| `'header height'` | `'altura do header'` |
| `'focus ring (items)'` | `'anel de foco (itens)'` |

**PendingReview notes:**
`'Sidebar is a new pattern — PUCPR DS does not have a sidebar component. Full design sign-off required.'`
→ `'Sidebar é um padrão novo — o DS PUCPR não possui um componente sidebar. Aprovação completa do design é necessária.'`

**PendingReview items:**
| Current | PT-BR |
|---|---|
| `'Confirm active item background (brand/10) and text color (brand) with design'` | `'Confirmar fundo do item ativo (brand/10) e cor do texto (brand) com o design'` |
| `'Review collapsed state — icon-only view needs visual validation'` | `'Revisar estado recolhido — a visualização apenas com ícones precisa de validação visual'` |
| `'Validate badge (notification count) size and positioning'` | `'Validar tamanho e posicionamento do badge de contagem de notificações'` |
| `'Confirm sidebar width (w-64 expanded / w-16 collapsed)'` | `'Confirmar largura da sidebar (w-64 expandida / w-16 recolhida)'` |
| `'Review group label styling (uppercase, tracking-widest, text-[10px])'` | `'Revisar estilo do label de grupo (maiúsculas, tracking-widest, text-[10px])'` |
| `'Check border and divider colors against DS neutral palette'` | `'Verificar cores de borda e divisor em relação à paleta neutra DS'` |

---

### `Table.stories.tsx`

**Token roles:**
| Current | PT-BR |
|---|---|
| `'border color (table cells)'` | `'cor da borda (células da tabela)'` |
| `'border-radius (table wrapper)'` | `'raio de borda (contêiner da tabela)'` |
| `'font family'` | `'família tipográfica'` |
| `'sort indicator / selected row highlight'` | `'indicador de ordenação / destaque da linha selecionada'` |
| `'horizontal padding (cells)'` | `'padding horizontal (células)'` |
| `'vertical padding (cells)'` | `'padding vertical (células)'` |

**PendingReview items:**
| Current | PT-BR |
|---|---|
| `'Confirm header background (gray-50) and text color (gray-500) with design'` | `'Confirmar fundo do cabeçalho (gray-50) e cor do texto (gray-500) com o design'` |
| `'Validate sort indicator icon and active color (brand)'` | `'Validar ícone de indicador de ordenação e cor ativa (brand)'` |
| `'Review selected row highlight (brand/5)'` | `'Revisar destaque da linha selecionada (brand/5)'` |
| `'Confirm border color and weight for table cells'` | `'Confirmar cor e espessura da borda das células da tabela'` |
| `'Check empty state illustration style'` | `'Verificar estilo da ilustração de estado vazio'` |
| `'Validate skeleton animation against DS loading patterns'` | `'Validar a animação do skeleton em relação aos padrões de loading do DS'` |

---

### `HierarchicalTable.stories.tsx`

**Token roles:**
| Current | PT-BR |
|---|---|
| `'border color (table cells)'` | `'cor da borda (células da tabela)'` |
| `'border-radius (table wrapper)'` | `'raio de borda (contêiner da tabela)'` |
| `'font family'` | `'família tipográfica'` |
| `'grouped header background'` | `'fundo do cabeçalho agrupado'` |
| `'horizontal/vertical padding (cells)'` | `'padding horizontal/vertical (células)'` |
| `'focus ring (export button)'` | `'anel de foco (botão de exportar)'` |

**PendingReview notes:**
`'Component built specifically for the analytics dashboard. No direct PUCPR DS reference — full design review needed.'`
→ `'Componente construído especificamente para o dashboard de analytics. Sem referência direta ao DS PUCPR — revisão completa do design é necessária.'`

**PendingReview items:**
| Current | PT-BR |
|---|---|
| `'Review header color for grouped cells (currently brand/maroon) — confirm with design'` | `'Revisar cor do cabeçalho das células agrupadas (atualmente brand/bordô) — confirmar com o design'` |
| `'Validate sticky column shadow/border separator style'` | `'Validar estilo de sombra/borda separadora da coluna fixa'` |
| `'Confirm alternating row colors match DS neutral palette'` | `'Confirmar se as cores alternadas de linhas correspondem à paleta neutra DS'` |
| `'Review CSV export button placement and styling'` | `'Revisar posicionamento e estilo do botão de exportar CSV'` |
| `'Check table behavior on mobile (horizontal scroll UX)'` | `'Verificar comportamento da tabela em mobile (UX de scroll horizontal)'` |
| `'Confirm font-size (xs) is readable at high data density'` | `'Confirmar se o font-size (xs) é legível em alta densidade de dados'` |
