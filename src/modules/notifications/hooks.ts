import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchNotificationsList } from '@/slices/notificationsSlice'
import { selectnotificationsList, selectnotificationsStatus } from '@/slices/notificationsSelectors'

export function useNotificationsList(): {
  items: ReturnType<typeof selectnotificationsList>
  status: ReturnType<typeof selectnotificationsStatus>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectnotificationsList)
  const status = useAppSelector(selectnotificationsStatus)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchNotificationsList())
    }
  }, [dispatch, status])

  return { items, status }
}
