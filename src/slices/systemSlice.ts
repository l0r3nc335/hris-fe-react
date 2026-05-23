import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/systemApi'
import type { SystemEntity } from '@/modules/system/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface SystemState {
  ids: string[]
  entities: Record<string, SystemEntity>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: SystemState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetchSystemList = createAsyncThunk(
  'system/fetchList',
  async () => api.listSystem(),
)

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystemList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchSystemList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, SystemEntity>
      })
      .addCase(fetchSystemList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
  },
})

export const systemReducer = systemSlice.reducer
export const selectsystemState = (state: RootState): SystemState => state.system
