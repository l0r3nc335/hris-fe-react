import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/recruitmentApi'
import type { RecruitmentEntity } from '@/modules/recruitment/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface RecruitmentState {
  ids: string[]
  entities: Record<string, RecruitmentEntity>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: RecruitmentState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetchRecruitmentList = createAsyncThunk(
  'recruitment/fetchList',
  async () => api.listRecruitment(),
)

const recruitmentSlice = createSlice({
  name: 'recruitment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecruitmentList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchRecruitmentList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, RecruitmentEntity>
      })
      .addCase(fetchRecruitmentList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
  },
})

export const recruitmentReducer = recruitmentSlice.reducer
export const selectrecruitmentState = (state: RootState): RecruitmentState => state.recruitment
