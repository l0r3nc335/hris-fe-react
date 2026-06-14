import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  useTimeTrackingList,
  useTimeTrackingTrashedList,
  useCreateTimeTracking,
  useUpdateTimeTracking,
  useSoftDeleteTimeTracking,
  useRestoreTimeTracking,
  useRemoveTimeTracking,
} from '../hooks'

export function TimeTrackingListPage(): React.JSX.Element {
  const crud = useEntityCrudPage({
    title: 'Time Tracking',
    description: 'Manage time tracking records',
    emptyTitle: 'No time tracking found',
    entitySingular: 'time log',
    hooks: {
      useList: useTimeTrackingList,
      useTrashedList: useTimeTrackingTrashedList,
      useCreate: useCreateTimeTracking,
      useUpdate: useUpdateTimeTracking,
      useSoftDelete: useSoftDeleteTimeTracking,
      useRestore: useRestoreTimeTracking,
      useRemove: useRemoveTimeTracking,
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