import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import { PERMISSIONS } from '@/constants/permissions'
import {
  useDepartmentsList,
  useDepartmentsTrashedList,
  useCreateDepartment,
  useUpdateDepartment,
  useSoftDeleteDepartment,
  useRestoreDepartment,
  useRemoveDepartment,
} from '../hooks'

export function DepartmentsListPage(): React.JSX.Element {
  const crud = useEntityCrudPage({
    title: 'Departments',
    description: 'Manage department records',
    emptyTitle: 'No departments found',
    entitySingular: 'department',
    writePermission: PERMISSIONS.departmentsRead,
    hooks: {
      useList: useDepartmentsList,
      useTrashedList: useDepartmentsTrashedList,
      useCreate: useCreateDepartment,
      useUpdate: useUpdateDepartment,
      useSoftDelete: useSoftDeleteDepartment,
      useRestore: useRestoreDepartment,
      useRemove: useRemoveDepartment,
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