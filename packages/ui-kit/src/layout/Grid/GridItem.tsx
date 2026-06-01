import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

const spanMap = {
  1:  'col-span-1',
  2:  'col-span-2',
  3:  'col-span-3',
  4:  'col-span-4',
  6:  'col-span-6',
  8:  'col-span-8',
  12: 'col-span-12',
  full: 'col-span-full',
} as const

type SpanValue = keyof typeof spanMap

export interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Quantas colunas o item ocupa (mobile-first). */
  span?: SpanValue
  /** Span a partir do breakpoint sm (600px). */
  spanSm?: SpanValue
  /** Span a partir do breakpoint md (840px). */
  spanMd?: SpanValue
  /** Span a partir do breakpoint lg (1024px). */
  spanLg?: SpanValue
}

export function GridItem({
  children,
  span = 'full',
  spanSm,
  spanMd,
  spanLg,
  className,
  ...props
}: GridItemProps) {
  return (
    <div
      className={cn(
        spanMap[span],
        spanSm && `sm:${spanMap[spanSm]}`,
        spanMd && `md:${spanMap[spanMd]}`,
        spanLg && `lg:${spanMap[spanLg]}`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
