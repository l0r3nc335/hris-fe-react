import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { ReportsEntity } from '@/modules/reports/types'

export async function listReports(): Promise<ReportsEntity[]> {
  const res = await httpClient.get<ApiResponse<ReportsEntity[]>>(endpoints.reports.list)
  return res.data.data
}

export async function getReports(id: string): Promise<ReportsEntity> {
  const res = await httpClient.get<ApiResponse<ReportsEntity>>(endpoints.reports.byId(id))
  return res.data.data
}
