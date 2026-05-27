import type { Meta, StoryObj } from '@storybook/react'
import { Input, Textarea } from './Input'

const meta = {
  title: 'Primitives/Input',
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
