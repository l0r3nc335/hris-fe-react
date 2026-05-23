import type { BaseEntity } from '@/types'

export interface SettingsEntity extends BaseEntity {
  name: string
  status: string
}
