import { PageHeader } from '@/components/PageHeader'
import { EmptyState } from '@/components/EmptyState'
import { TableSkeleton } from '@/components/TableSkeleton'
import { StatusBadge } from '@/components/StatusBadge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
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
}: EntityListPageProps): React.JSX.Element {
  const trashedView = isTrashedView || showDeleted

  return (
    <Card>
      <CardHeader className="pb-0">
        <PageHeader
          title={title}
          description={description}
          action={
            <div className="flex items-center gap-4">
              {onShowDeletedChange ? (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="show-deleted"
                    checked={showDeleted}
                    onCheckedChange={(checked) => onShowDeletedChange(checked === true)}
                  />
                  <Label htmlFor="show-deleted" className="text-sm font-normal">
                    Show deleted
                  </Label>
                </div>
              ) : null}
              {onCreate ? (
                <Button onClick={onCreate} disabled={trashedView}>
                  Add
                </Button>
              ) : (
                <Button disabled>Add</Button>
              )}
            </div>
          }
        />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <TableSkeleton />
        ) : items.length === 0 ? (
          <EmptyState title={emptyTitle} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                {showActions ? <TableHead className="w-[280px]">Actions</TableHead> : null}
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                  {showActions ? (
                    <TableCell className="space-x-2">
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
}
