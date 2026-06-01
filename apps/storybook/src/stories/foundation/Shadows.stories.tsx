import type { Meta, StoryObj } from '@storybook/react'
import { TokenUsage } from '@cre/storybook-utils'

const meta: Meta = {
  title: 'Foundation/Shadows',
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj

export const AllShadows: Story = {
  name: 'All Shadows',
  render: () => (
    <TokenUsage
      tokens={[
        { name: 'shadow-level-1', category: 'shadow', value: '0px 1px 4px 0px rgba(0, 0, 0, 0.08), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)', role: 'Subtle elevation', status: 'pending-design' },
        { name: 'shadow-level-2', category: 'shadow', value: '0px 4px 12px 0px rgba(0, 0, 0, 0.10), 0px 2px 6px 0px rgba(0, 0, 0, 0.06)', role: 'Medium elevation', status: 'pending-design' },
        { name: 'shadow-level-3', category: 'shadow', value: '0px 12px 32px 0px rgba(0, 0, 0, 0.12), 0px 4px 12px 0px rgba(0, 0, 0, 0.08)', role: 'High elevation', status: 'pending-design' },
      ]}
    />
  ),
}
