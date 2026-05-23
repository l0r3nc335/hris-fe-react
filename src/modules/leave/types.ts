import type { BaseEntity } from '@/types'

export interface LeaveEntity extends BaseEntity {
  name: string
  status: string
}
