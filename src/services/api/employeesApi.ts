import { endpoints } from '@/constants/endpoints'
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
