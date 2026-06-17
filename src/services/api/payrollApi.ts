import { endpoints } from '@/constants/endpoints'
import { apiGet, apiPost } from './client'
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

export interface PayrollSummary {
  totalEmployees: number
  totalPayroll: string
  lastRunDate: string
  status: string
}

export function fetchPayrollSummary(): Promise<PayrollSummary> {
  return apiGet<PayrollSummary>(endpoints.payroll.summary)
}

export function runPayroll(): Promise<{ id: string; status: string }> {
  return apiPost<{ id: string; status: string }>(endpoints.payroll.run)
}

