import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/documentsApi'
import type { DocumentsEntity } from '@/modules/documents/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface DocumentsState {
  ids: string[]
  entities: Record<string, DocumentsEntity>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: DocumentsState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetchDocumentsList = createAsyncThunk(
  'documents/fetchList',
  async () => api.listDocuments(),
)

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocumentsList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchDocumentsList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, DocumentsEntity>
      })
      .addCase(fetchDocumentsList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
  },
})

export const documentsReducer = documentsSlice.reducer
export const selectdocumentsState = (state: RootState): DocumentsState => state.documents
