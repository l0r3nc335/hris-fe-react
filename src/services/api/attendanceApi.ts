import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { AttendanceEntity } from '@/modules/attendance/types'

export async function listAttendance(): Promise<AttendanceEntity[]> {
  const res = await httpClient.get<ApiResponse<AttendanceEntity[]>>(endpoints.attendance.list)
  return res.data.data
}

export async function getAttendance(id: string): Promise<AttendanceEntity> {
  const res = await httpClient.get<ApiResponse<AttendanceEntity>>(endpoints.attendance.byId(id))
  return res.data.data
}
