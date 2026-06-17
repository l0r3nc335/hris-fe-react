import { endpoints } from '@/constants/endpoints'
import { apiGet } from './client'
import { createMutableResourceApi } from './client'
import type { OrganizationEntity } from '@/modules/organization/types'

const api = createMutableResourceApi<OrganizationEntity>({
  list: endpoints.organization.list,
  byId: endpoints.organization.byId,
  trashed: endpoints.organization.trashed,
  softDelete: endpoints.organization.softDelete,
  restore: endpoints.organization.restore,
})

export const listOrganization = api.list
export const getOrganization = api.getById
export const organizationApi = api

export interface OrgChartNode {
  id: string
  name: string
  title: string
  children?: OrgChartNode[]
}

export function fetchOrgChartTree(): Promise<OrgChartNode[]> {
  return apiGet<OrgChartNode[]>(endpoints.organization.positionsTree)
}

