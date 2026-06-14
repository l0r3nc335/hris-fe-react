import { useQuery } from '@tanstack/react-query'
import { listAudit } from '@/services/api/auditApi'
import { listReports } from '@/services/api/reportsApi'
import { getDashboard } from '@/services/api/analyticsApi'
import { listSystem } from '@/services/api/systemApi'
import { queryKeys } from '@/lib/queryKeys'
import { useListQuery } from './factory'

export * from './users/queries'
export * from './employees/queries'
export * from './departments/queries'
export * from './positions/queries'
export * from './attendance/queries'
export * from './leave/queries'
export * from './payroll/queries'
export * from './compensation/queries'
export * from './timeTracking/queries'
export * from './recruitment/queries'
export * from './interviews/queries'
export * from './performance/queries'
export * from './organization/queries'
export * from './documents/queries'
export * from './notifications/queries'
export * from './roles/queries'
export * from './settings/queries'
export * from './tenants/queries'
export * from './billing/queries'

export function useAuditList() {
  return useListQuery(queryKeys.audit.list(), listAudit)
}

export function useReportsList() {
  return useListQuery(queryKeys.reports.list(), listReports)
}

export function useAnalyticsDashboard() {
  return useQuery({
    queryKey: queryKeys.analytics.dashboard(),
    queryFn: getDashboard,
  })
}

export function useSystemList() {
  return useListQuery(queryKeys.system.list(), listSystem)
}
