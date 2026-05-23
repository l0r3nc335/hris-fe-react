import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchAuditList } from '@/slices/auditSlice'
import { selectauditList, selectauditStatus } from '@/slices/auditSelectors'

export function useAuditList(): {
  items: ReturnType<typeof selectauditList>
  status: ReturnType<typeof selectauditStatus>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectauditList)
  const status = useAppSelector(selectauditStatus)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchAuditList())
    }
  }, [dispatch, status])

  return { items, status }
}
