import { endpoints } from '@/constants/endpoints'
import { createMutableResourceApi } from './client'
import type { LeaveEntity } from '@/modules/leave/types'

const api = createMutableResourceApi<LeaveEntity>({
  list: endpoints.leave.list,
  byId: endpoints.leave.byId,
  trashed: endpoints.leave.trashed,
  softDelete: endpoints.leave.softDelete,
  restore: endpoints.leave.restore,
})

export const listLeave = api.list
export const getLeave = api.getById
export const leaveApi = api
