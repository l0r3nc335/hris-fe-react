import { endpoints } from '@/constants/endpoints'
import { createMutableResourceApi } from './client'
import type { PerformanceEntity } from '@/modules/performance/types'

const api = createMutableResourceApi<PerformanceEntity>({
  list: endpoints.performance.list,
  byId: endpoints.performance.byId,
  trashed: endpoints.performance.trashed,
  softDelete: endpoints.performance.softDelete,
  restore: endpoints.performance.restore,
})

export const listPerformance = api.list
export const getPerformance = api.getById
export const performanceApi = api
