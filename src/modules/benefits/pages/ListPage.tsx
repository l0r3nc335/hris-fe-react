import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  useBenefitsList,
  useBenefitsTrashedList,
  useCreateBenefit,
  useUpdateBenefit,
  useSoftDeleteBenefit,
  useRestoreBenefit,
  useRemoveBenefit,
} from '../hooks'

export function BenefitsListPage(): React.JSX.Element {
  const crud = useEntityCrudPage({
    title: 'Benefits',
    description: 'Manage benefit plans and employee enrollments',
    emptyTitle: 'No benefit plans found',
    entitySingular: 'benefit plan',
    hooks: {
      useList: useBenefitsList,
      useTrashedList: useBenefitsTrashedList,
      useCreate: useCreateBenefit,
      useUpdate: useUpdateBenefit,
      useSoftDelete: useSoftDeleteBenefit,
      useRestore: useRestoreBenefit,
      useRemove: useRemoveBenefit,
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
