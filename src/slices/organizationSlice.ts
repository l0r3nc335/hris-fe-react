import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/orgApi'
import type { OrganizationEntity } from '@/modules/organization/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface OrganizationState {
  ids: string[]
  entities: Record<string, OrganizationEntity>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: OrganizationState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetchOrganizationList = createAsyncThunk(
  'organization/fetchList',
  async () => api.listOrganization(),
)

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizationList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchOrganizationList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, OrganizationEntity>
      })
      .addCase(fetchOrganizationList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
  },
})

export const organizationReducer = organizationSlice.reducer
export const selectorganizationState = (state: RootState): OrganizationState => state.organization
