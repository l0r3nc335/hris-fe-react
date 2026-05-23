import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/performanceApi'
import type { PerformanceEntity } from '@/modules/performance/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface PerformanceState {
  ids: string[]
  entities: Record<string, PerformanceEntity>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: PerformanceState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetchPerformanceList = createAsyncThunk(
  'performance/fetchList',
  async () => api.listPerformance(),
)

const performanceSlice = createSlice({
  name: 'performance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerformanceList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPerformanceList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, PerformanceEntity>
      })
      .addCase(fetchPerformanceList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
  },
})

export const performanceReducer = performanceSlice.reducer
export const selectperformanceState = (state: RootState): PerformanceState => state.performance
