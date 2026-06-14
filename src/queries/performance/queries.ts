import { queryKeys } from '@/lib/queryKeys'
import { performanceApi } from '@/services/api/performanceApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.performance, performanceApi)

export const usePerformanceList = hooks.useList
export const usePerformanceTrashedList = hooks.useTrashedList
export const useCreatePerformance = hooks.useCreate
export const useUpdatePerformance = hooks.useUpdate
export const useSoftDeletePerformance = hooks.useSoftDelete
export const useRestorePerformance = hooks.useRestore
export const useRemovePerformance = hooks.useRemove