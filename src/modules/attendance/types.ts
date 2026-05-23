import type { BaseEntity } from '@/types'

export interface AttendanceEntity extends BaseEntity {
  name: string
  status: string
}
