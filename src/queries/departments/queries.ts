import { queryKeys } from '@/lib/queryKeys'
import { departmentsApi } from '@/services/api/departmentsApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.departments, departmentsApi)

export const useDepartmentsList = hooks.useList
export const useDepartmentsTrashedList = hooks.useTrashedList
export const useCreateDepartment = hooks.useCreate
export const useUpdateDepartment = hooks.useUpdate
export const useSoftDeleteDepartment = hooks.useSoftDelete
export const useRestoreDepartment = hooks.useRestore
export const useRemoveDepartment = hooks.useRemove
