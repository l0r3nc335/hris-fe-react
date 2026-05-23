import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/usersApi'
import type { UsersEntity } from '@/modules/users/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface UsersState {
  ids: string[]
  entities: Record<string, UsersEntity>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: UsersState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetchUsersList = createAsyncThunk(
  'users/fetchList',
  async () => api.listUsers(),
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUsersList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, UsersEntity>
      })
      .addCase(fetchUsersList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
  },
})

export const usersReducer = usersSlice.reducer
export const selectusersState = (state: RootState): UsersState => state.users
