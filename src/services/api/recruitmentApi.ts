import { endpoints } from '@/constants/endpoints'
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
export const getRecruitment = api.getById
export const recruitmentApi = api
