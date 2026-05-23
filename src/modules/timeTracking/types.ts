import type { BaseEntity } from '@/types'

export interface TimeTrackingEntity extends BaseEntity {
  name: string
  status: string
}
