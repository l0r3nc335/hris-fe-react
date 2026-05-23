import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchOrganizationList } from '@/slices/organizationSlice'
import { selectorganizationList, selectorganizationStatus } from '@/slices/organizationSelectors'

export function useOrganizationList(): {
  items: ReturnType<typeof selectorganizationList>
  status: ReturnType<typeof selectorganizationStatus>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectorganizationList)
  const status = useAppSelector(selectorganizationStatus)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchOrganizationList())
    }
  }, [dispatch, status])

  return { items, status }
}
