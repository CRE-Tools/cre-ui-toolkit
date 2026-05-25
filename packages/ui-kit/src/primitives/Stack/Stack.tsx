import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

// Escala de gap baseada no sistema de 4px do Tailwind
// Alinhada com os gutters do DS PUCPR (8 / 16 / 24px)
const gapMap = {
  0:  'gap-0',
  1:  'gap-1',   // 4px
  2:  'gap-2',   // 8px  ← gutter xs
  3:  'gap-3',   // 12px
  4:  'gap-4',   // 16px ← gutter sm
  5:  'gap-5',   // 20px
  6:  'gap-6',   // 24px ← gutter md/lg/xl
  8:  'gap-8',   // 32px
  10: 'gap-10',  // 40px
  12: 'gap-12',  // 48px
} as const

const alignMap = {
  start:   'items-start',
  center:  'items-center',
  end:     'items-end',
  stretch: 'items-stretch',
  baseline:'items-baseline',
} as const

const justifyMap = {
  start:   'justify-start',
  center:  'justify-center',
  end:     'justify-end',
  between: 'justify-between',
  around:  'justify-around',
  evenly:  'justify-evenly',
} as const

type GapValue     = keyof typeof gapMap
type AlignValue   = keyof typeof alignMap
type JustifyValue = keyof typeof justifyMap

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /**
   * Direção do empilhamento.
   * - vertical  → flex-col (padrão — lista, formulário, seção)
   * - horizontal → flex-row (barra de ações, grupo de botões)
   */
  direction?: 'vertical' | 'horizontal'
  /**
   * Espaço entre os filhos.
   * Valores em múltiplos de 4px. Padrão: 4 (16px).
   */
  gap?: GapValue
  /** Alinhamento no eixo cruzado (align-items). */
  align?: AlignValue
  /** Distribuição no eixo principal (justify-content). */
  justify?: JustifyValue
  /** Permite que os filhos quebrem linha (flex-wrap). */
  wrap?: boolean
}

export function Stack({
  children,
  direction = 'vertical',
  gap = 4,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        'flex',
        direction === 'vertical' ? 'flex-col' : 'flex-row',
        gapMap[gap],
        alignMap[align],
        justifyMap[justify],
        wrap && 'flex-wrap',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
