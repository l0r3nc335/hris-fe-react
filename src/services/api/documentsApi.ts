import { httpClient } from '@/services/httpClient'
import { endpoints } from '@/constants/endpoints'
import type { ApiResponse } from '@/types/api'
import type { DocumentsEntity } from '@/modules/documents/types'

export async function listDocuments(): Promise<DocumentsEntity[]> {
  const res = await httpClient.get<ApiResponse<DocumentsEntity[]>>(endpoints.documents.list)
  return res.data.data
}

export async function getDocuments(id: string): Promise<DocumentsEntity> {
  const res = await httpClient.get<ApiResponse<DocumentsEntity>>(endpoints.documents.byId(id))
  return res.data.data
}
