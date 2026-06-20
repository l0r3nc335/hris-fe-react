import { endpoints } from '@/constants/endpoints'
import { createMutableResourceApi } from './client'
import type { EmployeeDepartmentsEntity } from '@/modules/employeeDepartments/types'

export const employeeDepartmentsApi = createMutableResourceApi<EmployeeDepartmentsEntity>({
  list: endpoints.employeeDepartments.list,
  byId: endpoints.employeeDepartments.byId,
  trashed: endpoints.employeeDepartments.trashed,
  softDelete: endpoints.employeeDepartments.softDelete,
  restore: endpoints.employeeDepartments.restore,
})
