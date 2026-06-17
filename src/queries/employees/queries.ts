import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/queryKeys'
import { employeesApi, promoteEmployee, transferEmployee } from '@/services/api/employeesApi'
import { createResourceQueryHooks } from '../factory'
import { toast } from 'sonner'

const hooks = createResourceQueryHooks(queryKeys.employees, employeesApi)

export const useEmployeesList = hooks.useList
export const useEmployeesTrashedList = hooks.useTrashedList
export const useCreateEmployee = hooks.useCreate
export const useUpdateEmployee = hooks.useUpdate
export const useSoftDeleteEmployee = hooks.useSoftDelete
export const useRestoreEmployee = hooks.useRestore
export const useRemoveEmployee = hooks.useRemove

export function usePromoteEmployeeMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, positionId }: { id: string; positionId: string }) =>
      promoteEmployee(id, positionId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.employees.all })
      toast.success('Employee promoted')
    },
  })
}

export function useTransferEmployeeMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, departmentId }: { id: string; departmentId: string }) =>
      transferEmployee(id, departmentId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.employees.all })
      toast.success('Employee transferred')
    },
  })
}
