import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchAttendanceList } from '@/slices/attendanceSlice'
import { selectattendanceList, selectattendanceStatus } from '@/slices/attendanceSelectors'

export function useAttendanceList(): {
  items: ReturnType<typeof selectattendanceList>
  status: ReturnType<typeof selectattendanceStatus>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectattendanceList)
  const status = useAppSelector(selectattendanceStatus)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchAttendanceList())
    }
  }, [dispatch, status])

  return { items, status }
}
