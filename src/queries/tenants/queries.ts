import { queryKeys } from '@/lib/queryKeys'
import { tenantsApi } from '@/services/api/tenantsApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.tenants, tenantsApi)

export const useTenantsList = hooks.useList
export const useTenantsTrashedList = hooks.useTrashedList
export const useCreateTenant = hooks.useCreate
export const useUpdateTenant = hooks.useUpdate
export const useSoftDeleteTenant = hooks.useSoftDelete
export const useRestoreTenant = hooks.useRestore
export const useRemoveTenant = hooks.useRemove