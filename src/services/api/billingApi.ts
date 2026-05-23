import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { BillingEntity } from '@/modules/billing/types'

export async function listBilling(): Promise<BillingEntity[]> {
  const res = await httpClient.get<ApiResponse<BillingEntity[]>>(endpoints.billing.list)
  return res.data.data
}

export async function getBilling(id: string): Promise<BillingEntity> {
  const res = await httpClient.get<ApiResponse<BillingEntity>>(endpoints.billing.byId(id))
  return res.data.data
}
