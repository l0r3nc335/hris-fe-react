import type { BaseEntity } from '@/types'

export interface BenefitsEntity extends BaseEntity {
  name: string
  status: string
}
