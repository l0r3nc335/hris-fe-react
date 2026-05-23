import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchEmployeesList } from '@/slices/employeesSlice'
import { selectemployeesList, selectemployeesStatus } from '@/slices/employeesSelectors'

export function useEmployeesList(): {
  items: ReturnType<typeof selectemployeesList>
  status: ReturnType<typeof selectemployeesStatus>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectemployeesList)
  const status = useAppSelector(selectemployeesStatus)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchEmployeesList())
    }
  }, [dispatch, status])

  return { items, status }
}
