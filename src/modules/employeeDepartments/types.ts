import type { BaseEntity } from '@/types'

export interface EmployeeDepartmentsEntity extends BaseEntity {
  name: string
  status: string
  departmentId: string | null
  departmentName: string
}
