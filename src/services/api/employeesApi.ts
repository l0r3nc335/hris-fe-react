import { endpoints } from '@/constants/endpoints'
import { apiPost, apiPostPaginated, createMutableResourceApi } from './client'
import type { EmployeesEntity } from '@/modules/employees/types'
import type { EmployeeSearchCriteria } from '@/types/searchFields'

export const employeesApi = createMutableResourceApi<EmployeesEntity>({
  list: endpoints.employees.list,
  byId: endpoints.employees.byId,
  trashed: endpoints.employees.trashed,
  softDelete: endpoints.employees.softDelete,
  restore: endpoints.employees.restore,
  deactivate: endpoints.employees.deactivate,
})

export function searchEmployees(
  criteria: EmployeeSearchCriteria,
  options: { trashed?: boolean } = {},
): Promise<import('@/types/api').Paginated<EmployeesEntity>> {
  const url = options.trashed ? endpoints.employees.searchTrashed : endpoints.employees.search
  return apiPostPaginated<EmployeesEntity>(url, criteria)
}

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

