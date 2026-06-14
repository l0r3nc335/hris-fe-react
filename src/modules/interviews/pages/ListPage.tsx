import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  useInterviewsList,
  useInterviewsTrashedList,
  useCreateInterview,
  useUpdateInterview,
  useSoftDeleteInterview,
  useRestoreInterview,
  useRemoveInterview,
} from '../hooks'

export function InterviewsListPage(): React.JSX.Element {
  const crud = useEntityCrudPage({
    title: 'Interviews',
    description: 'Manage interviews records',
    emptyTitle: 'No interviews found',
    entitySingular: 'interview',
    hooks: {
      useList: useInterviewsList,
      useTrashedList: useInterviewsTrashedList,
      useCreate: useCreateInterview,
      useUpdate: useUpdateInterview,
      useSoftDelete: useSoftDeleteInterview,
      useRestore: useRestoreInterview,
      useRemove: useRemoveInterview,
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