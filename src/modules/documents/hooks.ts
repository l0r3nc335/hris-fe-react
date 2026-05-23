import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchDocumentsList } from '@/slices/documentsSlice'
import { selectdocumentsList, selectdocumentsStatus } from '@/slices/documentsSelectors'

export function useDocumentsList(): {
  items: ReturnType<typeof selectdocumentsList>
  status: ReturnType<typeof selectdocumentsStatus>
} {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectdocumentsList)
  const status = useAppSelector(selectdocumentsStatus)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchDocumentsList())
    }
  }, [dispatch, status])

  return { items, status }
}
