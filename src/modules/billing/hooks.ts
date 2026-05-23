import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchBillingList } from '@/slices/billingSlice'
import { selectbillingList, selectbillingStatus } from '@/slices/billingSelectors'

export function useBillingList(): {
  items: ReturnType<typeof selectbillingList>
  status: ReturnType<typeof selectbillingStatus>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectbillingList)
  const status = useAppSelector(selectbillingStatus)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchBillingList())
    }
  }, [dispatch, status])

  return { items, status }
}
