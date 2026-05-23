import type { BaseEntity } from '@/types'

export interface EmployeesEntity extends BaseEntity {
  name: string
  status: string
}
