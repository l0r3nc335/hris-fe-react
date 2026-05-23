import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { UsersEntity } from '@/modules/users/types'

export async function listUsers(): Promise<UsersEntity[]> {
  const res = await httpClient.get<ApiResponse<UsersEntity[]>>(endpoints.users.list)
  return res.data.data
}

export async function getUsers(id: string): Promise<UsersEntity> {
  const res = await httpClient.get<ApiResponse<UsersEntity>>(endpoints.users.byId(id))
  return res.data.data
}
