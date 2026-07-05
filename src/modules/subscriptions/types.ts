import type { BaseEntity } from '@/types'

export interface SubscriptionsEntity extends Omit<BaseEntity, 'tenantId'> {
  tenantId?: string | null
  /** Display label */
  name: string
  status: string
  slug?: string
  billingInterval?: string
  price?: string
  currency?: string
  trialDays?: number
  description?: string
}
