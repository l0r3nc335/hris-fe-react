import { endpoints } from '@/constants/endpoints'
import { createResourceApi } from './client'
import type { AuditEntity } from '@/modules/audit/types'

const api = createResourceApi<AuditEntity>({
  list: endpoints.audit.list,
  byId: endpoints.audit.byId,
})

export const listAudit = api.list
export const getAudit = api.getById
export const auditApi = api
