import type { Meta, StoryObj } from '@storybook/react'
import { TokenUsage } from '@cre/storybook-utils'

const meta: Meta = {
  title: 'Foundation/Typography',
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj

export const AllTypeStyles: Story = {
  name: 'Todos os Estilos Tipográficos',
  render: () => (
    <TokenUsage
      tokens={[
        { name: 'Heading/H1', role: 'Título nível 1' },
        { name: 'Heading/H2', role: 'Título nível 2' },
        { name: 'Heading/H3', role: 'Título nível 3' },
        { name: 'Heading/H4', role: 'Título nível 4' },
        { name: 'Heading/H5', role: 'Título nível 5' },
        { name: 'Heading/H6', role: 'Título nível 6' },
        { name: 'Body/Main', role: 'Texto principal do corpo' },
        { name: 'Action/Button', role: 'Texto de botão' },
        { name: 'Caption', role: 'Legenda' },
      ]}
    />
  ),
}
