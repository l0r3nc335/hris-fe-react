import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Label, Modal, Select } from '@/ui'
import { useDepartmentsList } from '@/modules/departments/hooks'
import { usePositionsList } from '@/modules/positions/hooks'

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
  const { data: positions = [] } = usePositionsList()
  const { data: departments = [] } = useDepartmentsList()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ActionFormValues>({
    resolver: zodResolver(actionSchema),
    defaultValues: { targetId: '' },
  })

  const title = action === 'promote' ? 'Promote Employee' : 'Transfer Employee'
  const label = action === 'promote' ? 'New Position' : 'New Department'
  const options =
    action === 'promote'
      ? positions.map((p) => ({ value: p.id, label: p.name }))
      : departments.map((d) => ({ value: d.id, label: d.name }))

  const handleFormSubmit = (data: ActionFormValues): void => {
    onSubmit(data.targetId)
    reset()
    onOpenChange(false)
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      footer={
        <>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" form="employee-action-form" disabled={isPending}>
            {action === 'promote' ? 'Promote' : 'Transfer'}
          </Button>
        </>
      }
    >
      <form
        id="employee-action-form"
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4"
      >
        <p className="text-sm text-muted-foreground">
          {action === 'promote'
            ? `Promote ${employeeName} to a new position.`
            : `Transfer ${employeeName} to a new department.`}
        </p>
        <div className="space-y-2">
          <Label htmlFor="targetId">{label}</Label>
          <Controller
            name="targetId"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                placeholder={`Select ${label.toLowerCase()}`}
                options={options}
              />
            )}
          />
          {errors.targetId ? (
            <p className="text-sm text-destructive">{errors.targetId.message}</p>
          ) : null}
        </div>
      </form>
    </Modal>
  )
}
