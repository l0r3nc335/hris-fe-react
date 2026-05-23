import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { RecruitmentEntity } from '@/modules/recruitment/types'

export async function listRecruitment(): Promise<RecruitmentEntity[]> {
  const res = await httpClient.get<ApiResponse<RecruitmentEntity[]>>(endpoints.recruitment.list)
  return res.data.data
}

export async function getRecruitment(id: string): Promise<RecruitmentEntity> {
  const res = await httpClient.get<ApiResponse<RecruitmentEntity>>(endpoints.recruitment.byId(id))
  return res.data.data
}
