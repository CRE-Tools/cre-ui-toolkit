import type { Meta, StoryObj } from '@storybook/react'
import { TokenUsage } from '@cre/storybook-utils'

const meta: Meta = {
  title: 'Foundation/Focus',
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj

export const AllFocusPatterns: Story = {
  name: 'All Focus Patterns',
  render: () => (
    <TokenUsage
      tokens={[
        { name: 'focus-standard', category: 'focus', value: 'ring', role: 'Standard interactive elements', status: 'pending-design' },
        { name: 'focus-on-brand', category: 'focus', value: 'ring white/60', role: 'Elements on brand-colored backgrounds', status: 'pending-design' },
        { name: 'focus-compact', category: 'focus', value: 'ring-2', role: 'Compact elements', status: 'pending-design' },
      ]}
    />
  ),
}
