import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { CompensationEntity } from '@/modules/compensation/types'

export async function listCompensation(): Promise<CompensationEntity[]> {
  const res = await httpClient.get<ApiResponse<CompensationEntity[]>>(endpoints.compensation.list)
  return res.data.data
}

export async function getCompensation(id: string): Promise<CompensationEntity> {
  const res = await httpClient.get<ApiResponse<CompensationEntity>>(endpoints.compensation.byId(id))
  return res.data.data
}
