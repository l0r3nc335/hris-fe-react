import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/timeLogsApi'
import type { TimeTrackingEntity } from '@/modules/timeTracking/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface TimeTrackingState {
  ids: string[]
  entities: Record<string, TimeTrackingEntity>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: TimeTrackingState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetchTimeTrackingList = createAsyncThunk(
  'timeTracking/fetchList',
  async () => api.listTimeTracking(),
)

const timeTrackingSlice = createSlice({
  name: 'timeTracking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimeTrackingList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchTimeTrackingList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, TimeTrackingEntity>
      })
      .addCase(fetchTimeTrackingList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
  },
})

export const timeTrackingReducer = timeTrackingSlice.reducer
export const selecttimeTrackingState = (state: RootState): TimeTrackingState => state.timeTracking
