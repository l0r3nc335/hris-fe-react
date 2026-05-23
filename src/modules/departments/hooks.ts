import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchDepartmentsList } from '@/slices/departmentsSlice'
import { selectdepartmentsList, selectdepartmentsStatus } from '@/slices/departmentsSelectors'

export function useDepartmentsList(): {
  items: ReturnType<typeof selectdepartmentsList>
  status: ReturnType<typeof selectdepartmentsStatus>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectdepartmentsList)
  const status = useAppSelector(selectdepartmentsStatus)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchDepartmentsList())
    }
  }, [dispatch, status])

  return { items, status }
}
