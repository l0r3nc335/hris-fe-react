import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  useRecruitmentList,
  useRecruitmentTrashedList,
  useCreateRecruitment,
  useUpdateRecruitment,
  useSoftDeleteRecruitment,
  useRestoreRecruitment,
  useRemoveRecruitment,
} from '../hooks'

export function RecruitmentListPage(): React.JSX.Element {
  const crud = useEntityCrudPage({
    title: 'Recruitment',
    description: 'Manage recruitment records',
    emptyTitle: 'No recruitment found',
    entitySingular: 'job posting',
    hooks: {
      useList: useRecruitmentList,
      useTrashedList: useRecruitmentTrashedList,
      useCreate: useCreateRecruitment,
      useUpdate: useUpdateRecruitment,
      useSoftDelete: useSoftDeleteRecruitment,
      useRestore: useRestoreRecruitment,
      useRemove: useRemoveRecruitment,
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