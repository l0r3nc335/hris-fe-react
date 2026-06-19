import { useState } from 'react'
import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { PageShell } from '@/components/layout/PageShell'
import { Tabs } from '@/ui'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  useRecruitmentList,
  useRecruitmentTrashedList,
  useRecruitmentApplicantsList,
  useCreateRecruitment,
  useUpdateRecruitment,
  useSoftDeleteRecruitment,
  useRestoreRecruitment,
  useRemoveRecruitment,
} from '../hooks'

export function RecruitmentListPage(): React.JSX.Element {
  const [tab, setTab] = useState('jobs')
  const { data: applicants = [], isLoading: applicantsLoading } = useRecruitmentApplicantsList()

  const crud = useEntityCrudPage({
    title: 'Recruitment',
    description: 'Manage job postings and applicants',
    emptyTitle: 'No job postings found',
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
    <PageShell title="Recruitment" description="Manage job postings and applicants">
      <Tabs
        value={tab}
        onValueChange={setTab}
        items={[
          {
            value: 'jobs',
            label: 'Job Postings',
            content: (
              <EntityListPage
                {...crud.listPageProps}
                title=""
                description=""
                embedded
              />
            ),
          },
          {
            value: 'applicants',
            label: 'Applicants',
            content: (
              <EntityListPage
                {...crud.listPageProps}
                title=""
                description=""
                items={applicants}
                isLoading={applicantsLoading}
                emptyTitle="No applicants found"
                onCreate={undefined}
                embedded
              />
            ),
          },
        ]}
      />
      <EntityFormDialog {...crud.formDialogProps} />
      <ConfirmDialog {...crud.confirmDialogProps} />
    </PageShell>
  )
}
