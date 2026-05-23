import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/reportsApi'
import type { ReportsEntity } from '@/modules/reports/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface ReportsState {
  ids: string[]
  entities: Record<string, ReportsEntity>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: ReportsState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetchReportsList = createAsyncThunk(
  'reports/fetchList',
  async () => api.listReports(),
)

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportsList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchReportsList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, ReportsEntity>
      })
      .addCase(fetchReportsList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
  },
})

export const reportsReducer = reportsSlice.reducer
export const selectreportsState = (state: RootState): ReportsState => state.reports
