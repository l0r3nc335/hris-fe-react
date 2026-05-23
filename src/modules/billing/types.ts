import type { BaseEntity } from '@/types'

export interface BillingEntity extends BaseEntity {
  name: string
  status: string
}
