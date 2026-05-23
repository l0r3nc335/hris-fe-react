import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/settingsApi'
import type { SettingsEntity } from '@/modules/settings/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface SettingsState {
  ids: string[]
  entities: Record<string, SettingsEntity>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: SettingsState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetchSettingsList = createAsyncThunk(
  'settings/fetchList',
  async () => api.listSettings(),
)

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettingsList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchSettingsList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, SettingsEntity>
      })
      .addCase(fetchSettingsList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
  },
})

export const settingsReducer = settingsSlice.reducer
export const selectsettingsState = (state: RootState): SettingsState => state.settings
