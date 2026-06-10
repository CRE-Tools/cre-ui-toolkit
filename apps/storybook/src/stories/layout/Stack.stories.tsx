import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from '@cre/cre-web-ui'
import { PendingReview, TokenUsage } from '@cre/storybook-utils'

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: '**vertical** — empilha em coluna (padrão).\n\n**horizontal** — empilha em linha.',
    },
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
      description: 'Espaço entre os filhos em múltiplos de 4px.\n\n`2` = 8px (gutter xs), `4` = 16px (gutter sm), `6` = 24px (gutter md+).',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    wrap: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

function Item({ label, wide }: { label: string; wide?: boolean }) {
  return (
    <div
      className={`bg-blue-100 border border-blue-300 rounded-xsmall px-4 py-3 text-sm text-blue-800 text-center ${wide ? 'w-40' : ''}`}
    >
      {label}
    </div>
  )
}

export const Vertical: Story = {
  name: 'Vertical — empilhamento em coluna',
  args: { direction: 'vertical', gap: 4 },
  render: (args) => (
    <Stack {...args}>
      <Item label="Item 1" />
      <Item label="Item 2" />
      <Item label="Item 3" />
    </Stack>
  ),
}

export const Horizontal: Story = {
  name: 'Horizontal — empilhamento em linha',
  args: { direction: 'horizontal', gap: 4, align: 'center' },
  render: (args) => (
    <Stack {...args}>
      <Item label="Ação A" />
      <Item label="Ação B" />
      <Item label="Ação C" />
    </Stack>
  ),
}

export const GapsDoDS: Story = {
  name: 'Gaps do DS PUCPR (8 / 16 / 24px)',
  render: () => (
    <Stack direction="vertical" gap={8}>
      <div>
        <p className="text-xs text-gray-500 mb-2">gap=2 → 8px (gutter xs)</p>
        <Stack direction="horizontal" gap={2}>
          <Item label="A" /><Item label="B" /><Item label="C" />
        </Stack>
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-2">gap=4 → 16px (gutter sm)</p>
        <Stack direction="horizontal" gap={4}>
          <Item label="A" /><Item label="B" /><Item label="C" />
        </Stack>
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-2">gap=6 → 24px (gutter md/lg/xl)</p>
        <Stack direction="horizontal" gap={6}>
          <Item label="A" /><Item label="B" /><Item label="C" />
        </Stack>
      </div>
    </Stack>
  ),
}

export const ComFormulario: Story = {
  name: 'Caso de uso — formulário vertical',
  render: () => (
    <Stack direction="vertical" gap={4} className="max-w-sm">
      <Stack direction="vertical" gap={1}>
        <label className="text-sm font-medium text-gray-700">Nome</label>
        <input className="border-small border-[#B5A8AD] rounded-small px-3 py-2 text-sm w-full" placeholder="Seu nome" />
      </Stack>
      <Stack direction="vertical" gap={1}>
        <label className="text-sm font-medium text-gray-700">E-mail</label>
        <input className="border-small border-[#B5A8AD] rounded-small px-3 py-2 text-sm w-full" placeholder="seu@email.com" />
      </Stack>
      <Stack direction="horizontal" gap={3} justify="end">
        <button className="text-sm px-4 py-2 border-small border-[#B5A8AD] rounded-small">Cancelar</button>
        <button className="text-sm px-4 py-2 bg-[#7B1234] text-white rounded-small">Salvar</button>
      </Stack>
    </Stack>
  ),
}

export const ComBarraDeAcoes: Story = {
  name: 'Caso de uso — barra de ações',
  render: () => (
    <Stack direction="horizontal" gap={3} align="center" justify="between" className="p-4 border-small border-[#B5A8AD]/40 rounded-small">
      <Stack direction="horizontal" gap={2} align="center">
        <div className="w-8 h-8 rounded-full bg-gray-200" />
        <span className="text-sm font-medium">Título da seção</span>
      </Stack>
      <Stack direction="horizontal" gap={2}>
        <button className="text-sm px-3 py-1.5 border-small border-[#B5A8AD] rounded-xsmall">Filtrar</button>
        <button className="text-sm px-3 py-1.5 bg-[#7B1234] text-white rounded-xsmall">+ Novo</button>
      </Stack>
    </Stack>
  ),
}

export const ComQuebra: Story = {
  name: 'Horizontal com wrap',
  args: { direction: 'horizontal', gap: 3, wrap: true },
  render: (args) => (
    <Stack {...args} className="max-w-xs">
      {Array.from({ length: 8 }, (_, i) => (
        <Item key={i} label={`Tag ${i + 1}`} wide />
      ))}
    </Stack>
  ),
}

// ─── Token Usage ──────────────────────────────────────────────────────────────

export const TokenUsageStory: Story = {
  name: 'Token Usage',
  parameters: { layout: 'padded' },
  render: () => (
    <TokenUsage
      component="Stack"
      tokens={[
        { name: 'spacing-4', category: 'spacing', value: '4px', role: 'gap-1', status: 'confirmed' },
        { name: 'spacing-8', category: 'spacing', value: '8px', role: 'gap-2 (gutter xs)', status: 'confirmed' },
        { name: 'spacing-12', category: 'spacing', value: '12px', role: 'gap-3', status: 'confirmed' },
        { name: 'spacing-16', category: 'spacing', value: '16px', role: 'gap-4 (gutter sm)', status: 'confirmed' },
        { name: 'spacing-20', category: 'spacing', value: '20px', role: 'gap-5', status: 'confirmed' },
        { name: 'spacing-24', category: 'spacing', value: '24px', role: 'gap-6 (gutter md/lg/xl)', status: 'confirmed' },
        { name: 'spacing-32', category: 'spacing', value: '32px', role: 'gap-8', status: 'confirmed' },
        { name: 'spacing-40', category: 'spacing', value: '40px', role: 'gap-10', status: 'confirmed' },
        { name: 'spacing-48', category: 'spacing', value: '48px', role: 'gap-12', status: 'confirmed' },
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
      component="Stack"
      items={[
          'Validar tokens da escala de gap em relação ao sistema de espaçamento DS',
          'Confirmar comportamento de wrap no Stack horizontal',
          'Revisar a cobertura das props align e justify',
      ]}
    />
  ),
}
