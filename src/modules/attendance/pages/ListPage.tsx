import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { PageShell } from '@/components/layout/PageShell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/ui'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  useAttendanceList,
  useAttendanceTrashedList,
  useCreateAttendance,
  useUpdateAttendance,
  useSoftDeleteAttendance,
  useRestoreAttendance,
  useRemoveAttendance,
  useAttendanceTodayQuery,
  useCheckInMutation,
  useCheckOutMutation,
} from '../hooks'

export function AttendanceListPage(): React.JSX.Element {
  const { data: today = [], isLoading: todayLoading } = useAttendanceTodayQuery()
  const checkInMutation = useCheckInMutation()
  const checkOutMutation = useCheckOutMutation()

  const crud = useEntityCrudPage({
    title: 'Attendance',
    description: 'Track employee attendance',
    emptyTitle: 'No attendance records found',
    entitySingular: 'attendance record',
    hooks: {
      useList: useAttendanceList,
      useTrashedList: useAttendanceTrashedList,
      useCreate: useCreateAttendance,
      useUpdate: useUpdateAttendance,
      useSoftDelete: useSoftDeleteAttendance,
      useRestore: useRestoreAttendance,
      useRemove: useRemoveAttendance,
    },
  })

  return (
    <PageShell
      title="Attendance"
      description="Track employee attendance"
      toolbar={
        <div className="flex gap-2">
          <Button
            onClick={() => checkInMutation.mutate()}
            disabled={checkInMutation.isPending}
          >
            Check In
          </Button>
          <Button
            variant="outline"
            onClick={() => checkOutMutation.mutate()}
            disabled={checkOutMutation.isPending}
          >
            Check Out
          </Button>
        </div>
      }
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Today&apos;s Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          {todayLoading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : today.length === 0 ? (
            <p className="text-sm text-muted-foreground">No attendance records for today.</p>
          ) : (
            <ul className="space-y-2">
              {today.map((record) => (
                <li key={record.id} className="flex justify-between text-sm">
                  <span>{record.name}</span>
                  <span className="text-muted-foreground">{record.status}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
      <EntityListPage {...crud.listPageProps} title="" description="" embedded />
      <EntityFormDialog {...crud.formDialogProps} />
      <ConfirmDialog {...crud.confirmDialogProps} />
    </PageShell>
  )
}
