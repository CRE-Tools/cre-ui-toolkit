import { useState } from 'react'
import type React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Modal, ConfirmModal, Button, Input, Alert } from '@cre/ui-kit'
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
        { name: 'radius-16', category: 'radius', value: '16px', role: 'border-radius (modal panel)', status: 'confirmed' },
        { name: 'shadow-level-3', category: 'shadow', value: 'elevation máxima', role: 'shadow (modal panel)', status: 'pending-design' },
        { name: 'brand', category: 'color', value: '#7B1234', role: 'focus ring (close button)', status: 'confirmed' },
        { name: 'neutral-400', category: 'color', value: '#B5A8AD', role: 'border color (header/footer)', status: 'confirmed' },
        { name: 'spacing-24', category: 'spacing', value: '24px', role: 'horizontal padding (header/footer)', status: 'confirmed' },
        { name: 'spacing-20', category: 'spacing', value: '20px', role: 'vertical padding (header/footer)', status: 'confirmed' },
        { name: 'font-heading', category: 'typography', value: 'Poppins', role: 'title font family', status: 'confirmed' },
        { name: 'font-body', category: 'typography', value: 'Source Sans 3', role: 'body font family', status: 'confirmed' },
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
          'Confirm border-radius-medium (16px) for modal panel',
          'Validate backdrop blur and opacity with design team',
          'Review close button placement and sizing',
          'Confirm shadow-level-3 is appropriate for overlay elevation',
          'Check danger variant header color against destructive palette',
          'Validate footer button layout (right-aligned, gap-3)',
      ]}
    />
  ),
}
