import { queryKeys } from '@/lib/queryKeys'
import { positionsApi } from '@/services/api/positionsApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.positions, positionsApi)

export const usePositionsList = hooks.useList
export const usePositionsTrashedList = hooks.useTrashedList
export const useCreatePosition = hooks.useCreate
export const useUpdatePosition = hooks.useUpdate
export const useSoftDeletePosition = hooks.useSoftDelete
export const useRestorePosition = hooks.useRestore
export const useRemovePosition = hooks.useRemove