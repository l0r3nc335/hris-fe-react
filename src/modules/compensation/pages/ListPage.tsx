import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  useCompensationList,
  useCompensationTrashedList,
  useCreateCompensation,
  useUpdateCompensation,
  useSoftDeleteCompensation,
  useRestoreCompensation,
  useRemoveCompensation,
} from '../hooks'

export function CompensationListPage(): React.JSX.Element {
  const crud = useEntityCrudPage({
    title: 'Compensation',
    description: 'Manage compensation records',
    emptyTitle: 'No compensation found',
    entitySingular: 'compensation record',
    hooks: {
      useList: useCompensationList,
      useTrashedList: useCompensationTrashedList,
      useCreate: useCreateCompensation,
      useUpdate: useUpdateCompensation,
      useSoftDelete: useSoftDeleteCompensation,
      useRestore: useRestoreCompensation,
      useRemove: useRemoveCompensation,
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