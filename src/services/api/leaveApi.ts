import { endpoints } from '@/constants/endpoints'
import { apiGet, apiPatch } from './client'
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

export function fetchPendingLeave(): Promise<LeaveEntity[]> {
  return apiGet<LeaveEntity[]>(endpoints.leave.pending)
}

export function approveLeave(id: string): Promise<LeaveEntity> {
  return apiPatch<LeaveEntity>(endpoints.leave.approve(id))
}

export function rejectLeave(id: string, reason?: string): Promise<LeaveEntity> {
  return apiPatch<LeaveEntity>(endpoints.leave.reject(id), { reason })
}

