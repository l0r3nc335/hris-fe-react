import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/compensationApi'
import type { CompensationEntity } from '@/modules/compensation/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface CompensationState {
  ids: string[]
  entities: Record<string, CompensationEntity>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: CompensationState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetchCompensationList = createAsyncThunk(
  'compensation/fetchList',
  async () => api.listCompensation(),
)

const compensationSlice = createSlice({
  name: 'compensation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompensationList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCompensationList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, CompensationEntity>
      })
      .addCase(fetchCompensationList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
  },
})

export const compensationReducer = compensationSlice.reducer
export const selectcompensationState = (state: RootState): CompensationState => state.compensation
