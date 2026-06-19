import type { FormFieldConfig } from '@/components/EntityFormDialog'

export const EMAIL_FIELD: FormFieldConfig = {
  key: 'email',
  label: 'Email',
  type: 'email',
  createOnly: true,
}

export const NOTES_FIELD: FormFieldConfig = {
  key: 'notes',
  label: 'Notes',
  type: 'textarea',
}
