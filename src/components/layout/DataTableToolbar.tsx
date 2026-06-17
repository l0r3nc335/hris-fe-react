import type { ReactNode } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/ui'

export interface DataTableToolbarProps {
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  showDeleted?: boolean
  onShowDeletedChange?: (show: boolean) => void
  primaryAction?: ReactNode
  extra?: ReactNode
}

export function DataTableToolbar({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search records...',
  showDeleted,
  onShowDeletedChange,
  primaryAction,
  extra,
}: DataTableToolbarProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative max-w-sm flex-1">
        {onSearchChange ? (
          <>
            <Search className="absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8"
            />
          </>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {extra}
        {onShowDeletedChange ? (
          <div className="flex items-center gap-2">
            <Checkbox
              id="show-deleted-toolbar"
              checked={showDeleted}
              onCheckedChange={(checked) => onShowDeletedChange(checked === true)}
            />
            <Label htmlFor="show-deleted-toolbar" className="text-sm font-normal">
              Show deleted
            </Label>
          </div>
        ) : null}
        {primaryAction ?? <Button disabled>Add</Button>}
      </div>
    </div>
  )
}
