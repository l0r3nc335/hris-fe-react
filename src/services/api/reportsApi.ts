import { endpoints } from '@/constants/endpoints'
import { createResourceApi } from './client'
import type { ReportsEntity } from '@/modules/reports/types'

const api = createResourceApi<ReportsEntity>({
  list: endpoints.reports.list,
  byId: endpoints.reports.byId,
})

export const listReports = api.list
export const getReports = api.getById
export const reportsApi = api
