import { queryKeys } from '@/lib/queryKeys'
import { compensationApi } from '@/services/api/compensationApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.compensation, compensationApi)

export const useCompensationList = hooks.useList
export const useCompensationTrashedList = hooks.useTrashedList
export const useCreateCompensation = hooks.useCreate
export const useUpdateCompensation = hooks.useUpdate
export const useSoftDeleteCompensation = hooks.useSoftDelete
export const useRestoreCompensation = hooks.useRestore
export const useRemoveCompensation = hooks.useRemove