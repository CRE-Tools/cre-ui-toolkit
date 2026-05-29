import {
  type HTMLAttributes,
  type ReactNode,
  type ThHTMLAttributes,
  type TdHTMLAttributes,
} from 'react'
import { cn } from '../../utils/cn'

/**
 * Table — listagem de dados do painel administrativo.
 *
 * Composição:
 *   <Table>
 *     <TableHead>
 *       <TableRow>
 *         <TableTh>Nome</TableTh>
 *       </TableRow>
 *     </TableHead>
 *     <TableBody>
 *       <TableRow>
 *         <TableTd>Ana Souza</TableTd>
 *       </TableRow>
 *     </TableBody>
 *   </Table>
 *
 * Para tabelas com dados dinâmicos, use DataTable (wrapper opinado).
 *
 * Tokens aplicados:
 *   font-body             — tipografia da tabela
 *   border-width-small    — separadores
 *   neutral.400 #B5A8AD   — bordas e divisores
 */

// ─── Primitivos composicionais ──────────────────────────────────────────────

export function Table({ className, children, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto rounded-xsmall border border-[#B5A8AD]/30">
      <table
        className={cn('w-full border-collapse font-body text-sm', className)}
        {...props}
      >
        {children}
      </table>
    </div>
  )
}

export function TableHead({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn('bg-gray-50 border-b border-[#B5A8AD]/30', className)}
      {...props}
    />
  )
}

export function TableBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn('divide-y divide-[#B5A8AD]/20', className)} {...props} />
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Aplica estilo de hover clicável. */
  clickable?: boolean
  /** Marca a linha visualmente como selecionada. */
  selected?: boolean
}

export function TableRow({ clickable, selected, className, ...props }: TableRowProps) {
  return (
    <tr
      className={cn(
        'transition-colors duration-100',
        clickable && 'cursor-pointer hover:bg-gray-50',
        selected  && 'bg-brand/5',
        className,
      )}
      {...props}
    />
  )
}

export interface TableThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Alinha o conteúdo. @default 'left' */
  align?: 'left' | 'center' | 'right'
  /** Mostra indicador de ordenação. */
  sortable?: boolean
  /** Direção atual da ordenação. */
  sortDir?: 'asc' | 'desc' | null
}

export function TableTh({
  align   = 'left',
  sortable,
  sortDir,
  children,
  className,
  onClick,
  ...props
}: TableThProps) {
  return (
    <th
      className={cn(
        'px-4 py-3 font-semibold text-xs text-gray-500 uppercase tracking-wide select-none',
        align === 'center' && 'text-center',
        align === 'right'  && 'text-right',
        sortable && 'cursor-pointer hover:text-gray-800',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {sortable && (
          <SortIcon dir={sortDir ?? null} />
        )}
      </span>
    </th>
  )
}

export interface TableTdProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right'
}

export function TableTd({ align = 'left', className, ...props }: TableTdProps) {
  return (
    <td
      className={cn(
        'px-4 py-3 text-gray-700',
        align === 'center' && 'text-center',
        align === 'right'  && 'text-right',
        className,
      )}
      {...props}
    />
  )
}

// ─── Estado vazio ────────────────────────────────────────────────────────────

export interface TableEmptyProps {
  /** Número de colunas (para o colspan). */
  cols: number
  /** Mensagem. @default 'Nenhum registro encontrado.' */
  message?: string
  /** Conteúdo customizado no lugar da mensagem padrão. */
  children?: ReactNode
}

export function TableEmpty({ cols, message = 'Nenhum registro encontrado.', children }: TableEmptyProps) {
  return (
    <tr>
      <td colSpan={cols} className="px-4 py-10 text-center text-gray-400 font-body text-sm">
        {children ?? (
          <div className="flex flex-col items-center gap-2">
            <EmptyIcon />
            <span>{message}</span>
          </div>
        )}
      </td>
    </tr>
  )
}

// ─── Skeleton de loading ─────────────────────────────────────────────────────

export interface TableSkeletonProps {
  cols: number
  rows?: number
}

export function TableSkeleton({ cols, rows = 5 }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-b border-[#B5A8AD]/20 last:border-0">
          {Array.from({ length: cols }).map((_, j) => (
            <td key={j} className="px-4 py-3">
              <div className="h-4 bg-gray-100 rounded animate-pulse" style={{ width: j === 0 ? '60%' : '80%' }} />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

// ─── DataTable — wrapper opinado ─────────────────────────────────────────────

export interface ColumnDef<T> {
  /** Chave única da coluna. */
  key: string
  /** Cabeçalho exibido. */
  header: string
  /** Campo do objeto ou função de render. */
  accessor: ((row: T) => ReactNode) | keyof T
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  /** Classe extra na célula td. */
  tdClassName?: string
}

export interface DataTableProps<T extends { id?: string | number }> {
  /** Definição das colunas. */
  columns: ColumnDef<T>[]
  /** Dados a exibir. */
  data: T[]
  /** Exibe skeleton de carregamento. */
  loading?: boolean
  /** Mensagem quando data está vazio. */
  emptyMessage?: string
  /** Callback ao clicar numa linha. */
  onRowClick?: (row: T) => void
  /** Chave da coluna ordenada. */
  sortKey?: string
  /** Direção da ordenação. */
  sortDir?: 'asc' | 'desc' | null
  /** Callback ao clicar num header ordenável. */
  onSort?: (key: string) => void
  className?: string
}

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  loading    = false,
  emptyMessage,
  onRowClick,
  sortKey,
  sortDir,
  onSort,
  className,
}: DataTableProps<T>) {
  return (
    <Table className={className}>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableTh
              key={col.key}
              align={col.align}
              sortable={col.sortable}
              sortDir={sortKey === col.key ? (sortDir ?? null) : null}
              onClick={col.sortable && onSort ? () => onSort(col.key) : undefined}
            >
              {col.header}
            </TableTh>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {loading ? (
          <TableSkeleton cols={columns.length} />
        ) : data.length === 0 ? (
          <TableEmpty cols={columns.length} message={emptyMessage} />
        ) : (
          data.map((row, i) => (
            <TableRow
              key={row.id ?? i}
              clickable={!!onRowClick}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((col) => (
                <TableTd key={col.key} align={col.align} className={col.tdClassName}>
                  {typeof col.accessor === 'function'
                    ? col.accessor(row)
                    : String(row[col.accessor] ?? '')}
                </TableTd>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}

// ─── Ícones internos ─────────────────────────────────────────────────────────

function SortIcon({ dir }: { dir: 'asc' | 'desc' | null }) {
  return (
    <span className="flex flex-col gap-px opacity-40">
      <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden="true"
        className={cn('transition-opacity', dir === 'asc' && 'opacity-100 text-brand')}
      >
        <path d="M4 0L7.5 5H.5L4 0z" fill={dir === 'asc' ? '#7B1234' : 'currentColor'}/>
      </svg>
      <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden="true"
        className={cn('transition-opacity', dir === 'desc' && 'opacity-100 text-brand')}
      >
        <path d="M4 5L.5 0h7L4 5z" fill={dir === 'desc' ? '#7B1234' : 'currentColor'}/>
      </svg>
    </span>
  )
}

function EmptyIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-gray-300" aria-hidden="true">
      <rect x="4" y="8" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 14h32" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 22h16M12 27h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
