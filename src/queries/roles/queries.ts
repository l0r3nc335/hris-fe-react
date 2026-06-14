import { queryKeys } from '@/lib/queryKeys'
import { rolesApi } from '@/services/api/rolesApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.roles, rolesApi)

export const useRolesList = hooks.useList
export const useRolesTrashedList = hooks.useTrashedList
export const useCreateRole = hooks.useCreate
export const useUpdateRole = hooks.useUpdate
export const useSoftDeleteRole = hooks.useSoftDelete
export const useRestoreRole = hooks.useRestore
export const useRemoveRole = hooks.useRemove