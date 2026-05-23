import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchTimeTrackingList } from '@/slices/timeTrackingSlice'
import { selecttimeTrackingList, selecttimeTrackingStatus } from '@/slices/timeTrackingSelectors'

export function useTimeTrackingList(): {
  items: ReturnType<typeof selecttimeTrackingList>
  status: ReturnType<typeof selecttimeTrackingStatus>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selecttimeTrackingList)
  const status = useAppSelector(selecttimeTrackingStatus)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchTimeTrackingList())
    }
  }, [dispatch, status])

  return { items, status }
}
