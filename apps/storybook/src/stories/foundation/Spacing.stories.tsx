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
        { name: 'spacing-4', category: 'spacing', value: '4px', role: '4', status: 'confirmed' },
        { name: 'spacing-8', category: 'spacing', value: '8px', role: '8', status: 'confirmed' },
        { name: 'spacing-16', category: 'spacing', value: '16px', role: '16', status: 'confirmed' },
        { name: 'spacing-24', category: 'spacing', value: '24px', role: '24', status: 'confirmed' },
        { name: 'spacing-32', category: 'spacing', value: '32px', role: '32', status: 'confirmed' },
        { name: 'spacing-40', category: 'spacing', value: '40px', role: '40', status: 'confirmed' },
        { name: 'spacing-48', category: 'spacing', value: '48px', role: '48', status: 'confirmed' },
        { name: 'spacing-64', category: 'spacing', value: '64px', role: '64', status: 'confirmed' },
      ]}
    />
  ),
}
