import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/ui'

const actionSchema = z.object({
  targetId: z.string().min(1, 'Required'),
})

type ActionFormValues = z.infer<typeof actionSchema>

export interface EmployeeActionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  employeeName: string
  action: 'promote' | 'transfer'
  onSubmit: (targetId: string) => void
  isPending?: boolean
}

export function EmployeeActionDialog({
  open,
  onOpenChange,
  employeeName,
  action,
  onSubmit,
  isPending = false,
}: EmployeeActionDialogProps): React.JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ActionFormValues>({
    resolver: zodResolver(actionSchema),
    defaultValues: { targetId: '' },
  })

  const title = action === 'promote' ? 'Promote Employee' : 'Transfer Employee'
  const label = action === 'promote' ? 'New Position ID' : 'New Department ID'

  const handleFormSubmit = (data: ActionFormValues): void => {
    onSubmit(data.targetId)
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {action === 'promote'
              ? `Promote ${employeeName} to a new position.`
              : `Transfer ${employeeName} to a new department.`}
          </p>
          <div className="space-y-2">
            <Label htmlFor="targetId">{label}</Label>
            <Input id="targetId" {...register('targetId')} placeholder="Enter ID" />
            {errors.targetId ? (
              <p className="text-sm text-destructive">{errors.targetId.message}</p>
            ) : null}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {action === 'promote' ? 'Promote' : 'Transfer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
