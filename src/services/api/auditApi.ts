import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { AuditEntity } from '@/modules/audit/types'

export async function listAudit(): Promise<AuditEntity[]> {
  const res = await httpClient.get<ApiResponse<AuditEntity[]>>(endpoints.audit.list)
  return res.data.data
}

export async function getAudit(id: string): Promise<AuditEntity> {
  const res = await httpClient.get<ApiResponse<AuditEntity>>(endpoints.audit.byId(id))
  return res.data.data
}
