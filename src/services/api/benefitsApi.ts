import { endpoints } from '@/constants/endpoints'
import { createMutableResourceApi } from './client'
import type { BenefitsEntity } from '@/modules/benefits/types'

const api = createMutableResourceApi<BenefitsEntity>({
  list: endpoints.benefits.list,
  byId: endpoints.benefits.byId,
  trashed: endpoints.benefits.trashed,
  softDelete: endpoints.benefits.softDelete,
  restore: endpoints.benefits.restore,
})

export const benefitsApi = api
