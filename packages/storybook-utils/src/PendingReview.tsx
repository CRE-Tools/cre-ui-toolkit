import type { ReactNode } from 'react'

/**
 * PendingReview — bloco padronizado de "aguardando revisão do design".
 *
 * Use em stories com nome "Pending Review" para sinalizar que o componente
 * ainda não passou pela aprovação da equipe de design.
 *
 * Exemplo de uso em stories:
 *
 *   import { PendingReview } from '../../storybook/PendingReview'
 *
 *   export const PendingReviewStory: Story = {
 *     name: 'Pending Review',
 *     tags: ['pending-review'],
 *     render: () => (
 *       <PendingReview
 *         component="Button"
 *         items={[
 *           'Confirm brand color (#7B1234) with design team',
 *           'Validate hover and focus states',
 *         ]}
 *       />
 *     ),
 *   }
 */

export interface PendingReviewProps {
  /** Nome do componente sendo revisado. */
  component: string
  /** Lista de itens pendentes de aprovação. */
  items: string[]
  /** Notas adicionais livres. */
  notes?: string
  /** Renderiza o componente em questão para contexto visual. */
  children?: ReactNode
}

export function PendingReview({ component, items, notes, children }: PendingReviewProps) {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 640, padding: 24 }}>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
        padding: '10px 14px',
        background: '#FFF8E1', border: '1px solid #F59E0B',
        borderRadius: 8,
      }}>
        <span style={{ fontSize: 20 }}>⏳</span>
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: '#92400E' }}>
            Aguardando Revisão do Design — <code style={{ fontWeight: 400 }}>{component}</code>
          </p>
          <p style={{ margin: 0, fontSize: 12, color: '#B45309', marginTop: 2 }}>
            Este componente ainda não foi aprovado pela equipe de design.
          </p>
        </div>
      </div>

      {/* Checklist */}
      <div style={{ marginBottom: children ? 24 : 0 }}>
        <p style={{ margin: '0 0 10px', fontWeight: 700, fontSize: 13, color: '#374151' }}>
          Checklist de revisão
        </p>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map((item, i) => (
            <li key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 8,
              padding: '8px 12px',
              background: '#F9FAFB', border: '1px solid #E5E7EB',
              borderRadius: 6, fontSize: 13, color: '#374151',
            }}>
              <span style={{
                marginTop: 1, width: 16, height: 16, flexShrink: 0,
                border: '2px solid #D1D5DB', borderRadius: 3,
                background: 'white', display: 'inline-block',
              }} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Notas livres */}
      {notes && (
        <div style={{
          marginTop: 16, padding: '10px 12px',
          background: '#EFF6FF', border: '1px solid #BFDBFE',
          borderRadius: 6, fontSize: 13, color: '#1E40AF',
        }}>
          <strong>Nota:</strong> {notes}
        </div>
      )}

      {/* Preview do componente */}
      {children && (
        <div style={{ marginTop: 24 }}>
          <p style={{ margin: '0 0 10px', fontWeight: 700, fontSize: 13, color: '#374151' }}>
            Implementação atual
          </p>
          <div style={{
            padding: 20,
            background: 'white', border: '1px dashed #D1D5DB',
            borderRadius: 8,
          }}>
            {children}
          </div>
        </div>
      )}

    </div>
  )
}
