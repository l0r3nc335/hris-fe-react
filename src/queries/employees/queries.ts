import { queryKeys } from '@/lib/queryKeys'
import { employeesApi } from '@/services/api/employeesApi'
import { createResourceQueryHooks, useDeactivateMutation } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.employees, employeesApi)

export const useEmployeesList = hooks.useList
export const useEmployeesTrashedList = hooks.useTrashedList
export const useCreateEmployee = hooks.useCreate
export const useUpdateEmployee = hooks.useUpdate
export const useSoftDeleteEmployee = hooks.useSoftDelete
export const useRestoreEmployee = hooks.useRestore
export const useRemoveEmployee = hooks.useRemove

export function useDeactivateEmployee() {
  return useDeactivateMutation(
    queryKeys.employees.all,
    queryKeys.employees.list(),
    employeesApi.deactivate!,
  )
}
