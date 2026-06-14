import { endpoints } from '@/constants/endpoints'
import { createMutableResourceApi } from './client'
import type { InterviewsEntity } from '@/modules/interviews/types'

const api = createMutableResourceApi<InterviewsEntity>({
  list: endpoints.interviews.list,
  byId: endpoints.interviews.byId,
  trashed: endpoints.interviews.trashed,
  softDelete: endpoints.interviews.softDelete,
  restore: endpoints.interviews.restore,
})

export const listInterviews = api.list
export const getInterviews = api.getById
export const interviewsApi = api
