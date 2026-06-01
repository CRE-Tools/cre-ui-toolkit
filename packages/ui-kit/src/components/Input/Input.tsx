import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react'
import { cn } from '../../utils/cn'

/**
 * Input — campo de texto do painel administrativo.
 *
 * Suporta input de linha única e textarea multiline.
 * Estados de validação seguem o DS PUCPR (error, success, disabled).
 *
 * Tokens aplicados:
 *   radius-8 = 8px  (campo)
 *   border-width-small   = 1px  (borda padrão)
 *   border-width-medium  = 2px  (hover)
 *   border-width-large   = 3px  (foco)
 *   brand.DEFAULT = #7B1234     (ring de foco)
 *   neutral.400   = #B5A8AD    (placeholder e borda idle)
 */

export type InputStatus = 'default' | 'error' | 'success'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label visível acima do campo. */
  label?: string
  /** Texto auxiliar abaixo do campo. */
  helperText?: string
  /** Mensagem de erro (ativa status 'error' automaticamente). */
  errorMessage?: string
  /** Mensagem de sucesso (ativa status 'success' automaticamente). */
  successMessage?: string
  /** Estado de validação. Inferido de errorMessage/successMessage se omitido. */
  status?: InputStatus
  /** Ícone à esquerda dentro do campo. */
  leftIcon?: ReactNode
  /** Ícone à direita dentro do campo. */
  rightIcon?: ReactNode
  /** Ocupa 100% da largura. @default true */
  fullWidth?: boolean
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  errorMessage?: string
  successMessage?: string
  status?: InputStatus
  /** Mostra contador de caracteres (requer maxLength). */
  showCount?: boolean
  fullWidth?: boolean
}

// ─── Estilos base do campo ──────────────────────────────────────────────────

const baseField = [
  'w-full bg-white font-body text-sm text-gray-900',
  'border border-neutral-400 rounded-radius-8',
  'transition-colors duration-150',
  'placeholder:text-neutral-400',
  'hover:border-gray-400',
  'focus:outline-none focus:border-brand focus:ring-[3px] focus:ring-brand/20',
  'disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-gray-200',
].join(' ')

const statusField: Record<InputStatus, string> = {
  default: '',
  error:   'border-red-500 focus:border-red-500 focus:ring-red-500/20',
  success: 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
}

// ─── Ícone de status ────────────────────────────────────────────────────────

function StatusIcon({ status }: { status: InputStatus }) {
  if (status === 'error') {
    return (
      <svg className="w-4 h-4 text-red-500 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  }
  if (status === 'success') {
    return (
      <svg className="w-4 h-4 text-green-500 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
  return null
}

// ─── Input ──────────────────────────────────────────────────────────────────

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      helperText,
      errorMessage,
      successMessage,
      status: statusProp,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className,
      id: idProp,
      disabled,
      ...props
    },
    ref,
  ) {
    const autoId = useId()
    const id = idProp ?? autoId

    // Infere status a partir das mensagens se não passado explicitamente
    const status: InputStatus =
      statusProp ??
      (errorMessage   ? 'error'   :
       successMessage ? 'success' :
       'default')

    const message = errorMessage ?? successMessage ?? helperText
    const messageColor =
      status === 'error'   ? 'text-red-600' :
      status === 'success' ? 'text-green-600' :
      'text-gray-500'

    const showRightSlot = rightIcon || status !== 'default'

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', className)}>
        {label && (
          <label
            htmlFor={id}
            className="font-body text-sm font-semibold text-gray-700"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-gray-400 pointer-events-none">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            className={cn(
              baseField,
              statusField[status],
              'h-10 px-3 py-2',
              leftIcon  && 'pl-9',
              showRightSlot && 'pr-9',
            )}
            {...props}
          />

          <span className="absolute right-3 flex items-center gap-1 pointer-events-none">
            <StatusIcon status={status} />
            {rightIcon && status === 'default' && (
              <span className="text-gray-400">{rightIcon}</span>
            )}
          </span>
        </div>

        {message && (
          <p className={cn('font-body text-xs', messageColor)}>{message}</p>
        )}
      </div>
    )
  },
)

// ─── Textarea ───────────────────────────────────────────────────────────────

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      label,
      helperText,
      errorMessage,
      successMessage,
      status: statusProp,
      showCount = false,
      fullWidth = true,
      className,
      id: idProp,
      maxLength,
      value,
      defaultValue,
      ...props
    },
    ref,
  ) {
    const autoId = useId()
    const id = idProp ?? autoId

    const status: InputStatus =
      statusProp ??
      (errorMessage   ? 'error'   :
       successMessage ? 'success' :
       'default')

    const message = errorMessage ?? successMessage ?? helperText
    const messageColor =
      status === 'error'   ? 'text-red-600' :
      status === 'success' ? 'text-green-600' :
      'text-gray-500'

    // Contagem controlada apenas quando value é string (controlled)
    const charCount = typeof value === 'string' ? value.length : undefined

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', className)}>
        {label && (
          <label
            htmlFor={id}
            className="font-body text-sm font-semibold text-gray-700"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={id}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          className={cn(
            baseField,
            statusField[status],
            'px-3 py-2 resize-y min-h-[6rem]',
          )}
          {...props}
        />

        <div className="flex justify-between items-center">
          {message && (
            <p className={cn('font-body text-xs', messageColor)}>{message}</p>
          )}
          {showCount && maxLength && (
            <p className="font-body text-xs text-gray-400 ml-auto">
              {charCount ?? 0}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  },
)
