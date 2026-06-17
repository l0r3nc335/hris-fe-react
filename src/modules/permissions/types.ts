import type { BaseEntity } from '@/types'

export interface Permission extends BaseEntity {
  code: string
  description: string
}
