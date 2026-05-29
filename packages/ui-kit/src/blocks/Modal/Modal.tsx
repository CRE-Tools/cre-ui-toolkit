'use client'

import {
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils/cn'
import { Button } from '../../components/Button/Button'

/**
 * Modal — diálogo flutuante para confirmações e formulários inline.
 *
 * Características:
 *   - Renderiza em portal (document.body), fora do fluxo DOM
 *   - Fecha ao pressionar Escape ou clicar no backdrop
 *   - Gerencia foco: traz foco para o modal ao abrir, devolve ao fechar
 *   - Acessível: role="dialog", aria-modal, aria-labelledby
 *
 * Tokens aplicados:
 *   shadow-level-3    — elevação máxima
 *   border-radius-medium = 16px
 *   brand.DEFAULT     — borda de foco e variante danger
 */

export type ModalSize = 'sm' | 'md' | 'lg' | 'full'

const sizeClasses: Record<ModalSize, string> = {
  sm:   'max-w-sm',
  md:   'max-w-lg',
  lg:   'max-w-2xl',
  full: 'max-w-[calc(100vw-2rem)]',
}

export interface ModalProps {
  /** Controla a visibilidade. */
  open: boolean
  /** Callback ao fechar (Escape, backdrop, botão X). */
  onClose: () => void
  /** Título do modal (aparece no header e em aria-labelledby). */
  title?: string
  /** Subtítulo / descrição abaixo do título. */
  description?: string
  /** Conteúdo principal. */
  children?: ReactNode
  /** Área de rodapé — normalmente botões de ação. */
  footer?: ReactNode
  /** Tamanho. @default 'md' */
  size?: ModalSize
  /** Variante danger aplica header em vermelho (confirmações destrutivas). */
  variant?: 'default' | 'danger'
  /** Impede fechar ao clicar no backdrop. */
  preventClose?: boolean
  className?: string
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size        = 'md',
  variant     = 'default',
  preventClose = false,
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId   = 'modal-title'

  // Fecha com Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !preventClose) onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose, preventClose])

  // Bloqueia scroll do body enquanto aberto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Foco no container ao abrir
  useEffect(() => {
    if (open) dialogRef.current?.focus()
  }, [open])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? titleId : undefined}
    >
      {/* Overlay escuro */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={preventClose ? undefined : onClose}
        aria-hidden="true"
      />

      {/* Painel */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={cn(
          'relative w-full bg-white rounded-medium shadow-level-3',
          'flex flex-col max-h-[90vh]',
          'focus:outline-none',
          sizeClasses[size],
          className,
        )}
      >
        {/* Header */}
        {(title || description) && (
          <div
            className={cn(
              'flex items-start justify-between gap-4 px-6 py-5 border-b border-[#B5A8AD]/30',
              variant === 'danger' && 'border-red-100',
            )}
          >
            <div className="flex-1 min-w-0">
              {title && (
                <h2
                  id={titleId}
                  className={cn(
                    'font-heading font-semibold text-lg text-gray-900',
                    variant === 'danger' && 'text-red-700',
                  )}
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 font-body text-sm text-gray-500">{description}</p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar modal"
              className="shrink-0 p-1 rounded-xsmall text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand/30"
            >
              <CloseIcon />
            </button>
          </div>
        )}

        {/* Corpo */}
        {children && (
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {children}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-[#B5A8AD]/30 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}

// ─── Ícone de fechar ─────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

// ─── ConfirmModal — wrapper para confirmações simples ────────────────────────

export interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'default' | 'danger'
  loading?: boolean
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel  = 'Cancelar',
  variant      = 'default',
  loading      = false,
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      variant={variant}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'danger' ? 'destructive' : 'primary'}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </>
      }
    />
  )
}
