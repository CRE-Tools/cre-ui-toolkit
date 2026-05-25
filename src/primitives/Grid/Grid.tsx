import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

// Mapeamento de colunas → classes Tailwind
// Fonte: DS PUCPR Core Web — Grid & States (22/05/2026)
const colsMap = {
  1:  'grid-cols-1',
  2:  'grid-cols-2',
  3:  'grid-cols-3',
  4:  'grid-cols-4',
  6:  'grid-cols-6',
  8:  'grid-cols-8',
  12: 'grid-cols-12',
} as const

type ColsValue = keyof typeof colsMap

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /**
   * Número de colunas base (mobile-first).
   * O grid PUCPR usa 4 em xs, 8 em sm, 12 em md+.
   * Padrão: 4 (segue o grid fluído de mobile).
   */
  cols?: ColsValue
  /**
   * Colunas a partir do breakpoint sm (600px).
   */
  colsSm?: ColsValue
  /**
   * Colunas a partir do breakpoint md (840px).
   */
  colsMd?: ColsValue
  /**
   * Colunas a partir do breakpoint lg (1024px).
   */
  colsLg?: ColsValue
}

export function Grid({
  children,
  cols = 4,
  colsSm,
  colsMd,
  colsLg,
  className,
  ...props
}: GridProps) {
  return (
    <div
      className={cn(
        'grid',
        // Gutter responsivo — fonte: Figma DS PUCPR Core Web
        'gap-2',     // xs: 8px
        'sm:gap-4',  // sm: 16px
        'md:gap-6',  // md: 24px
        // Colunas base e por breakpoint
        colsMap[cols],
        colsSm && `sm:${colsMap[colsSm]}`,
        colsMd && `md:${colsMap[colsMd]}`,
        colsLg && `lg:${colsMap[colsLg]}`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
