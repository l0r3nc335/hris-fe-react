import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { RolesEntity } from '@/modules/roles/types'

export async function listRoles(): Promise<RolesEntity[]> {
  const res = await httpClient.get<ApiResponse<RolesEntity[]>>(endpoints.roles.list)
  return res.data.data
}

export async function getRoles(id: string): Promise<RolesEntity> {
  const res = await httpClient.get<ApiResponse<RolesEntity>>(endpoints.roles.byId(id))
  return res.data.data
}
