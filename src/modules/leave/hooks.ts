import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchLeaveList } from '@/slices/leaveSlice'
import { selectleaveList, selectleaveStatus } from '@/slices/leaveSelectors'

export function useLeaveList(): {
  items: ReturnType<typeof selectleaveList>
  status: ReturnType<typeof selectleaveStatus>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectleaveList)
  const status = useAppSelector(selectleaveStatus)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchLeaveList())
    }
  }, [dispatch, status])

  return { items, status }
}
