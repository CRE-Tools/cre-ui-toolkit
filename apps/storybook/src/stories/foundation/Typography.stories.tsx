import type { Meta, StoryObj } from '@storybook/react'
import { TokenUsage } from '@cre/storybook-utils'

const meta: Meta = {
  title: 'Foundation/Typography',
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj

export const AllTypeStyles: Story = {
  name: 'All Type Styles',
  render: () => (
    <TokenUsage
      tokens={[
        { name: 'Heading/H1', category: 'typography', value: '32px', role: 'Heading level 1', status: 'confirmed' },
        { name: 'Heading/H2', category: 'typography', value: '28px', role: 'Heading level 2', status: 'confirmed' },
        { name: 'Heading/H3', category: 'typography', value: '24px', role: 'Heading level 3', status: 'confirmed' },
        { name: 'Heading/H4', category: 'typography', value: '20px', role: 'Heading level 4', status: 'confirmed' },
        { name: 'Heading/H5', category: 'typography', value: '18px', role: 'Heading level 5', status: 'confirmed' },
        { name: 'Heading/H6', category: 'typography', value: '16px', role: 'Heading level 6', status: 'confirmed' },
        { name: 'Body/Main', category: 'typography', value: '16px', role: 'Primary body text', status: 'confirmed' },
        { name: 'Action/Button', category: 'typography', value: '14px', role: 'Button text', status: 'confirmed' },
        { name: 'Caption', category: 'typography', value: '12px', role: 'Caption text', status: 'confirmed' },
      ]}
    />
  ),
}
