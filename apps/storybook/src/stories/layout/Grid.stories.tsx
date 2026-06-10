import type { Meta, StoryObj } from '@storybook/react'
import { Container, Grid, GridItem } from '@cre/cre-web-ui'
import { PendingReview, TokenUsage } from '@cre/storybook-utils'

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

function Card({ label }: { label: string }) {
  return (
    <div className="bg-gray-100 border border-neutral-400 rounded p-4 text-sm text-center text-gray-600 min-h-[80px] flex items-center justify-center">
      {label}
    </div>
  )
}

// Grid padrão PUCPR: 4 cols (xs) → 8 cols (sm) → 12 cols (md+)
export const GridPUCPR: Omit<Story, 'args'> = {
  name: 'Grid PUCPR — 4 / 8 / 12 colunas',
  render: () => (
    <Container>
      <Grid cols={4} colsSm={8} colsMd={12}>
        {Array.from({ length: 12 }, (_, i) => (
          <Card key={i} label={`Col ${i + 1}`} />
        ))}
      </Grid>
    </Container>
  ),
}

// Três cards por linha em md+
export const TresCards: Omit<Story, 'args'> = {
  name: '3 Cards por linha (md+)',
  render: () => (
    <Container>
      <Grid cols={4} colsSm={8} colsMd={12}>
        {['Card A', 'Card B', 'Card C', 'Card D', 'Card E', 'Card F'].map((label) => (
          <GridItem key={label} span="full" spanSm={4} spanMd={4}>
            <Card label={label} />
          </GridItem>
        ))}
      </Grid>
    </Container>
  ),
}

// Dois cards por linha em md+
export const DoisCards: Omit<Story, 'args'> = {
  name: '2 Cards por linha (md+)',
  render: () => (
    <Container>
      <Grid cols={4} colsSm={8} colsMd={12}>
        {['Card A', 'Card B', 'Card C', 'Card D'].map((label) => (
          <GridItem key={label} span="full" spanSm={4} spanMd={6}>
            <Card label={label} />
          </GridItem>
        ))}
      </Grid>
    </Container>
  ),
}

// Layout de página: sidebar + conteúdo principal
export const SidebarLayout: Omit<Story, 'args'> = {
  name: 'Layout Sidebar + Conteúdo',
  render: () => (
    <Container>
      <Grid cols={4} colsMd={12}>
        <GridItem span="full" spanMd={3}>
          <div className="bg-gray-200 rounded p-4 text-sm text-center min-h-[200px] flex items-center justify-center">
            Sidebar (3 cols)
          </div>
        </GridItem>
        <GridItem span="full" spanMd={8}>
          <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm min-h-[200px] flex items-center justify-center">
            Conteúdo principal (8 cols)
          </div>
        </GridItem>
      </Grid>
    </Container>
  ),
}

// Item que ocupa a largura total
export const ItemFull: Omit<Story, 'args'> = {
  name: 'Item full width + colunas',
  render: () => (
    <Container>
      <Grid cols={4} colsMd={12}>
        <GridItem span="full">
          <Card label="Header — full width (12 cols)" />
        </GridItem>
        {['A', 'B', 'C'].map((l) => (
          <GridItem key={l} span="full" spanMd={4}>
            <Card label={`Item ${l} (4 cols)`} />
          </GridItem>
        ))}
        <GridItem span="full">
          <Card label="Footer — full width (12 cols)" />
        </GridItem>
      </Grid>
    </Container>
  ),
}

// ─── Token Usage ──────────────────────────────────────────────────────────────

export const TokenUsageStory: Story = {
  name: 'Token Usage',
  parameters: { layout: 'padded' },
  render: () => (
    <TokenUsage
      component="Grid"
      tokens={[
        { name: 'spacing-8', category: 'spacing', value: '8px', role: 'gutter (breakpoint xs)', status: 'confirmed' },
        { name: 'spacing-16', category: 'spacing', value: '16px', role: 'gutter (breakpoint sm)', status: 'confirmed' },
        { name: 'spacing-24', category: 'spacing', value: '24px', role: 'gutter (breakpoint md+)', status: 'confirmed' },
      ]}
    />
  ),
}

// ─── Pending Review ──────────────────────────────────────────────────────────

export const PendingReviewStory: Story = {
  name: 'Pending Review',
  tags: ['pending-review'],
  parameters: { layout: 'padded' },
  render: () => (
    <PendingReview
      component="Grid"
      items={[
          'Confirmar se os valores de gutter (gap-2/4/6) correspondem à especificação do grid DS em cada breakpoint',
          'Validar a progressão de 4→8→12 colunas',
          'Verificar se o comportamento padrão de span do GridItem (full) está correto',
      ]}
    />
  ),
}
