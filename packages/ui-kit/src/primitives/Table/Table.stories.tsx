import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Table, TableHead, TableBody, TableRow, TableTh, TableTd,
  TableEmpty, TableSkeleton, DataTable, type ColumnDef,
} from './Table'
import { Badge } from '../Badge/Badge'
import { Button } from '../Button/Button'
import { PendingReview } from '../../storybook/PendingReview'

const meta = {
  title: 'Data/Table',
  component: DataTable,
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

// ─── Dados de exemplo ────────────────────────────────────────────────────────

type User = {
  id: number
  name: string
  email: string
  role: string
  status: 'success' | 'warning' | 'danger' | 'draft'
  statusLabel: string
}

const users: User[] = [
  { id: 1, name: 'Ana Souza',    email: 'ana@pucpr.br',    role: 'Admin',  status: 'success', statusLabel: 'Ativo' },
  { id: 2, name: 'Bruno Lima',   email: 'bruno@pucpr.br',  role: 'Editor', status: 'warning', statusLabel: 'Pendente' },
  { id: 3, name: 'Carla Matos',  email: 'carla@pucpr.br',  role: 'Viewer', status: 'danger',  statusLabel: 'Bloqueado' },
  { id: 4, name: 'Diego Ramos',  email: 'diego@pucpr.br',  role: 'Editor', status: 'draft',   statusLabel: 'Rascunho' },
  { id: 5, name: 'Eva Ferreira', email: 'eva@pucpr.br',    role: 'Admin',  status: 'success', statusLabel: 'Ativo' },
]

const columns: ColumnDef<User>[] = [
  { key: 'name',   header: 'Nome',     accessor: 'name',   sortable: true },
  { key: 'email',  header: 'E-mail',   accessor: 'email' },
  { key: 'role',   header: 'Perfil',   accessor: 'role',   sortable: true },
  {
    key: 'status',
    header: 'Status',
    accessor: (row) => <Badge variant={row.status}>{row.statusLabel}</Badge>,
    align: 'center',
  },
  {
    key: 'actions',
    header: '',
    accessor: () => (
      <Button size="sm" variant="tertiary">Editar</Button>
    ),
    align: 'right',
  },
]

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => <DataTable columns={columns} data={users} />,
}

export const Loading: Story = {
  render: () => <DataTable columns={columns} data={[]} loading />,
}

export const Empty: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={[]}
      emptyMessage="Nenhum usuário encontrado para os filtros aplicados."
    />
  ),
}

export const Clickable: Story = {
  name: 'Linhas clicáveis',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState<string>()
    return (
      <div className="space-y-2">
        <DataTable
          columns={columns.slice(0, 4)}
          data={users}
          onRowClick={(row) => setSelected(row.name)}
        />
        {selected && (
          <p className="font-body text-sm text-gray-500">
            Clicou em: <strong>{selected}</strong>
          </p>
        )}
      </div>
    )
  },
}

export const WithSort: Story = {
  name: 'Com ordenação',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sortKey, setSortKey] = useState<string>('name')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

    const handleSort = (key: string) => {
      if (sortKey === key) {
        setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
      } else {
        setSortKey(key)
        setSortDir('asc')
      }
    }

    const sorted = [...users].sort((a, b) => {
      const val = (sortDir === 'asc' ? 1 : -1)
      const k = sortKey as keyof User
      return String(a[k]).localeCompare(String(b[k])) * val
    })

    return (
      <DataTable
        columns={columns.slice(0, 4)}
        data={sorted}
        sortKey={sortKey}
        sortDir={sortDir}
        onSort={handleSort}
      />
    )
  },
}

// Story com os primitivos composicionais (uso avançado)
export const Composicional: Story = {
  name: 'Uso composicional (primitivos)',
  render: () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableTh>Curso</TableTh>
          <TableTh align="center">Vagas</TableTh>
          <TableTh align="center">Inscritos</TableTh>
          <TableTh align="right">Ocupação</TableTh>
        </TableRow>
      </TableHead>
      <TableBody>
        {[
          { course: 'Engenharia de Software', vagas: 40, inscritos: 38 },
          { course: 'Design Gráfico',          vagas: 30, inscritos: 12 },
          { course: 'Ciência da Computação',   vagas: 40, inscritos: 40 },
        ].map((row) => {
          const pct = Math.round((row.inscritos / row.vagas) * 100)
          return (
            <TableRow key={row.course} clickable>
              <TableTd>{row.course}</TableTd>
              <TableTd align="center">{row.vagas}</TableTd>
              <TableTd align="center">{row.inscritos}</TableTd>
              <TableTd align="right">
                <Badge variant={pct >= 90 ? 'danger' : pct >= 60 ? 'warning' : 'success'}>
                  {pct}%
                </Badge>
              </TableTd>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  ),
}

// ─── Pending Review ──────────────────────────────────────────────────────────

export const PendingReviewStory: Story = {
  name: 'Pending Review',
  tags: ['pending-review'],
  parameters: { layout: 'padded' },
  render: () => (
    <PendingReview
      component="Table"
      items={[
          'Confirm header background (gray-50) and text color (gray-500) with design',
          'Validate sort indicator icon and active color (brand)',
          'Review selected row highlight (brand/5)',
          'Confirm border color and weight for table cells',
          'Check empty state illustration style',
          'Validate skeleton animation against DS loading patterns',
      ]}
    />
  ),
}
