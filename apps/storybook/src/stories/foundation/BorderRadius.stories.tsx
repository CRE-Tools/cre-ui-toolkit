import type { Meta, StoryObj } from '@storybook/react'
import { TokenUsage } from '@cre/storybook-utils'

const meta: Meta = {
  title: 'Foundation/Border Radius',
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj

export const AllRadii: Story = {
  name: 'Todos os Border Radii',
  render: () => (
    <TokenUsage
      tokens={[
        { name: 'radius-0', category: 'radius', value: '0px', role: 'rounded-radius-0', status: 'confirmed' },
        { name: 'radius-4', category: 'radius', value: '4px', role: 'rounded-radius-4', status: 'confirmed' },
        { name: 'radius-8', category: 'radius', value: '8px', role: 'rounded-radius-8', status: 'confirmed' },
        { name: 'radius-12', category: 'radius', value: '12px', role: 'rounded-radius-12', status: 'pending-design' },
        { name: 'radius-16', category: 'radius', value: '16px', role: 'rounded-radius-16', status: 'confirmed' },
        { name: 'radius-32', category: 'radius', value: '32px', role: 'rounded-radius-32', status: 'confirmed' },
        { name: 'radius-full', category: 'radius', value: '9999px', role: 'rounded-radius-full', status: 'confirmed' },
      ]}
    />
  ),
}
