import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchUsersList } from '@/slices/usersSlice'
import { selectusersList, selectusersStatus } from '@/slices/usersSelectors'

export function useUsersList(): {
  items: ReturnType<typeof selectusersList>
  status: ReturnType<typeof selectusersStatus>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectusersList)
  const status = useAppSelector(selectusersStatus)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchUsersList())
    }
  }, [dispatch, status])

  return { items, status }
}
