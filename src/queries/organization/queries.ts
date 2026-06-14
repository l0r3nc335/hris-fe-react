import { queryKeys } from '@/lib/queryKeys'
import { organizationApi } from '@/services/api/orgApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.organization, organizationApi)

export const useOrganizationList = hooks.useList
export const useOrganizationTrashedList = hooks.useTrashedList
export const useCreateOrganization = hooks.useCreate
export const useUpdateOrganization = hooks.useUpdate
export const useSoftDeleteOrganization = hooks.useSoftDelete
export const useRestoreOrganization = hooks.useRestore
export const useRemoveOrganization = hooks.useRemove