import { useState } from 'react'
import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { RolePermissionsDialog } from '@/components/RolePermissionsDialog'
import { Button } from '@/ui'
import { PERMISSIONS } from '@/constants/permissions'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  useRolesList,
  useRolesTrashedList,
  useCreateRole,
  useUpdateRole,
  useSoftDeleteRole,
  useRestoreRole,
  useRemoveRole,
} from '../hooks'

export function RolesListPage(): React.JSX.Element {
  const [permissionsDialog, setPermissionsDialog] = useState<{
    roleId: string
    roleName: string
  } | null>(null)

  const crud = useEntityCrudPage({
    title: 'Roles',
    description: 'Manage roles records',
    emptyTitle: 'No roles found',
    entitySingular: 'role',
    createPermission: PERMISSIONS.rolesManage,
    writePermission: PERMISSIONS.rolesManage,
    hooks: {
      useList: useRolesList,
      useTrashedList: useRolesTrashedList,
      useCreate: useCreateRole,
      useUpdate: useUpdateRole,
      useSoftDelete: useSoftDeleteRole,
      useRestore: useRestoreRole,
      useRemove: useRemoveRole,
    },
  })

  return (
    <>
      <EntityListPage
        {...crud.listPageProps}
        extraRowActions={(item) => (
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPermissionsDialog({ roleId: item.id, roleName: item.name })
            }
          >
            Permissions
          </Button>
        )}
      />
      <EntityFormDialog {...crud.formDialogProps} />
      <ConfirmDialog {...crud.confirmDialogProps} />
      {permissionsDialog ? (
        <RolePermissionsDialog
          open
          onOpenChange={(open) => !open && setPermissionsDialog(null)}
          roleId={permissionsDialog.roleId}
          roleName={permissionsDialog.roleName}
        />
      ) : null}
    </>
  )
}
