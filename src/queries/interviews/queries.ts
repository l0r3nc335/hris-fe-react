import { queryKeys } from '@/lib/queryKeys'
import { interviewsApi } from '@/services/api/interviewsApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.interviews, interviewsApi)

export const useInterviewsList = hooks.useList
export const useInterviewsTrashedList = hooks.useTrashedList
export const useCreateInterview = hooks.useCreate
export const useUpdateInterview = hooks.useUpdate
export const useSoftDeleteInterview = hooks.useSoftDelete
export const useRestoreInterview = hooks.useRestore
export const useRemoveInterview = hooks.useRemove