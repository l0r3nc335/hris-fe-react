import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  useTenantsList,
  useTenantsTrashedList,
  useCreateTenant,
  useUpdateTenant,
  useSoftDeleteTenant,
  useRestoreTenant,
  useRemoveTenant,
} from '../hooks'

export function TenantsListPage(): React.JSX.Element {
  const crud = useEntityCrudPage({
    title: 'Tenants',
    description: 'Manage tenants records',
    emptyTitle: 'No tenants found',
    entitySingular: 'tenant',
    hooks: {
      useList: useTenantsList,
      useTrashedList: useTenantsTrashedList,
      useCreate: useCreateTenant,
      useUpdate: useUpdateTenant,
      useSoftDelete: useSoftDeleteTenant,
      useRestore: useRestoreTenant,
      useRemove: useRemoveTenant,
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