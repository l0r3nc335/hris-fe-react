import { queryKeys } from '@/lib/queryKeys'
import { trainingApi } from '@/services/api/trainingApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.training, trainingApi)

export const useTrainingList = hooks.useList
export const useTrainingTrashedList = hooks.useTrashedList
export const useCreateTraining = hooks.useCreate
export const useUpdateTraining = hooks.useUpdate
export const useSoftDeleteTraining = hooks.useSoftDelete
export const useRestoreTraining = hooks.useRestore
export const useRemoveTraining = hooks.useRemove
