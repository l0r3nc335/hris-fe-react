import { useMemo, useState } from 'react'
import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { PageShell } from '@/components/layout/PageShell'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  const [tab, setTab] = useState('jobs')

  const crud = useEntityCrudPage({
    title: 'Recruitment',
    description: 'Manage job postings and applicants',
    emptyTitle: 'No records found',
    entitySingular: 'record',
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

  const jobItems = useMemo(
    () => crud.listPageProps.items.filter((item) => !item.name.toLowerCase().includes('applicant')),
    [crud.listPageProps.items],
  )

  const applicantItems = useMemo(
    () => crud.listPageProps.items.filter((item) => item.name.toLowerCase().includes('applicant')),
    [crud.listPageProps.items],
  )

  return (
    <PageShell title="Recruitment" description="Manage job postings and applicants">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="jobs">Job Postings</TabsTrigger>
          <TabsTrigger value="applicants">Applicants</TabsTrigger>
        </TabsList>
        <TabsContent value="jobs" className="mt-4">
          <EntityListPage
            {...crud.listPageProps}
            title=""
            description=""
            items={jobItems}
            emptyTitle="No job postings found"
            embedded
          />
        </TabsContent>
        <TabsContent value="applicants" className="mt-4">
          <EntityListPage
            {...crud.listPageProps}
            title=""
            description=""
            items={applicantItems}
            emptyTitle="No applicants found"
            onCreate={undefined}
            embedded
          />
        </TabsContent>
      </Tabs>
      <EntityFormDialog {...crud.formDialogProps} />
      <ConfirmDialog {...crud.confirmDialogProps} />
    </PageShell>
  )
}
