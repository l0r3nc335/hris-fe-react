import { useState } from 'react'
import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { EmployeeActionDialog } from '@/components/EmployeeActionDialog'
import { RecordSearchPanel } from '@/components/RecordSearchPanel'
import { Button } from '@/ui'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import { useRecordSearchList } from '@/hooks/useRecordSearchList'
import { PERMISSIONS } from '@/constants/permissions'
import { queryKeys } from '@/lib/queryKeys'
import { employeesApi, searchEmployees } from '@/services/api/employeesApi'
import {
  useCreateEmployee,
  useUpdateEmployee,
  useSoftDeleteEmployee,
  useRestoreEmployee,
  useRemoveEmployee,
  usePromoteEmployeeMutation,
  useTransferEmployeeMutation,
} from '../hooks'
import { EMPLOYEE_SEARCH_FIELDS } from '../searchFields'

export function EmployeesListPage(): React.JSX.Element {
  const [actionState, setActionState] = useState<{
    open: boolean
    employeeId: string
    employeeName: string
    action: 'promote' | 'transfer'
  } | null>(null)

  const promoteMutation = usePromoteEmployeeMutation()
  const transferMutation = useTransferEmployeeMutation()

  const recordSearch = useRecordSearchList({
    fields: EMPLOYEE_SEARCH_FIELDS,
    listFn: employeesApi.list,
    trashedListFn: employeesApi.listTrashed,
    searchFn: searchEmployees,
    queryKeyPrefix: queryKeys.employees.all,
  })

  const crud = useEntityCrudPage({
    title: 'Employees',
    description: 'Manage employee records, promotions, and transfers',
    emptyTitle: 'No employees found',
    entitySingular: 'employee',
    writePermission: PERMISSIONS.employeesWrite,
    createPermission: PERMISSIONS.employeesWrite,
    clientSideFilter: false,
    listSource: recordSearch.listSource,
    hooks: {
      useList: () => ({ data: undefined, meta: undefined, isLoading: false }),
      useTrashedList: () => ({ data: undefined, meta: undefined, isLoading: false }),
      useCreate: useCreateEmployee,
      useUpdate: useUpdateEmployee,
      useSoftDelete: useSoftDeleteEmployee,
      useRestore: useRestoreEmployee,
      useRemove: useRemoveEmployee,
    },
  })

  const handleActionSubmit = (targetId: string): void => {
    if (!actionState) return
    if (actionState.action === 'promote') {
      promoteMutation.mutate({ id: actionState.employeeId, positionId: targetId })
    } else {
      transferMutation.mutate({ id: actionState.employeeId, departmentId: targetId })
    }
  }

  return (
    <>
      <EntityListPage
        {...crud.listPageProps}
        headerContent={<RecordSearchPanel {...recordSearch.searchPanelProps} />}
        hideToolbarSearch
        extraRowActions={(item) => (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setActionState({
                  open: true,
                  employeeId: item.id,
                  employeeName: item.name,
                  action: 'promote',
                })
              }
            >
              Promote
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setActionState({
                  open: true,
                  employeeId: item.id,
                  employeeName: item.name,
                  action: 'transfer',
                })
              }
            >
              Transfer
            </Button>
          </>
        )}
      />
      <EntityFormDialog {...crud.formDialogProps} />
      <ConfirmDialog {...crud.confirmDialogProps} />
      {actionState ? (
        <EmployeeActionDialog
          open={actionState.open}
          onOpenChange={(open) => !open && setActionState(null)}
          employeeName={actionState.employeeName}
          action={actionState.action}
          onSubmit={handleActionSubmit}
          isPending={promoteMutation.isPending || transferMutation.isPending}
        />
      ) : null}
    </>
  )
}
