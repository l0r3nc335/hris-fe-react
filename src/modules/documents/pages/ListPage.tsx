import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  useDocumentsList,
  useDocumentsTrashedList,
  useCreateDocument,
  useUpdateDocument,
  useSoftDeleteDocument,
  useRestoreDocument,
  useRemoveDocument,
} from '../hooks'

export function DocumentsListPage(): React.JSX.Element {
  const crud = useEntityCrudPage({
    title: 'Documents',
    description: 'Manage documents records',
    emptyTitle: 'No documents found',
    entitySingular: 'document',
    hooks: {
      useList: useDocumentsList,
      useTrashedList: useDocumentsTrashedList,
      useCreate: useCreateDocument,
      useUpdate: useUpdateDocument,
      useSoftDelete: useSoftDeleteDocument,
      useRestore: useRestoreDocument,
      useRemove: useRemoveDocument,
    },
  })

  return (
    <>
      <EntityListPage {...crud.listPageProps} />
      <EntityFormDialog {...crud.formDialogProps} />
      <ConfirmDialog {...crud.confirmDialogProps} />
    </>
  )
}