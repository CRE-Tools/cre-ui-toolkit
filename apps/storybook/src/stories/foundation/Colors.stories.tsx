import type { Meta, StoryObj } from '@storybook/react'
import { TokenUsage } from '@cre/storybook-utils'

const meta: Meta = {
  title: 'Foundation/Colors',
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj

export const AllColors: Story = {
  name: 'Todas as Cores',
  render: () => (
    <TokenUsage
      tokens={[
        { name: 'brand', role: 'Cor principal da marca' },
        { name: 'neutral-400', role: 'Neutro / discreto' },
        { name: 'surface/background', role: 'Fundo da página/canvas' },
        { name: 'surface/element', role: 'Fundo de card/painel' },
        { name: 'text/main', role: 'Texto principal do corpo' },
        { name: 'text/muted', role: 'Texto secundário/discreto' },
        { name: 'action/primary/default', role: 'Elemento interativo principal' },
        { name: 'action/primary/hover', role: 'Hover do elemento interativo principal' },
        { name: 'border/divider', role: 'Separadores e bordas' },
        { name: 'feedback/success', role: 'Estado de sucesso' },
        { name: 'feedback/error', role: 'Estado de erro' },
        { name: 'feedback/warning', role: 'Estado de alerta' },
        { name: 'feedback/info', role: 'Estado informativo' },
      ]}
    />
  ),
}
