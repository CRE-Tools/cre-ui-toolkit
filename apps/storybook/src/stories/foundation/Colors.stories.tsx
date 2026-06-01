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
        { name: 'brand', category: 'color', value: '#7B1234', role: 'Cor principal da marca', status: 'confirmed' },
        { name: 'neutral-400', category: 'color', value: '#B5A8AD', role: 'Neutro / discreto', status: 'confirmed' },
        { name: 'surface/background', category: 'color', value: '#cccccc', role: 'Fundo da página/canvas', status: 'pending-design' },
        { name: 'surface/element', category: 'color', value: '#cccccc', role: 'Fundo de card/painel', status: 'pending-design' },
        { name: 'text/main', category: 'color', value: '#cccccc', role: 'Texto principal do corpo', status: 'pending-design' },
        { name: 'text/muted', category: 'color', value: '#cccccc', role: 'Texto secundário/discreto', status: 'pending-design' },
        { name: 'action/primary/default', category: 'color', value: '#cccccc', role: 'Elemento interativo principal', status: 'pending-design' },
        { name: 'action/primary/hover', category: 'color', value: '#cccccc', role: 'Hover do elemento interativo principal', status: 'pending-design' },
        { name: 'border/divider', category: 'color', value: '#cccccc', role: 'Separadores e bordas', status: 'pending-design' },
        { name: 'feedback/success', category: 'color', value: '#cccccc', role: 'Estado de sucesso', status: 'pending-design' },
        { name: 'feedback/error', category: 'color', value: '#cccccc', role: 'Estado de erro', status: 'pending-design' },
        { name: 'feedback/warning', category: 'color', value: '#cccccc', role: 'Estado de alerta', status: 'pending-design' },
        { name: 'feedback/info', category: 'color', value: '#cccccc', role: 'Estado informativo', status: 'pending-design' },
      ]}
    />
  ),
}
