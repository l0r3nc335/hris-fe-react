import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/positionsApi'
import type { PositionsEntity } from '@/modules/positions/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface PositionsState {
  ids: string[]
  entities: Record<string, PositionsEntity>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: PositionsState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetchPositionsList = createAsyncThunk(
  'positions/fetchList',
  async () => api.listPositions(),
)

const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPositionsList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPositionsList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, PositionsEntity>
      })
      .addCase(fetchPositionsList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
  },
})

export const positionsReducer = positionsSlice.reducer
export const selectpositionsState = (state: RootState): PositionsState => state.positions
