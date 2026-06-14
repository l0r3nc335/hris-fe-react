import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  useAttendanceList,
  useAttendanceTrashedList,
  useCreateAttendance,
  useUpdateAttendance,
  useSoftDeleteAttendance,
  useRestoreAttendance,
  useRemoveAttendance,
} from '../hooks'

export function AttendanceListPage(): React.JSX.Element {
  const crud = useEntityCrudPage({
    title: 'Attendance',
    description: 'Manage attendance records',
    emptyTitle: 'No attendance found',
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
    <>
      <EntityListPage {...crud.listPageProps} />
      <EntityFormDialog {...crud.formDialogProps} />
      <ConfirmDialog {...crud.confirmDialogProps} />
    </>
  )
}