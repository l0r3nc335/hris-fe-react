import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/interviewsApi'
import type { InterviewsEntity } from '@/modules/interviews/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface InterviewsState {
  ids: string[]
  entities: Record<string, InterviewsEntity>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: InterviewsState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetchInterviewsList = createAsyncThunk(
  'interviews/fetchList',
  async () => api.listInterviews(),
)

const interviewsSlice = createSlice({
  name: 'interviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInterviewsList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchInterviewsList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, InterviewsEntity>
      })
      .addCase(fetchInterviewsList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
  },
})

export const interviewsReducer = interviewsSlice.reducer
export const selectinterviewsState = (state: RootState): InterviewsState => state.interviews
