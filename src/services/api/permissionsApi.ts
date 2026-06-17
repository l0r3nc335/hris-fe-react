import { endpoints } from '@/constants/endpoints'
import { apiGet, apiPost } from './client'

export interface Permission {
  id: string
  code: string
  description: string
}

export function listPermissions(): Promise<Permission[]> {
  return apiGet<Permission[]>(endpoints.permissions.list)
}

export function assignPermissionsToRole(
  roleId: string,
  permissionIds: string[],
): Promise<void> {
  return apiPost<void>(endpoints.permissions.assign(roleId), { permissionIds })
}
