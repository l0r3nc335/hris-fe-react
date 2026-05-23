import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchCompensationList } from '@/slices/compensationSlice'
import { selectcompensationList, selectcompensationStatus } from '@/slices/compensationSelectors'

export function useCompensationList(): {
  items: ReturnType<typeof selectcompensationList>
  status: ReturnType<typeof selectcompensationStatus>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectcompensationList)
  const status = useAppSelector(selectcompensationStatus)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchCompensationList())
    }
  }, [dispatch, status])

  return { items, status }
}
