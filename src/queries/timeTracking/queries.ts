import { queryKeys } from '@/lib/queryKeys'
import { timeTrackingApi } from '@/services/api/timeLogsApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.timeTracking, timeTrackingApi)

export const useTimeTrackingList = hooks.useList
export const useTimeTrackingTrashedList = hooks.useTrashedList
export const useCreateTimeTracking = hooks.useCreate
export const useUpdateTimeTracking = hooks.useUpdate
export const useSoftDeleteTimeTracking = hooks.useSoftDelete
export const useRestoreTimeTracking = hooks.useRestore
export const useRemoveTimeTracking = hooks.useRemove