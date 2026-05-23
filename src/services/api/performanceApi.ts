import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { PerformanceEntity } from '@/modules/performance/types'

export async function listPerformance(): Promise<PerformanceEntity[]> {
  const res = await httpClient.get<ApiResponse<PerformanceEntity[]>>(endpoints.performance.list)
  return res.data.data
}

export async function getPerformance(id: string): Promise<PerformanceEntity> {
  const res = await httpClient.get<ApiResponse<PerformanceEntity>>(endpoints.performance.byId(id))
  return res.data.data
}
