import { queryKeys } from '@/lib/queryKeys'
import { onboardingApi } from '@/services/api/onboardingApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.onboarding, onboardingApi)

export const useOnboardingList = hooks.useList
export const useOnboardingTrashedList = hooks.useTrashedList
export const useCreateOnboarding = hooks.useCreate
export const useUpdateOnboarding = hooks.useUpdate
export const useSoftDeleteOnboarding = hooks.useSoftDelete
export const useRestoreOnboarding = hooks.useRestore
export const useRemoveOnboarding = hooks.useRemove
