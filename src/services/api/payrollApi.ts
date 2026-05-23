import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { PayrollEntity } from '@/modules/payroll/types'

export async function listPayroll(): Promise<PayrollEntity[]> {
  const res = await httpClient.get<ApiResponse<PayrollEntity[]>>(endpoints.payroll.list)
  return res.data.data
}

export async function getPayroll(id: string): Promise<PayrollEntity> {
  const res = await httpClient.get<ApiResponse<PayrollEntity>>(endpoints.payroll.byId(id))
  return res.data.data
}
