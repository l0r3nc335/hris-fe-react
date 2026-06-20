import { useMemo } from 'react'
import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { departmentSelectField } from '@/constants/formFields'
import { PERMISSIONS } from '@/constants/permissions'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import { useDepartmentsList } from '@/modules/departments/hooks'
import {
  useEmployeeDepartmentsList,
  useEmployeeDepartmentsTrashedList,
  useCreateEmployeeDepartment,
  useUpdateEmployeeDepartment,
  useSoftDeleteEmployeeDepartment,
  useRestoreEmployeeDepartment,
  useRemoveEmployeeDepartment,
} from '../hooks'

export function EmployeeDepartmentsListPage(): React.JSX.Element {
  const { data: departments = [] } = useDepartmentsList({ page: 1, limit: 100 })

  const departmentOptions = useMemo(
    () => departments.map((d) => ({ value: d.id, label: d.name })),
    [departments],
  )

  const crud = useEntityCrudPage({
    title: 'Employee Department',
    description: 'Manage employee department assignments',
    emptyTitle: 'No employee department records found',
    entitySingular: 'employee department',
    createPermission: PERMISSIONS.employeeDepartmentsWrite,
    writePermission: PERMISSIONS.employeeDepartmentsWrite,
    formFields: [departmentSelectField(departmentOptions)],
    hooks: {
      useList: useEmployeeDepartmentsList,
      useTrashedList: useEmployeeDepartmentsTrashedList,
      useCreate: useCreateEmployeeDepartment,
      useUpdate: useUpdateEmployeeDepartment,
      useSoftDelete: useSoftDeleteEmployeeDepartment,
      useRestore: useRestoreEmployeeDepartment,
      useRemove: useRemoveEmployeeDepartment,
    },
  })

  return (
    <>
      <EntityListPage
        {...crud.listPageProps}
        extraColumns={[
          {
            header: 'Department',
            cell: (item) =>
              String((item as unknown as Record<string, unknown>).departmentName ?? '—'),
          },
        ]}
        searchKeys={['name', 'status', 'departmentName']}
      />
      <EntityFormDialog {...crud.formDialogProps} />
      <ConfirmDialog {...crud.confirmDialogProps} />
    </>
  )
}
