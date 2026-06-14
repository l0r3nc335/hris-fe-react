import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
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
  const crud = useEntityCrudPage({
    title: 'Roles',
    description: 'Manage roles records',
    emptyTitle: 'No roles found',
    entitySingular: 'role',
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
      <EntityListPage {...crud.listPageProps} />
      <EntityFormDialog {...crud.formDialogProps} />
      <ConfirmDialog {...crud.confirmDialogProps} />
    </>
  )
}