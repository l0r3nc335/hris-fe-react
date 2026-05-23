import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchPositionsList } from '@/slices/positionsSlice'
import { selectpositionsList, selectpositionsStatus } from '@/slices/positionsSelectors'

export function usePositionsList(): {
  items: ReturnType<typeof selectpositionsList>
  status: ReturnType<typeof selectpositionsStatus>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectpositionsList)
  const status = useAppSelector(selectpositionsStatus)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchPositionsList())
    }
  }, [dispatch, status])

  return { items, status }
}
