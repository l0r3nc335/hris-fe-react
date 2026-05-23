import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { EmployeesEntity } from '@/modules/employees/types'

export async function listEmployees(): Promise<EmployeesEntity[]> {
  const res = await httpClient.get<ApiResponse<EmployeesEntity[]>>(endpoints.employees.list)
  return res.data.data
}

export async function getEmployees(id: string): Promise<EmployeesEntity> {
  const res = await httpClient.get<ApiResponse<EmployeesEntity>>(endpoints.employees.byId(id))
  return res.data.data
}
