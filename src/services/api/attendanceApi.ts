import { endpoints } from '@/constants/endpoints'
import { apiGet, apiPost } from './client'
import { createMutableResourceApi } from './client'
import type { AttendanceEntity } from '@/modules/attendance/types'

const api = createMutableResourceApi<AttendanceEntity>({
  list: endpoints.attendance.list,
  byId: endpoints.attendance.byId,
  trashed: endpoints.attendance.trashed,
  softDelete: endpoints.attendance.softDelete,
  restore: endpoints.attendance.restore,
})

export const listAttendance = api.list
export const getAttendance = api.getById
export const attendanceApi = api

export function fetchTodayAttendance(): Promise<AttendanceEntity[]> {
  return apiGet<AttendanceEntity[]>(endpoints.attendance.today)
}

export function checkIn(): Promise<AttendanceEntity> {
  return apiPost<AttendanceEntity>(endpoints.attendance.checkIn)
}

export function checkOut(): Promise<AttendanceEntity> {
  return apiPost<AttendanceEntity>(endpoints.attendance.checkOut)
}

