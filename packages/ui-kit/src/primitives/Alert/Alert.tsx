import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

/**
 * Alert — faixa de feedback para o usuário.
 *
 * Variantes seguem o DS PUCPR (Chromatic / Components > Alert):
 *   success → operação concluída com sucesso
 *   warning → atenção, ação necessária
 *   danger  → erro crítico ou ação destrutiva
 *   info    → informação neutra
 *
 * Tokens aplicados:
 *   border-radius-xsmall = 8px
 *   border-width-small   = 1px
 */

export type AlertVariant = 'success' | 'warning' | 'danger' | 'info'

const variantClasses: Record<AlertVariant, string> = {
  success: 'bg-green-50  border border-green-200 text-green-800',
  warning: 'bg-yellow-50 border border-yellow-200 text-yellow-800',
  danger:  'bg-red-50    border border-red-200   text-red-800',
  info:    'bg-blue-50   border border-blue-200  text-blue-800',
}

const iconColor: Record<AlertVariant, string> = {
  success: 'text-green-500',
  warning: 'text-yellow-500',
  danger:  'text-red-500',
  info:    'text-blue-500',
}

// ─── Ícones embutidos ────────────────────────────────────────────────────────

function AlertIcon({ variant }: { variant: AlertVariant }) {
  const cls = cn('w-5 h-5 shrink-0 mt-0.5', iconColor[variant])

  if (variant === 'success') {
    return (
      <svg className={cls} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
  if (variant === 'warning') {
    return (
      <svg className={cls} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2L19 18H1L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 8v4M10 14.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  }
  if (variant === 'danger') {
    return (
      <svg className={cls} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  }
  // info
  return (
    <svg className={cls} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 9v5M10 6.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

// ─── Tipos ───────────────────────────────────────────────────────────────────

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Variante visual de feedback. @default 'info' */
  variant?: AlertVariant
  /** Título em destaque. */
  title?: string
  /** Conteúdo / descrição. */
  children?: ReactNode
  /** Oculta o ícone lateral. */
  hideIcon?: boolean
  /** Ação opcional (ex: botão "Desfazer" ou link). */
  action?: ReactNode
}

// ─── Componente ──────────────────────────────────────────────────────────────

export function Alert({
  variant  = 'info',
  title,
  children,
  hideIcon = false,
  action,
  className,
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex gap-3 rounded-xsmall px-4 py-3',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {!hideIcon && <AlertIcon variant={variant} />}

      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-body font-semibold text-sm mb-0.5">{title}</p>
        )}
        {children && (
          <div className="font-body text-sm opacity-90">{children}</div>
        )}
        {action && (
          <div className="mt-2">{action}</div>
        )}
      </div>
    </div>
  )
}
