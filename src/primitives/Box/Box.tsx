import { createElement, type HTMLAttributes, type ReactNode, type ElementType } from 'react'
import { cn } from '../../utils/cn'

/**
 * Box — wrapper genérico de layout.
 *
 * Use Box quando precisar de um container com padding, overflow ou display
 * controlados por prop, sem semântica visual (não tem cor, borda ou sombra).
 *
 * Diferença em relação às outras primitivas:
 *   Box     → estrutura sem aparência   ("onde cabe")
 *   Surface → aparência sem estrutura   ("como parece")
 *   Stack   → direção e gap entre itens ("como se organiza")
 *   Grid    → colunas e gutters         ("como se distribui")
 *
 * A prop `as` permite renderizar qualquer tag HTML (section, article, main, aside…)
 * mantendo todas as outras props. Útil para semântica HTML correta sem criar
 * componentes específicos para cada tag.
 */

const paddingMap = {
  0:  'p-0',
  1:  'p-1',   // 4px
  2:  'p-2',   // 8px
  3:  'p-3',   // 12px
  4:  'p-4',   // 16px
  5:  'p-5',   // 20px
  6:  'p-6',   // 24px
  8:  'p-8',   // 32px
  10: 'p-10',  // 40px
  12: 'p-12',  // 48px
} as const

const displayMap = {
  block:        'block',
  flex:         'flex',
  grid:         'grid',
  inline:       'inline',
  'inline-flex': 'inline-flex',
  hidden:       'hidden',
} as const

const overflowMap = {
  auto:    'overflow-auto',
  hidden:  'overflow-hidden',
  visible: 'overflow-visible',
  scroll:  'overflow-scroll',
  'x-auto':   'overflow-x-auto',
  'y-auto':   'overflow-y-auto',
} as const

type PaddingValue  = keyof typeof paddingMap
type DisplayValue  = keyof typeof displayMap
type OverflowValue = keyof typeof overflowMap

export interface BoxProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
  /**
   * Tag HTML a renderizar. Padrão: div.
   * Use para semântica correta: section, article, main, aside, nav, header, footer.
   */
  as?: ElementType
  /** Padding interno uniforme (múltiplos de 4px). */
  padding?: PaddingValue
  /** Propriedade CSS display. */
  display?: DisplayValue
  /** Controle de overflow. */
  overflow?: OverflowValue
  /** Largura total (w-full). */
  fullWidth?: boolean
  /** Altura total do viewport (min-h-screen). */
  fullHeight?: boolean
}

export function Box({
  children,
  as: Tag = 'div',
  padding,
  display,
  overflow,
  fullWidth = false,
  fullHeight = false,
  className,
  ...props
}: BoxProps) {
  return createElement(
    Tag,
    {
      className: cn(
        padding   && paddingMap[padding],
        display   && displayMap[display],
        overflow  && overflowMap[overflow],
        fullWidth  && 'w-full',
        fullHeight && 'min-h-screen',
        className,
      ),
      ...props,
    },
    children,
  )
}
