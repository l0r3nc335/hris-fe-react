import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/queryKeys'
import { generateReport, fetchReportTypes, type ReportType } from '@/services/api/reportsApi'
import { toast } from 'sonner'

const REPORT_DESCRIPTIONS: Record<ReportType, string> = {
  employees: 'Headcount and demographics',
  attendance: 'Daily attendance summary',
  payroll: 'Payroll costs and runs',
  leaveUsage: 'Leave balances and usage',
  turnover: 'Hiring and attrition metrics',
}

export function useReportTypes() {
  return useQuery({
    queryKey: [...queryKeys.reports.all, 'types'] as const,
    queryFn: fetchReportTypes,
  })
}

export function useReportGenerateMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (type: ReportType) => generateReport(type),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.reports.all })
      toast.success(`Report generated: ${data.name}`)
    },
  })
}

export function getReportDescription(type: ReportType): string {
  return REPORT_DESCRIPTIONS[type]
}
