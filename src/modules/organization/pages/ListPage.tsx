import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  useOrganizationList,
  useOrganizationTrashedList,
  useCreateOrganization,
  useUpdateOrganization,
  useSoftDeleteOrganization,
  useRestoreOrganization,
  useRemoveOrganization,
} from '../hooks'

export function OrganizationListPage(): React.JSX.Element {
  const crud = useEntityCrudPage({
    title: 'Organization',
    description: 'Manage organization records',
    emptyTitle: 'No organization found',
    entitySingular: 'org node',
    hooks: {
      useList: useOrganizationList,
      useTrashedList: useOrganizationTrashedList,
      useCreate: useCreateOrganization,
      useUpdate: useUpdateOrganization,
      useSoftDelete: useSoftDeleteOrganization,
      useRestore: useRestoreOrganization,
      useRemove: useRemoveOrganization,
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