import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { PageShell } from '@/components/layout/PageShell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/ui'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  usePayrollList,
  usePayrollTrashedList,
  useCreatePayroll,
  useUpdatePayroll,
  useSoftDeletePayroll,
  useRestorePayroll,
  useRemovePayroll,
  usePayrollSummaryQuery,
  usePayrollRunMutation,
} from '../hooks'

export function PayrollListPage(): React.JSX.Element {
  const { data: summary, isLoading: summaryLoading } = usePayrollSummaryQuery()
  const runMutation = usePayrollRunMutation()

  const crud = useEntityCrudPage({
    title: 'Payroll',
    description: 'Manage payroll records and runs',
    emptyTitle: 'No payroll records found',
    entitySingular: 'payroll record',
    hooks: {
      useList: usePayrollList,
      useTrashedList: usePayrollTrashedList,
      useCreate: useCreatePayroll,
      useUpdate: useUpdatePayroll,
      useSoftDelete: useSoftDeletePayroll,
      useRestore: useRestorePayroll,
      useRemove: useRemovePayroll,
    },
  })

  return (
    <PageShell
      title="Payroll"
      description="Manage payroll records and runs"
      toolbar={
        <Button onClick={() => runMutation.mutate()} disabled={runMutation.isPending}>
          Run Payroll
        </Button>
      }
    >
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-muted-foreground">
              Total Employees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {summaryLoading ? '—' : (summary?.totalEmployees ?? 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-muted-foreground">
              Total Payroll
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {summaryLoading ? '—' : (summary?.totalPayroll ?? '$0')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-muted-foreground">
              Last Run
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {summaryLoading ? '—' : (summary?.lastRunDate ?? 'N/A')}
            </p>
          </CardContent>
        </Card>
      </div>
      <EntityListPage {...crud.listPageProps} title="" description="" embedded />
      <EntityFormDialog {...crud.formDialogProps} />
      <ConfirmDialog {...crud.confirmDialogProps} />
    </PageShell>
  )
}
