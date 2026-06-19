import { useMemo, useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import { EmptyState } from '@/components/EmptyState'
import { TableSkeleton } from '@/components/TableSkeleton'
import { StatusBadge } from '@/components/StatusBadge'
import { RequirePermission } from '@/components/RequirePermission'
import { PageShell } from '@/components/layout/PageShell'
import { DataTableToolbar } from '@/components/layout/DataTableToolbar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button, Dropdown, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui'
import type { DropdownItem } from '@/ui/Dropdown'
import type { Permission } from '@/constants/permissions'

interface EntityListItem {
  id: string
  name: string
  status: string
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
  searchKeys?: (keyof EntityListItem)[]
  embedded?: boolean
  createPermission?: Permission
  writePermission?: Permission
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
  searchKeys = ['name', 'status'],
  embedded = false,
  createPermission,
  writePermission,
}: EntityListPageProps): React.JSX.Element {
  const trashedView = isTrashedView || showDeleted
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredItems = useMemo(() => {
    let result = items
    if (statusFilter !== 'all') {
      result = result.filter((item) => item.status.toLowerCase() === statusFilter)
    }
    const q = searchQuery.trim().toLowerCase()
    if (!q) return result
    return result.filter((item) =>
      searchKeys.some((key) => String(item[key]).toLowerCase().includes(q)),
    )
  }, [items, searchKeys, searchQuery, statusFilter])

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
          onSearchChange={setSearchQuery}
          showDeleted={showDeleted}
          onShowDeletedChange={onShowDeletedChange}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                {showActions ? <TableHead className="w-[120px]">Actions</TableHead> : null}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
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
