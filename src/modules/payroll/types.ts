import type { BaseEntity } from '@/types'

export interface PayrollEntity extends BaseEntity {
  name: string
  status: string
}
