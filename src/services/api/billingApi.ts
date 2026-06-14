import { endpoints } from '@/constants/endpoints'
import { createMutableResourceApi } from './client'
import type { BillingEntity } from '@/modules/billing/types'

const api = createMutableResourceApi<BillingEntity>({
  list: endpoints.billing.list,
  byId: endpoints.billing.byId,
  trashed: endpoints.billing.trashed,
  softDelete: endpoints.billing.softDelete,
  restore: endpoints.billing.restore,
})

export const listBilling = api.list
export const getBilling = api.getById
export const billingApi = api
