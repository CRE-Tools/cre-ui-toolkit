import type { Meta, StoryObj } from '@storybook/react'
import { ActionButton, ActionGroup, DataTable, type ColumnDef } from '@cre/ui-kit'
import { PendingReview, TokenUsage } from '@cre/storybook-utils'

const meta = {
  title: 'Components/ActionButton',
  component: ActionButton,
  tags: ['autodocs'],
  args: { children: 'Copy', variant: 'default' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'destructive', 'brand'] },
  },
} satisfies Meta<typeof ActionButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete' },
}

export const Brand: Story = {
  args: { variant: 'brand', children: 'Inspect' },
}

export const AllVariants: Story = {
  name: 'Todas as variantes',
  render: () => (
    <ActionGroup>
      <ActionButton>Copy</ActionButton>
      <ActionButton>Show</ActionButton>
      <ActionButton variant="brand">Inspect</ActionButton>
      <ActionButton variant="destructive">Delete</ActionButton>
    </ActionGroup>
  ),
}

// Contexto real: igual à tela do analytics
type Project = {
  id: string
  name: string
  projectId: string
  created: string
}

const projects: Project[] = [
  { id: '1', name: 'Primeiros Socorros', projectId: 'e6c303ff-e855-47eb-...', created: '26/05/2026' },
  { id: '2', name: 'Anatomia 3D',        projectId: 'a1b2c3d4-e5f6-78ab-...', created: '20/05/2026' },
  { id: '3', name: 'Lab Química',        projectId: 'f9e8d7c6-b5a4-3210-...', created: '15/05/2026' },
]

const columns: ColumnDef<Project>[] = [
  { key: 'name',      header: 'Project Name', accessor: 'name' },
  { key: 'projectId', header: 'Project ID',   accessor: (row) => (
    <ActionGroup>
      <span className="font-mono text-xs text-gray-500 mr-1">{row.projectId}</span>
      <ActionButton>Copy</ActionButton>
    </ActionGroup>
  )},
  { key: 'key',       header: 'Project Key',  accessor: () => (
    <ActionGroup>
      <span className="font-mono text-xs text-gray-400 mr-1">••••••••</span>
      <ActionButton>Show</ActionButton>
      <ActionButton>Copy</ActionButton>
    </ActionGroup>
  )},
  { key: 'created',   header: 'Created',      accessor: 'created' },
  { key: 'actions',   header: '',             align: 'right', accessor: () => (
    <ActionGroup>
      <ActionButton>Edit</ActionButton>
      <ActionButton variant="destructive">Delete</ActionButton>
      <ActionButton variant="brand">Inspect</ActionButton>
    </ActionGroup>
  )},
]

export const InContext: Story = {
  name: 'Contexto — tabela de projetos (analytics)',
  render: () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-gray-900">Projects</h1>
        <ActionButton variant="brand" className="px-4 py-2 text-sm">
          New Project
        </ActionButton>
      </div>
      <DataTable columns={columns} data={projects} />
    </div>
  ),
}

// ─── Token Usage ──────────────────────────────────────────────────────────────

export const TokenUsageStory: Story = {
  name: 'Token Usage',
  parameters: { layout: 'padded' },
  render: () => (
    <TokenUsage
      component="ActionButton"
      tokens={[
        { name: 'radius-4', category: 'radius', value: '4px', role: 'border-radius', status: 'confirmed' },
        { name: 'neutral-400', category: 'color', value: '#B5A8AD', role: 'border color (default variant)', status: 'confirmed' },
        { name: 'brand', category: 'color', value: '#7B1234', role: 'background (brand variant)', status: 'confirmed' },
        { name: 'spacing-8', category: 'spacing', value: '8px', role: 'horizontal padding', status: 'confirmed' },
        { name: 'font-body', category: 'typography', value: 'Source Sans 3', role: 'font family', status: 'confirmed' },
        { name: 'ring', category: 'focus', value: '2px ring', role: 'focus ring', status: 'pending-design' },
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
      component="ActionButton"
        notes="ActionButton was derived from the PUCPR analytics UI screenshot, not from official DS tokens."
      items={[
          'Confirm button sizing matches DS PUCPR spec (height, padding, font-size)',
          'Validate destructive variant color against brand palette',
          'Check disabled state opacity and cursor',
          'Review ActionGroup spacing with design team',
          'Confirm border-radius token (xxsmall = 4px) is correct for this context',
      ]}
    />
  ),
}
