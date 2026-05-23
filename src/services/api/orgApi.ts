import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { OrganizationEntity } from '@/modules/organization/types'

export async function listOrganization(): Promise<OrganizationEntity[]> {
  const res = await httpClient.get<ApiResponse<OrganizationEntity[]>>(endpoints.organization.list)
  return res.data.data
}

export async function getOrganization(id: string): Promise<OrganizationEntity> {
  const res = await httpClient.get<ApiResponse<OrganizationEntity>>(endpoints.organization.byId(id))
  return res.data.data
}
