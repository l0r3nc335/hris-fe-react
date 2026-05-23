import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchRecruitmentList } from '@/slices/recruitmentSlice'
import { selectrecruitmentList, selectrecruitmentStatus } from '@/slices/recruitmentSelectors'

export function useRecruitmentList(): {
  items: ReturnType<typeof selectrecruitmentList>
  status: ReturnType<typeof selectrecruitmentStatus>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectrecruitmentList)
  const status = useAppSelector(selectrecruitmentStatus)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchRecruitmentList())
    }
  }, [dispatch, status])

  return { items, status }
}
