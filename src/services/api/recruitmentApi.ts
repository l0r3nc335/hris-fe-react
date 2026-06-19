import { endpoints } from '@/constants/endpoints'
import { apiGet } from './client'
import { createMutableResourceApi } from './client'
import type { RecruitmentEntity } from '@/modules/recruitment/types'

const api = createMutableResourceApi<RecruitmentEntity>({
  list: endpoints.recruitment.list,
  byId: endpoints.recruitment.byId,
  trashed: endpoints.recruitment.trashed,
  softDelete: endpoints.recruitment.softDelete,
  restore: endpoints.recruitment.restore,
})

export const listRecruitment = api.list
export const listApplicants = (): Promise<RecruitmentEntity[]> =>
  apiGet<RecruitmentEntity[]>(endpoints.recruitment.applicants)
export const getRecruitment = api.getById
export const recruitmentApi = api
