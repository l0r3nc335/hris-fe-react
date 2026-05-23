import type { BaseEntity } from '@/types'

export interface RolesEntity extends BaseEntity {
  name: string
  status: string
}
