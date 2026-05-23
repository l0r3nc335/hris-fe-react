import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { TimeTrackingEntity } from '@/modules/timeTracking/types'

export async function listTimeTracking(): Promise<TimeTrackingEntity[]> {
  const res = await httpClient.get<ApiResponse<TimeTrackingEntity[]>>(endpoints.timeTracking.list)
  return res.data.data
}

export async function getTimeTracking(id: string): Promise<TimeTrackingEntity> {
  const res = await httpClient.get<ApiResponse<TimeTrackingEntity>>(endpoints.timeTracking.byId(id))
  return res.data.data
}
