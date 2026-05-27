import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta = {
  title: 'Primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    children: 'Ativo',
    variant: 'success',
    size: 'md',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info', 'draft', 'brand'],
    },
    size: { control: 'radio', options: ['sm', 'md'] },
    icon: { control: false },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { variant: 'default', children: 'Geral' },
}

export const Success: Story = {
  args: { variant: 'success', children: 'Ativo' },
}

export const Warning: Story = {
  args: { variant: 'warning', children: 'Pendente' },
}

export const Danger: Story = {
  args: { variant: 'danger', children: 'Bloqueado' },
}

export const Info: Story = {
  args: { variant: 'info', children: 'Em andamento' },
}

export const Draft: Story = {
  args: { variant: 'draft', children: 'Rascunho' },
}

export const Brand: Story = {
  args: { variant: 'brand', children: 'PUCPR' },
}

// Ícone simples inline (sem dep de ícone externo)
const DotIcon = () => (
  <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor" aria-hidden="true">
    <circle cx="3" cy="3" r="3" />
  </svg>
)

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="success" icon={<DotIcon />}>Ativo</Badge>
      <Badge variant="warning" icon={<DotIcon />}>Pendente</Badge>
      <Badge variant="danger"  icon={<DotIcon />}>Bloqueado</Badge>
      <Badge variant="info"    icon={<DotIcon />}>Em andamento</Badge>
      <Badge variant="draft"   icon={<DotIcon />}>Rascunho</Badge>
    </div>
  ),
}

export const AllVariants: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div className="flex gap-2 flex-wrap items-center">
      <Badge variant="default">Geral</Badge>
      <Badge variant="success">Ativo</Badge>
      <Badge variant="warning">Pendente</Badge>
      <Badge variant="danger">Bloqueado</Badge>
      <Badge variant="info">Em andamento</Badge>
      <Badge variant="draft">Rascunho</Badge>
      <Badge variant="brand">PUCPR</Badge>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Badge size="sm" variant="success">sm — Ativo</Badge>
      <Badge size="md" variant="success">md — Ativo</Badge>
    </div>
  ),
}

// Uso real: tabela de usuários
export const InContext: Story = {
  name: 'Contexto — tabela de usuários',
  render: () => (
    <div className="space-y-2 font-body text-sm">
      {[
        { name: 'Ana Souza',    role: 'Admin',    status: 'success' as const, label: 'Ativo' },
        { name: 'Bruno Lima',   role: 'Editor',   status: 'warning' as const, label: 'Pendente' },
        { name: 'Carla Matos',  role: 'Viewer',   status: 'danger'  as const, label: 'Bloqueado' },
        { name: 'Diego Ramos',  role: 'Editor',   status: 'draft'   as const, label: 'Rascunho' },
      ].map((row) => (
        <div key={row.name} className="flex items-center gap-4 p-3 border border-gray-100 rounded-xsmall">
          <span className="w-32 font-semibold">{row.name}</span>
          <span className="w-16 text-gray-500">{row.role}</span>
          <Badge variant={row.status}>{row.label}</Badge>
        </div>
      ))}
    </div>
  ),
}
