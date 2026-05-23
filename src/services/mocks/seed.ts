import type { User } from '@/types'

export const TENANT_ID = 'tenant-001'

export const mockUser: User = {
  id: 'user-001',
  tenantId: TENANT_ID,
  email: 'admin@hris.com',
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
  permissions: [],
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export function createEntity(name: string, index: number): {
  id: string
  tenantId: string
  name: string
  status: string
  createdAt: string
  updatedAt: string
} {
  return {
    id: `${name}-${index}`,
    tenantId: TENANT_ID,
    name: `${name} ${index}`,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export function createList(prefix: string, count = 5): ReturnType<typeof createEntity>[] {
  return Array.from({ length: count }, (_, i) => createEntity(prefix, i + 1))
}
