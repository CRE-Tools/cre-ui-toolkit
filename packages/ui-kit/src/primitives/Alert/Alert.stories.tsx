import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'
import { Button } from '../Button/Button'

const meta = {
  title: 'Primitives/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    variant: 'info',
    title: 'Título do alerta',
    children: 'Mensagem explicativa para o usuário sobre o que aconteceu.',
    hideIcon: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'info'],
    },
    hideIcon: { control: 'boolean' },
    action:   { control: false },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Salvo com sucesso',
    children: 'As alterações foram salvas e estão disponíveis para todos os usuários.',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Atenção',
    children: 'Esta ação irá afetar todos os registros do período selecionado.',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Erro ao processar',
    children: 'Não foi possível completar a operação. Tente novamente ou contate o suporte.',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Atualização disponível',
    children: 'Uma nova versão do sistema está disponível. Atualize para aproveitar as melhorias.',
  },
}

export const SemTitulo: Story = {
  name: 'Sem título',
  args: {
    variant: 'warning',
    title: undefined,
    children: 'Sua sessão expira em 5 minutos. Salve o progresso.',
  },
}

export const ComAcao: Story = {
  name: 'Com ação',
  render: () => (
    <Alert
      variant="warning"
      title="Alterações não salvas"
      action={
        <div className="flex gap-2">
          <Button size="sm" variant="secondary">Descartar</Button>
          <Button size="sm">Salvar agora</Button>
        </div>
      }
    >
      Você tem alterações pendentes que serão perdidas se sair desta página.
    </Alert>
  ),
}

export const AllVariants: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div className="space-y-3">
      <Alert variant="success" title="Salvo com sucesso">Registro atualizado.</Alert>
      <Alert variant="info"    title="Dica">Use filtros para encontrar registros mais rápido.</Alert>
      <Alert variant="warning" title="Atenção">Verifique os dados antes de confirmar.</Alert>
      <Alert variant="danger"  title="Erro">Não foi possível excluir o registro.</Alert>
    </div>
  ),
}

export const SemIcone: Story = {
  name: 'Sem ícone',
  args: {
    variant: 'info',
    title: 'Informação',
    children: 'Alerta sem ícone lateral.',
    hideIcon: true,
  },
}
