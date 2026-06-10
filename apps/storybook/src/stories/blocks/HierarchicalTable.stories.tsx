import type { Meta, StoryObj } from '@storybook/react'
import { HierarchicalTable } from '@cre/cre-web-ui'
import { PendingReview, TokenUsage } from '@cre/storybook-utils'

const meta = {
  title: 'Blocks/HierarchicalTable',
  component: HierarchicalTable,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof HierarchicalTable>

export default meta
type Story = StoryObj<typeof meta>

// ─── Dados de exemplo: analytics de sessão ───────────────────────────────────

const analyticsColumns = [
  'session/id',
  'session/timestamp',
  'session/duracao',
  'experiencia/Controles/Cliques/A',
  'experiencia/Controles/Cliques/B',
  'experiencia/Controles/Cliques/L Trigger',
  'experiencia/Controles/Cliques/R Trigger',
  'experiencia/Controles/Eixo/X',
  'experiencia/Controles/Eixo/Y',
  'experiencia/Eventos/Colisoes',
  'experiencia/Eventos/Conclusoes',
  'performance/FPS/media',
  'performance/FPS/min',
  'performance/Memoria/MB',
]

const analyticsData = Array.from({ length: 12 }, (_, i) => ({
  'session/id':                         `sess-${(i + 1).toString().padStart(3, '0')}`,
  'session/timestamp':                  `2026-05-${(i + 20).toString().padStart(2, '0')} 14:${(i * 3).toString().padStart(2, '0')}`,
  'session/duracao':                    `${2 + i}m${(i * 7) % 60}s`,
  'experiencia/Controles/Cliques/A':    Math.floor(Math.random() * 50),
  'experiencia/Controles/Cliques/B':    Math.floor(Math.random() * 30),
  'experiencia/Controles/Cliques/L Trigger': Math.floor(Math.random() * 20),
  'experiencia/Controles/Cliques/R Trigger': Math.floor(Math.random() * 20),
  'experiencia/Controles/Eixo/X':       (Math.random() * 2 - 1).toFixed(3),
  'experiencia/Controles/Eixo/Y':       (Math.random() * 2 - 1).toFixed(3),
  'experiencia/Eventos/Colisoes':       Math.floor(Math.random() * 10),
  'experiencia/Eventos/Conclusoes':     Math.floor(Math.random() * 5),
  'performance/FPS/media':              Math.floor(55 + Math.random() * 15),
  'performance/FPS/min':                Math.floor(30 + Math.random() * 20),
  'performance/Memoria/MB':             Math.floor(200 + Math.random() * 100),
}))

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Analytics de sessão',
  args: {
    title: 'Primeiros Socorros — Sessões',
    columns: analyticsColumns,
    data: analyticsData,
    exportFileName: 'primeiros-socorros-sessoes',
  },
}

export const SemStickyColuna: Story = {
  name: 'Sem coluna sticky',
  args: {
    title: 'Sem primeira coluna fixa',
    columns: analyticsColumns,
    data: analyticsData,
    stickyFirstColumn: false,
  },
}

export const SemExport: Story = {
  name: 'Sem exportação',
  args: {
    columns: analyticsColumns.slice(0, 8),
    data: analyticsData.slice(0, 5),
    exportable: false,
  },
}

export const Vazia: Story = {
  name: 'Sem dados',
  args: {
    title: 'Sessões — projeto vazio',
    columns: analyticsColumns,
    data: [],
  },
}

// Colunas rasas (sem hierarquia) — compatibilidade com tabela simples
export const ColunasPlanas: Story = {
  name: 'Colunas sem hierarquia',
  args: {
    title: 'Projetos',
    columns: ['Project Name', 'Project ID', 'Project Key', 'Created'],
    data: [
      {
        'Project Name': 'Primeiros Socorros',
        'Project ID':   'e6c303ff-e855-47eb-a3e2-3b64fded144b',
        'Project Key':  '••••••••',
        'Created':      '26/05/2026',
      },
    ],
  },
}

// ─── Token Usage ──────────────────────────────────────────────────────────────

export const TokenUsageStory: Omit<Story, 'args'> = {
  name: 'Token Usage',
  parameters: { layout: 'padded' },
  render: () => (
    <TokenUsage
      component="HierarchicalTable"
      tokens={[
        { name: 'neutral-400', category: 'color', value: '#B5A8AD', role: 'cor da borda (células da tabela)', status: 'confirmed' },
        { name: 'radius-8', category: 'radius', value: '8px', role: 'raio de borda (contêiner da tabela)', status: 'confirmed' },
        { name: 'font-body', category: 'typography', value: 'Source Sans 3', role: 'família tipográfica', status: 'confirmed' },
        { name: 'brand', category: 'color', value: '#7B1234', role: 'fundo do cabeçalho agrupado', status: 'confirmed' },
        { name: 'spacing-12', category: 'spacing', value: '12px', role: 'padding horizontal/vertical (células)', status: 'confirmed' },
        { name: 'ring', category: 'focus', value: '3px ring', role: 'anel de foco (botão de exportar)', status: 'pending-design' },
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
      component="HierarchicalTable"
        notes="Componente construído especificamente para o dashboard de analytics. Sem referência direta ao DS PUCPR — revisão completa do design é necessária."
      items={[
          'Revisar cor do cabeçalho das células agrupadas (atualmente brand/bordô) — confirmar com o design',
          'Validar estilo de sombra/borda separadora da coluna fixa',
          'Confirmar se as cores alternadas de linhas correspondem à paleta neutra DS',
          'Revisar posicionamento e estilo do botão de exportar CSV',
          'Verificar comportamento da tabela em mobile (UX de scroll horizontal)',
          'Confirmar se o font-size (xs) é legível em alta densidade de dados',
      ]}
    />
  ),
}
