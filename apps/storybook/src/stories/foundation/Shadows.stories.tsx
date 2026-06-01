import type { Meta, StoryObj } from '@storybook/react'
import { TokenUsage } from '@cre/storybook-utils'

const meta: Meta = {
  title: 'Foundation/Shadows',
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj

export const AllShadows: Story = {
  name: 'Todas as Sombras',
  render: () => (
    <TokenUsage
      tokens={[
        { name: 'shadow-level-1', role: 'Elevação sutil' },
        { name: 'shadow-level-2', role: 'Elevação média' },
        { name: 'shadow-level-3', role: 'Elevação alta' },
      ]}
    />
  ),
}
