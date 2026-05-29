import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /**
   * fluid → ocupa 100% da largura com margens laterais responsivas (xs → lg).
   * fixed → além das margens, limita max-width: 1440px (xl) e 1920px (wide).
   *
   * Use fluid para a maioria das seções.
   * Use fixed para páginas com conteúdo centralizado em telas grandes.
   */
  variant?: 'fluid' | 'fixed'
}

export function Container({
  children,
  variant = 'fluid',
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'w-full mx-auto',
        // Margens laterais responsivas — fonte: Figma DS PUCPR Core Web
        'px-6',     // xs: 24px
        'sm:px-8',  // sm: 32px
        'md:px-10', // md: 40px
        variant === 'fixed' && [
          'xl:max-w-container-xl',
          'wide:max-w-container-wide',
        ],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
