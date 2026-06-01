import type { Meta, StoryObj } from '@storybook/react'
import { TokenUsage } from '@cre/storybook-utils'

const meta: Meta = {
  title: 'Foundation/Colors',
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj

export const AllColors: Story = {
  name: 'All Colors',
  render: () => (
    <TokenUsage
      tokens={[
        { name: 'brand', category: 'color', value: '#7B1234', role: 'Primary brand color', status: 'confirmed' },
        { name: 'neutral-400', category: 'color', value: '#B5A8AD', role: 'Neutral / muted', status: 'confirmed' },
        { name: 'surface/background', category: 'color', value: '#cccccc', role: 'Page/canvas background', status: 'pending-design' },
        { name: 'surface/element', category: 'color', value: '#cccccc', role: 'Card/panel background', status: 'pending-design' },
        { name: 'text/main', category: 'color', value: '#cccccc', role: 'Primary body text', status: 'pending-design' },
        { name: 'text/muted', category: 'color', value: '#cccccc', role: 'Secondary/muted text', status: 'pending-design' },
        { name: 'action/primary/default', category: 'color', value: '#cccccc', role: 'Primary interactive', status: 'pending-design' },
        { name: 'action/primary/hover', category: 'color', value: '#cccccc', role: 'Primary interactive hover', status: 'pending-design' },
        { name: 'border/divider', category: 'color', value: '#cccccc', role: 'Separators and borders', status: 'pending-design' },
        { name: 'feedback/success', category: 'color', value: '#cccccc', role: 'Success state', status: 'pending-design' },
        { name: 'feedback/error', category: 'color', value: '#cccccc', role: 'Error state', status: 'pending-design' },
        { name: 'feedback/warning', category: 'color', value: '#cccccc', role: 'Warning state', status: 'pending-design' },
        { name: 'feedback/info', category: 'color', value: '#cccccc', role: 'Info state', status: 'pending-design' },
      ]}
    />
  ),
}
