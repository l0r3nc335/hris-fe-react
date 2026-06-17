import { endpoints } from '@/constants/endpoints'
import { createMutableResourceApi } from './client'
import type { OnboardingEntity } from '@/modules/onboarding/types'

const api = createMutableResourceApi<OnboardingEntity>({
  list: endpoints.onboarding.list,
  byId: endpoints.onboarding.byId,
  trashed: endpoints.onboarding.trashed,
  softDelete: endpoints.onboarding.softDelete,
  restore: endpoints.onboarding.restore,
})

export const onboardingApi = api
