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

export const TailwindColorsEmUso: Story = {
  name: 'Cores Tailwind em uso — pendente tokenização DS',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <TokenUsage
        notes="Cores success (verde) — usadas nas variantes success de Alert, Badge e Input"
        tokens={[
          { name: 'green-50',  role: 'fundo — variante success' },
          { name: 'green-200', role: 'borda — variante success' },
          { name: 'green-700', role: 'texto — variante success (Badge)' },
          { name: 'green-800', role: 'texto — variante success (Alert)' },
          { name: 'green-500', role: 'borda de foco — estado success (Input)' },
        ]}
      />
      <TokenUsage
        notes="Cores warning (amarelo) — usadas nas variantes warning de Alert e Badge"
        tokens={[
          { name: 'yellow-50',  role: 'fundo — variante warning' },
          { name: 'yellow-200', role: 'borda — variante warning' },
          { name: 'yellow-700', role: 'texto — variante warning (Badge)' },
          { name: 'yellow-800', role: 'texto — variante warning (Alert)' },
        ]}
      />
      <TokenUsage
        notes="Cores danger/error (vermelho) — usadas nas variantes danger, destructive e error"
        tokens={[
          { name: 'red-50',  role: 'fundo — variante danger (Alert, Badge)' },
          { name: 'red-200', role: 'borda — variante danger / destructive (ActionButton)' },
          { name: 'red-500', role: 'borda de foco — estado error (Input)' },
          { name: 'red-600', role: 'fundo — variante destructive (Button, ActionButton texto)' },
          { name: 'red-700', role: 'texto — variante danger (Badge)' },
          { name: 'red-800', role: 'texto — variante danger (Alert)' },
        ]}
      />
      <TokenUsage
        notes="Cores info (azul) — usadas nas variantes info de Alert e Badge"
        tokens={[
          { name: 'blue-50',  role: 'fundo — variante info' },
          { name: 'blue-200', role: 'borda — variante info' },
          { name: 'blue-700', role: 'texto — variante info (Badge)' },
          { name: 'blue-800', role: 'texto — variante info (Alert)' },
        ]}
      />
      <TokenUsage
        notes="Cores neutras (cinza) — usadas nas variantes default e disabled"
        tokens={[
          { name: 'gray-100', role: 'fundo — variantes default e draft (Badge)' },
          { name: 'gray-200', role: 'borda — variante default (Badge)' },
          { name: 'gray-300', role: 'borda — variante draft (Badge, tracejado)' },
          { name: 'gray-500', role: 'texto — variante draft (Badge)' },
          { name: 'gray-600', role: 'texto — variante default (Badge, ActionButton)' },
        ]}
      />
      <TokenUsage
        notes="Branco — usado nas variantes on-brand (Button)"
        tokens={[
          { name: 'white', role: 'fundo/borda/texto — variantes on-brand (Button)' },
        ]}
      />
    </div>
  ),
}
