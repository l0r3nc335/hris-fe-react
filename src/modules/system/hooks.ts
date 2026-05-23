import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchSystemList } from '@/slices/systemSlice'
import { selectsystemList, selectsystemStatus } from '@/slices/systemSelectors'

export function useSystemList(): {
  items: ReturnType<typeof selectsystemList>
  status: ReturnType<typeof selectsystemStatus>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectsystemList)
  const status = useAppSelector(selectsystemStatus)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchSystemList())
    }
  }, [dispatch, status])

  return { items, status }
}
