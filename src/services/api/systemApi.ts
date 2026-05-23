import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { SystemEntity } from '@/modules/system/types'

export async function listSystem(): Promise<SystemEntity[]> {
  const res = await httpClient.get<ApiResponse<SystemEntity[]>>(endpoints.system.list)
  return res.data.data
}

export async function getSystem(id: string): Promise<SystemEntity> {
  const res = await httpClient.get<ApiResponse<SystemEntity>>(endpoints.system.byId(id))
  return res.data.data
}
