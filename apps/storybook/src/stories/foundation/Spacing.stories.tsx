import type { Meta, StoryObj } from '@storybook/react'
import { TokenUsage } from '@cre/storybook-utils'

const meta: Meta = {
  title: 'Foundation/Spacing',
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj

export const AllSpacing: Story = {
  name: 'Todos os Espaçamentos',
  render: () => (
    <TokenUsage
      tokens={[
        { name: 'spacing-4', role: '4' },
        { name: 'spacing-8', role: '8' },
        { name: 'spacing-16', role: '16' },
        { name: 'spacing-24', role: '24' },
        { name: 'spacing-32', role: '32' },
        { name: 'spacing-40', role: '40' },
        { name: 'spacing-48', role: '48' },
        { name: 'spacing-64', role: '64' },
        { name: 'spacing-10', role: '10 — fora da escala DS, aguardando decisão' },
        { name: 'spacing-12', role: '12 — fora da escala DS, aguardando decisão' },
      ]}
    />
  ),
}
