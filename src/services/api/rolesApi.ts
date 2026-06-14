import { endpoints } from '@/constants/endpoints'
import { createMutableResourceApi } from './client'
import type { RolesEntity } from '@/modules/roles/types'

const api = createMutableResourceApi<RolesEntity>({
  list: endpoints.roles.list,
  byId: endpoints.roles.byId,
  trashed: endpoints.roles.trashed,
  softDelete: endpoints.roles.softDelete,
  restore: endpoints.roles.restore,
})

export const listRoles = api.list
export const getRoles = api.getById
export const rolesApi = api
