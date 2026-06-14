import { queryKeys } from '@/lib/queryKeys'
import { attendanceApi } from '@/services/api/attendanceApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.attendance, attendanceApi)

export const useAttendanceList = hooks.useList
export const useAttendanceTrashedList = hooks.useTrashedList
export const useCreateAttendance = hooks.useCreate
export const useUpdateAttendance = hooks.useUpdate
export const useSoftDeleteAttendance = hooks.useSoftDelete
export const useRestoreAttendance = hooks.useRestore
export const useRemoveAttendance = hooks.useRemove