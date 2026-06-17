import { queryKeys } from '@/lib/queryKeys'
import { benefitsApi } from '@/services/api/benefitsApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.benefits, benefitsApi)

export const useBenefitsList = hooks.useList
export const useBenefitsTrashedList = hooks.useTrashedList
export const useCreateBenefit = hooks.useCreate
export const useUpdateBenefit = hooks.useUpdate
export const useSoftDeleteBenefit = hooks.useSoftDelete
export const useRestoreBenefit = hooks.useRestore
export const useRemoveBenefit = hooks.useRemove
