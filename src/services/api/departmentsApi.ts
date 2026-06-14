import { endpoints } from '@/constants/endpoints'
import { createMutableResourceApi } from './client'
import type { DepartmentsEntity } from '@/modules/departments/types'

export const departmentsApi = createMutableResourceApi<DepartmentsEntity>({
  list: endpoints.departments.list,
  byId: endpoints.departments.byId,
  trashed: endpoints.departments.trashed,
  softDelete: endpoints.departments.softDelete,
  restore: endpoints.departments.restore,
})

export const listDepartments = departmentsApi.list
export const getDepartments = departmentsApi.getById
export const createDepartment = departmentsApi.create
export const updateDepartment = departmentsApi.update
export const removeDepartment = departmentsApi.remove
