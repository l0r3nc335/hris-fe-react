import { queryKeys } from '@/lib/queryKeys'
import { organizationApi, fetchOrgChartTree } from '@/services/api/orgApi'
import { createResourceQueryHooks } from '../factory'
import { useQuery } from '@tanstack/react-query'

const hooks = createResourceQueryHooks(queryKeys.organization, organizationApi)

export const useOrganizationList = hooks.useList
export const useOrganizationTrashedList = hooks.useTrashedList
export const useCreateOrganization = hooks.useCreate
export const useUpdateOrganization = hooks.useUpdate
export const useSoftDeleteOrganization = hooks.useSoftDelete
export const useRestoreOrganization = hooks.useRestore
export const useRemoveOrganization = hooks.useRemove

export function useOrgChartTreeQuery() {
  return useQuery({
    queryKey: queryKeys.orgChart.tree(),
    queryFn: fetchOrgChartTree,
  })
}
