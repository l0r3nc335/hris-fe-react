import { queryKeys } from '@/lib/queryKeys'
import { billingApi } from '@/services/api/billingApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.billing, billingApi)

export const useBillingList = hooks.useList
export const useBillingTrashedList = hooks.useTrashedList
export const useCreateBilling = hooks.useCreate
export const useUpdateBilling = hooks.useUpdate
export const useSoftDeleteBilling = hooks.useSoftDelete
export const useRestoreBilling = hooks.useRestore
export const useRemoveBilling = hooks.useRemove