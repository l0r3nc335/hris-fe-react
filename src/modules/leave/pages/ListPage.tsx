import { useState } from 'react'
import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { PageShell } from '@/components/layout/PageShell'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/ui'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  useLeaveList,
  useLeaveTrashedList,
  useCreateLeave,
  useUpdateLeave,
  useSoftDeleteLeave,
  useRestoreLeave,
  useRemoveLeave,
  useLeavePendingQuery,
  useApproveLeaveMutation,
  useRejectLeaveMutation,
} from '../hooks'

export function LeaveListPage(): React.JSX.Element {
  const [tab, setTab] = useState('all')
  const { data: pending = [], isLoading: pendingLoading } = useLeavePendingQuery()
  const approveMutation = useApproveLeaveMutation()
  const rejectMutation = useRejectLeaveMutation()

  const crud = useEntityCrudPage({
    title: 'Leave',
    description: 'Manage leave requests and approvals',
    emptyTitle: 'No leave requests found',
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

  const pendingItems = pending.map((item) => ({
    id: item.id,
    name: item.name,
    status: item.status,
  }))

  return (
    <PageShell title="Leave" description="Manage leave requests and approvals">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <EntityListPage {...crud.listPageProps} title="" description="" embedded />
          <EntityFormDialog {...crud.formDialogProps} />
          <ConfirmDialog {...crud.confirmDialogProps} />
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <EntityListPage
            title=""
            description=""
            emptyTitle="No pending leave requests"
            items={pendingItems}
            isLoading={pendingLoading}
            showActions
            embedded
            extraRowActions={(item) => (
              <>
                <Button
                  size="sm"
                  onClick={() => approveMutation.mutate(item.id)}
                  disabled={approveMutation.isPending}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => rejectMutation.mutate({ id: item.id })}
                  disabled={rejectMutation.isPending}
                >
                  Reject
                </Button>
              </>
            )}
          />
        </TabsContent>
      </Tabs>
    </PageShell>
  )
}
