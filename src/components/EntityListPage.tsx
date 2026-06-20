import { useMemo, useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import { EmptyState } from '@/components/EmptyState'
import { TableSkeleton } from '@/components/TableSkeleton'
import { StatusBadge } from '@/components/StatusBadge'
import { RequirePermission } from '@/components/RequirePermission'
import { PageShell } from '@/components/layout/PageShell'
import { DataTableToolbar } from '@/components/layout/DataTableToolbar'
import { TablePagination } from '@/components/TablePagination'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button, Dropdown, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui'
import type { DropdownItem } from '@/ui/Dropdown'
import type { Permission } from '@/constants/permissions'

interface EntityListItem {
  id: string
  name: string
  status: string
}

export interface EntityListExtraColumn {
  header: string
  cell: (item: EntityListItem) => React.ReactNode
}

export interface EntityListPageProps {
  title: string
  description: string
  emptyTitle: string
  items: EntityListItem[]
  isLoading: boolean
  showDeleted?: boolean
  onShowDeletedChange?: (show: boolean) => void
  onCreate?: () => void
  onEdit?: (item: EntityListItem) => void
  onSoftDelete?: (id: string) => void
  onHardDelete?: (id: string) => void
  onRestore?: (id: string) => void
  showActions?: boolean
  isTrashedView?: boolean
  extraToolbar?: React.ReactNode
  extraRowActions?: (item: EntityListItem) => React.ReactNode
  extraColumns?: EntityListExtraColumn[]
  searchKeys?: string[]
  embedded?: boolean
  createPermission?: Permission
  writePermission?: Permission
  total?: number
  page?: number
  limit?: number
  onPageChange?: (page: number) => void
  onLimitChange?: (limit: number) => void
  searchValue?: string
  onSearchChange?: (value: string) => void
  statusFilter?: string
  onStatusFilterChange?: (value: string) => void
}

function RowActionsDropdown({
  item,
  trashedView,
  onEdit,
  onSoftDelete,
  onHardDelete,
  onRestore,
}: {
  item: EntityListItem
  trashedView: boolean
  onEdit?: (item: EntityListItem) => void
  onSoftDelete?: (id: string) => void
  onHardDelete?: (id: string) => void
  onRestore?: (id: string) => void
}): React.JSX.Element | null {
  const items: DropdownItem[] = []

  if (trashedView) {
    if (onRestore) items.push({ label: 'Restore', onSelect: () => onRestore(item.id) })
    if (onHardDelete) {
      items.push({
        label: 'Hard delete',
        destructive: true,
        onSelect: () => onHardDelete(item.id),
      })
    }
  } else {
    if (onEdit) items.push({ label: 'Edit', onSelect: () => onEdit(item) })
    if (onSoftDelete) items.push({ label: 'Soft delete', onSelect: () => onSoftDelete(item.id) })
    if (onHardDelete) {
      items.push({
        label: 'Hard delete',
        destructive: true,
        onSelect: () => onHardDelete(item.id),
      })
    }
  }

  if (items.length === 0) return null

  return (
    <Dropdown
      trigger={
        <Button variant="ghost" size="icon-sm" aria-label="Row actions">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      }
      items={items}
    />
  )
}

export function EntityListPage({
  title,
  description,
  emptyTitle,
  items,
  isLoading,
  showDeleted = false,
  onShowDeletedChange,
  onCreate,
  onEdit,
  onSoftDelete,
  onHardDelete,
  onRestore,
  showActions = false,
  isTrashedView = false,
  extraToolbar,
  extraRowActions,
  extraColumns = [],
  searchKeys = ['name', 'status'],
  embedded = false,
  createPermission,
  writePermission,
  total,
  page = 1,
  limit = 20,
  onPageChange,
  onLimitChange,
  searchValue,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: EntityListPageProps): React.JSX.Element {
  const trashedView = isTrashedView || showDeleted
  const serverSide = total !== undefined
  const [localSearchQuery, setLocalSearchQuery] = useState('')
  const [localStatusFilter, setLocalStatusFilter] = useState('all')

  const searchQuery = serverSide ? (searchValue ?? '') : localSearchQuery
  const activeStatusFilter = serverSide ? (statusFilter ?? 'all') : localStatusFilter

  const handleSearchChange = (value: string): void => {
    if (serverSide) {
      onSearchChange?.(value)
      return
    }
    setLocalSearchQuery(value)
  }

  const handleStatusFilterChange = (value: string): void => {
    if (serverSide) {
      onStatusFilterChange?.(value)
      return
    }
    setLocalStatusFilter(value)
  }

  const filteredItems = useMemo(() => {
    if (serverSide) return items
    let result = items
    if (activeStatusFilter !== 'all') {
      result = result.filter((item) => item.status.toLowerCase() === activeStatusFilter)
    }
    const q = searchQuery.trim().toLowerCase()
    if (!q) return result
    return result.filter((item) =>
      searchKeys.some((key) =>
        String((item as unknown as Record<string, unknown>)[key] ?? '')
          .toLowerCase()
          .includes(q),
      ),
    )
  }, [items, searchKeys, searchQuery, activeStatusFilter, serverSide])

  const addButton =
    onCreate ? (
      <Button onClick={onCreate} disabled={trashedView}>
        Add
      </Button>
    ) : undefined

  const primaryAction =
    createPermission && addButton ? (
      <RequirePermission permission={createPermission}>{addButton}</RequirePermission>
    ) : (
      addButton
    )

  const cardContent = (
    <Card>
      <CardHeader className="space-y-4 pb-0">
        <DataTableToolbar
          searchValue={searchQuery}
          onSearchChange={handleSearchChange}
          showDeleted={showDeleted}
          onShowDeletedChange={onShowDeletedChange}
          statusFilter={activeStatusFilter}
          onStatusFilterChange={handleStatusFilterChange}
          extra={extraToolbar}
          primaryAction={primaryAction}
        />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <TableSkeleton />
        ) : filteredItems.length === 0 ? (
          <EmptyState title={emptyTitle} />
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  {extraColumns.map((col) => (
                    <TableHead key={col.header}>{col.header}</TableHead>
                  ))}
                  <TableHead>Status</TableHead>
                  {showActions ? <TableHead className="w-[120px]">Actions</TableHead> : null}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    {extraColumns.map((col) => (
                      <TableCell key={col.header}>{col.cell(item)}</TableCell>
                    ))}
                    <TableCell>
                      <StatusBadge status={item.status} />
                    </TableCell>
                    {showActions ? (
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {extraRowActions?.(item)}
                          {writePermission ? (
                            <RequirePermission permission={writePermission}>
                              <RowActionsDropdown
                                item={item}
                                trashedView={trashedView}
                                onEdit={onEdit}
                                onSoftDelete={onSoftDelete}
                                onHardDelete={onHardDelete}
                                onRestore={onRestore}
                              />
                            </RequirePermission>
                          ) : (
                            <RowActionsDropdown
                              item={item}
                              trashedView={trashedView}
                              onEdit={onEdit}
                              onSoftDelete={onSoftDelete}
                              onHardDelete={onHardDelete}
                              onRestore={onRestore}
                            />
                          )}
                        </div>
                      </TableCell>
                    ) : null}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {serverSide && onPageChange && onLimitChange ? (
              <TablePagination
                page={page}
                limit={limit}
                total={total}
                onPageChange={onPageChange}
                onLimitChange={onLimitChange}
              />
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  )

  if (embedded) return cardContent

  return (
    <PageShell title={title} description={description}>
      {cardContent}
    </PageShell>
  )
}
