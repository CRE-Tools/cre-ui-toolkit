import React, {
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../utils/cn'

/**
 * Sidebar — navegação lateral do painel administrativo.
 *
 * Composição:
 *   <Sidebar>
 *     <SidebarHeader>...</SidebarHeader>
 *     <SidebarNav>
 *       <SidebarGroup label="Principal">
 *         <SidebarItem icon={<Icon />} active>Dashboard</SidebarItem>
 *         <SidebarItem icon={<Icon />} href="/users">Usuários</SidebarItem>
 *       </SidebarGroup>
 *     </SidebarNav>
 *     <SidebarFooter>...</SidebarFooter>
 *   </Sidebar>
 *
 * Tokens:
 *   brand.DEFAULT #7B1234 — item ativo
 *   radius-8 = 8px — item hover
 *   font-body semibold — labels
 */

// ─── Sidebar container ───────────────────────────────────────────────────────

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  /** Largura colapsada (apenas ícones). @default false */
  collapsed?: boolean
}

export function Sidebar({ collapsed = false, children, className, ...props }: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-white border-r border-[#B5A8AD]/30',
        'transition-all duration-200',
        collapsed ? 'w-16' : 'w-64',
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  )
}

// ─── Header ──────────────────────────────────────────────────────────────────

export interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function SidebarHeader({ children, className, ...props }: SidebarHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center px-4 h-16 border-b border-[#B5A8AD]/30 shrink-0',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

export function SidebarNav({ children, className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn('flex-1 overflow-y-auto px-3 py-4 space-y-1', className)}
      aria-label="Navegação principal"
      {...props}
    >
      {children}
    </nav>
  )
}

// ─── Group ───────────────────────────────────────────────────────────────────

export interface SidebarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Rótulo do grupo (oculto quando sidebar está colapsada). */
  label?: string
  children: ReactNode
}

export function SidebarGroup({ label, children, className, ...props }: SidebarGroupProps) {
  return (
    <div className={cn('space-y-0.5', className)} {...props}>
      {label && (
        <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400 font-body">
          {label}
        </p>
      )}
      {children}
    </div>
  )
}

// ─── Item ────────────────────────────────────────────────────────────────────

export interface SidebarItemProps {
  /** Ícone à esquerda (16–20px recomendado). */
  icon?: ReactNode
  /** Marca o item como página atual. */
  active?: boolean
  /** Badge numérico (ex: notificações). */
  badge?: number
  children: ReactNode
  href?: string
  onClick?: React.MouseEventHandler
  className?: string
  /** aria-label para acessibilidade. */
  'aria-label'?: string
}

export function SidebarItem({
  icon,
  active = false,
  badge,
  children,
  className,
  href,
  onClick,
  ...props
}: SidebarItemProps) {
  const sharedClass = cn(
    'group w-full flex items-center gap-3 px-3 py-2 rounded-radius-8',
    'font-body text-sm font-medium transition-colors duration-100',
    'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand/30',
    active
      ? 'bg-brand/10 text-brand'
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
    className,
  )

  const inner = (
    <>
      {icon && (
        <span className={cn(
          'shrink-0 w-5 h-5 flex items-center justify-center',
          active ? 'text-brand' : 'text-gray-400 group-hover:text-gray-600',
        )}>
          {icon}
        </span>
      )}

      <span className="flex-1 truncate">{children}</span>

      {badge !== undefined && badge > 0 && (
        <span className="shrink-0 min-w-[18px] h-[18px] px-1 rounded-radius-full bg-brand text-white text-[10px] font-semibold flex items-center justify-center">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        aria-current={active ? 'page' : undefined}
        className={sharedClass}
        onClick={onClick}
      >
        {inner}
      </a>
    )
  }

  return (
    <button
      type="button"
      aria-current={active ? 'page' : undefined}
      className={sharedClass}
      onClick={onClick}
    >
      {inner}
    </button>
  )
}

// ─── Divider ─────────────────────────────────────────────────────────────────

export function SidebarDivider({ className }: { className?: string }) {
  return <hr className={cn('my-2 border-[#B5A8AD]/30', className)} />
}

// ─── Footer ──────────────────────────────────────────────────────────────────

export interface SidebarFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function SidebarFooter({ children, className, ...props }: SidebarFooterProps) {
  return (
    <div
      className={cn(
        'shrink-0 px-3 py-4 border-t border-[#B5A8AD]/30',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
