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
 * Tokens aplicados (fonte: Figma DS PUCPR Core Web — Foundation > Tokens, 22/08/2025):
 *   border-width-small  = 1px  (separar elementos de background)
 *   border-width-medium = 2px  (hover e pressed)
 *   border-width-large  = 3px  (foco)
 *   border-radius-small  = 12px
 *   border-radius-medium = 16px
 *   border-radius-xlarge = 24px
 *
 * ⚠️  Tokens pendentes de confirmação: cor de borda (neutral palette), sombras.
 */
export type SurfaceVariant =
  | 'default'
  | 'raised'
  | 'overlay'
  | 'sunken'
  | 'interactive'

// Mapeamento de variante → shadow token do DS PUCPR
// shadow-level-1 = elevação sutil  (raised, interactive hover)
// shadow-level-2 = elevação média  (overlay)
// shadow-level-3 = elevação alta   (reservado para tooltip/popover)
// ⚠️ Valores CSS provisórios — confirmar X/Y/Blur/Spread/Cor no painel Efeitos do Figma

const variantClasses: Record<SurfaceVariant, string> = {
  // Sem sombra | border-radius-small (12px) | border-width-small (1px)
  default: [
    'bg-white',
    'border-small border-[#B5A8AD]/50',
    'rounded-small',
  ].join(' '),

  // shadow-level-1 | border-radius-small (12px) | border-width-small (1px)
  raised: [
    'bg-white',
    'border-small border-[#B5A8AD]/30',
    'rounded-small',
    'shadow-level-1',
  ].join(' '),

  // shadow-level-2 | border-radius-medium (16px) | border-width-small (1px)
  overlay: [
    'bg-white',
    'border-small border-[#B5A8AD]/20',
    'rounded-medium',
    'shadow-level-2',
  ].join(' '),

  // Sem sombra | fundo rebaixado | border-radius-small (12px)
  sunken: [
    'bg-gray-50',
    'border-small border-[#B5A8AD]/60',
    'rounded-small',
  ].join(' '),

  // hover: shadow-level-1 + border-width-medium | focus: border-width-large
  interactive: [
    'bg-white',
    'border-small border-[#B5A8AD]/50',
    'rounded-small',
    'cursor-pointer',
    'transition-all duration-150',
    'hover:border-medium hover:border-[#B5A8AD] hover:shadow-level-1',
    'focus-visible:outline-none focus-visible:ring-large focus-visible:ring-[#7B1234]/50',
    'active:scale-[0.99]',
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
