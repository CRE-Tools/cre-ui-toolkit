import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

/**
 * Variantes de superfície — definem aparência visual de uma área de conteúdo.
 *
 * default     → área de conteúdo base, sem elevação. Uso geral.
 * raised      → card elevado com sombra leve. Para Cards e Painéis.
 * overlay     → camada flutuante com sombra forte. Para Modal e Drawer.
 * sunken      → área rebaixada, fundo levemente acinzentado. Para áreas de input.
 * interactive → clicável, com hover e focus visíveis. Para itens de lista e tiles.
 *
 * ⚠️  Tokens de cor, sombra e radius precisam ser validados com o Figma > Tokens.
 *     Os valores atuais são provisórios, baseados no neutral/400 = #B5A8AD confirmado.
 */
export type SurfaceVariant =
  | 'default'
  | 'raised'
  | 'overlay'
  | 'sunken'
  | 'interactive'

const variantClasses: Record<SurfaceVariant, string> = {
  // Área base: borda sutil, sem sombra, fundo branco
  default: [
    'bg-white',
    'border border-[#B5A8AD]/50', // neutral/400 com 50% opacidade
    'rounded-lg',                  // ⚠️ radius provisório — validar Figma > Tokens
  ].join(' '),

  // Card elevado: sombra leve
  raised: [
    'bg-white',
    'border border-[#B5A8AD]/30',
    'rounded-lg',
    'shadow-md',                   // ⚠️ shadow provisório — validar Figma > Tokens
  ].join(' '),

  // Overlay (Modal, Drawer): sombra forte
  overlay: [
    'bg-white',
    'border border-[#B5A8AD]/20',
    'rounded-xl',
    'shadow-2xl',
  ].join(' '),

  // Rebaixada (inputs, áreas de destaque interno): fundo acinzentado
  sunken: [
    'bg-gray-50',
    'border border-[#B5A8AD]/60',
    'rounded-lg',
  ].join(' '),

  // Interativa (lista, tile clicável): reage ao hover e focus
  interactive: [
    'bg-white',
    'border border-[#B5A8AD]/50',
    'rounded-lg',
    'cursor-pointer',
    'transition-all duration-150',
    'hover:shadow-md hover:border-[#B5A8AD]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B1234]/50',
    'active:shadow-sm active:scale-[0.99]',
  ].join(' '),
}

export interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /**
   * Variante visual da superfície.
   * @default 'default'
   */
  variant?: SurfaceVariant
  /**
   * Adiciona padding interno padrão.
   * Desative (false) quando o filho controla o próprio espaçamento.
   * @default true
   */
  padded?: boolean
}

export function Surface({
  children,
  variant = 'default',
  padded = true,
  className,
  ...props
}: SurfaceProps) {
  return (
    <div
      className={cn(
        variantClasses[variant],
        padded && 'p-6',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
