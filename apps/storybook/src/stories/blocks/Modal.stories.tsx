import { useState } from 'react'
import type React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Modal, ConfirmModal, Button, Input, Alert } from '@cre/cre-web-ui'
import { PendingReview, TokenUsage } from '@cre/storybook-utils'

const meta = {
  title: 'Blocks/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

// ─── Helper para stories com estado ──────────────────────────────────────────

function ModalDemo({ children, label = 'Abrir modal', ...props }: Omit<React.ComponentProps<typeof Modal>, 'open' | 'onClose'> & { label?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>{label}</Button>
      <Modal open={open} onClose={() => setOpen(false)} {...props}>
        {children}
      </Modal>
    </>
  )
}

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Default: Omit<Story, 'args'> = {
  render: () => (
    <ModalDemo
      label="Ver detalhes"
      title="Detalhes do usuário"
      description="Informações cadastradas no sistema."
      footer={
        <>
          <Button variant="secondary">Fechar</Button>
          <Button>Salvar</Button>
        </>
      }
    >
      <p className="font-body text-sm text-gray-600">
        Conteúdo principal do modal. Pode conter formulários, listas ou qualquer outro componente.
      </p>
    </ModalDemo>
  ),
}

export const ComFormulario: Omit<Story, 'args'> = {
  name: 'Com formulário',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Novo usuário</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Novo usuário"
          description="Preencha os dados para criar o cadastro."
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button onClick={() => setOpen(false)}>Criar usuário</Button>
            </>
          }
        >
          <div className="space-y-4">
            <Input label="Nome completo" placeholder="Ex: Ana Souza" />
            <Input label="E-mail" type="email" placeholder="nome@pucpr.br" />
            <Input label="Matrícula" placeholder="2024000000" />
          </div>
        </Modal>
      </>
    )
  },
}

export const Confirmacao: Omit<Story, 'args'> = {
  name: 'Confirmação simples',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Arquivar registro</Button>
        <ConfirmModal
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
          title="Arquivar registro?"
          description="O registro ficará inativo e não aparecerá nas listagens. Você pode restaurá-lo depois."
          confirmLabel="Arquivar"
          cancelLabel="Cancelar"
        />
      </>
    )
  },
}

export const ConfirmacaoDestructiva: Omit<Story, 'args'> = {
  name: 'Confirmação destrutiva',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading, setLoading] = useState(false)

    const handleConfirm = () => {
      setLoading(true)
      setTimeout(() => { setLoading(false); setOpen(false) }, 1500)
    }

    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>Excluir usuário</Button>
        <ConfirmModal
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={handleConfirm}
          title="Excluir usuário?"
          description="Esta ação é irreversível. Todos os dados associados serão permanentemente removidos."
          confirmLabel="Excluir permanentemente"
          cancelLabel="Cancelar"
          variant="danger"
          loading={loading}
        />
      </>
    )
  },
}

export const ComAlerta: Omit<Story, 'args'> = {
  name: 'Com alerta interno',
  render: () => (
    <ModalDemo
      label="Publicar conteúdo"
      title="Publicar conteúdo"
      size="md"
      footer={
        <>
          <Button variant="secondary">Cancelar</Button>
          <Button>Publicar</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Alert variant="warning" title="Atenção">
          Este conteúdo ficará visível para todos os alunos matriculados.
        </Alert>
        <p className="font-body text-sm text-gray-600">
          Deseja confirmar a publicação do módulo <strong>"Introdução ao React"</strong>?
        </p>
      </div>
    </ModalDemo>
  ),
}

export const Tamanhos: Omit<Story, 'args'> = {
  render: () => (
    <div className="flex gap-3 flex-wrap">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <ModalDemo
          key={size}
          label={`Tamanho ${size}`}
          title={`Modal ${size.toUpperCase()}`}
          size={size}
          footer={<Button size="sm" variant="secondary">Fechar</Button>}
        >
          <p className="font-body text-sm text-gray-500">
            Tamanho: <strong>{size}</strong>.
          </p>
        </ModalDemo>
      ))}
    </div>
  ),
}

// ─── Token Usage ──────────────────────────────────────────────────────────────

export const TokenUsageStory: Omit<Story, 'args'> = {
  name: 'Token Usage',
  parameters: { layout: 'padded' },
  render: () => (
    <TokenUsage
      component="Modal"
      tokens={[
        { name: 'radius-16', category: 'radius', value: '16px', role: 'raio de borda (painel do modal)', status: 'confirmed' },
        { name: 'shadow-level-3', category: 'shadow', value: 'elevation máxima', role: 'sombra (painel do modal)', status: 'pending-design' },
        { name: 'brand', category: 'color', value: '#7B1234', role: 'anel de foco (botão fechar)', status: 'confirmed' },
        { name: 'neutral-400', category: 'color', value: '#B5A8AD', role: 'cor da borda (header/footer)', status: 'confirmed' },
        { name: 'spacing-24', category: 'spacing', value: '24px', role: 'padding horizontal (header/footer)', status: 'confirmed' },
        { name: 'spacing-20', category: 'spacing', value: '20px', role: 'padding vertical (header/footer)', status: 'confirmed' },
        { name: 'font-heading', category: 'typography', value: 'Poppins', role: 'família tipográfica do título', status: 'confirmed' },
        { name: 'font-body', category: 'typography', value: 'Source Sans 3', role: 'família tipográfica do corpo', status: 'confirmed' },
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
      component="Modal"
      items={[
          'Confirmar border-radius-medium (16px) para o painel do modal',
          'Validar blur e opacidade do backdrop com a equipe de design',
          'Revisar posicionamento e tamanho do botão fechar',
          'Confirmar se shadow-level-3 é adequado para a elevação do overlay',
          'Verificar cor do header da variante danger em relação à paleta destructive',
          'Validar layout dos botões do footer (alinhados à direita, gap-3)',
      ]}
    />
  ),
}
