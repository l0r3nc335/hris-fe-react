import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  useLeaveList,
  useLeaveTrashedList,
  useCreateLeave,
  useUpdateLeave,
  useSoftDeleteLeave,
  useRestoreLeave,
  useRemoveLeave,
} from '../hooks'

export function LeaveListPage(): React.JSX.Element {
  const crud = useEntityCrudPage({
    title: 'Leave',
    description: 'Manage leave records',
    emptyTitle: 'No leave found',
    entitySingular: 'leave request',
    hooks: {
      useList: useLeaveList,
      useTrashedList: useLeaveTrashedList,
      useCreate: useCreateLeave,
      useUpdate: useUpdateLeave,
      useSoftDelete: useSoftDeleteLeave,
      useRestore: useRestoreLeave,
      useRemove: useRemoveLeave,
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