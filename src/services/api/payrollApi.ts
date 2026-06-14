import { endpoints } from '@/constants/endpoints'
import { createMutableResourceApi } from './client'
import type { PayrollEntity } from '@/modules/payroll/types'

const api = createMutableResourceApi<PayrollEntity>({
  list: endpoints.payroll.list,
  byId: endpoints.payroll.byId,
  trashed: endpoints.payroll.trashed,
  softDelete: endpoints.payroll.softDelete,
  restore: endpoints.payroll.restore,
})

export const listPayroll = api.list
export const getPayroll = api.getById
export const payrollApi = api
