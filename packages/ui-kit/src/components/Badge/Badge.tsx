import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

/**
 * Badge — rótulo visual de status ou categoria.
 *
 * Variantes seguem o DS PUCPR (Chromatic / Components > Badge):
 *   default   → neutro, uso genérico
 *   success   → ativo, aprovado, concluído
 *   warning   → pendente, atenção
 *   danger    → erro, rejeitado, bloqueado
 *   info      → informativo, em andamento
 *   draft     → rascunho, não publicado
 *   brand     → destaque com cor primária PUCPR
 *
 * Tokens aplicados:
 *   radius-full = 9999px  (formato pílula)
 *   font-body semibold    (tipografia)
 */

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'draft' | 'brand'
export type BadgeSize    = 'sm' | 'md'

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-gray-100  text-gray-600  border border-gray-200',
  success: 'bg-green-50  text-green-700 border border-green-200',
  warning: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  danger:  'bg-red-50    text-red-700   border border-red-200',
  info:    'bg-blue-50   text-blue-700  border border-blue-200',
  draft:   'bg-gray-100  text-gray-500  border border-gray-300 border-dashed',
  brand:   'bg-brand/10  text-brand     border border-brand/20',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2   py-0.5 text-xs gap-1',
  md: 'px-2.5 py-1   text-xs gap-1.5',
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Variante de status. @default 'default' */
  variant?: BadgeVariant
  /** Tamanho. @default 'md' */
  size?: BadgeSize
  /** Ícone à esquerda do label. */
  icon?: ReactNode
  children: ReactNode
}

export function Badge({
  variant  = 'default',
  size     = 'md',
  icon,
  children,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-body font-semibold rounded-radius-full whitespace-nowrap',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {icon && <span className="shrink-0 leading-none">{icon}</span>}
      {children}
    </span>
  )
}
