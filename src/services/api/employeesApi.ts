import { endpoints } from '@/constants/endpoints'
import { apiPost } from './client'
import { createMutableResourceApi } from './client'
import type { EmployeesEntity } from '@/modules/employees/types'

export const employeesApi = createMutableResourceApi<EmployeesEntity>({
  list: endpoints.employees.list,
  byId: endpoints.employees.byId,
  trashed: endpoints.employees.trashed,
  softDelete: endpoints.employees.softDelete,
  restore: endpoints.employees.restore,
  deactivate: endpoints.employees.deactivate,
})

export const listEmployees = employeesApi.list
export const getEmployees = employeesApi.getById
export const createEmployee = employeesApi.create
export const updateEmployee = employeesApi.update
export const removeEmployee = employeesApi.remove
export const deactivateEmployee = employeesApi.deactivate!

export function promoteEmployee(
  id: string,
  positionId: string,
): Promise<EmployeesEntity> {
  return apiPost<EmployeesEntity>(endpoints.employees.promote(id), { positionId })
}

export function transferEmployee(
  id: string,
  departmentId: string,
): Promise<EmployeesEntity> {
  return apiPost<EmployeesEntity>(endpoints.employees.transfer(id), { departmentId })
}

