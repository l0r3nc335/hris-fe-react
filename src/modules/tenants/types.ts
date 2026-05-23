import type { BaseEntity } from '@/types'

export interface TenantsEntity extends BaseEntity {
  name: string
  status: string
}
