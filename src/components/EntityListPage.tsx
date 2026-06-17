import { useMemo, useState } from 'react'
import { EmptyState } from '@/components/EmptyState'
import { TableSkeleton } from '@/components/TableSkeleton'
import { StatusBadge } from '@/components/StatusBadge'
import { PageShell } from '@/components/layout/PageShell'
import { DataTableToolbar } from '@/components/layout/DataTableToolbar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/ui'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui'

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
}: EntityListPageProps): React.JSX.Element {
  const trashedView = isTrashedView || showDeleted
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return items
    return items.filter((item) =>
      searchKeys.some((key) => String(item[key]).toLowerCase().includes(q)),
    )
  }, [items, searchKeys, searchQuery])

  const cardContent = (
    <Card>
      <CardHeader className="space-y-4 pb-0">
        <DataTableToolbar
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          showDeleted={showDeleted}
          onShowDeletedChange={onShowDeletedChange}
          extra={extraToolbar}
          primaryAction={
            onCreate ? (
              <Button onClick={onCreate} disabled={trashedView}>
                Add
              </Button>
            ) : undefined
          }
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
                {showActions ? <TableHead className="w-[320px]">Actions</TableHead> : null}
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
                    <TableCell className="space-x-2">
                      {extraRowActions?.(item)}
                      {trashedView ? (
                        <>
                          {onRestore ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onRestore(item.id)}
                            >
                              Restore
                            </Button>
                          ) : null}
                          {onHardDelete ? (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => onHardDelete(item.id)}
                            >
                              Hard delete
                            </Button>
                          ) : null}
                        </>
                      ) : (
                        <>
                          {onEdit ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onEdit(item)}
                            >
                              Edit
                            </Button>
                          ) : null}
                          {onSoftDelete ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onSoftDelete(item.id)}
                            >
                              Soft delete
                            </Button>
                          ) : null}
                          {onHardDelete ? (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => onHardDelete(item.id)}
                            >
                              Hard delete
                            </Button>
                          ) : null}
                        </>
                      )}
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
