import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { LeaveEntity } from '@/modules/leave/types'

export async function listLeave(): Promise<LeaveEntity[]> {
  const res = await httpClient.get<ApiResponse<LeaveEntity[]>>(endpoints.leave.list)
  return res.data.data
}

export async function getLeave(id: string): Promise<LeaveEntity> {
  const res = await httpClient.get<ApiResponse<LeaveEntity>>(endpoints.leave.byId(id))
  return res.data.data
}
