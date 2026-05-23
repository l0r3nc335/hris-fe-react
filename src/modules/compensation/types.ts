import type { BaseEntity } from '@/types'

export interface CompensationEntity extends BaseEntity {
  name: string
  status: string
}
