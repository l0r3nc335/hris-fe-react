import { queryKeys } from '@/lib/queryKeys'
import { payrollApi } from '@/services/api/payrollApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.payroll, payrollApi)

export const usePayrollList = hooks.useList
export const usePayrollTrashedList = hooks.useTrashedList
export const useCreatePayroll = hooks.useCreate
export const useUpdatePayroll = hooks.useUpdate
export const useSoftDeletePayroll = hooks.useSoftDelete
export const useRestorePayroll = hooks.useRestore
export const useRemovePayroll = hooks.useRemove