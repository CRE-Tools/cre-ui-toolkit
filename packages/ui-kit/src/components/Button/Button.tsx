import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../utils/cn'

/**
 * Button — ação primária da interface.
 *
 * Variantes seguem o DS PUCPR Core Web (Chromatic Storybook / Components > Button):
 *   primary            → fundo bordô, texto branco. Ação principal.
 *   secondary          → borda bordô, texto bordô, fundo transparente. Ação secundária.
 *   tertiary           → sem borda/fundo, texto bordô. Ação sutil / link-like.
 *   on-brand-primary   → fundo branco, texto bordô. Uso sobre fundos escuros/bordô.
 *   on-brand-secondary → borda branca, texto branco, fundo transparente.
 *   on-brand-tertiary  → sem borda/fundo, texto branco.
 *   destructive        → fundo vermelho. Ações destrutivas (deletar, remover).
 *
 * Tokens aplicados (fonte: Figma DS PUCPR Core Web — Foundation > Tokens):
 *   border-radius-xsmall = 8px  (border-radius do botão)
 *   border-width-small   = 1px  (borda padrão)
 *   border-width-large   = 3px  (anel de foco)
 *   brand.DEFAULT = #7B1234     (cor primária)
 */

// ─── Variantes ─────────────────────────────────────────────────────────────

const variantClasses = {
  primary: [
    'bg-brand text-white border border-transparent',
    'hover:bg-brand/90',
    'focus-visible:ring-[3px] focus-visible:ring-brand/40 focus-visible:ring-offset-2',
    'active:scale-[0.98]',
  ].join(' '),

  secondary: [
    'bg-transparent text-brand border border-brand',
    'hover:bg-brand/5',
    'focus-visible:ring-[3px] focus-visible:ring-brand/40 focus-visible:ring-offset-2',
    'active:scale-[0.98]',
  ].join(' '),

  tertiary: [
    'bg-transparent text-brand border border-transparent',
    'hover:bg-brand/5',
    'focus-visible:ring-[3px] focus-visible:ring-brand/40 focus-visible:ring-offset-2',
    'active:scale-[0.98]',
  ].join(' '),

  'on-brand-primary': [
    'bg-white text-brand border border-transparent',
    'hover:bg-white/90',
    'focus-visible:ring-[3px] focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand',
    'active:scale-[0.98]',
  ].join(' '),

  'on-brand-secondary': [
    'bg-transparent text-white border border-white',
    'hover:bg-white/10',
    'focus-visible:ring-[3px] focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand',
    'active:scale-[0.98]',
  ].join(' '),

  'on-brand-tertiary': [
    'bg-transparent text-white border border-transparent',
    'hover:bg-white/10',
    'focus-visible:ring-[3px] focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand',
    'active:scale-[0.98]',
  ].join(' '),

  destructive: [
    'bg-red-600 text-white border border-transparent',
    'hover:bg-red-700',
    'focus-visible:ring-[3px] focus-visible:ring-red-500/40 focus-visible:ring-offset-2',
    'active:scale-[0.98]',
  ].join(' '),
} as const

// ─── Tamanhos ──────────────────────────────────────────────────────────────

const sizeClasses = {
  sm: 'h-8  px-3   text-sm  gap-1.5 rounded-xsmall',
  md: 'h-10 px-4   text-sm  gap-2   rounded-xsmall',
  lg: 'h-12 px-6   text-base gap-2.5 rounded-xsmall',
} as const

// ─── Spinner ───────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor" strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

// ─── Tipos ─────────────────────────────────────────────────────────────────

export type ButtonVariant = keyof typeof variantClasses
export type ButtonSize    = keyof typeof sizeClasses

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visual. @default 'primary' */
  variant?: ButtonVariant
  /** Tamanho do botão. @default 'md' */
  size?: ButtonSize
  /** Mostra spinner e desabilita interação. */
  loading?: boolean
  /** Ícone à esquerda do label. */
  leftIcon?: ReactNode
  /** Ícone à direita do label. */
  rightIcon?: ReactNode
  /** Ocupa 100% da largura do container. */
  fullWidth?: boolean
}

// ─── Componente ────────────────────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant   = 'primary',
      size      = 'md',
      loading   = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      className,
      ...props
    },
    ref,
  ) {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        className={cn(
          // Base
          'inline-flex items-center justify-center font-body font-semibold',
          'transition-all duration-150 select-none whitespace-nowrap',
          'focus-visible:outline-none',
          // Variante e tamanho
          variantClasses[variant],
          sizeClasses[size],
          // Estado desabilitado
          isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          // Largura total
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {loading ? (
          <Spinner />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}

        {children && (
          <span>{children}</span>
        )}

        {!loading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </button>
    )
  },
)
