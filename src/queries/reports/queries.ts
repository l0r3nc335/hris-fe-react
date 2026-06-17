import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/queryKeys'
import { generateReport, type ReportType } from '@/services/api/reportsApi'
import { toast } from 'sonner'

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

export const REPORT_TYPES: { type: ReportType; label: string; description: string }[] = [
  { type: 'employees', label: 'Employee Report', description: 'Headcount and demographics' },
  { type: 'attendance', label: 'Attendance Report', description: 'Daily attendance summary' },
  { type: 'payroll', label: 'Payroll Report', description: 'Payroll costs and runs' },
  { type: 'leaveUsage', label: 'Leave Usage', description: 'Leave balances and usage' },
  { type: 'turnover', label: 'Turnover Report', description: 'Hiring and attrition metrics' },
]
