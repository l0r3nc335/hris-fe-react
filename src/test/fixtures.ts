import { ALL_PERMISSIONS } from '@/constants/permissions'
import type { User } from '@/types'

const now = '2026-01-01T00:00:00.000Z'

export const mockAdminUser: User = {
  id: 'user-1',
  tenantId: 'tenant-1',
  createdAt: now,
  updatedAt: now,
  email: 'admin1@hris.com',
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
  permissions: [...ALL_PERMISSIONS],
  isActive: true,
}

export const mockEntity = {
  id: 'entity-1',
  name: 'Sample record',
  status: 'active',
}

export const mockListItems = [
  mockEntity,
  { id: 'entity-2', name: 'Another record', status: 'inactive' },
]

export const mockDashboardMetrics = [
  { label: 'Employees', value: 42 },
  { label: 'Departments', value: 8 },
]
