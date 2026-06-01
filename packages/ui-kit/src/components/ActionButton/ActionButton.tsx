import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

/**
 * ActionButton — botão compacto para ações dentro de tabelas.
 *
 * Diferente do Button principal (que é de chamada à ação na página),
 * o ActionButton é discreto e vive dentro de células ou barras de ação.
 *
 * Variantes:
 *   default     → cinza neutro (Copy, Show, Inspect)
 *   destructive → vermelho sutil (Delete)
 *   brand       → bordô PUCPR (ação principal da linha)
 *
 * Uso:
 *   <ActionButton>Copy</ActionButton>
 *   <ActionButton variant="destructive" icon={<TrashIcon />}>Delete</ActionButton>
 */

export type ActionButtonVariant = 'default' | 'destructive' | 'brand'

const variantClasses: Record<ActionButtonVariant, string> = {
  default: [
    'bg-white text-gray-600',
    'border border-[#B5A8AD]/60',
    'hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400',
    'focus-visible:ring-gray-400/30',
  ].join(' '),

  destructive: [
    'bg-white text-red-600',
    'border border-red-200',
    'hover:bg-red-50 hover:border-red-400',
    'focus-visible:ring-red-400/30',
  ].join(' '),

  brand: [
    'bg-brand text-white',
    'border border-brand',
    'hover:bg-brand/90',
    'focus-visible:ring-brand/30',
  ].join(' '),
}

export interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** @default 'default' */
  variant?: ActionButtonVariant
  /** Ícone opcional à esquerda do label. */
  icon?: ReactNode
  children?: ReactNode
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  function ActionButton(
    { variant = 'default', icon, children, className, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'inline-flex items-center gap-1 px-2 py-1 rounded-radius-4',
          'font-body text-xs font-semibold whitespace-nowrap',
          'transition-colors duration-100',
          'focus-visible:outline-none focus-visible:ring-[2px]',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          variantClasses[variant],
          className,
        )}
        {...props}
      >
        {icon && <span className="shrink-0 leading-none">{icon}</span>}
        {children}
      </button>
    )
  },
)

// ─── ActionGroup — agrupa ActionButtons com espaçamento correto ───────────────

export interface ActionGroupProps {
  children: ReactNode
  className?: string
}

export function ActionGroup({ children, className }: ActionGroupProps) {
  return (
    <div className={cn('inline-flex items-center gap-1', className)}>
      {children}
    </div>
  )
}
