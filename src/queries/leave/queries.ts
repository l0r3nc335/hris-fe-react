import { queryKeys } from '@/lib/queryKeys'
import { leaveApi } from '@/services/api/leaveApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.leave, leaveApi)

export const useLeaveList = hooks.useList
export const useLeaveTrashedList = hooks.useTrashedList
export const useCreateLeave = hooks.useCreate
export const useUpdateLeave = hooks.useUpdate
export const useSoftDeleteLeave = hooks.useSoftDelete
export const useRestoreLeave = hooks.useRestore
export const useRemoveLeave = hooks.useRemove