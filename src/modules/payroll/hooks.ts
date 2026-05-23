import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchPayrollList } from '@/slices/payrollSlice'
import { selectpayrollList, selectpayrollStatus } from '@/slices/payrollSelectors'

export function usePayrollList(): {
  items: ReturnType<typeof selectpayrollList>
  status: ReturnType<typeof selectpayrollStatus>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectpayrollList)
  const status = useAppSelector(selectpayrollStatus)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchPayrollList())
    }
  }, [dispatch, status])

  return { items, status }
}
