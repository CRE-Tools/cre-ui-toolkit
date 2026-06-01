import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@cre/ui-kit'
import { PendingReview, TokenUsage } from '@cre/storybook-utils'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'on-brand-primary',
        'on-brand-secondary',
        'on-brand-tertiary',
        'destructive',
      ],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    loading:   { control: 'boolean' },
    disabled:  { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    leftIcon:  { control: false },
    rightIcon: { control: false },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// ─── Variantes ──────────────────────────────────────────────────────────────

export const Primary: Story = {
  args: { variant: 'primary', children: 'Confirmar' },
}

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Cancelar' },
}

export const Tertiary: Story = {
  args: { variant: 'tertiary', children: 'Saiba mais' },
}

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Excluir' },
}

// ─── On Brand (uso sobre fundo bordô) ───────────────────────────────────────

export const OnBrandVariants: Story = {
  name: 'On Brand (fundo escuro)',
  render: () => (
    <div className="flex gap-3 flex-wrap bg-brand p-6 rounded-small">
      <Button variant="on-brand-primary">Confirmar</Button>
      <Button variant="on-brand-secondary">Cancelar</Button>
      <Button variant="on-brand-tertiary">Saiba mais</Button>
    </div>
  ),
}

// ─── Tamanhos ───────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3 flex-wrap">
      <Button size="sm">Pequeno</Button>
      <Button size="md">Médio</Button>
      <Button size="lg">Grande</Button>
    </div>
  ),
}

// ─── Estados ────────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: { loading: true, children: 'Salvando...' },
}

export const Disabled: Story = {
  args: { disabled: true, children: 'Indisponível' },
}

// ─── Com ícones ─────────────────────────────────────────────────────────────

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap items-center">
      <Button leftIcon={<PlusIcon />}>Novo item</Button>
      <Button variant="secondary" rightIcon={<ArrowIcon />}>Continuar</Button>
      <Button variant="tertiary" leftIcon={<PlusIcon />}>Adicionar</Button>
    </div>
  ),
}

// ─── Todas as variantes juntas ───────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="flex gap-3 flex-wrap bg-brand p-4 rounded-small">
        <Button variant="on-brand-primary">On Brand Primary</Button>
        <Button variant="on-brand-secondary">On Brand Secondary</Button>
        <Button variant="on-brand-tertiary">On Brand Tertiary</Button>
      </div>
    </div>
  ),
}

export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Entrar' },
}

// ─── Token Usage ──────────────────────────────────────────────────────────────

export const TokenUsageStory: Story = {
  name: 'Token Usage',
  parameters: { layout: 'padded' },
  render: () => (
    <TokenUsage
      component="Button"
      tokens={[
        { name: 'brand', category: 'color', value: '#7B1234', role: 'background (primary variant)', status: 'confirmed' },
        { name: 'radius-8', category: 'radius', value: '8px', role: 'border-radius (all sizes)', status: 'confirmed' },
        { name: 'spacing-12', category: 'spacing', value: '12px', role: 'horizontal padding (sm size)', status: 'confirmed' },
        { name: 'spacing-16', category: 'spacing', value: '16px', role: 'horizontal padding (md size)', status: 'confirmed' },
        { name: 'spacing-24', category: 'spacing', value: '24px', role: 'horizontal padding (lg size)', status: 'confirmed' },
        { name: 'font-body', category: 'typography', value: 'Source Sans 3', role: 'font family', status: 'confirmed' },
        { name: 'ring-brand', category: 'focus', value: '3px ring', role: 'focus ring (all variants)', status: 'pending-design' },
      ]}
    />
  ),
}

// ─── Pending Review ──────────────────────────────────────────────────────────

export const PendingReviewStory: Omit<Story, 'args'> = {
  name: 'Pending Review',
  tags: ['pending-review'],
  parameters: { layout: 'padded' },
  render: () => (
    <PendingReview
      component="Button"
        notes="Destructive variant was added for admin panel needs — not in PUCPR DS. Needs explicit approval."
      items={[
          'Confirm all 6 variants (primary/secondary/tertiary/on-brand x3) match DS PUCPR Storybook',
          'Validate hover, focus, active, and disabled states with design team',
          'Review loading spinner animation and sizing',
          'Confirm border-radius token for each size (sm/md/lg)',
          'Check on-brand variants on dark background — need real brand background to test',
          'Validate font-size and weight per size',
      ]}
    />
  ),
}
