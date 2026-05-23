import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '@/services/api/billingApi'
import type { BillingEntity } from '@/modules/billing/types'
import type { RootState } from '@/store'
import { normalizeEntities } from '@/utils/normalize'

export interface BillingState {
  ids: string[]
  entities: Record<string, BillingEntity>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: BillingState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
}

export const fetchBillingList = createAsyncThunk(
  'billing/fetchList',
  async () => api.listBilling(),
)

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBillingList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchBillingList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const normalized = normalizeEntities(action.payload)
        state.ids = normalized.ids
        state.entities = normalized.entities as Record<string, BillingEntity>
      })
      .addCase(fetchBillingList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load'
      })
  },
})

export const billingReducer = billingSlice.reducer
export const selectbillingState = (state: RootState): BillingState => state.billing
