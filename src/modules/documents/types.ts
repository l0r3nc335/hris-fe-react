import type { BaseEntity } from '@/types'

export interface DocumentsEntity extends BaseEntity {
  name: string
  status: string
}
