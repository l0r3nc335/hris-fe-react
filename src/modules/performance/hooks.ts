import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchPerformanceList } from '@/slices/performanceSlice'
import { selectperformanceList, selectperformanceStatus } from '@/slices/performanceSelectors'

export function usePerformanceList(): {
  items: ReturnType<typeof selectperformanceList>
  status: ReturnType<typeof selectperformanceStatus>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectperformanceList)
  const status = useAppSelector(selectperformanceStatus)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchPerformanceList())
    }
  }, [dispatch, status])

  return { items, status }
}
