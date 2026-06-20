import { useEffect, useState } from 'react'
import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { PageShell } from '@/components/layout/PageShell'
import { Tabs } from '@/ui'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import type { ListQueryParams } from '@/services/api/client'
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
  const [applicantPage, setApplicantPage] = useState(1)
  const [applicantLimit, setApplicantLimit] = useState(20)
  const [applicantSearch, setApplicantSearch] = useState('')
  const [applicantStatus, setApplicantStatus] = useState('all')

  const applicantParams: ListQueryParams = {
    page: applicantPage,
    limit: applicantLimit,
    q: applicantSearch.trim() || undefined,
    status: applicantStatus,
  }

  const {
    data: applicants = [],
    meta: applicantMeta,
    isLoading: applicantsLoading,
  } = useRecruitmentApplicantsList(applicantParams)

  useEffect(() => {
    setApplicantPage(1)
  }, [applicantSearch, applicantStatus])

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
                title=""
                description=""
                items={applicants}
                isLoading={applicantsLoading}
                emptyTitle="No applicants found"
                onCreate={undefined}
                total={applicantMeta?.total ?? 0}
                page={applicantPage}
                limit={applicantLimit}
                onPageChange={setApplicantPage}
                onLimitChange={(nextLimit) => {
                  setApplicantLimit(nextLimit)
                  setApplicantPage(1)
                }}
                searchValue={applicantSearch}
                onSearchChange={setApplicantSearch}
                statusFilter={applicantStatus}
                onStatusFilterChange={setApplicantStatus}
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
