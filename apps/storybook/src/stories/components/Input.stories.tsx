import type { Meta, StoryObj } from '@storybook/react'
import { Input, Textarea } from '@cre/ui-kit'
import { PendingReview, TokenUsage } from '@cre/storybook-utils'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    label: 'E-mail',
    placeholder: 'nome@pucpr.br',
    fullWidth: true,
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    leftIcon:  { control: false },
    rightIcon: { control: false },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// ─── Estados ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { label: 'Nome completo', placeholder: 'Ex: Ana Souza' },
}

export const WithHelperText: Story = {
  args: {
    label: 'E-mail institucional',
    placeholder: 'nome@pucpr.br',
    helperText: 'Use seu e-mail da PUCPR.',
  },
}

export const ValidationError: Story = {
  args: {
    label: 'E-mail',
    defaultValue: 'email-invalido',
    errorMessage: 'Informe um e-mail válido.',
  },
}

export const ValidationSuccess: Story = {
  args: {
    label: 'E-mail',
    defaultValue: 'ana@pucpr.br',
    successMessage: 'E-mail verificado com sucesso.',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Matrícula',
    value: '2024001234',
    disabled: true,
    helperText: 'Campo não editável.',
  },
}

// ─── Com ícones ───────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="3" y="7" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <Input
        label="Buscar usuário"
        placeholder="Nome ou matrícula..."
        leftIcon={<SearchIcon />}
      />
      <Input
        label="Senha"
        type="password"
        placeholder="••••••••"
        leftIcon={<LockIcon />}
      />
    </div>
  ),
}

// ─── Todos os estados juntos ──────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'Todos os estados',
  render: () => (
    <div className="space-y-4 max-w-sm">
      <Input label="Padrão"   placeholder="Digite algo..." />
      <Input label="Erro"     defaultValue="valor inválido" errorMessage="Este campo é obrigatório." />
      <Input label="Sucesso"  defaultValue="ana@pucpr.br"   successMessage="Verificado." />
      <Input label="Disabled" value="somente leitura"       disabled helperText="Campo bloqueado." />
    </div>
  ),
}

// ─── Textarea ─────────────────────────────────────────────────────────────────

export const TextareaDefault: Story = {
  name: 'Textarea',
  render: () => (
    <div className="space-y-4 max-w-sm">
      <Textarea
        label="Descrição"
        placeholder="Descreva o item..."
        helperText="Máximo de 300 caracteres."
      />
      <Textarea
        label="Observações"
        placeholder="Digite aqui..."
        maxLength={200}
        showCount
        defaultValue=""
      />
      <Textarea
        label="Motivo (obrigatório)"
        errorMessage="Informe o motivo."
      />
    </div>
  ),
}

// ─── Token Usage ──────────────────────────────────────────────────────────────

export const TokenUsageStory: Story = {
  name: 'Token Usage',
  parameters: { layout: 'padded' },
  render: () => (
    <TokenUsage
      component="Input"
      tokens={[
        { name: 'radius-8', category: 'radius', value: '8px', role: 'raio de borda', status: 'confirmed' },
        { name: 'neutral-400', category: 'color', value: '#B5A8AD', role: 'placeholder e borda em repouso', status: 'confirmed' },
        { name: 'brand', category: 'color', value: '#7B1234', role: 'anel de foco', status: 'confirmed' },
        { name: 'font-body', category: 'typography', value: 'Source Sans 3', role: 'família tipográfica', status: 'confirmed' },
        { name: 'spacing-12', category: 'spacing', value: '12px', role: 'padding horizontal', status: 'confirmed' },
        { name: 'spacing-8', category: 'spacing', value: '8px', role: 'padding vertical', status: 'confirmed' },
        { name: 'ring', category: 'focus', value: '3px ring', role: 'anel de foco', status: 'pending-design' },
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
      component="Input"
      items={[
          'Confirmar cor e largura do anel de foco (atualmente brand/3px) em relação à especificação DS',
          'Validar cores de borda de erro/sucesso em relação à paleta semântica DS',
          'Revisar font-weight do label (semibold) e tamanho (sm)',
          'Verificar comportamento de redimensionamento e min-height do textarea',
          'Confirmar estilo e posicionamento do contador de caracteres',
          'Validar tamanho e espaçamento do ícone dentro do campo',
      ]}
    />
  ),
}
