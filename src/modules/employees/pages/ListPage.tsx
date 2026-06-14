import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  useEmployeesList,
  useEmployeesTrashedList,
  useCreateEmployee,
  useUpdateEmployee,
  useSoftDeleteEmployee,
  useRestoreEmployee,
  useRemoveEmployee,
} from '../hooks'

export function EmployeesListPage(): React.JSX.Element {
  const crud = useEntityCrudPage({
    title: 'Employees',
    description: 'Manage employees records',
    emptyTitle: 'No employees found',
    entitySingular: 'employee',
    hooks: {
      useList: useEmployeesList,
      useTrashedList: useEmployeesTrashedList,
      useCreate: useCreateEmployee,
      useUpdate: useUpdateEmployee,
      useSoftDelete: useSoftDeleteEmployee,
      useRestore: useRestoreEmployee,
      useRemove: useRemoveEmployee,
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