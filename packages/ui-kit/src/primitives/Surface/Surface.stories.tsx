import type { Meta, StoryObj } from '@storybook/react'
import { Surface } from './Surface'

const meta: Meta<typeof Surface> = {
  title: 'Primitives/Surface',
  component: Surface,
  parameters: {
    layout: 'padded',
    backgrounds: {
      // Mostra a Surface sobre um fundo de página — contexto real de uso
      default: 'page',
      values: [
        { name: 'page', value: '#F5F5F5' },
        { name: 'white', value: '#FFFFFF' },
        { name: 'dark', value: '#1A1A1A' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'raised', 'overlay', 'sunken', 'interactive'],
      description: [
        '**default** — área de conteúdo base, sem elevação.',
        '**raised** — card elevado com sombra leve.',
        '**overlay** — modal/drawer flutuante com sombra forte.',
        '**sunken** — área rebaixada (inputs, destaques internos).',
        '**interactive** — clicável, com hover e focus.',
      ].join('\n\n'),
    },
    padded: {
      control: 'boolean',
      description: 'Adiciona `padding: 24px` interno. Desative quando o filho controla o espaçamento.',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Story interativa — controles visíveis no painel
export const Playground: Story = {
  args: {
    variant: 'default',
    padded: true,
    children: 'Conteúdo da superfície.',
  },
}

// Todas as variantes lado a lado
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div className="flex flex-col gap-6 p-6 bg-gray-100 rounded-xl">
      {(['default', 'raised', 'overlay', 'sunken', 'interactive'] as const).map(
        (variant) => (
          <Surface key={variant} variant={variant}>
            <p className="text-sm font-semibold text-gray-800 mb-1">
              variant=&quot;{variant}&quot;
            </p>
            <p className="text-sm text-gray-500">
              {descriptions[variant]}
            </p>
          </Surface>
        ),
      )}
    </div>
  ),
}

// Exemplo real: card de produto
export const ComoCard: Story = {
  name: 'Como Card (raised)',
  render: () => (
    <div className="bg-gray-100 p-8 rounded-xl">
      <Surface variant="raised" className="max-w-sm">
        <h3 className="font-heading font-semibold text-base mb-2">Título do card</h3>
        <p className="font-body text-sm text-gray-600 mb-4">
          Surface raised usada como base de um card. Sombra leve cria hierarquia
          visual sobre o fundo da página.
        </p>
        <span className="inline-block text-xs font-medium text-[#7B1234] border border-[#7B1234]/30 rounded-full px-3 py-1">
          Tag de exemplo
        </span>
      </Surface>
    </div>
  ),
}

// Exemplo real: modal
export const ComoModal: Story = {
  name: 'Como Modal (overlay)',
  render: () => (
    <div className="bg-black/40 p-12 rounded-xl flex items-center justify-center min-h-[300px]">
      <Surface variant="overlay" className="max-w-md w-full">
        <h3 className="font-heading font-semibold text-lg mb-2">Título do modal</h3>
        <p className="font-body text-sm text-gray-600 mb-6">
          Surface overlay com sombra forte e raio maior, usada como base de modal.
          O fundo escurecido é responsabilidade do componente Modal — a Surface só
          cuida da aparência da caixa.
        </p>
        <div className="flex gap-3 justify-end">
          <button className="text-sm text-gray-600 px-4 py-2 rounded">Cancelar</button>
          <button className="text-sm text-white bg-[#7B1234] px-4 py-2 rounded">Confirmar</button>
        </div>
      </Surface>
    </div>
  ),
}

// Exemplo real: item interativo de lista
export const ComoItemLista: Story = {
  name: 'Como Item de Lista (interactive)',
  render: () => (
    <div className="bg-gray-100 p-6 rounded-xl flex flex-col gap-3 max-w-md">
      {['Opção A', 'Opção B', 'Opção C'].map((label) => (
        <Surface key={label} variant="interactive" padded={false}>
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-800">{label}</p>
              <p className="text-xs text-gray-500">Descrição secundária do item</p>
            </div>
          </div>
        </Surface>
      ))}
    </div>
  ),
}

// Sem padding — filho controla o espaçamento
export const SemPadding: Story = {
  name: 'Sem padding (padded=false)',
  render: () => (
    <Surface variant="raised" padded={false} className="max-w-sm overflow-hidden">
      <div className="bg-gray-200 h-32 w-full" />
      <div className="p-4">
        <p className="text-sm font-medium">Imagem sem padding lateral</p>
        <p className="text-xs text-gray-500 mt-1">
          padded=false permite que a imagem vá até as bordas.
        </p>
      </div>
    </Surface>
  ),
}

const descriptions: Record<string, string> = {
  default:     'Área de conteúdo base. Borda sutil, sem sombra. Uso geral.',
  raised:      'Card elevado com sombra leve. Para Cards e Painéis.',
  overlay:     'Camada flutuante com sombra forte. Para Modal e Drawer.',
  sunken:      'Área rebaixada com fundo acinzentado. Para áreas de input.',
  interactive: 'Clicável com hover e focus visíveis. Para itens de lista e tiles.',
}
