import { queryKeys } from '@/lib/queryKeys'
import { recruitmentApi, listApplicants } from '@/services/api/recruitmentApi'
import { createResourceQueryHooks, usePaginatedListQuery } from '../factory'
import type { ListQueryParams } from '@/services/api/client'

const hooks = createResourceQueryHooks(queryKeys.recruitment, recruitmentApi)

export const useRecruitmentList = hooks.useList
export const useRecruitmentTrashedList = hooks.useTrashedList
export const useCreateRecruitment = hooks.useCreate
export const useUpdateRecruitment = hooks.useUpdate
export const useSoftDeleteRecruitment = hooks.useSoftDelete
export const useRestoreRecruitment = hooks.useRestore
export const useRemoveRecruitment = hooks.useRemove

export function useRecruitmentApplicantsList(params?: ListQueryParams) {
  return usePaginatedListQuery(
    [...queryKeys.recruitment.applicants(), params],
    listApplicants,
    params,
  )
}