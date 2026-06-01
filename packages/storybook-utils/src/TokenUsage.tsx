import type { ReactNode } from 'react'

/**
 * TokenUsage — reusable Storybook documentation block that lists design tokens
 * consumed by a component or showcases a full token category.
 *
 * Two use cases:
 * 1. Component stories — pass `component` name and list tokens that component uses
 * 2. Foundation stories — omit `component`, pass all tokens of a category (acts as token catalog)
 *
 * Example usage in component stories:
 *
 *   import { TokenUsage } from '@cre/storybook-utils'
 *
 *   export const TokenUsageStory: Story = {
 *     name: 'Token Usage',
 *     render: () => (
 *       <TokenUsage
 *         component="Button"
 *         tokens={[
 *           { name: 'brand', category: 'color', value: '#7B1234', role: 'background — primary variant', status: 'confirmed' },
 *           { name: 'rounded-radius-8', category: 'radius', value: '8px', role: 'border-radius', status: 'confirmed' },
 *         ]}
 *       />
 *     ),
 *   }
 */

export type TokenStatus = 'confirmed' | 'pending-design'
export type TokenCategory = 'color' | 'spacing' | 'radius' | 'shadow' | 'typography' | 'focus'

export interface TokenEntry {
  /** Tailwind token name shown to the designer, e.g. 'brand', 'rounded-radius-8' */
  name: string
  /** Token category determines the visual preview style */
  category: TokenCategory
  /** Raw CSS value used for the visual preview, e.g. '#7B1234', '8px', '32px', 'ring' */
  value: string
  /** How this component uses the token, e.g. 'background — primary variant' */
  role: string
  /** Token approval status */
  status: TokenStatus
}

export interface TokenUsageProps {
  /** Component name shown in the header. Omit for Foundation showcase stories. */
  component?: string
  /** List of design tokens */
  tokens: TokenEntry[]
  /** Optional free-form notes */
  notes?: string
}

function TokenPreview({ category, value }: { category: TokenCategory; value: string }): ReactNode {
  const baseStyle = {
    width: 20,
    height: 20,
    flexShrink: 0,
  }

  switch (category) {
    case 'color':
      return (
        <div
          style={{
            ...baseStyle,
            backgroundColor: value,
            borderRadius: '50%',
            border: '1px solid #E5E7EB',
          }}
        />
      )

    case 'spacing':
      return (
        <div
          style={{
            height: 8,
            width: value,
            backgroundColor: '#93C5FD',
            borderRadius: 2,
            flexShrink: 0,
          }}
        />
      )

    case 'radius':
      return (
        <div
          style={{
            ...baseStyle,
            borderRadius: value,
            border: '1px solid #D1D5DB',
            backgroundColor: '#F3F4F6',
          }}
        />
      )

    case 'shadow':
      return (
        <div
          style={{
            ...baseStyle,
            backgroundColor: 'white',
            boxShadow: value,
          }}
        />
      )

    case 'typography':
      return (
        <div
          style={{
            ...baseStyle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: value.includes('px') ? 'system-ui' : value,
            fontSize: value.includes('px') ? value : '14px',
            color: '#374151',
            fontWeight: 500,
          }}
        >
          Aa
        </div>
      )

    case 'focus':
      return (
        <div
          style={{
            ...baseStyle,
            backgroundColor: 'white',
            outline: '3px solid #7B1234',
            outlineOffset: 2,
          }}
        />
      )

    default:
      return null
  }
}

export function TokenUsage({ component, tokens, notes }: TokenUsageProps) {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 640, padding: 24 }}>
      
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, color: '#374151' }}>
          {component ? `Tokens — ${component}` : 'Referência de Tokens'}
        </h3>
        <p style={{ margin: 0, fontSize: 13, color: '#6B7280' }}>
          {component
            ? 'Estes são os design tokens utilizados por este componente.'
            : 'Design tokens desta categoria.'}
        </p>
      </div>

      {/* Token list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {tokens.map((token, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              padding: '12px 14px',
              background: '#F9FAFB',
              border: '1px solid #E5E7EB',
              borderRadius: 6,
            }}
          >
            {/* Preview */}
            <div style={{ marginTop: 2 }}>
              <TokenPreview category={token.category} value={token.value} />
            </div>

            {/* Token info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <code style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
                  {token.name}
                </code>
                {token.status === 'pending-design' && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '2px 6px',
                      background: '#FFF8E1',
                      border: '1px solid #F59E0B',
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#B45309',
                    }}
                  >
                    ⚠ aguardando aprovação
                  </span>
                )}
              </div>
              <p style={{ margin: 0, fontSize: 13, color: '#6B7280' }}>
                {token.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Notes */}
      {notes && (
        <div
          style={{
            marginTop: 16,
            padding: '10px 12px',
            background: '#EFF6FF',
            border: '1px solid #BFDBFE',
            borderRadius: 6,
            fontSize: 13,
            color: '#1E40AF',
          }}
        >
          <strong>Nota:</strong> {notes}
        </div>
      )}
    </div>
  )
}
