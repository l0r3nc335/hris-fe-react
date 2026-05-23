import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchInterviewsList } from '@/slices/interviewsSlice'
import { selectinterviewsList, selectinterviewsStatus } from '@/slices/interviewsSelectors'

export function useInterviewsList(): {
  items: ReturnType<typeof selectinterviewsList>
  status: ReturnType<typeof selectinterviewsStatus>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectinterviewsList)
  const status = useAppSelector(selectinterviewsStatus)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchInterviewsList())
    }
  }, [dispatch, status])

  return { items, status }
}
