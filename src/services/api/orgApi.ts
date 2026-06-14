import { endpoints } from '@/constants/endpoints'
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
