import type { BaseEntity } from '@/types'

export interface TrainingEntity extends BaseEntity {
  name: string
  status: string
}
