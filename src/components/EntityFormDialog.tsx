import { useEffect, useState } from 'react'
import { Button } from '@/ui'
import { Input } from '@/ui'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

export interface EntityFormValues {
  name: string
  status: string
}

export interface EntityFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  title: string
  initialValues?: EntityFormValues
  onSubmit: (data: EntityFormValues) => void
  isPending?: boolean
}

const defaultValues: EntityFormValues = { name: '', status: 'active' }

export function EntityFormDialog({
  open,
  onOpenChange,
  mode,
  title,
  initialValues,
  onSubmit,
  isPending = false,
}: EntityFormDialogProps): React.JSX.Element {
  const [name, setName] = useState(defaultValues.name)
  const [status, setStatus] = useState(defaultValues.status)

  useEffect(() => {
    if (open) {
      setName(initialValues?.name ?? defaultValues.name)
      setStatus(initialValues?.status ?? defaultValues.status)
    }
  }, [open, initialValues?.name, initialValues?.status])

  const handleSubmit = (): void => {
    if (!name.trim()) return
    onSubmit({ name: name.trim(), status })
    if (mode === 'create') {
      setName(defaultValues.name)
      setStatus(defaultValues.status)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="entity-name">Name</Label>
            <Input
              id="entity-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="entity-status">Status</Label>
            <Input
              id="entity-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="active"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending || !name.trim()}>
            {isPending
              ? mode === 'create'
                ? 'Creating...'
                : 'Saving...'
              : mode === 'create'
                ? 'Create'
                : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
