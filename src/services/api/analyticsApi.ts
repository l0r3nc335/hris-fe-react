import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'

export interface DashboardMetric {
  label: string
  value: string | number
}

export interface DashboardData {
  metrics: DashboardMetric[]
}

export async function getDashboard(): Promise<DashboardData> {
  const res = await httpClient.get<ApiResponse<DashboardData>>(endpoints.analytics.dashboard)
  return res.data.data
}
