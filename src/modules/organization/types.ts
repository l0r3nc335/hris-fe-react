import type { BaseEntity } from '@/types'

export interface OrganizationEntity extends BaseEntity {
  name: string
  status: string
}
