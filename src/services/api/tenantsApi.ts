import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { TenantsEntity } from '@/modules/tenants/types'

export async function listTenants(): Promise<TenantsEntity[]> {
  const res = await httpClient.get<ApiResponse<TenantsEntity[]>>(endpoints.tenants.list)
  return res.data.data
}

export async function getTenants(id: string): Promise<TenantsEntity> {
  const res = await httpClient.get<ApiResponse<TenantsEntity>>(endpoints.tenants.byId(id))
  return res.data.data
}
