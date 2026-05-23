import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchReportsList } from '@/slices/reportsSlice'
import { selectreportsList, selectreportsStatus } from '@/slices/reportsSelectors'

export function useReportsList(): {
  items: ReturnType<typeof selectreportsList>
  status: ReturnType<typeof selectreportsStatus>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectreportsList)
  const status = useAppSelector(selectreportsStatus)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchReportsList())
    }
  }, [dispatch, status])

  return { items, status }
}
