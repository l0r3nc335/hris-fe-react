import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { InterviewsEntity } from '@/modules/interviews/types'

export async function listInterviews(): Promise<InterviewsEntity[]> {
  const res = await httpClient.get<ApiResponse<InterviewsEntity[]>>(endpoints.interviews.list)
  return res.data.data
}

export async function getInterviews(id: string): Promise<InterviewsEntity> {
  const res = await httpClient.get<ApiResponse<InterviewsEntity>>(endpoints.interviews.byId(id))
  return res.data.data
}
