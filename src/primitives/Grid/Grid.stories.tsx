import type { Meta, StoryObj } from '@storybook/react'
import { Container } from '../Container'
import { Grid } from './Grid'
import { GridItem } from './GridItem'

const meta: Meta<typeof Grid> = {
  title: 'Primitives/Grid',
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
export const GridPUCPR: Story = {
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
export const TresCards: Story = {
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
export const DoisCards: Story = {
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
export const SidebarLayout: Story = {
  name: 'Layout Sidebar + Conteúdo',
  render: () => (
    <Container>
      <Grid cols={4} colsMd={12}>
        <GridItem span="full" spanMd={3}>
          <div className="bg-gray-200 rounded p-4 text-sm text-center min-h-[200px] flex items-center justify-center">
            Sidebar (3 cols)
          </div>
        </GridItem>
        <GridItem span="full" spanMd={9}>
          <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm min-h-[200px] flex items-center justify-center">
            Conteúdo principal (9 cols)
          </div>
        </GridItem>
      </Grid>
    </Container>
  ),
}

// Item que ocupa a largura total
export const ItemFull: Story = {
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
