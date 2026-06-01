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
        { name: 'radius-0', role: 'rounded-radius-0' },
        { name: 'radius-4', role: 'rounded-radius-4' },
        { name: 'radius-8', role: 'rounded-radius-8' },
        { name: 'radius-12', role: 'rounded-radius-12' },
        { name: 'radius-16', role: 'rounded-radius-16' },
        { name: 'radius-32', role: 'rounded-radius-32' },
        { name: 'radius-full', role: 'rounded-radius-full' },
      ]}
    />
  ),
}
