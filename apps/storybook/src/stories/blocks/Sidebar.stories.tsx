import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Sidebar, SidebarHeader, SidebarNav, SidebarGroup,
  SidebarItem, SidebarDivider, SidebarFooter, Badge,
} from '@cre/ui-kit'
import { PendingReview, TokenUsage } from '@cre/storybook-utils'

const meta = {
  title: 'Blocks/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

// ─── Ícones inline ────────────────────────────────────────────────────────────

const icons = {
  dashboard: (
    <svg viewBox="0 0 20 20" fill="none" width="18" height="18" aria-hidden="true">
      <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  users: (
    <svg viewBox="0 0 20 20" fill="none" width="18" height="18" aria-hidden="true">
      <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 17c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 8a3 3 0 010 6M16 17c0-2-1-3.5-2-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  courses: (
    <svg viewBox="0 0 20 20" fill="none" width="18" height="18" aria-hidden="true">
      <path d="M3 5h14M3 10h14M3 15h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  reports: (
    <svg viewBox="0 0 20 20" fill="none" width="18" height="18" aria-hidden="true">
      <path d="M4 14l4-4 3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 20 20" fill="none" width="18" height="18" aria-hidden="true">
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  notifications: (
    <svg viewBox="0 0 20 20" fill="none" width="18" height="18" aria-hidden="true">
      <path d="M10 2a6 6 0 00-6 6v3l-1.5 2.5h15L16 11V8a6 6 0 00-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 16a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  logout: (
    <svg viewBox="0 0 20 20" fill="none" width="18" height="18" aria-hidden="true">
      <path d="M7 3H4a1 1 0 00-1 1v12a1 1 0 001 1h3M13 14l3-4-3-4M16 10H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Default: Omit<Story, 'args'> = {
  render: () => (
    <div className="h-screen flex">
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xsmall bg-brand flex items-center justify-center text-white font-heading font-bold text-sm">
              P
            </div>
            <span className="font-heading font-semibold text-gray-900 text-sm">PUCPR Admin</span>
          </div>
        </SidebarHeader>

        <SidebarNav>
          <SidebarGroup label="Principal">
            <SidebarItem icon={icons.dashboard} active>Dashboard</SidebarItem>
            <SidebarItem icon={icons.users} badge={3}>Usuários</SidebarItem>
            <SidebarItem icon={icons.courses}>Cursos</SidebarItem>
            <SidebarItem icon={icons.reports}>Relatórios</SidebarItem>
          </SidebarGroup>

          <SidebarDivider />

          <SidebarGroup label="Sistema">
            <SidebarItem icon={icons.notifications} badge={12}>Notificações</SidebarItem>
            <SidebarItem icon={icons.settings}>Configurações</SidebarItem>
          </SidebarGroup>
        </SidebarNav>

        <SidebarFooter>
          <div className="flex items-center gap-3 px-1 mb-2">
            <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand font-semibold text-sm shrink-0">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm font-semibold text-gray-900 truncate">Ana Souza</p>
              <p className="font-body text-xs text-gray-400 truncate">ana@pucpr.br</p>
            </div>
          </div>
          <SidebarItem icon={icons.logout} className="text-red-600 hover:bg-red-50 hover:text-red-700">
            Sair
          </SidebarItem>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 bg-gray-50 p-8">
        <p className="font-body text-sm text-gray-400">← Área de conteúdo do painel</p>
      </main>
    </div>
  ),
}

export const Colapsada: Omit<Story, 'args'> = {
  name: 'Colapsável',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [collapsed, setCollapsed] = useState(false)
    return (
      <div className="h-screen flex">
        <Sidebar collapsed={collapsed}>
          <SidebarHeader>
            <div className="w-8 h-8 rounded-xsmall bg-brand flex items-center justify-center text-white font-bold text-sm shrink-0">
              P
            </div>
            {!collapsed && (
              <span className="ml-2 font-heading font-semibold text-gray-900 text-sm">PUCPR Admin</span>
            )}
          </SidebarHeader>

          <SidebarNav>
            <SidebarItem icon={icons.dashboard} active>{!collapsed && 'Dashboard'}</SidebarItem>
            <SidebarItem icon={icons.users}>{!collapsed && 'Usuários'}</SidebarItem>
            <SidebarItem icon={icons.courses}>{!collapsed && 'Cursos'}</SidebarItem>
            <SidebarItem icon={icons.settings}>{!collapsed && 'Configurações'}</SidebarItem>
          </SidebarNav>
        </Sidebar>

        <main className="flex-1 bg-gray-50 p-8 flex flex-col gap-4">
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="self-start px-4 py-2 rounded-xsmall border border-gray-200 font-body text-sm bg-white hover:bg-gray-50"
          >
            {collapsed ? 'Expandir →' : '← Colapsar'}
          </button>
          <p className="font-body text-sm text-gray-400">Sidebar colapsável com apenas ícones.</p>
        </main>
      </div>
    )
  },
}

export const ComBadges: Omit<Story, 'args'> = {
  name: 'Com badges de notificação',
  render: () => (
    <div className="h-64 flex">
      <Sidebar>
        <SidebarNav>
          <SidebarItem icon={icons.dashboard} active>Dashboard</SidebarItem>
          <SidebarItem icon={icons.users} badge={5}>Usuários</SidebarItem>
          <SidebarItem icon={icons.notifications} badge={99}>Notificações</SidebarItem>
          <SidebarItem icon={icons.notifications} badge={120}>Mensagens</SidebarItem>
        </SidebarNav>
      </Sidebar>
    </div>
  ),
}

// ─── Token Usage ──────────────────────────────────────────────────────────────

export const TokenUsageStory: Omit<Story, 'args'> = {
  name: 'Token Usage',
  parameters: { layout: 'padded' },
  render: () => (
    <TokenUsage
      component="Sidebar"
      tokens={[
        { name: 'brand', category: 'color', value: '#7B1234', role: 'active item background/text', status: 'confirmed' },
        { name: 'radius-8', category: 'radius', value: '8px', role: 'item hover border-radius', status: 'confirmed' },
        { name: 'neutral-400', category: 'color', value: '#B5A8AD', role: 'border color (header/footer/divider)', status: 'confirmed' },
        { name: 'font-body', category: 'typography', value: 'Source Sans 3', role: 'font family', status: 'confirmed' },
        { name: 'spacing-16', category: 'spacing', value: '16px', role: 'sidebar width (expanded)', status: 'pending-design' },
        { name: 'spacing-64', category: 'spacing', value: '64px', role: 'sidebar width (collapsed)', status: 'pending-design' },
        { name: 'spacing-64', category: 'spacing', value: '64px', role: 'header height', status: 'pending-design' },
        { name: 'ring', category: 'focus', value: '3px ring', role: 'focus ring (items)', status: 'pending-design' },
      ]}
    />
  ),
}

// ─── Pending Review ──────────────────────────────────────────────────────────

export const PendingReviewStory: Omit<Story, 'args'> = {
  name: 'Pending Review',
  tags: ['pending-review'],
  parameters: { layout: 'padded' },
  render: () => (
    <PendingReview
      component="Sidebar"
        notes="Sidebar is a new pattern — PUCPR DS does not have a sidebar component. Full design sign-off required."
      items={[
          'Confirm active item background (brand/10) and text color (brand) with design',
          'Review collapsed state — icon-only view needs visual validation',
          'Validate badge (notification count) size and positioning',
          'Confirm sidebar width (w-64 expanded / w-16 collapsed)',
          'Review group label styling (uppercase, tracking-widest, text-[10px])',
          'Check border and divider colors against DS neutral palette',
      ]}
    />
  ),
}
