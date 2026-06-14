import { queryKeys } from '@/lib/queryKeys'
import { recruitmentApi } from '@/services/api/recruitmentApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.recruitment, recruitmentApi)

export const useRecruitmentList = hooks.useList
export const useRecruitmentTrashedList = hooks.useTrashedList
export const useCreateRecruitment = hooks.useCreate
export const useUpdateRecruitment = hooks.useUpdate
export const useSoftDeleteRecruitment = hooks.useSoftDelete
export const useRestoreRecruitment = hooks.useRestore
export const useRemoveRecruitment = hooks.useRemove