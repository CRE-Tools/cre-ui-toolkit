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
        { name: 'focus-standard', role: 'Elementos interativos padrão' },
        { name: 'focus-on-brand', role: 'Elementos sobre fundos na cor da marca' },
        { name: 'focus-compact', role: 'Elementos compactos' },
      ]}
    />
  ),
}
