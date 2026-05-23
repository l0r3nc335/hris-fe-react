import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/leaveApi'
import type { LeaveEntity } from '@/modules/leave/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface LeaveState {
  ids: string[]
  entities: Record<string, LeaveEntity>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: LeaveState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetchLeaveList = createAsyncThunk(
  'leave/fetchList',
  async () => api.listLeave(),
)

const leaveSlice = createSlice({
  name: 'leave',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaveList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchLeaveList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, LeaveEntity>
      })
      .addCase(fetchLeaveList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
  },
})

export const leaveReducer = leaveSlice.reducer
export const selectleaveState = (state: RootState): LeaveState => state.leave
