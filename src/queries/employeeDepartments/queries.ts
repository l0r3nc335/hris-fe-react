import { queryKeys } from '@/lib/queryKeys'
import { employeeDepartmentsApi } from '@/services/api/employeeDepartmentsApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.employeeDepartments, employeeDepartmentsApi)

export const useEmployeeDepartmentsList = hooks.useList
export const useEmployeeDepartmentsTrashedList = hooks.useTrashedList
export const useCreateEmployeeDepartment = hooks.useCreate
export const useUpdateEmployeeDepartment = hooks.useUpdate
export const useSoftDeleteEmployeeDepartment = hooks.useSoftDelete
export const useRestoreEmployeeDepartment = hooks.useRestore
export const useRemoveEmployeeDepartment = hooks.useRemove
