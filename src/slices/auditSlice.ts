import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/auditApi'
import type { AuditEntity } from '@/modules/audit/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface AuditState {
  ids: string[]
  entities: Record<string, AuditEntity>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: AuditState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetchAuditList = createAsyncThunk(
  'audit/fetchList',
  async () => api.listAudit(),
)

const auditSlice = createSlice({
  name: 'audit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuditList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchAuditList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, AuditEntity>
      })
      .addCase(fetchAuditList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
  },
})

export const auditReducer = auditSlice.reducer
export const selectauditState = (state: RootState): AuditState => state.audit
