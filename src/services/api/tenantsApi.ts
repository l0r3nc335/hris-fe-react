import { endpoints } from '@/constants/endpoints'
import { createMutableResourceApi } from './client'
import type { TenantsEntity } from '@/modules/tenants/types'

const api = createMutableResourceApi<TenantsEntity>({
  list: endpoints.tenants.list,
  byId: endpoints.tenants.byId,
  trashed: endpoints.tenants.trashed,
  softDelete: endpoints.tenants.softDelete,
  restore: endpoints.tenants.restore,
  reactivate: endpoints.tenants.reactivate,
})

export const listTenants = api.list
export const getTenants = api.getById
export const tenantsApi = api
