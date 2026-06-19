import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import { NOTES_FIELD } from '@/constants/formFields'
import {
  useTrainingList,
  useTrainingTrashedList,
  useCreateTraining,
  useUpdateTraining,
  useSoftDeleteTraining,
  useRestoreTraining,
  useRemoveTraining,
} from '../hooks'

export function TrainingListPage(): React.JSX.Element {
  const crud = useEntityCrudPage({
    title: 'Training',
    description: 'Manage training courses and employee enrollments',
    emptyTitle: 'No training courses found',
    entitySingular: 'training course',
    formFields: [NOTES_FIELD],
    hooks: {
      useList: useTrainingList,
      useTrashedList: useTrainingTrashedList,
      useCreate: useCreateTraining,
      useUpdate: useUpdateTraining,
      useSoftDelete: useSoftDeleteTraining,
      useRestore: useRestoreTraining,
      useRemove: useRemoveTraining,
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
