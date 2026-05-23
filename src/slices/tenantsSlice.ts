import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/tenantsApi'
import type { TenantsEntity } from '@/modules/tenants/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface TenantsState {
  ids: string[]
  entities: Record<string, TenantsEntity>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: TenantsState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetchTenantsList = createAsyncThunk(
  'tenants/fetchList',
  async () => api.listTenants(),
)

const tenantsSlice = createSlice({
  name: 'tenants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTenantsList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchTenantsList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, TenantsEntity>
      })
      .addCase(fetchTenantsList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
  },
})

export const tenantsReducer = tenantsSlice.reducer
export const selecttenantsState = (state: RootState): TenantsState => state.tenants
