import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/rolesApi'
import type { RolesEntity } from '@/modules/roles/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface RolesState {
  ids: string[]
  entities: Record<string, RolesEntity>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: RolesState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetchRolesList = createAsyncThunk(
  'roles/fetchList',
  async () => api.listRoles(),
)

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRolesList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchRolesList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, RolesEntity>
      })
      .addCase(fetchRolesList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
  },
})

export const rolesReducer = rolesSlice.reducer
export const selectrolesState = (state: RootState): RolesState => state.roles
