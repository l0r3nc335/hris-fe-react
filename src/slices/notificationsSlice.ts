import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/notificationsApi'
import type { NotificationsEntity } from '@/modules/notifications/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface NotificationsState {
  ids: string[]
  entities: Record<string, NotificationsEntity>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: NotificationsState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetchNotificationsList = createAsyncThunk(
  'notifications/fetchList',
  async () => api.listNotifications(),
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchNotificationsList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, NotificationsEntity>
      })
      .addCase(fetchNotificationsList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
  },
})

export const notificationsReducer = notificationsSlice.reducer
export const selectnotificationsState = (state: RootState): NotificationsState => state.notifications
