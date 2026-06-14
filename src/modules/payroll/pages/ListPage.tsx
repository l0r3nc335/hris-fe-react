import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  usePayrollList,
  usePayrollTrashedList,
  useCreatePayroll,
  useUpdatePayroll,
  useSoftDeletePayroll,
  useRestorePayroll,
  useRemovePayroll,
} from '../hooks'

export function PayrollListPage(): React.JSX.Element {
  const crud = useEntityCrudPage({
    title: 'Payroll',
    description: 'Manage payroll records',
    emptyTitle: 'No payroll found',
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
    <>
      <EntityListPage {...crud.listPageProps} />
      <EntityFormDialog {...crud.formDialogProps} />
      <ConfirmDialog {...crud.confirmDialogProps} />
    </>
  )
}