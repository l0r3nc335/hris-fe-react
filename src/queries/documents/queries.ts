import { queryKeys } from '@/lib/queryKeys'
import { documentsApi } from '@/services/api/documentsApi'
import { createResourceQueryHooks } from '../factory'

const hooks = createResourceQueryHooks(queryKeys.documents, documentsApi)

export const useDocumentsList = hooks.useList
export const useDocumentsTrashedList = hooks.useTrashedList
export const useCreateDocument = hooks.useCreate
export const useUpdateDocument = hooks.useUpdate
export const useSoftDeleteDocument = hooks.useSoftDelete
export const useRestoreDocument = hooks.useRestore
export const useRemoveDocument = hooks.useRemove