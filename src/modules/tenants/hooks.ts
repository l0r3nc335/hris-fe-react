import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchTenantsList } from '@/slices/tenantsSlice'
import { selecttenantsList, selecttenantsStatus } from '@/slices/tenantsSelectors'

export function useTenantsList(): {
  items: ReturnType<typeof selecttenantsList>
  status: ReturnType<typeof selecttenantsStatus>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selecttenantsList)
  const status = useAppSelector(selecttenantsStatus)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchTenantsList())
    }
  }, [dispatch, status])

  return { items, status }
}
