import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { DepartmentsEntity } from '@/modules/departments/types'

export async function listDepartments(): Promise<DepartmentsEntity[]> {
  const res = await httpClient.get<ApiResponse<DepartmentsEntity[]>>(endpoints.departments.list)
  return res.data.data
}

export async function getDepartments(id: string): Promise<DepartmentsEntity> {
  const res = await httpClient.get<ApiResponse<DepartmentsEntity>>(endpoints.departments.byId(id))
  return res.data.data
}
