import type { BaseEntity } from '@/types'

export interface NotificationsEntity extends BaseEntity {
  name: string
  status: string
}
