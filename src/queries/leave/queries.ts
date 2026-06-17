import { queryKeys } from '@/lib/queryKeys'
import { leaveApi, fetchPendingLeave, approveLeave, rejectLeave } from '@/services/api/leaveApi'
import { createResourceQueryHooks } from '../factory'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const hooks = createResourceQueryHooks(queryKeys.leave, leaveApi)

export const useLeaveList = hooks.useList
export const useLeaveTrashedList = hooks.useTrashedList
export const useCreateLeave = hooks.useCreate
export const useUpdateLeave = hooks.useUpdate
export const useSoftDeleteLeave = hooks.useSoftDelete
export const useRestoreLeave = hooks.useRestore
export const useRemoveLeave = hooks.useRemove

export function useLeavePendingQuery() {
  return useQuery({
    queryKey: queryKeys.leavePending.list(),
    queryFn: fetchPendingLeave,
  })
}

export function useApproveLeaveMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: approveLeave,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.leave.all })
      void queryClient.invalidateQueries({ queryKey: queryKeys.leavePending.all })
      toast.success('Leave request approved')
    },
  })
}

export function useRejectLeaveMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) => rejectLeave(id, reason),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.leave.all })
      void queryClient.invalidateQueries({ queryKey: queryKeys.leavePending.all })
      toast.success('Leave request rejected')
    },
  })
}
