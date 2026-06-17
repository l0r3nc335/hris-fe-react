import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/queryKeys'
import {
  attendanceApi,
  fetchTodayAttendance,
  checkIn,
  checkOut,
} from '@/services/api/attendanceApi'
import { createResourceQueryHooks } from '../factory'
import { toast } from 'sonner'

const hooks = createResourceQueryHooks(queryKeys.attendance, attendanceApi)

export const useAttendanceList = hooks.useList
export const useAttendanceTrashedList = hooks.useTrashedList
export const useCreateAttendance = hooks.useCreate
export const useUpdateAttendance = hooks.useUpdate
export const useSoftDeleteAttendance = hooks.useSoftDelete
export const useRestoreAttendance = hooks.useRestore
export const useRemoveAttendance = hooks.useRemove

export function useAttendanceTodayQuery() {
  return useQuery({
    queryKey: queryKeys.attendanceToday.list(),
    queryFn: fetchTodayAttendance,
  })
}

export function useCheckInMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: checkIn,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.attendance.all })
      void queryClient.invalidateQueries({ queryKey: queryKeys.attendanceToday.all })
      toast.success('Checked in successfully')
    },
  })
}

export function useCheckOutMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: checkOut,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.attendance.all })
      void queryClient.invalidateQueries({ queryKey: queryKeys.attendanceToday.all })
      toast.success('Checked out successfully')
    },
  })
}
