import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  usePositionsList,
  usePositionsTrashedList,
  useCreatePosition,
  useUpdatePosition,
  useSoftDeletePosition,
  useRestorePosition,
  useRemovePosition,
} from '../hooks'

export function PositionsListPage(): React.JSX.Element {
  const crud = useEntityCrudPage({
    title: 'Positions',
    description: 'Manage positions records',
    emptyTitle: 'No positions found',
    entitySingular: 'position',
    hooks: {
      useList: usePositionsList,
      useTrashedList: usePositionsTrashedList,
      useCreate: useCreatePosition,
      useUpdate: useUpdatePosition,
      useSoftDelete: useSoftDeletePosition,
      useRestore: useRestorePosition,
      useRemove: useRemovePosition,
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