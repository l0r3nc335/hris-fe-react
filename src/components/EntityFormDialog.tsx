import { useEffect, useState } from 'react'
import { Button, Input, Label, Modal, Select, Textarea } from '@/ui'
import type { SelectOption } from '@/ui/Select'

export interface EntityFormValues {
  name: string
  status: string
  [key: string]: string
}

export type FormFieldConfig =
  | { key: string; label: string; type: 'text' | 'email'; createOnly?: boolean }
  | { key: string; label: string; type: 'select'; options: SelectOption[]; createOnly?: boolean }
  | { key: string; label: string; type: 'textarea'; createOnly?: boolean }

export interface EntityFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  title: string
  initialValues?: EntityFormValues
  onSubmit: (data: EntityFormValues) => void
  isPending?: boolean
  formFields?: FormFieldConfig[]
  statusOptions?: SelectOption[]
}

const STATUS_OPTIONS: SelectOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

const defaultValues: EntityFormValues = { name: '', status: 'active' }

function buildInitialState(
  initialValues: EntityFormValues | undefined,
  formFields: FormFieldConfig[],
  defaultStatus: string,
): EntityFormValues {
  const state: EntityFormValues = {
    name: initialValues?.name ?? defaultValues.name,
    status: initialValues?.status ?? defaultStatus,
  }
  for (const field of formFields) {
    state[field.key] = initialValues?.[field.key] ?? ''
  }
  return state
}

export function EntityFormDialog({
  open,
  onOpenChange,
  mode,
  title,
  initialValues,
  onSubmit,
  isPending = false,
  formFields = [],
  statusOptions = STATUS_OPTIONS,
}: EntityFormDialogProps): React.JSX.Element {
  const defaultStatus = statusOptions[0]?.value ?? 'active'
  const [values, setValues] = useState<EntityFormValues>(() =>
    buildInitialState(initialValues, formFields, defaultStatus),
  )

  useEffect(() => {
    if (open) {
      setValues(buildInitialState(initialValues, formFields, defaultStatus))
    }
  }, [open, initialValues, formFields, defaultStatus])

  const setField = (key: string, value: string): void => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (): void => {
    if (!values.name?.trim()) return
    onSubmit({ ...values, name: values.name.trim() })
    if (mode === 'create') {
      setValues(buildInitialState(undefined, formFields, defaultStatus))
    }
    onOpenChange(false)
  }

  const visibleFields = formFields.filter((f) => mode === 'create' || !f.createOnly)

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending || !values.name?.trim()}>
            {isPending
              ? mode === 'create'
                ? 'Creating...'
                : 'Saving...'
              : mode === 'create'
                ? 'Create'
                : 'Save'}
          </Button>
        </>
      }
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="entity-name">Name</Label>
          <Input
            id="entity-name"
            value={values.name ?? ''}
            onChange={(e) => setField('name', e.target.value)}
            placeholder="Enter name"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="entity-status">Status</Label>
          <Select
            value={values.status ?? 'active'}
            onValueChange={(v) => setField('status', v)}
            placeholder="Select status"
            options={statusOptions}
          />
        </div>
        {visibleFields.map((field) => (
          <div key={field.key} className="grid gap-2">
            <Label htmlFor={`entity-${field.key}`}>{field.label}</Label>
            {field.type === 'textarea' ? (
              <Textarea
                id={`entity-${field.key}`}
                value={values[field.key] ?? ''}
                onChange={(e) => setField(field.key, e.target.value)}
                placeholder={field.label}
                rows={3}
              />
            ) : field.type === 'select' ? (
              <Select
                value={values[field.key] ?? ''}
                onValueChange={(v) => setField(field.key, v)}
                placeholder={`Select ${field.label.toLowerCase()}`}
                options={field.options}
              />
            ) : (
              <Input
                id={`entity-${field.key}`}
                type={field.type}
                value={values[field.key] ?? ''}
                onChange={(e) => setField(field.key, e.target.value)}
                placeholder={field.label}
              />
            )}
          </div>
        ))}
      </div>
    </Modal>
  )
}
