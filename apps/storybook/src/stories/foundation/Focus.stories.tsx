import type { Meta, StoryObj } from '@storybook/react'
import { TokenUsage } from '@cre/storybook-utils'

const meta: Meta = {
  title: 'Foundation/Focus',
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj

export const AllFocusPatterns: Story = {
  name: 'Todos os Padrões de Foco',
  render: () => (
    <TokenUsage
      tokens={[
        { name: 'focus-standard', category: 'focus', value: 'ring', role: 'Elementos interativos padrão', status: 'pending-design' },
        { name: 'focus-on-brand', category: 'focus', value: 'ring white/60', role: 'Elementos sobre fundos na cor da marca', status: 'pending-design' },
        { name: 'focus-compact', category: 'focus', value: 'ring-2', role: 'Elementos compactos', status: 'pending-design' },
      ]}
    />
  ),
}
