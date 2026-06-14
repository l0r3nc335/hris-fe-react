import { endpoints } from '@/constants/endpoints'
import { createMutableResourceApi } from './client'
import type { TimeTrackingEntity } from '@/modules/timeTracking/types'

const api = createMutableResourceApi<TimeTrackingEntity>({
  list: endpoints.timeTracking.list,
  byId: endpoints.timeTracking.byId,
  trashed: endpoints.timeTracking.trashed,
  softDelete: endpoints.timeTracking.softDelete,
  restore: endpoints.timeTracking.restore,
})

export const listTimeTracking = api.list
export const getTimeTracking = api.getById
export const timeTrackingApi = api
