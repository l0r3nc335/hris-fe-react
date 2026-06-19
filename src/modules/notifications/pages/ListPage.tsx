import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import { NOTES_FIELD } from '@/constants/formFields'
import {
  useNotificationsList,
  useNotificationsTrashedList,
  useCreateNotification,
  useUpdateNotification,
  useSoftDeleteNotification,
  useRestoreNotification,
  useRemoveNotification,
} from '../hooks'

export function NotificationsListPage(): React.JSX.Element {
  const crud = useEntityCrudPage({
    title: 'Notifications',
    description: 'Manage notifications records',
    emptyTitle: 'No notifications found',
    entitySingular: 'notification',
    formFields: [NOTES_FIELD],
    hooks: {
      useList: useNotificationsList,
      useTrashedList: useNotificationsTrashedList,
      useCreate: useCreateNotification,
      useUpdate: useUpdateNotification,
      useSoftDelete: useSoftDeleteNotification,
      useRestore: useRestoreNotification,
      useRemove: useRemoveNotification,
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