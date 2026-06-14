import { endpoints } from '@/constants/endpoints'
import { createMutableResourceApi } from './client'
import type { DocumentsEntity } from '@/modules/documents/types'

const api = createMutableResourceApi<DocumentsEntity>({
  list: endpoints.documents.list,
  byId: endpoints.documents.byId,
  trashed: endpoints.documents.trashed,
  softDelete: endpoints.documents.softDelete,
  restore: endpoints.documents.restore,
})

export const listDocuments = api.list
export const getDocuments = api.getById
export const documentsApi = api
