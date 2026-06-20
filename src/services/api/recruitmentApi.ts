import { endpoints } from '@/constants/endpoints'
import { apiGetPaginated, createMutableResourceApi, type ListQueryParams } from './client'
import type { RecruitmentEntity } from '@/modules/recruitment/types'
import type { Paginated } from '@/types/api'

const api = createMutableResourceApi<RecruitmentEntity>({
  list: endpoints.recruitment.list,
  byId: endpoints.recruitment.byId,
  trashed: endpoints.recruitment.trashed,
  softDelete: endpoints.recruitment.softDelete,
  restore: endpoints.recruitment.restore,
})

export const listRecruitment = api.list
export const listApplicants = (
  params?: ListQueryParams,
): Promise<Paginated<RecruitmentEntity>> =>
  apiGetPaginated<RecruitmentEntity>(endpoints.recruitment.applicants, params)
export const getRecruitment = api.getById
export const recruitmentApi = api
