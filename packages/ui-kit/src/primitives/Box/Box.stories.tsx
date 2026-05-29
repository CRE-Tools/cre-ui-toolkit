import type { Meta, StoryObj } from '@storybook/react'
import { Box } from './Box'
import { Stack } from '../Stack'
import { Surface } from '../Surface'
import { PendingReview } from '../../storybook/PendingReview'

const meta: Meta<typeof Box> = {
  title: 'Layout/Box',
  component: Box,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'main', 'aside', 'nav', 'header', 'footer'],
      description: 'Tag HTML renderizada. Use para semântica correta sem criar componentes específicos.',
    },
    padding: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
      description: 'Padding interno em múltiplos de 4px.',
    },
    display: {
      control: 'select',
      options: ['block', 'flex', 'grid', 'inline', 'inline-flex', 'hidden'],
    },
    overflow: {
      control: 'select',
      options: ['auto', 'hidden', 'visible', 'scroll', 'x-auto', 'y-auto'],
    },
    fullWidth:  { control: 'boolean' },
    fullHeight: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

function Demo({ label }: { label: string }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded text-sm text-blue-700 p-3 text-center">
      {label}
    </div>
  )
}

export const Playground: Story = {
  args: { padding: 6, as: 'div' },
  render: (args) => (
    <Box {...args} className="border border-dashed border-gray-300 rounded-small">
      <Demo label="Conteúdo dentro do Box" />
    </Box>
  ),
}

export const DiferencaDasOutras: Story = {
  name: 'Diferença — Box vs Surface vs Stack',
  render: () => (
    <Stack direction="vertical" gap={6}>
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Box — estrutura sem aparência
        </p>
        <Box padding={6} className="border-2 border-dashed border-gray-300 rounded-small">
          <Demo label="Box: só padding. Sem cor, borda ou sombra." />
        </Box>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Surface — aparência sem impor estrutura
        </p>
        <Surface variant="raised">
          <Demo label="Surface: cor de fundo, borda, sombra. Sem padding próprio (usa o padrão p-6)." />
        </Surface>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Box + Surface juntos
        </p>
        <Surface variant="raised" padded={false}>
          <Box padding={6}>
            <Demo label="Surface dá aparência. Box controla o padding internamente." />
          </Box>
        </Surface>
      </div>
    </Stack>
  ),
}

export const TagSemantica: Story = {
  name: 'Tag semântica com prop `as`',
  render: () => (
    <Stack direction="vertical" gap={4}>
      {(['section', 'article', 'aside', 'main'] as const).map((tag) => (
        <Box key={tag} as={tag} padding={4} className="border border-dashed border-gray-300 rounded-small">
          <p className="text-sm text-gray-600">
            Renderizado como <code className="bg-gray-100 px-1 rounded">&lt;{tag}&gt;</code>
          </p>
        </Box>
      ))}
    </Stack>
  ),
}

export const OverflowControlado: Story = {
  name: 'Overflow — scroll horizontal',
  render: () => (
    <Box overflow="x-auto" className="border border-[#B5A8AD]/40 rounded-small">
      <Stack direction="horizontal" gap={4} className="p-4" style={{ minWidth: '800px' }}>
        {Array.from({ length: 10 }, (_, i) => (
          <Box
            key={i}
            padding={4}
            className="bg-gray-100 rounded-xsmall flex-shrink-0 w-32 text-center text-sm"
          >
            Item {i + 1}
          </Box>
        ))}
      </Stack>
    </Box>
  ),
}

export const ComposicaoCompleta: Story = {
  name: 'Composição — Box + Stack + Surface',
  render: () => (
    <Box as="section" fullWidth>
      <Stack direction="vertical" gap={6}>
        <Box as="header" padding={6} className="bg-gray-50 border-b border-[#B5A8AD]/30">
          <Stack direction="horizontal" align="center" justify="between">
            <span className="font-heading font-semibold text-lg">Título da seção</span>
            <button className="text-sm px-4 py-2 bg-[#7B1234] text-white rounded-small">
              + Novo
            </button>
          </Stack>
        </Box>

        <Box padding={6}>
          <Stack direction="horizontal" gap={4} wrap>
            {['Card A', 'Card B', 'Card C'].map((label) => (
              <Surface key={label} variant="raised" className="flex-1 min-w-[200px]">
                <p className="font-medium text-sm">{label}</p>
                <p className="text-xs text-gray-500 mt-1">Conteúdo do card</p>
              </Surface>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  ),
}

// ─── Pending Review ──────────────────────────────────────────────────────────

export const PendingReviewStory: Story = {
  name: 'Pending Review',
  tags: ['pending-review'],
  parameters: { layout: 'padded' },
  render: () => (
    <PendingReview
      component="Box"
      items={[
          'Validate padding scale tokens against DS PUCPR spacing system',
          'Confirm 'as' prop polymorphism covers all expected HTML elements',
          'Review if display/overflow props cover all use cases needed',
      ]}
    />
  ),
}
