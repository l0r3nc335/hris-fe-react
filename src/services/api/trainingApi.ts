import { endpoints } from '@/constants/endpoints'
import { createMutableResourceApi } from './client'
import type { TrainingEntity } from '@/modules/training/types'

const api = createMutableResourceApi<TrainingEntity>({
  list: endpoints.training.list,
  byId: endpoints.training.byId,
  trashed: endpoints.training.trashed,
  softDelete: endpoints.training.softDelete,
  restore: endpoints.training.restore,
})

export const trainingApi = api
