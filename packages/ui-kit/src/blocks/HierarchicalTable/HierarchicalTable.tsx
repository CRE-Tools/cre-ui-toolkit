'use client'

import { useMemo, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

/**
 * HierarchicalTable — tabela com cabeçalho em árvore para dados de analytics.
 *
 * Colunas com "/" são agrupadas visualmente em múltiplos níveis:
 *   "experiencia/Controles/Cliques/A"
 *   "experiencia/Controles/Cliques/B"
 *   "experiencia/Controles/Eixo/X"
 *
 * Resultado visual:
 *   ┌─────────────────────────────────┐
 *   │         experiencia             │
 *   │    Controles                    │
 *   │  Cliques    │  Eixo             │
 *   │  A │ B │ LT │  X               │
 *   └─────────────────────────────────┘
 *
 * Features:
 *   - Cabeçalho sticky (não some ao rolar)
 *   - Primeira coluna sticky (não some ao rolar horizontal)
 *   - Linhas alternadas para facilitar leitura
 *   - Exportação CSV com um clique
 *   - Sem bugs de linha branca (usa border-collapse correto)
 */

// ─── Tipos ───────────────────────────────────────────────────────────────────

export interface HierarchicalTableProps {
  /**
   * Chaves das colunas — podem conter "/" para agrupamento hierárquico.
   * Ex: ["session/id", "experiencia/Controles/Cliques/A"]
   */
  columns: string[]
  /**
   * Linhas de dados. Cada objeto tem as chaves correspondentes às colunas.
   */
  data: Record<string, unknown>[]
  /**
   * Título exibido acima da tabela.
   */
  title?: string
  /**
   * Torna a primeira coluna sticky ao rolar horizontalmente.
   * @default true
   */
  stickyFirstColumn?: boolean
  /**
   * Exibe botão de exportar CSV.
   * @default true
   */
  exportable?: boolean
  /**
   * Nome do arquivo CSV gerado.
   * @default 'export'
   */
  exportFileName?: string
  className?: string
}

// ─── Algoritmo: constrói a árvore de colunas ─────────────────────────────────

interface ColNode {
  label: string
  path: string      // caminho completo até este nó
  children: ColNode[]
  isLeaf: boolean
  leafIndex?: number // índice na lista de folhas (para colspan)
}

function buildTree(columns: string[]): ColNode[] {
  const root: ColNode[] = []

  for (const col of columns) {
    const parts = col.split('/')
    let level = root

    for (let i = 0; i < parts.length; i++) {
      const label = parts[i]
      const path  = parts.slice(0, i + 1).join('/')
      let node = level.find((n) => n.path === path)

      if (!node) {
        node = { label, path, children: [], isLeaf: false }
        level.push(node)
      }

      if (i === parts.length - 1) {
        node.isLeaf = true
      }

      level = node.children
    }
  }

  return root
}

/** Retorna todas as folhas em ordem de exibição. */
function getLeaves(nodes: ColNode[]): ColNode[] {
  const leaves: ColNode[] = []
  function walk(list: ColNode[]) {
    for (const n of list) {
      if (n.isLeaf && n.children.length === 0) {
        leaves.push(n)
      } else {
        walk(n.children)
      }
    }
  }
  walk(nodes)
  return leaves
}

/** Calcula colspan (número de folhas descendentes). */
function colspanOf(node: ColNode): number {
  if (node.isLeaf && node.children.length === 0) return 1
  return node.children.reduce((sum, c) => sum + colspanOf(c), 0)
}

/** Altura máxima da árvore. */
function treeDepth(nodes: ColNode[], depth = 1): number {
  let max = depth
  for (const n of nodes) {
    if (n.children.length > 0) {
      max = Math.max(max, treeDepth(n.children, depth + 1))
    }
  }
  return max
}

/** Converte a árvore em linhas de header para renderizar. */
interface HeaderCell {
  label: string
  path: string
  colspan: number
  rowspan: number
  isLeaf: boolean
}

function buildHeaderRows(nodes: ColNode[], maxDepth: number): HeaderCell[][] {
  const rows: HeaderCell[][] = Array.from({ length: maxDepth }, () => [])

  function walk(list: ColNode[], level: number) {
    for (const node of list) {
      const colspan = colspanOf(node)
      const depth   = node.isLeaf && node.children.length === 0
        ? maxDepth - level  // folha se estende até o fim
        : 1

      rows[level].push({
        label:   node.label,
        path:    node.path,
        colspan,
        rowspan: depth,
        isLeaf:  node.isLeaf && node.children.length === 0,
      })

      if (node.children.length > 0) {
        walk(node.children, level + 1)
      }
    }
  }

  walk(nodes, 0)
  return rows
}

// ─── CSV Export ──────────────────────────────────────────────────────────────

function exportCSV(columns: string[], data: Record<string, unknown>[], fileName: string) {
  const header = columns.join(',')
  const rows   = data.map((row) =>
    columns.map((col) => {
      const val = String(row[col] ?? '')
      // Escapa vírgulas e aspas dentro dos valores
      return val.includes(',') || val.includes('"')
        ? `"${val.replace(/"/g, '""')}"`
        : val
    }).join(',')
  )
  const csv  = [header, ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = `${fileName}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// ─── Componente principal ────────────────────────────────────────────────────

export function HierarchicalTable({
  columns,
  data,
  title,
  stickyFirstColumn = true,
  exportable        = true,
  exportFileName    = 'export',
  className,
}: HierarchicalTableProps) {
  const tree     = useMemo(() => buildTree(columns), [columns])
  const maxDepth = useMemo(() => treeDepth(tree), [tree])
  const headerRows = useMemo(() => buildHeaderRows(tree, maxDepth), [tree, maxDepth])
  const leaves   = useMemo(() => getLeaves(tree), [tree])

  return (
    <div className={cn('flex flex-col gap-3', className)}>

      {/* Barra superior */}
      {(title || exportable) && (
        <div className="flex items-center justify-between gap-4">
          {title && (
            <h2 className="font-heading font-semibold text-base text-gray-900">{title}</h2>
          )}
          {exportable && (
            <button
              type="button"
              onClick={() => exportCSV(columns, data, exportFileName)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-radius-8',
                'font-body text-xs font-semibold',
                'bg-white border border-neutral-400 text-gray-700',
                'hover:bg-gray-50 hover:border-gray-400 transition-colors',
                'focus-visible:outline-none focus-visible:ring focus-visible:ring-brand/30',
              )}
            >
              <DownloadIcon />
              Exportar CSV
            </button>
          )}
        </div>
      )}

      {/* Wrapper com scroll */}
      <div className="w-full overflow-auto rounded-radius-8 border border-neutral-400/30 max-h-[70vh]">
        <table
          className="border-collapse text-xs font-body"
          style={{ minWidth: 'max-content' }}
        >
          {/* ── CABEÇALHO ── */}
          <thead className="sticky top-0 z-20">
            {headerRows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, cellIdx) => {
                  const isFirstAndSticky = stickyFirstColumn && rowIdx === 0 && cellIdx === 0
                  return (
                    <th
                      key={cell.path}
                      colSpan={cell.colspan}
                      rowSpan={cell.rowspan}
                      className={cn(
                        'px-3 py-2 text-center font-semibold whitespace-nowrap select-none',
                        'border border-neutral-400/40',
                        cell.isLeaf
                          ? 'bg-gray-50 text-gray-600'
                          : 'bg-brand text-white',
                        isFirstAndSticky && 'sticky left-0 z-30',
                      )}
                    >
                      {cell.label}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>

          {/* ── CORPO ── */}
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={leaves.length}
                  className="px-4 py-10 text-center text-gray-400 border border-neutral-400/20"
                >
                  Nenhum dado disponível.
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={cn(
                    // Linhas alternadas — facilita acompanhar a linha
                    rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60',
                    'hover:bg-brand/5 transition-colors',
                  )}
                >
                  {leaves.map((leaf, leafIdx) => {
                    const value = row[leaf.path]
                    const isFirst = stickyFirstColumn && leafIdx === 0

                    return (
                      <td
                        key={leaf.path}
                        className={cn(
                          'px-3 py-2 whitespace-nowrap text-gray-700',
                          // border-collapse elimina o bug de linha branca
                          'border border-neutral-400/20',
                          isFirst && [
                            'sticky left-0 z-10 font-semibold',
                            rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                            'border-r-2 border-r-neutral-400/40',
                          ],
                        )}
                      >
                        {formatValue(value)}
                      </td>
                    )
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Contador */}
      <p className="font-body text-xs text-gray-400 text-right">
        {data.length} {data.length === 1 ? 'registro' : 'registros'}
      </p>
    </div>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatValue(val: unknown): ReactNode {
  if (val === null || val === undefined) return <span className="text-gray-300">—</span>
  if (typeof val === 'boolean') return val ? '✓' : '✗'
  if (typeof val === 'number') return val.toLocaleString('pt-BR')
  return String(val)
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
