import { useState } from 'react'
import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { EmployeeActionDialog } from '@/components/EmployeeActionDialog'
import { Button } from '@/ui'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import { PERMISSIONS } from '@/constants/permissions'
import {
  useEmployeesList,
  useEmployeesTrashedList,
  useCreateEmployee,
  useUpdateEmployee,
  useSoftDeleteEmployee,
  useRestoreEmployee,
  useRemoveEmployee,
  usePromoteEmployeeMutation,
  useTransferEmployeeMutation,
} from '../hooks'

export function EmployeesListPage(): React.JSX.Element {
  const [actionState, setActionState] = useState<{
    open: boolean
    employeeId: string
    employeeName: string
    action: 'promote' | 'transfer'
  } | null>(null)

  const promoteMutation = usePromoteEmployeeMutation()
  const transferMutation = useTransferEmployeeMutation()

  const crud = useEntityCrudPage({
    title: 'Employees',
    description: 'Manage employee records, promotions, and transfers',
    emptyTitle: 'No employees found',
    entitySingular: 'employee',
    writePermission: PERMISSIONS.employeesWrite,
    createPermission: PERMISSIONS.employeesWrite,
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
