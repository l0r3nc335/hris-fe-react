import type { SearchFieldConfig } from '@/types/searchFields'

const EMPLOYEE_STATUS_OPTIONS = [
  { value: 'any', label: 'Any status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'resigned', label: 'Resigned' },
  { value: 'promoted', label: 'Promoted' },
  { value: 'transferred', label: 'Transferred' },
]

export const EMPLOYEE_SEARCH_FIELDS: SearchFieldConfig[] = [
  { key: 'firstName', label: 'First name', type: 'text' },
  { key: 'lastName', label: 'Last name', type: 'text' },
  { key: 'status', label: 'Status', type: 'select', options: EMPLOYEE_STATUS_OPTIONS },
  {
    key: 'hireDate',
    label: 'Hire date',
    type: 'date-range',
    fromKey: 'hireDateFrom',
    toKey: 'hireDateTo',
  },
  {
    key: 'createdAt',
    label: 'Created at',
    type: 'date-range',
    fromKey: 'createdAtFrom',
    toKey: 'createdAtTo',
  },
  {
    key: 'deletedAt',
    label: 'Deleted at',
    type: 'date-range',
    fromKey: 'deletedAtFrom',
    toKey: 'deletedAtTo',
  },
]
