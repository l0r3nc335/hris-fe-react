import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/analyticsApi'
import type { RootState } from '@/store'

export interface AnalyticsState {
  dashboard: api.DashboardData | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: AnalyticsState = {
  dashboard: null,
  status: 'idle',
  error: null,
}

export const fetchAnalyticsDashboard = createAsyncThunk('analytics/fetchDashboard', async () =>
  api.getDashboard(),
)

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsDashboard.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAnalyticsDashboard.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.dashboard = action.payload
      })
      .addCase(fetchAnalyticsDashboard.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed'
      })
  },
})

export const analyticsReducer = analyticsSlice.reducer
export const selectAnalyticsState = (state: RootState): AnalyticsState => state.analytics
