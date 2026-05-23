import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchRolesList } from '@/slices/rolesSlice'
import { selectrolesList, selectrolesStatus } from '@/slices/rolesSelectors'

export function useRolesList(): {
  items: ReturnType<typeof selectrolesList>
  status: ReturnType<typeof selectrolesStatus>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectrolesList)
  const status = useAppSelector(selectrolesStatus)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchRolesList())
    }
  }, [dispatch, status])

  return { items, status }
}
