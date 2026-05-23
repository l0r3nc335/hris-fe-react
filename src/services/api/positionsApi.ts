import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { PositionsEntity } from '@/modules/positions/types'

export async function listPositions(): Promise<PositionsEntity[]> {
  const res = await httpClient.get<ApiResponse<PositionsEntity[]>>(endpoints.positions.list)
  return res.data.data
}

export async function getPositions(id: string): Promise<PositionsEntity> {
  const res = await httpClient.get<ApiResponse<PositionsEntity>>(endpoints.positions.byId(id))
  return res.data.data
}
