import type { BaseEntity } from '@/types'

export interface PerformanceEntity extends BaseEntity {
  name: string
  status: string
}
