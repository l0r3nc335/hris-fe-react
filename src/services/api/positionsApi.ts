import { endpoints } from '@/constants/endpoints'
import { createMutableResourceApi } from './client'
import type { PositionsEntity } from '@/modules/positions/types'

const api = createMutableResourceApi<PositionsEntity>({
  list: endpoints.positions.list,
  byId: endpoints.positions.byId,
  trashed: endpoints.positions.trashed,
  softDelete: endpoints.positions.softDelete,
  restore: endpoints.positions.restore,
})

export const listPositions = api.list
export const getPositions = api.getById
export const positionsApi = api
