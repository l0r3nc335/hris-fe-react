import { endpoints } from '@/constants/endpoints'
import { createMutableResourceApi } from './client'
import type { CompensationEntity } from '@/modules/compensation/types'

const api = createMutableResourceApi<CompensationEntity>({
  list: endpoints.compensation.list,
  byId: endpoints.compensation.byId,
  trashed: endpoints.compensation.trashed,
  softDelete: endpoints.compensation.softDelete,
  restore: endpoints.compensation.restore,
})

export const listCompensation = api.list
export const getCompensation = api.getById
export const compensationApi = api
