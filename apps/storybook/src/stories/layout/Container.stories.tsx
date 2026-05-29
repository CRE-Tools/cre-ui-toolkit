import type { Meta, StoryObj } from '@storybook/react'
import { Container } from '@cre/ui-kit'
import { PendingReview } from '@cre/storybook-utils'

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['fluid', 'fixed'],
      description:
        '**fluid** — largura total com margens responsivas (uso geral).\n\n**fixed** — limita max-width em xl (1440px) e wide (1920px).',
      table: {
        defaultValue: { summary: 'fluid' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

function Placeholder({ label }: { label: string }) {
  return (
    <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded p-6 text-sm text-blue-700 text-center">
      {label}
    </div>
  )
}

export const Fluid: Story = {
  name: 'Fluid — margens responsivas',
  args: { variant: 'fluid' },
  render: (args) => (
    <Container {...args}>
      <Placeholder label="Container Fluid — 100% da largura com px: 24px (xs) → 32px (sm) → 40px (md+)" />
    </Container>
  ),
}

export const Fixed: Story = {
  name: 'Fixed — max-width 1440px / 1920px',
  args: { variant: 'fixed' },
  render: (args) => (
    <Container {...args}>
      <Placeholder label="Container Fixed — cresce até 1440px em xl e 1920px em wide, depois centraliza" />
    </Container>
  ),
}

export const ComConteudo: Story = {
  name: 'Com conteúdo real',
  args: { variant: 'fluid' },
  render: (args) => (
    <Container {...args}>
      <h1 className="font-heading text-2xl font-semibold mb-4">Título da página</h1>
      <p className="font-body text-base text-gray-700">
        Este é um exemplo de Container com conteúdo real usando as fontes PUCPR.
        Poppins para o título, Source Sans 3 para o corpo do texto.
      </p>
    </Container>
  ),
}

// ─── Pending Review ──────────────────────────────────────────────────────────

export const PendingReviewStory: Omit<Story, 'args'> = {
  name: 'Pending Review',
  tags: ['pending-review'],
  parameters: { layout: 'padded' },
  render: () => (
    <PendingReview
      component="Container"
      items={[
          'Confirm max-width values for xl (1440px) and wide (1920px) breakpoints',
          'Validate responsive padding scale (px-6/8/10) against DS grid margins',
          'Review fixed vs fluid behavior at each breakpoint with design team',
      ]}
    />
  ),
}
