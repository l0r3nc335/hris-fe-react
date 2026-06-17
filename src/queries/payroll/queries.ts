import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/queryKeys'
import { payrollApi, fetchPayrollSummary, runPayroll } from '@/services/api/payrollApi'
import { createResourceQueryHooks } from '../factory'
import { toast } from 'sonner'

const hooks = createResourceQueryHooks(queryKeys.payroll, payrollApi)

export const usePayrollList = hooks.useList
export const usePayrollTrashedList = hooks.useTrashedList
export const useCreatePayroll = hooks.useCreate
export const useUpdatePayroll = hooks.useUpdate
export const useSoftDeletePayroll = hooks.useSoftDelete
export const useRestorePayroll = hooks.useRestore
export const useRemovePayroll = hooks.useRemove

export function usePayrollSummaryQuery() {
  return useQuery({
    queryKey: queryKeys.payrollSummary.summary(),
    queryFn: fetchPayrollSummary,
  })
}

export function usePayrollRunMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: runPayroll,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.payroll.all })
      void queryClient.invalidateQueries({ queryKey: queryKeys.payrollSummary.all })
      toast.success('Payroll run started')
    },
  })
}
