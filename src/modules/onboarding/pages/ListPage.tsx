import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  useOnboardingList,
  useOnboardingTrashedList,
  useCreateOnboarding,
  useUpdateOnboarding,
  useSoftDeleteOnboarding,
  useRestoreOnboarding,
  useRemoveOnboarding,
} from '../hooks'

export function OnboardingListPage(): React.JSX.Element {
  const crud = useEntityCrudPage({
    title: 'Onboarding',
    description: 'Manage new-hire onboarding checklists and tasks',
    emptyTitle: 'No onboarding tasks found',
    entitySingular: 'onboarding task',
    hooks: {
      useList: useOnboardingList,
      useTrashedList: useOnboardingTrashedList,
      useCreate: useCreateOnboarding,
      useUpdate: useUpdateOnboarding,
      useSoftDelete: useSoftDeleteOnboarding,
      useRestore: useRestoreOnboarding,
      useRemove: useRemoveOnboarding,
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
